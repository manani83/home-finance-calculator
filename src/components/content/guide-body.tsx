import type { ReactNode } from "react";

export function GuideBody({ body }: { body: string }) {
  const lines = body.split("\n");
  const nodes: ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (list.length > 0) {
      nodes.push(<ul key={`list-${nodes.length}`}>{list.map((item) => <li key={item}>{item}</li>)}</ul>);
      list = [];
    }
  };

  lines.forEach((line) => {
    const text = line.trim();
    if (!text) { flushList(); return; }
    if (text.startsWith("## ")) { flushList(); nodes.push(<h2 key={`h2-${nodes.length}`}>{text.slice(3)}</h2>); return; }
    if (text.startsWith("### ")) { flushList(); nodes.push(<h3 key={`h3-${nodes.length}`}>{text.slice(4)}</h3>); return; }
    if (/^[-*] /.test(text)) { list.push(text.slice(2)); return; }
    if (/^\d+\. /.test(text)) { list.push(text.replace(/^\d+\. /, "")); return; }
    flushList(); nodes.push(<p key={`p-${nodes.length}`}>{text}</p>);
  });
  flushList();
  return <div className="guide-body">{nodes}</div>;
}
