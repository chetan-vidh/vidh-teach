import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MermaidChart from "../components/MermaidChart";

interface Project {
    type: string;
    title: string;
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

export default function LearnPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const cls: ClassType = state?.cls;

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
                    <p className="text-sm text-gray-400">Class {cls?.class} · {cls?.sublabel}</p>
                    <h1 className="text-2xl font-bold text-gray-900">{cls?.focus}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-8 py-12 space-y-10">

                {/* What they learn */}
                <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">What you'll learn</p>
                    <ul className="space-y-4">
                        {cls?.what_they_learn.map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <span className="mt-0.5 w-6 h-6 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-sm font-bold shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-base text-gray-700 leading-7">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Explanation */}
                {cls?.explanation && (
                    <ReactMarkdown
                        components={{
                            code({ className, children }) {
                                const isMermaid = className === "language-mermaid";
                                const isBlock = className?.startsWith("language-");

                                if (isMermaid) {
                                    return <MermaidChart chart={String(children)} />;
                                }

                                if (isBlock) {
                                    return (
                                        <div className="my-5 rounded-xl overflow-hidden">
                                            <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-800">
                                                <span className="w-3 h-3 rounded-full bg-red-400" />
                                                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                                <span className="w-3 h-3 rounded-full bg-green-400" />
                                            </div>
                                            <pre className="bg-gray-900 px-6 py-5 text-base text-green-300 font-mono overflow-x-auto leading-8">
                                                <code>{children}</code>
                                            </pre>
                                        </div>
                                    );
                                }

                                return (
                                    <code className="bg-gray-100 text-orange-500 text-sm font-mono font-semibold px-2 py-0.5 rounded-md">
                                        {children}
                                    </code>
                                );
                            },
                            p({ children }) {
                                return <p className="text-base text-gray-700 leading-8 mb-4">{children}</p>;
                            },
                            h2({ children }) {
                                return <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">{children}</h2>;
                            },
                            h3({ children }) {
                                return <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">{children}</h3>;
                            },
                            ul({ children }) {
                                return <ul className="list-disc list-inside space-y-2 text-base text-gray-700 mb-4">{children}</ul>;
                            },
                            li({ children }) {
                                return <li className="leading-8">{children}</li>;
                            },
                        }}
                    >
                        {cls.explanation}
                    </ReactMarkdown>
                )}

                {/* Activity */}
                {cls?.activity && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                        <p className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3">Fun Activity 🎉</p>
                        <ReactMarkdown
                            components={{
                                code({ className, children }) {
                                    const isBlock = className?.startsWith("language-");
                                    if (isBlock) {
                                        return (
                                            <div className="my-5 rounded-xl overflow-hidden">
                                                <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-800">
                                                    <span className="w-3 h-3 rounded-full bg-red-400" />
                                                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                                    <span className="w-3 h-3 rounded-full bg-green-400" />
                                                </div>
                                                <pre className="bg-gray-900 px-6 py-5 text-base text-green-300 font-mono overflow-x-auto leading-8">
                                                    <code>{children}</code>
                                                </pre>
                                            </div>
                                        );
                                    }
                                    return (
                                        <code className="bg-orange-100 text-orange-600 text-sm font-mono font-semibold px-2 py-0.5 rounded-md">
                                            {children}
                                        </code>
                                    );
                                },
                                p({ children }) {
                                    return <p className="text-base text-gray-700 leading-8 mb-4">{children}</p>;
                                },
                                h2({ children }) {
                                    return <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">{children}</h2>;
                                },
                                h3({ children }) {
                                    return <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">{children}</h3>;
                                },
                                ul({ children }) {
                                    return <ul className="list-disc list-inside space-y-2 text-base text-gray-700 mb-4">{children}</ul>;
                                },
                                li({ children }) {
                                    return <li className="leading-8">{children}</li>;
                                },
                            }}
                        >
                            {cls.activity}
                        </ReactMarkdown>
                    </div>
                )}

                {/* Footer CTA */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                        onClick={() => navigate("/coding-labs/lab", { state: { cls } })}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                    >
                        Go to Lab →
                    </button>
                </div>
            </div>
        </div>
    );
}