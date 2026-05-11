// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface Project {
//     type: string;
//     title: string;
// }

// interface RoadMapData {
//     class: number;
//     focus: string;
//     sublabel: string;
//     what_they_learn: string[];
//     projects: Project[];
//     section: string;
// }
// interface ApiResponse {
//     data: RoadMapData[];
// }
// const typeStyle: Record<string, { bg: string; text: string; label: string }> = {
//     python: { bg: "bg-blue-50", text: "text-blue-600", label: "Python" },
//     web: { bg: "bg-purple-50", text: "text-purple-600", label: "Web" },
//     ai: { bg: "bg-orange-50", text: "text-orange-500", label: "AI" },
// };

// function PageLoader() {
//     return (
//         <div className="flex items-center justify-center h-64">
//             <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
//         </div>
//     );
// }

// const sectionColor: Record<string, string> = {
//     "What is programming?": "border-green-400",
//     "Python fundamentals": "border-blue-400",
//     "Python projects": "border-indigo-400",
//     "Web dev": "border-purple-400",
//     "AI projects": "border-orange-400",
// };

// type ClassType = RoadMapData
// type Mode = "learn" | "lab";




// // --- Learn Panel ---
// function LearnPanel({ cls, onClose }: { cls: ClassType; onClose: () => void }) {
//     const navigate = useNavigate()
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//                     <div>
//                         <p className="text-xs text-gray-400 font-medium">Class {cls.class} · Learn</p>
//                         <h2 className="text-lg font-bold text-gray-900">{cls.focus}</h2>
//                     </div>
//                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//                         <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>

//                 {/* Content */}
//                 <div className="px-6 py-5">
//                     <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">What you'll learn</p>
//                     <ul className="space-y-3">
//                         {cls.what_they_learn.map((item, i) => (
//                             <li key={i} className="flex items-start gap-3">
//                                 <span className="mt-1 w-5 h-5 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-xs font-bold shrink-0">
//                                     {i + 1}
//                                 </span>
//                                 <span className="text-sm text-gray-700">{item}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//                     <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors" onClick={() => navigate("/coding-labs/learn", {state: {cls,}})}>
//                         Start Learning →
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // --- Lab Panel ---
// function LabPanel({ cls, onClose }: { cls: ClassType; onClose: () => void }) {
//     const navigate = useNavigate()
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//                     <div>
//                         <p className="text-xs text-gray-400 font-medium">Class {cls.class} · Labs</p>
//                         <h2 className="text-lg font-bold text-gray-900">{cls.focus}</h2>
//                     </div>
//                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//                         <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>

//                 {/* Projects */}
//                 <div className="px-6 py-5 space-y-3">
//                     <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Projects</p>
//                     {cls.projects.map((proj, i) => {
//                         const t = typeStyle[proj.type];
//                         return (
//                             <div key={i} className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer group" onClick={() => navigate("/coding-labs/lab")}>
//                                 <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.bg} ${t.text} shrink-0 mt-0.5`}>
//                                     {t.label}
//                                 </span>
//                                 <div className="flex-1">
//                                     <p className="text-sm text-gray-700 group-hover:text-gray-900">{proj.title}</p>
//                                 </div>
//                                 <svg className="w-4 h-4 text-gray-300 group-hover:text-orange-400 transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                 </svg>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

// // --- Main Page ---
// export default function CodingLabs() {
//     const [selected, setSelected] = useState<{ cls: ClassType; mode: Mode } | null>(null);
//     // const [roadmapData, setRoadMapData] = useState<RoadMapData | null>(null);
//     const [loading, setLoading] = useState(true)
//     const [learningData, setLearningData] = useState<RoadMapData[]>([]);

//     useEffect(() => {
//         console.log("api called!");
//         // setLoading(true)
//         fetch("http://localhost:3000/coding-labs/all-content", { method: "POST" })
//             .then((r) => r.json())
//             .then((data: ApiResponse) => {
//                 setLearningData(data.data);
//                 setLoading(false)
//             })
//             .catch((err) => {
//                 setLoading(false)
//                 console.error(err)
//             });

