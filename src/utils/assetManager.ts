export interface Asset {
  id: string;
  type: "image" | "video";
  url: string;
  name: string;
  uploadedAt: number;
  fingerprint: string;
}

const STORAGE_KEY = "assets";

export function getAssets(): Asset[] {
  try {
    const json = localStorage.getItem(STORAGE_KEY) ?? "[]";
    return JSON.parse(json) as Asset[];
  } catch {
    return [];
  }
}

export function saveAssets(assets: Asset[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
}

export function addAsset(asset: Asset): Asset[] {
  const assets = getAssets();
  if (assets.some((a) => a.fingerprint === asset.fingerprint)) return assets;
  const updated = [asset, ...assets];
  saveAssets(updated);
  return updated;
}

export function removeAsset(id: string): Asset[] {
  const assets = getAssets();
  const updated = assets.filter((a) => a.id !== id);
  saveAssets(updated);
  return updated;
}

export function renameAsset(id: string, newName: string): Asset[] {
  const assets = getAssets();
  const updated = assets.map((a) =>
    a.id === id ? { ...a, name: newName } : a
  );
  saveAssets(updated);
  return updated;
}
