"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";

type AllowedTag = 'div' | 'section' | 'article' | 'li' | 'span';
type RevealOwnProps = {
  as?: AllowedTag;
  className?: string;
  children: React.ReactNode;
  delay?: number; // ms
  once?: boolean;
};

/**
 * Lightweight scroll reveal wrapper (no framer-motion).
 * Uses IntersectionObserver to add transition classes when element enters viewport.
 */
export const Reveal: React.FC<RevealOwnProps> = ({
  as: Tag = 'div',
  className,
  children,
  delay = 0,
  once = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference: show immediately
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('reveal-visible');
      return; // no observer
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            el.classList.remove("reveal-visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    // Fallback: ensure element becomes visible even if observer never fires
  const fallback = window.setTimeout(() => {
      if (el && !el.classList.contains("reveal-visible")) {
        el.classList.add("reveal-visible");
      }
    }, 1200);
  return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [once]);

  return (
  <Tag
      ref={(node: unknown) => { ref.current = node as HTMLElement | null; }}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      className={clsx(
        "reveal opacity-0 translate-y-4 will-change-transform",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Reveal;