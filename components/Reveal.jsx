"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades a section's content up into place the first time it crosses into
 * view. Plain IntersectionObserver rather than a GSAP ScrollTrigger per
 * instance — this fires once per element and never needs to reverse, so the
 * extra machinery isn't worth it. Renders visible immediately if JS never
 * runs or the visitor prefers reduced motion.
 */
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
