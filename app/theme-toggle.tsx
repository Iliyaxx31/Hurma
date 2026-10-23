"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./icons";

function subscribe(onChange: () => void) {
  const storageChanged = (event: StorageEvent) => {
    if (event.key === "nakhl-theme" || event.key === null) {
      document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
      onChange();
    }
  };
  window.addEventListener("nakhl-theme-change", onChange);
  window.addEventListener("storage", storageChanged);
  return () => {
    window.removeEventListener("nakhl-theme-change", onChange);
    window.removeEventListener("storage", storageChanged);
  };
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "dark", () => false);
  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("nakhl-theme", next); } catch { /* The theme also works when storage is unavailable. */ }
    window.dispatchEvent(new Event("nakhl-theme-change"));
  }
  return (
    <button className="theme-toggle" aria-label="حالت تاریک" aria-pressed={dark} title={dark ? "نمای روشن" : "نمای تاریک"} onClick={toggle}>
      <span className="theme-thumb" aria-hidden="true" />
      <span className="theme-symbol"><Icon name="sun" /></span>
      <span className="theme-symbol"><Icon name="moon" /></span>
    </button>
  );
}
