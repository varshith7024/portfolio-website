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
    window.scrollTo({
      top: scroll,
      behavior: "smooth",
    });
  }
}

export { startScrollLog, checkForScroll, gotoScroll };
