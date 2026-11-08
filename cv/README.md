# CV source files

Edit `main-en.tex` or `main-zh.tex`, their numbered sections in `en/` and
`zh/`, the shared formatting in `common/`, or `references.bib`.

From the project root, run `npm run cv:build`. This compiles both CVs in a
temporary directory, deletes the LaTeX auxiliary files, updates the two PDFs
here, and copies them to `public/cv-en.pdf` and `public/cv-zh.pdf` for the site.
If compilation fails, the published PDFs are left alone. `npm run dev` and
`npm run build` also sync the PDFs already present here, but do not compile
the LaTeX sources.

On macOS, the script uses MacTeX's matching Biber. If MacTeX's universal Biber
fails during startup, it runs a temporary native copy for that build.

Use `npm run cv:clean` once to remove artifacts left by older builds or manual
compilation in this folder. It keeps the PDFs and source files. If you replace
a PDF manually, run `npm run cv:sync` to update the website copy.
