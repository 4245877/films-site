const isCI = process.env.GITHUB_ACTIONS === "true";
const repoName = (process.env.GITHUB_REPOSITORY || "").split("/")[1] || "";
const basePathFromEnv = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = basePathFromEnv || (isCI && repoName ? `/${repoName}` : "");

export default {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true }
};
