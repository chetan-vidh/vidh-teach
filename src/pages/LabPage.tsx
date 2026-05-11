import { useState } from "react";
import Markdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";

interface Project {
    type: string;
    title: string;
    description?: string;
    hint?: string;
    starter?: string;
    expected?: string;
    expected_output?: string;
}

interface ClassType {
    class: number;
    focus: string;
    sublabel: string;
    what_they_learn: string[];
    projects: Project[];
    section: string;
    explanation?: string;
    activity?: string;
}

const typeStyle: Record<string, { bg: string; text: string }> = {
    python: { bg: "bg-blue-50", text: "text-blue-600" },
    web: { bg: "bg-purple-50", text: "text-purple-600" },
    ai: { bg: "bg-orange-50", text: "text-orange-500" },
};

export default function LabPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const cls: ClassType = state?.cls;
    const clickedProj: Project = state?.proj;
    // start on the project that was clicked
    const initialIndex = cls?.projects.findIndex(p => p.title === clickedProj?.title) ?? 0;

    const [activeProject, setActiveProject] = useState(initialIndex < 0 ? 0 : initialIndex);
    const [showHint, setShowHint] = useState(false);
    const [code, setCode] = useState(cls?.projects[initialIndex]?.starter ?? "");

    const [output, setOutput] = useState("")

    const project = cls?.projects[activeProject];
    const t = typeStyle[project?.type ?? "python"];

    const handleProjectChange = (i: number) => {
        setActiveProject(i);
        setCode(cls?.projects[i]?.starter ?? "");
        setShowHint(false);
    };
    const compileCode = async (code: string) => {
        console.log(code);
        try {
            const response = await fetch("http://localhost:3000/coding-labs/compile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            const data = await response.json()
            const x = data.data
            setOutput(x.output ?? "No output received")
        } catch (error) {
            console.error("Compile error:", error)
            setOutput("Error: Could not compile code.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top bar */}
            <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center gap-4">
                <button
                    onClick={() => navigate("/coding-labs")}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <p className="text-sm text-gray-400">Class {cls?.class} · Lab <span className={`ml-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${t.bg} ${t.text}`}>
                        {project?.type}
                    </span></p>
                    <h1 className="text-2xl font-bold text-gray-900">{cls?.focus}</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8">
                {/* Project tabs */}
                <div className="flex gap-2 mb-6">
                    {cls?.projects.map((_p, i) => (
                        <button
                            key={i}
                            onClick={() => handleProjectChange(i)}
                            className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-colors ${activeProject === i
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-500 border-gray-200 hover:border-orange-300"
                                }`}
                        >
                            Project {i + 1}
                        </button>
                    ))}
                </div>

                {/* Project card */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
                    <div className="px-6 py-5 border-b border-gray-100">
                        <div className="flex items-start gap-3">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.bg} ${t.text} shrink-0 mt-0.5`}>
                                {project?.type}
                            </span>
                            <div>
                                <h2 className="text-base font-bold text-gray-900">{project?.title}</h2>
                                {project?.description && (
                                    <p className="text-sm text-gray-500 mt-1 leading-7">{project.description}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Starter code */}
                    <div className="px-6 py-5 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Your Code</p>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="// Write your code here..."
                            className="w-full bg-gray-900 text-green-300 font-mono text-base rounded-xl px-5 py-4 min-h-44 resize-y outline-none leading-8"
                            spellCheck={false}
                        />
                    </div>

                    {/* Expected output — only show if exists */}
                    {/* {project?.expected && (
                        <div className="px-6 py-5 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Expected Output</p>
                            <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base text-gray-700 font-mono whitespace-pre leading-8">
                                <Markdown>{project.expected_output + project.expected}</Markdown>
                            </pre>
                        </div>
                    )} */}
                    {/* Executed output */}
                    <div className="px-6 py-5 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Output</p>

                        <textarea
                            value={output}
                            disabled={true}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="// Your output here 😄"
                            className="w-full bg-gray-900 text-green-300 font-mono text-base rounded-xl px-5 py-4 min-h-44 resize-y outline-none leading-8"
                            spellCheck={false}
                        />
                    </div>

                    {/* Hint */}
                    {project?.hint && (
                        <div className="px-6 py-4 flex items-center justify-between gap-4">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-sm text-orange-500 hover:text-orange-600 font-semibold transition-colors shrink-0"
                            >
                                {showHint ? "Hide hint" : "Show hint 💡"}
                            </button>
                            {showHint && (
                                <p className="text-sm text-gray-500 leading-7"><Markdown>{project.hint}</Markdown></p>
                            )}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button onClick={() => {
                        compileCode(code)
                    }} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                        Evaluate →
                    </button>
                </div>
            </div>
        </div >

    );
}