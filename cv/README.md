# CV source files

Maintain the English and Chinese CVs in this folder. The website displays
`main-en.pdf` and `main-zh.pdf` on the CV page. Run `npm run cv:sync` from the
project root after replacing either PDF; `npm run dev` and `npm run build` also
sync both PDFs automatically.

The LaTeX sources are `main-en.tex`, `main-zh.tex`, `references.bib`, and the
files in `en/`, `zh/`, and `common/`. Compile from this folder when changing
the LaTeX sources, then run the sync command to update the website PDFs.
