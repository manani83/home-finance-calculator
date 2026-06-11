import { officialSourceMap } from "@/data/sources";

export function SourceList({ sourceIds }: { sourceIds: string[] }) {
  return (
    <section className="source-section" aria-labelledby="official-sources">
      <h2 id="official-sources">공식 출처</h2>
      <ul>
        {sourceIds.map((id) => {
          const source = officialSourceMap.get(id);
          if (!source) return null;
          return <li key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.organization} · {source.title}</a><span>확인일 {source.checkedAt}</span></li>;
        })}
      </ul>
    </section>
  );
}
