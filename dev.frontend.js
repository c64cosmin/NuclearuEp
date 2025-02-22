const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

async function build() {
  const ctx = await esbuild.context({
      entryPoints: ["./src/frontend/main.ts"],
      outfile: "dist/frontend/app.js",
    bundle: true,
    sourcemap: true,
    plugins: [sveltePlugin()],
  });

  console.log("⚡ Watching for changes...");
  await ctx.watch();
}

build().catch(() => process.exit(1));
