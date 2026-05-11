import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "default" });

export default function MermaidChart({ chart }: { chart: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            mermaid.render("mermaid-svg", chart).then(({ svg }) => {
                if (ref.current) ref.current.innerHTML = svg;
            });
        }
    }, [chart]);

    return <div ref={ref} className="my-4" />;
}