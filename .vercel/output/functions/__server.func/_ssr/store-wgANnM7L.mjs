import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-wgANnM7L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var useShelf = create()(persist((set) => ({
	entries: [],
	add: (entry) => set((state) => ({ entries: [entry, ...state.entries.filter((item) => item.id !== entry.id)].slice(0, 4) })),
	remove: (id) => set((state) => ({ entries: state.entries.filter((item) => item.id !== id) }))
}), {
	name: "kiln-shelf",
	skipHydration: true
}));
function useShelfHydrated() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const finish = () => setReady(true);
		const unsub = useShelf.persist.onFinishHydration(finish);
		if (useShelf.persist.hasHydrated()) finish();
		else useShelf.persist.rehydrate();
		return unsub;
	}, []);
	return ready;
}
//#endregion
export { useShelfHydrated as n, useShelf as t };