//         // console.log("learning data: ", learningData); 

//     }, []);



//     // console.log("learning data: ", learningData);

//     return (
//         <div className="p-8 max-w-4xl">
//             <div className="mb-8">
//                 <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Coding Labs</h1>
//                 <p className="text-gray-400 text-sm mt-1">10 classes · Python, Web & AI</p>
//             </div>
//             <div>
//                 {loading ? <PageLoader /> :

//                     Object.entries(
//                         learningData.reduce((acc, item) => {
//                             if (!acc[item.section]) acc[item.section] = [];
//                             acc[item.section].push(item);
//                             return acc;
//                         }, {} as Record<string, RoadMapData[]>)
//                     ).map(([section, classes]) => (
//                         <div key={section}>
//                             <div className={`border-l-4 ${sectionColor[section]} pl-3 mb-4`}>
//                                 <h2 className="text-sm font-semibold text-gray-700">{section}</h2>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 {classes.map((cls) => (
//                                     <div
//                                         key={cls.class}
//                                         className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 hover:shadow-sm transition-all duration-150"
//                                     >
//                                         <div className="flex items-center justify-between mb-3">
//                                             <span className="text-xs font-semibold text-gray-400">Class {cls.class}</span>
//                                             <span className="text-xs text-gray-400">{cls.projects.length} projects</span>
//                                         </div>
//                                         <h3 className="font-semibold text-gray-800">{cls.focus}</h3>
//                                         <p className="text-xs text-gray-400 mt-1 mb-4">{cls.sublabel}</p>

//                                         <div className="flex gap-1.5 flex-wrap mb-4">
//                                             {[...new Set(cls.projects.map((p) => p.type))].map((type) => {
//                                                 const t = typeStyle[type];
//                                                 return (
//                                                     <span key={type} className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.bg} ${t.text}`}>
//                                                         {t.label}
//                                                     </span>
//                                                 );
//                                             })}
//                                         </div>

//                                         <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
//                                             <button
//                                                 onClick={() => setSelected({ cls, mode: "learn" })}
//                                                 className="flex-1 text-xs font-semibold py-1.5 rounded-lg border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors"
//                                             >
//                                                 Learn
//                                             </button>
//                                             <button
//                                                 onClick={() => setSelected({ cls, mode: "lab" })}
//                                                 className="flex-1 text-xs font-semibold py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
//                                             >
//                                                 Lab
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}

//             </div>
//             {/* Panels */}
//             {selected?.mode === "learn" && (
//                 <LearnPanel cls={selected.cls} onClose={() => setSelected(null)} />
//             )}
//             {selected?.mode === "lab" && (
//                 <LabPanel cls={selected.cls} onClose={() => setSelected(null)} />
//             )}
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
    type: string;
    title: string;
}

interface RoadMapData {
    class: number;
    focus: string;
    sublabel: string;
    what_they_learn: string[];
    projects: Project[];
    section: string;
}

interface ApiResponse {
    data: RoadMapData[];
}

const typeStyle: Record<string, { bg: string; text: string; label: string }> = {
    python: { bg: "bg-blue-50", text: "text-blue-600", label: "Python" },
    web: { bg: "bg-purple-50", text: "text-purple-600", label: "Web" },
    ai: { bg: "bg-orange-50", text: "text-orange-500", label: "AI" },
};

function PageLoader() {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
    );
}

const sectionColor: Record<string, string> = {
    "What is programming?": "border-green-400",
    "Python fundamentals": "border-blue-400",
    "Python projects": "border-indigo-400",
    "Web dev": "border-purple-400",
    "AI projects": "border-orange-400",
};

type ClassType = RoadMapData;
type Mode = "learn" | "lab";

