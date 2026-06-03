import { useEffect, useState } from "react";

export default function useProjectInView(
  ref,
  threshold = 0.15
) {
  const [inView, setInView] =
    useState(false);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        },
        { threshold }
      );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}