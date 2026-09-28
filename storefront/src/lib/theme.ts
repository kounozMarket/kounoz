/** Theme preference (D-20). Dark is the default; "light" is opt-in and remembered. */
export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "km-theme";

/** Inline, render-blocking script: applies a saved choice before first paint (no flash). */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
