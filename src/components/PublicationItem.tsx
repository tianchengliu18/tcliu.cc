import type { Publication } from "@/content/publications";

interface Props {
  pub: Publication;
}

export default function PublicationItem({ pub }: Props) {
  return (
    <div className="py-4 border-b border-border-light last:border-b-0">
      <div className="flex items-start gap-3">
        {/* First author indicator */}
        {pub.isFirstAuthor && (
          <span
            className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0"
            title="First Author"
          />
        )}
        {!pub.isFirstAuthor && <span className="w-2 shrink-0" />}

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-text-primary leading-snug mb-1">
            {pub.title}
          </h3>
          <p className="text-[13px] text-text-secondary mb-1">{pub.authors}</p>
          <p className="text-[13px] text-text-tertiary italic">
            {pub.venue}, {pub.year}
          </p>

          {/* Links */}
          <div className="flex gap-2 mt-2">
            {pub.doi && (
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] px-2 py-0.5 border border-border rounded text-text-secondary hover:text-accent hover:border-accent transition-colors"
              >
                DOI
              </a>
            )}
            {pub.url && (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] px-2 py-0.5 border border-border rounded text-text-secondary hover:text-accent hover:border-accent transition-colors"
              >
                PDF
              </a>
            )}
            {pub.tags.map((tag) => (
              <span
                key={tag}
                className="text-[13px] px-2 py-0.5 bg-bg-secondary rounded text-text-tertiary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
