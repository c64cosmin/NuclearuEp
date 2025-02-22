const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");

esbuild
	.build({
		entryPoints: ["./frontend/src/main.ts"],
		mainFields: ["svelte", "browser", "module", "main"],
		conditions: ["svelte", "browser"],
		outfile: "dist/frontend/app.js",
		bundle: true,
		plugins: [
			esbuildSvelte({
				preprocess: sveltePreprocess(),
			}),
		],
	})
	.catch(() => process.exit(1));
