import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { publications, getPublicationBySlug } from "@/content/publications";
import AuthorList from "@/components/AuthorList";

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const pub = getPublicationBySlug(slug);
  if (!pub) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-text-tertiary mb-8">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/publications" className="hover:text-accent transition-colors">
          Publications
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{pub.venueShort}</span>
      </nav>

      {/* Venue badge + year */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-0.5 rounded bg-accent/10 text-accent text-[12px] font-semibold tracking-wide uppercase">
          {pub.venueShort}
        </span>
        {pub.isFirstAuthor && (
          <span className="text-[12px] text-text-tertiary inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            First Author
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-[1.75rem] md:text-[2.1rem] font-semibold text-text-primary leading-tight mb-4">
        {pub.title}
      </h1>

      {/* Authors */}
      {pub.authorList.length > 0 && (
        <p className="text-base text-text-secondary leading-relaxed mb-2">
          <AuthorList authors={pub.authorList} showAffiliations />
        </p>
      )}

      {/* Affiliations list */}
      {pub.affiliations && pub.affiliations.length > 0 && (
        <ol className="text-[13px] text-text-tertiary mb-3 space-y-0.5">
          {pub.affiliations.map((aff, i) => (
            <li key={i}>
              <sup className="mr-1">{i + 1}</sup>
              {aff}
            </li>
          ))}
        </ol>
      )}

      {/* Venue */}
      <p className="text-[14px] text-text-tertiary italic mb-6">
        {pub.venue}, {pub.year}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        {pub.pdfUrl && (
          <a
            href={pub.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3.5 py-1.5 border border-accent text-accent rounded-md hover:bg-accent hover:text-white transition-colors"
          >
            PDF
          </a>
        )}
        {pub.codeUrl && (
          <a
            href={pub.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3.5 py-1.5 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
          >
            Code
          </a>
        )}
        {pub.projectUrl && (
          <a
            href={pub.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3.5 py-1.5 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
          >
            Project
          </a>
        )}
        {pub.arxivUrl && (
          <a
            href={pub.arxivUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3.5 py-1.5 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
          >
            arXiv
          </a>
        )}
        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3.5 py-1.5 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
          >
            DOI
          </a>
        )}
        {pub.bibtex && (
          <a
            href="#bibtex"
            className="text-sm px-3.5 py-1.5 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
          >
            BibTeX
          </a>
        )}
      </div>

      {/* Teaser — show the full image without cropping */}
      {pub.teaser && (
        <div className="relative w-full rounded-lg overflow-hidden border border-border-light bg-bg-secondary mb-10 flex items-center justify-center">
          <Image
            src={pub.teaser}
            alt={pub.title}
            width={1600}
            height={1200}
            sizes="(min-width: 768px) 768px, 100vw"
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
      )}

      {/* Abstract */}
      <section className="mb-10">
        <h2 className="text-[1.25rem] font-semibold text-text-primary mb-3">
          Abstract
        </h2>
        {pub.abstract ? (
          <p className="text-base text-text-secondary leading-relaxed whitespace-pre-line">
            {pub.abstract}
          </p>
        ) : (
          <p className="text-base text-text-tertiary italic">
            Abstract coming soon.
          </p>
        )}
      </section>

      {/* Tags */}
      {pub.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {pub.tags.map((tag) => (
            <span
              key={tag}
              className="text-[12px] px-2.5 py-0.5 bg-bg-secondary rounded text-text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* BibTeX */}
      {pub.bibtex && (
        <section id="bibtex" className="mb-10 scroll-mt-24">
          <h2 className="text-[1.25rem] font-semibold text-text-primary mb-3">
            BibTeX
          </h2>
          <pre className="text-[12px] bg-bg-secondary border border-border-light rounded-md p-4 overflow-x-auto whitespace-pre">
            <code>{pub.bibtex}</code>
          </pre>
        </section>
      )}

      {/* Back link */}
      <div className="pt-6 border-t border-border-light">
        <Link
          href="/publications"
          className="text-sm text-text-tertiary hover:text-accent transition-colors"
        >
          ← Back to all publications
        </Link>
      </div>
    </div>
  );
}
