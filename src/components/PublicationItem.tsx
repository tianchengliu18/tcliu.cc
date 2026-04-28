import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Publication } from "@/content/publications";
import AuthorList from "@/components/AuthorList";

interface Props {
  pub: Publication;
}

interface LinkButton {
  label: string;
  href: string;
  external?: boolean;
}

function buildLinks(pub: Publication): LinkButton[] {
  const links: LinkButton[] = [];
  if (pub.pdfUrl) links.push({ label: "PDF", href: pub.pdfUrl, external: true });
  if (pub.codeUrl) links.push({ label: "Code", href: pub.codeUrl, external: true });
  if (pub.projectUrl) links.push({ label: "Project", href: pub.projectUrl, external: true });
  if (pub.arxivUrl) links.push({ label: "arXiv", href: pub.arxivUrl, external: true });
  if (pub.doi) links.push({ label: "DOI", href: `https://doi.org/${pub.doi}`, external: true });
  if (pub.bibtex) links.push({ label: "BibTeX", href: `/publications/${pub.slug}/#bibtex` });
  return links;
}

export default function PublicationItem({ pub }: Props) {
  const links = buildLinks(pub);

  return (
    <article className="py-6 border-b border-border-light last:border-b-0">
      <div className="flex items-start gap-4 md:gap-5">
        {/* First-author dot (kept on the far left) */}
        <span className="pt-2 shrink-0 w-2 flex justify-center">
          {pub.isFirstAuthor && (
            <span
              className="block w-2 h-2 rounded-full bg-accent"
              title="First Author"
            />
          )}
        </span>

        {/* Teaser with venue badge */}
        <Link
          href={`/publications/${pub.slug}`}
          className="hidden sm:block shrink-0 group"
          aria-label={pub.title}
        >
          <div className="relative w-32 md:w-40 aspect-[4/3] rounded-md overflow-hidden border border-border-light bg-bg-secondary">
            {pub.teaser ? (
              <Image
                src={pub.teaser}
                alt=""
                fill
                sizes="(min-width: 768px) 160px, 128px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-text-tertiary text-[11px]">
                No teaser
              </div>
            )}
            {/* Venue badge (top-left overlay) */}
            <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-accent/90 text-white text-[10px] font-semibold tracking-wide uppercase">
              {pub.venueShort}
            </span>
          </div>
        </Link>

        {/* Right column: title, authors, venue, buttons */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[1.05rem] font-semibold leading-snug mb-1.5">
            <Link
              href={`/publications/${pub.slug}`}
              className="text-accent hover:underline"
            >
              {pub.title}
            </Link>
          </h3>

          {pub.authorList.length > 0 && (
            <p className="text-[13px] text-text-secondary leading-relaxed mb-1">
              <AuthorList authors={pub.authorList} />
            </p>
          )}

          <p className="text-[13px] text-text-tertiary italic mb-3">
            {pub.venue}, {pub.year}
          </p>

          {links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] px-2.5 py-0.5 border border-border rounded-full text-text-secondary hover:text-accent hover:border-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[12px] px-2.5 py-0.5 border border-border rounded-full text-text-secondary hover:text-accent hover:border-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