// --- Learn Panel ---
function LearnPanel({ cls, onClose }: { cls: ClassType; onClose: () => void }) {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 font-medium">Class {cls.class} · Learn</p>
                        <h2 className="text-lg font-bold text-gray-900">{cls.focus}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 py-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">What you'll learn</p>
                    <ul className="space-y-3">
                        {cls.what_they_learn.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-1 w-5 h-5 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-xs font-bold shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-sm text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                        onClick={() => navigate("/coding-labs/learn", { state: { cls } })}
                    >
                        Start Learning →
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Lab Panel ---
function LabPanel({ cls, onClose }: { cls: ClassType; onClose: () => void }) {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 font-medium">Class {cls.class} · Labs</p>
                        <h2 className="text-lg font-bold text-gray-900">{cls.focus}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 py-5 space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Projects</p>
                    {cls.projects.map((proj, i) => {
                        const t = typeStyle[proj.type];
                        return (
                            <div
                                key={i}
                                className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer group"
                                onClick={() => navigate("/coding-labs/lab", { state: { cls, proj } })}
                            >
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.bg} ${t.text} shrink-0 mt-0.5`}>
                                    {t.label}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 group-hover:text-gray-900">{proj.title}</p>
                                </div>
                                <svg className="w-4 h-4 text-gray-300 group-hover:text-orange-400 transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// --- Main Page ---
export default function CodingLabs() {
    const [selected, setSelected] = useState<{ cls: ClassType; mode: Mode } | null>(null);
    const [loading, setLoading] = useState(true);
    const [learningData, setLearningData] = useState<RoadMapData[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/coding-labs/all-content", { method: "POST" })
            .then((r) => r.json())
            .then((data: ApiResponse) => {
                setLearningData(data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    }, []);

    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Coding Labs</h1>
                <p className="text-gray-400 text-sm mt-1">10 classes · Python, Web & AI</p>
            </div>

            <div>
                {loading ? <PageLoader /> :
                    Object.entries(
                        learningData.reduce((acc, item) => {
                            if (!acc[item.section]) acc[item.section] = [];
                            acc[item.section].push(item);
                            return acc;
                        }, {} as Record<string, RoadMapData[]>)
                    ).map(([section, classes]) => (
                        <div key={section} className="mb-8">
                            <div className={`border-l-4 ${sectionColor[section]} pl-3 mb-4`}>
                                <h2 className="text-sm font-semibold text-gray-700">{section}</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {classes
                                    .sort((a, b) => a.class - b.class)
                                    .map((cls) => (
                                        <div
                                            key={cls.class}
                                            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 hover:shadow-sm transition-all duration-150"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-semibold text-gray-400">Class {cls.class}</span>
                                                <span className="text-xs text-gray-400">{cls.projects.length} projects</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-800">{cls.focus}</h3>
                                            <p className="text-xs text-gray-400 mt-1 mb-4">{cls.sublabel}</p>

                                            <div className="flex gap-1.5 flex-wrap mb-4">
                                                {[...new Set(cls.projects.map((p) => p.type))].map((type) => {
                                                    const t = typeStyle[type];
                                                    return (
                                                        <span key={type} className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.bg} ${t.text}`}>
                                                            {t.label}
                                                        </span>
                                                    );
                                                })}
                                            </div>

                                            <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
                                                <button
                                                    onClick={() => setSelected({ cls, mode: "learn" })}
                                                    className="flex-1 text-xs font-semibold py-1.5 rounded-lg border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors"
                                                >
                                                    Learn
                                                </button>
                                                <button
                                                    onClick={() => setSelected({ cls, mode: "lab" })}
                                                    className="flex-1 text-xs font-semibold py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                                                >
                                                    Lab
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))
                }
            </div>

            {selected?.mode === "learn" && (
                <LearnPanel cls={selected.cls} onClose={() => setSelected(null)} />
            )}
            {selected?.mode === "lab" && (
                <LabPanel cls={selected.cls} onClose={() => setSelected(null)} />
            )}
        </div>
    );
}