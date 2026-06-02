export const STORAGE_KEY = "ca-inter-command-center";

export const defaultProgress = {
  costing: 0,
  fm: 0,
  gst: 0,
  law: 0,
  audit: 0,
  sm: 0,
};

export function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {
      progress: defaultProgress,
      logs: [],
      targetDate: "2026-07-31",
    };
  }

  return JSON.parse(saved);
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}