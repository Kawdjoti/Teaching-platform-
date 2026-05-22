import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Settings, 
  AlertTriangle, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  MousePointer, 
  Eye, 
  HelpCircle, 
  CheckCircle, 
  XOctagon,
  Image as ImageIcon
} from 'lucide-react';

// @ts-ignore
import annotatedRoad from '../assets/images/annotated_road_1779375240587.png';
// @ts-ignore
import annotatedHuman from '../assets/images/annotated_human_1779375257595.png';
// @ts-ignore
import annotatedCar from '../assets/images/annotated_car_1779375281630.png';

export default function TrainingGuide() {
  const [activeTab, setActiveTab] = useState<'concepts' | 'controls' | 'categories' | 'rules' | 'examples'>('concepts');

  const categories = [
    {
      name: "Traffic Lane",
      subcategories: [
        { name: "Lane Type", classes: ["Solid", "Dotted"] },
        { name: "Lane Color", classes: ["White", "Yellow", "Other (Blue/Green/Red)"] }
      ],
      description: "Must be labeled for autonomous vehicles to detect lanes and track routes."
    },
    {
      name: "Stop Line",
      subcategories: [
        { name: "Type", classes: ["Solid lines at intersections"] }
      ],
      description: "Critical indicator line for pedestrian safety and vehicle control boundaries."
    }
  ];

  const controls = [
    { key: "Left Click", description: "Place polyline points along the linear path." },
    { key: "Enter / Button", description: "Finish current polyline shape segment." },
    { key: "Drag Point", description: "Reposition any existing annotation node." },
    { key: "D / Delete Key", description: "Select and remove the clicked node." },
    { key: "Ctrl + Click", description: "Hover over/click line to add an intermediate point." },
    { key: "Alt + Click", description: "Directly click an annotated point to delete it." }
  ];

  return (
    <div className="mt-8 bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-6 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Course Materials</span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">Data Labeling Training Guide</h2>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'concepts', label: '1. Concepts', icon: BookOpen },
            { id: 'controls', label: '2. Tool Controls', icon: Settings },
            { id: 'categories', label: '3. Classes', icon: Layers },
            { id: 'rules', label: '4. Best Practices', icon: AlertTriangle },
            { id: 'examples', label: '5. Visual Examples', icon: ImageIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  isActive 
                    ? "bg-zinc-900 text-white shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'concepts' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900">What is Polyline Annotation?</h3>
                <p className="text-zinc-600 leading-relaxed text-sm">
                  This method is used to annotate long, narrow linear structures in an image. It involves placing a series of points along the target object and connecting them to follow its path accurately.
                </p>
                <p className="text-zinc-600 leading-relaxed text-sm">
                  When marking road lines, railway tracks, pipelines, utility assets, or corridor boundaries, polylines ensure compact representations that preserve structural connectivity.
                </p>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-start gap-3">
                  <div className="rounded-xl bg-white p-2 border border-zinc-200">
                    <Eye className="h-5 w-5 text-zinc-900" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Annotation Goal</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Place consecutive points exactly through the vertical center axis of the linear target structure.</p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl bg-zinc-950 overflow-hidden shadow-inner flex flex-col justify-between p-6 text-white">
                <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Visual Guide Highlight</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-base font-bold">Trace Centerline Precisely</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Linear modeling tracks lane paths using individual vertex matrices instead of dense polygon borders or bounding frames.
                  </p>
                </div>
                <div className="h-6 w-fit bg-white/10 px-3 py-1 rounded-full text-[10px] font-semibold border border-white/10">
                  Slide deck 03
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'controls' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-zinc-900">Interactive Keyboard & Mouse Commands</h3>
            <p className="text-zinc-500 text-sm">
              Use these rapid-access shortcuts to label, refine, resize, and manage polylines with optimal performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {controls.map((control) => (
                <div key={control.key} className="bg-zinc-50 border border-zinc-100 p-5 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded-lg border border-zinc-200 text-zinc-900 w-fit">
                    {control.key}
                  </span>
                  <p className="text-sm font-medium text-zinc-600 mt-4 leading-relaxed">
                    {control.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Project Taxonomy & Ontologies</h3>
              <p className="text-zinc-500 text-sm mt-1">Specify classification tags carefully during model annotations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <div key={cat.name} className="border border-zinc-200 rounded-2xl p-6 bg-white space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <h4 className="font-bold text-zinc-900 text-lg">{cat.name}</h4>
                    <span className="text-xs font-bold text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-lg">Category</span>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Classes / Sub-Categories</span>
                    {cat.subcategories.map((sub, i) => (
                      <div key={i} className="flex items-center gap-3 bg-zinc-50 px-4 py-2.5 rounded-xl border border-zinc-100">
                        <span className="text-xs font-bold text-zinc-700">{sub.name}:</span>
                        <div className="flex gap-1.5 flex-wrap">
                          {sub.classes.map((cls, j) => (
                            <span key={j} className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-600">
                              {cls}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'rules' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Quality Regulations & Curvature Constraints</h3>
              <p className="text-zinc-500 text-sm mt-1">Subtle precision errors can lead to training drift or collision in real autonomy tasks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Do's Section */}
              <div className="space-y-4">
                <h4 className="font-bold text-emerald-700 flex items-center gap-2 pb-2 border-b border-emerald-100 text-md">
                  <CheckCircle className="h-5 w-5" /> Correct Annotations
                </h4>
                <ul className="space-y-3 text-sm text-zinc-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 shrink-0 font-bold">•</span>
                    <span><strong>High vertex density on curves:</strong> Place nodes closer together where paths curve or angle to ensure realistic matching.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 shrink-0 font-bold">•</span>
                    <span><strong>Trace Continuous Pipelines:</strong> Annotations must follow continuous pathways, keeping segments straight inside horizontal corridors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 shrink-0 font-bold">•</span>
                    <span><strong>Label past visual fences:</strong> When safety barriers partially mock-obstruct the lanes, treat and annotate them continuously as a "Solid Line".</span>
                  </li>
                </ul>
              </div>

              {/* Dont's Section */}
              <div className="space-y-4">
                <h4 className="font-bold text-red-600 flex items-center gap-2 pb-2 border-b border-red-100 text-md">
                  <XOctagon className="h-5 w-5" /> Ineligble / Exclude List
                </h4>
                <ul className="space-y-3 text-sm text-zinc-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 shrink-0 font-bold">•</span>
                    <span><strong>Do not label Pedestrian Crossings:</strong> Zebra markings are handled by distinct semantic frameworks. Do not write polylines here.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 shrink-0 font-bold">•</span>
                    <span><strong>Do not label Bike Lanes & Driving Guides:</strong> Sidewalk or corridor boundaries with bicycle symbols or directional pavement texts should be omitted.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 shrink-0 font-bold">•</span>
                    <span><strong>Sparse curve nodes:</strong> Avoid placing too few points on curves, which results in sharp straight lines wrapping geometric arches.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'examples' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Interactive Polyline Trace Examples</h3>
              <p className="text-zinc-550 text-sm mt-1">Study how professional annotators segment dynamic roadway targets, pedestrian pathways, and vehicle profiles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Road Lane Example */}
              <div className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                  <img 
                    src={annotatedRoad} 
                    alt="Annotated Highway Lane Marking with precision polyline guidelines" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute left-3 top-3 bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">Roadways</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">Highway Lane Tracking</h4>
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                      Tracing long dashed and continuous road lines separating traffic lanes. Essential for autonomous lane centering.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-200/60 text-[11px] text-zinc-450 space-y-1.5">
                    <span className="font-semibold text-zinc-700 block">Trace Standard:</span>
                    <p>• Place nodes at the exact physical center of the painted lane line.</p>
                    <p>• Straight lines need fewer points; curves require dense node placement.</p>
                  </div>
                </div>
              </div>

              {/* Human Pedestrian Example */}
              <div className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                  <img 
                    src={annotatedHuman} 
                    alt="Annotated Human Pedestrian Tracing with precision polyline skeletons" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute left-3 top-3 bg-indigo-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">Humans</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">Pedestrian Motion Paths</h4>
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                      Mapping skeletal joints, posture guides, and trajectory corridors of pedestrians across urban walkways.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-200/60 text-[11px] text-zinc-450 space-y-1.5">
                    <span className="font-semibold text-zinc-700 block">Trace Standard:</span>
                    <p>• Draw polylines following multi-point skeletal joint systems.</p>
                    <p>• Map dynamic forward movement trails using prediction vectors.</p>
                  </div>
                </div>
              </div>

              {/* Car Example */}
              <div className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                  <img 
                    src={annotatedCar} 
                    alt="Annotated Car Lane Tracking with contour polyline outline vectors" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute left-3 top-3 bg-amber-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">Vehicles</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">Car Contours & Trails</h4>
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                      Locking onto bottom wheel lines, physical body outlines, or rear direction vectors of vehicle units in dense traffic.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-200/60 text-[11px] text-zinc-450 space-y-1.5">
                    <span className="font-semibold text-zinc-700 block">Trace Standard:</span>
                    <p>• Delineate under-carriage road contact point segments.</p>
                    <p>• Maintain a consistent contour layout for occlusion modeling.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
