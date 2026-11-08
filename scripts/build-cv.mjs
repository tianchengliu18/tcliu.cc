import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const cv = resolve(root, "cv");
const documents = ["main-en", "main-zh"];
const artifact = /^main-(?:en|zh)\.(?:aux|bbl|bcf|blg|fdb_latexmk|fls|log|out|run\.xml|synctex\.gz|xdv)$/;

function texPath(buildDir) {
  const path = process.env.PATH ?? "";
  const texbin = "/Library/TeX/texbin";
  const bundledBiber = join(texbin, "biber");
  if (process.platform !== "darwin" || !existsSync(bundledBiber)) return path;

  // Keep biber and biblatex from the same MacTeX installation. Some universal
  // biber binaries fail while extracting their architecture-specific cache.
  const probe = spawnSync(bundledBiber, ["--version"], { encoding: "utf8", timeout: 30000 });
  if (probe.status === 0) return `${texbin}:${path}`;

  const thinBiber = join(buildDir, "biber");
  const extraction = spawnSync("lipo", ["-thin", process.arch, "-output", thinBiber, bundledBiber], {
    encoding: "utf8",
  });
  if (extraction.error || extraction.status !== 0) {
    throw new Error(`Could not extract MacTeX biber: ${extraction.error?.message ?? extraction.stderr}`);
  }
  const thinProbe = spawnSync(thinBiber, ["--version"], { encoding: "utf8", timeout: 30000 });
  if (thinProbe.error || thinProbe.status !== 0) {
    throw new Error(`MacTeX biber cannot run: ${thinProbe.error?.message ?? thinProbe.stderr}`);
  }
  console.log(`Using native MacTeX ${thinProbe.stdout.trim()} from a temporary copy.`);
  return `${buildDir}:${texbin}:${path}`;
}

function cleanLegacyArtifacts() {
  for (const name of readdirSync(cv)) {
    if (artifact.test(name)) {
      rmSync(join(cv, name));
      console.log(`Removed cv/${name}`);
    }
  }
}

const mode = process.argv[2];
if (mode === "--clean") {
  cleanLegacyArtifacts();
  process.exit(0);
}
if (mode && mode !== "--check") {
  throw new Error(`Unknown option: ${mode}`);
}

const buildDir = mkdtempSync(join(tmpdir(), "tcliu-cv-"));
try {
  for (const name of ["common", "en", "zh", "references.bib", ...documents.map((doc) => `${doc}.tex`)]) {
    cpSync(join(cv, name), join(buildDir, name), { recursive: true });
  }

  const result = spawnSync(
    "latexmk",
    ["-xelatex", "-interaction=nonstopmode", "-halt-on-error", ...documents.map((doc) => `${doc}.tex`)],
    {
      cwd: buildDir,
      stdio: "inherit",
      env: { ...process.env, PATH: texPath(buildDir) },
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`LaTeX build failed (exit ${result.status ?? "unknown"})`);

  for (const doc of documents) {
    const pdf = join(buildDir, `${doc}.pdf`);
    if (!existsSync(pdf) || statSync(pdf).size === 0) {
      throw new Error(`Missing or empty output: ${pdf}`);
    }
  }

  if (mode === "--check") {
    console.log("Both CVs compiled successfully; published PDFs were left unchanged.");
  } else {
    for (const doc of documents) {
      cpSync(join(buildDir, `${doc}.pdf`), join(cv, `${doc}.pdf`));
    }
    const sync = spawnSync(process.execPath, [join(root, "scripts", "sync-cv.mjs")], {
      cwd: root,
      stdio: "inherit",
    });
    if (sync.error) throw sync.error;
    if (sync.status !== 0) throw new Error("Could not sync CV PDFs to public/");
  }
} finally {
  rmSync(buildDir, { recursive: true, force: true });
}
