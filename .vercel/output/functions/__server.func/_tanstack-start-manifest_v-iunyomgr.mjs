//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-iunyomgr.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/forge",
			"/items/$name",
			"/r/registry.json",
			"/r/{$name}.json",
			"/shelf/$id",
			"/shelf/"
		],
		preloads: [
			"/assets/index-D2yJw12g.js",
			"/assets/shell-DY1_BbN6.js",
			"/assets/not-found-i5RsCZif.js",
			"/assets/invariant-CgFvOqN2.js",
			"/assets/preload-helper-C2_axMM0.js",
			"/assets/catalog-Bzkz0f1u.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-D2yJw12g.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DMacPKbH.js", "/assets/previews-DoUzBtHj.js"]
	},
	"/forge": {
		filePath: "/workspace/src/routes/forge.tsx",
		children: void 0,
		preloads: [
			"/assets/forge-BaTrQB3j.js",
			"/assets/result-pEbOBah2.js",
			"/assets/store-CmJg6HsJ.js"
		]
	},
	"/items/$name": {
		filePath: "/workspace/src/routes/items/$name.tsx",
		children: void 0,
		preloads: [
			"/assets/_name-BBbPl0FY.js",
			"/assets/previews-DoUzBtHj.js",
			"/assets/_name-ChCIPBPp.js"
		]
	},
	"/shelf/$id": {
		filePath: "/workspace/src/routes/shelf/$id.tsx",
		children: void 0,
		preloads: [
			"/assets/_id-ngYf7TmX.js",
			"/assets/result-pEbOBah2.js",
			"/assets/store-CmJg6HsJ.js"
		]
	},
	"/shelf/": {
		filePath: "/workspace/src/routes/shelf/index.tsx",
		children: void 0,
		preloads: ["/assets/shelf-BIkvwZ9t.js", "/assets/store-CmJg6HsJ.js"]
	}
} });
//#endregion
export { tsrStartManifest };
