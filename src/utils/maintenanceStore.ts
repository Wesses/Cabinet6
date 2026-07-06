// External store bridging the axios interceptor (outside React) to a global
// maintenance overlay. Set from the 503 branch in api.ts, read in App via
// useSyncExternalStore.
let isMaintenance = false;
const listeners = new Set<() => void>();

export const maintenanceStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot: () => isMaintenance,
  setMaintenance(value: boolean) {
    if (isMaintenance === value) return;
    isMaintenance = value;
    listeners.forEach((l) => l());
  },
};
