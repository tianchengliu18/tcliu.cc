import type { PublicationRanking } from "@/content/publications";

interface Props {
  rankings?: PublicationRanking[];
}

export default function PublicationRankings({ rankings }: Props) {
  if (!rankings?.length) return null;

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5 not-italic">
      {rankings.map((ranking) => (
        <span
          key={ranking.label}
          title={ranking.description}
          className="rounded-full border border-accent-secondary/30 bg-accent-secondary/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-accent-secondary"
        >
          {ranking.label}
        </span>
      ))}
    </span>
  );
}
