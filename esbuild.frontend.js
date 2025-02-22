const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");

esbuild
  .build({
    entryPoints: ["./src/frontend/main.ts"],
    outfile: "dist/frontend/app.js",
    bundle: true,
    plugins: [esbuildSvelte()],
  })
  .catch(() => process.exit(1));
