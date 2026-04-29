import { useRef, useCallback } from "react";

export const useToast = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    const el = document.getElementById("global-toast");
    const msgEl = document.getElementById("global-toast-msg");
    if (!el || !msgEl) return;
    msgEl.textContent = message;
    el.setAttribute("data-show", "true");

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => el.removeAttribute("data-show"), 2500);
  }, []);

  return { showToast };
};
