import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "out");
fs.mkdirSync(outDir, { recursive: true });

// Чтобы GitHub Pages не ломал папку _next
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
