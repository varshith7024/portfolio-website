function startScrollLog() {
  window.addEventListener("scroll", () => {
    const scrollDistance = window.scrollY;

    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollDistance / scrollable) * 100;

    let progress = document.getElementById("scroll-progress-bar");
    progress.style.width = `${percent}%`;
    progress.setAttribute("aria-valuenow", percent);

    sessionStorage.setItem("scrollDistance", scrollDistance);
  });
}

function checkForScroll() {
  let scroll = sessionStorage.getItem("scrollDistance");
  if (scroll === null || scroll == "0") {
    return false;
  }
  return true;
}

function gotoScroll() {
  let scroll = sessionStorage.getItem("scrollDistance");
  /* Turn off smooth scroll if prefers reduced motion */
  if (scroll !== null) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({
        top: scroll,
      });
    } else {
      window.scrollTo({
        top: scroll,
        behavior: "smooth",
      });
    }
  }
}

export { startScrollLog, checkForScroll, gotoScroll };
