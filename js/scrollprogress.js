function startScrollLog() {
  window.addEventListener("scroll", () => {
    const scrollDistance = window.scrollY;
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
