import { 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { db, auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

/**
 * Centrally handle and format Firestore errors to standard JSON
 */
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'instructor';
  createdAt?: any;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  quizResults: { [quizId: string]: number };
  updatedAt?: any;
}

export interface PracticeSession {
  id?: string;
  userId: string;
  imageId: string;
  polylines: any[];
  accuracy: number;
  createdAt?: any;
}

/**
 * Gets or creates the user's profile document structure in Firestore
 */
export async function getOrCreateUserProfile(firebaseUser: { uid: string; email: string | null; displayName: string | null }): Promise<UserProfile> {
  const userDocRef = doc(db, 'users', firebaseUser.uid);
  const path = `users/${firebaseUser.uid}`;

  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }

    // Creating initial user profile following strict validation constraints
    const initialProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous Student',
      role: 'student',
      createdAt: serverTimestamp()
    };

    await setDoc(userDocRef, initialProfile);
    return initialProfile;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Gets or creates the user's learning progress document
 */
export async function getOrCreateProgress(userId: string): Promise<UserProgress> {
  const progressDocRef = doc(db, 'progress', userId);
  const path = `progress/${userId}`;

  try {
    const docSnap = await getDoc(progressDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProgress;
    }

    const initialProgress: UserProgress = {
      userId,
      completedLessons: [],
      quizResults: {},
      updatedAt: serverTimestamp()
    };

    await setDoc(progressDocRef, initialProgress);
    return initialProgress;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Marks a lesson as completed inside the user's progress tracking document
 */
export async function completeLessonInFirestore(userId: string, lessonId: string): Promise<void> {
  const progressDocRef = doc(db, 'progress', userId);
  const path = `progress/${userId}`;

  try {
    // Make sure document exists first
    await getOrCreateProgress(userId);

    await updateDoc(progressDocRef, {
      completedLessons: arrayUnion(lessonId),
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

/**
 * Saves or updates assessment quiz score results in Firestore
 */
export async function saveQuizScoreInFirestore(userId: string, quizId: string, scorePercentage: number): Promise<void> {
  const progressDocRef = doc(db, 'progress', userId);
  const path = `progress/${userId}`;

  try {
    const currentProgress = await getOrCreateProgress(userId);
    const updatedQuizResults = {
      ...currentProgress.quizResults,
      [quizId]: scorePercentage
    };

    await updateDoc(progressDocRef, {
      quizResults: updatedQuizResults,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

/**
 * Saves a new interactive polyline annotation session
 */
export async function savePracticeSessionInFirestore(
  userId: string, 
  imageId: string, 
  polylines: any[], 
  accuracy: number
): Promise<string> {
  const path = 'sessions';
  try {
    const sessionData: PracticeSession = {
      userId,
      imageId,
      polylines,
      accuracy,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'sessions'), sessionData);
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

/**
 * Retrieves the user's chronological practice sessions
 */
export async function getPracticeSessionsFromFirestore(userId: string): Promise<PracticeSession[]> {
  const path = 'sessions';
  try {
    const q = query(
      collection(db, 'sessions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const sessions: PracticeSession[] = [];
    snapshot.forEach(docSnap => {
      sessions.push({
        id: docSnap.id,
        ...docSnap.data()
      } as PracticeSession);
    });
    return sessions;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}
