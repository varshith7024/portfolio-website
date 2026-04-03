import {
  startScrollLog,
  checkForScroll,
  gotoScroll,
} from "./scrollprogress.js";

document.addEventListener("DOMContentLoaded", () => {
  let elements = document.querySelectorAll(".reveal");

  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  elements.forEach((elem) => {
    observer.observe(elem);
  });

  let popup = document.getElementById("popup");
  let overlay = document.getElementById("overlay");

  document.getElementById("close-yes").addEventListener("click", () => {
    popup.classList.remove("show");
    overlay.classList.remove("show");
    gotoScroll();
  });

  document.getElementById("close-no").addEventListener("click", () => {
    popup.classList.remove("show");
    overlay.classList.remove("show");
  });

  if (checkForScroll()) {
    popup.classList.add("show");
    overlay.classList.add("show");
  }

  startScrollLog();
});
