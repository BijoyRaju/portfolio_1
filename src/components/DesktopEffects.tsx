import { useEffect, useRef } from "react";

export default function DesktopEffects() {
  const spotlight = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = matchMedia(
      "(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (!query.matches || event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (spotlight.current) {
          spotlight.current.style.transform = `translate(${event.clientX - 220}px, ${event.clientY - 220}px)`;
          spotlight.current.style.opacity = "1";
        }
        if (cursor.current) {
          cursor.current.style.transform = `translate(${event.clientX - 12}px, ${event.clientY - 12}px)`;
          cursor.current.style.opacity = "1";
          cursor.current.dataset.interactive = String(
            !!(event.target as Element)?.closest("a, button, input, textarea"),
          );
        }
      });
    };
    const leave = () => {
      if (spotlight.current) spotlight.current.style.opacity = "0";
      if (cursor.current) cursor.current.style.opacity = "0";
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <>
      <div ref={spotlight} className="cursor-spotlight" aria-hidden="true" />
      <div ref={cursor} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
