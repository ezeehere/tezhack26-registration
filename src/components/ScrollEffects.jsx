import { useEffect } from "react";
import "./ScrollEffects.css";

function ScrollEffects() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".tez-content-panel, .tez-footer"
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.classList.add(
          "tez-scroll-reveal",
          "is-visible"
        );
      });

      return;
    }

    elements.forEach((element) => {
      element.classList.add("tez-scroll-reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

export default ScrollEffects;