import type { Author } from "@/content/publications";

interface Props {
  authors: Author[];
  /** Show affiliation superscripts. Off by default for the list view. */
  showAffiliations?: boolean;
}

/**
 * Render a list of authors. Authors with `isMe: true` are bold + underlined.
 * Optionally renders affiliation superscripts.
 */
export default function AuthorList({ authors, showAffiliations = false }: Props) {
  return (
    <span>
      {authors.map((author, i) => (
        <span key={i}>
          <span
            className={
              author.isMe
                ? "font-semibold text-text-primary underline decoration-1 underline-offset-2"
                : ""
            }
          >
            {author.name}
          </span>
          {showAffiliations && author.affiliations && author.affiliations.length > 0 && (
            <sup className="ml-0.5 text-[0.7em] text-text-tertiary">
              {author.affiliations.join(",")}
            </sup>
          )}
          {i < authors.length - 1 && ", "}
        </span>
      ))}
    </span>
  );
}
