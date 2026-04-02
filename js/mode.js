function setMode(light) {
  let colors = {
    light: {
      bgColor: "#ff3d00",
      textColor: "#c5f0c9",
      smallTextColor: "#131112",
      circleColor: "#131112",
      successColor: "#5fe75f",
      overlayColor: "#00000080",
      filter: 1,
    },
    dark: {
      bgColor: "#131112",
      textColor: "#ff3d00",
      smallTextColor: "#f0e7d8",
      circleColor: "#f0e7d8",
      successColor: "#5fe75f",
      overlayColor: "#00000080",
      filter: 0,
    },
  };

  let current;
  if (light == "true") {
    current = colors.light;
  } else {
    current = colors.dark;
  }

  let root = document.documentElement;

  root.style.setProperty("--bg-color", current.bgColor);
  root.style.setProperty("--text-color", current.textColor);
  root.style.setProperty("--small-text-color", current.smallTextColor);
  root.style.setProperty("--circle-color", current.circleColor);
  root.style.setProperty("--success-color", current.successColor);
  root.style.setProperty("--overlay-color", current.overlayColor);
  root.style.setProperty("--filter", current.filter);
}

let light = localStorage.getItem("mode");
if (light === null) {
  localStorage.setItem("mode", true);
}

setMode(light);

document.addEventListener("DOMContentLoaded", () => {
  let modeImage = document.getElementById("mode-image");

  if (light == "false") {
    modeImage.src = "assets/light.svg";
  } else if (light == "true") {
    modeImage.src = "assets/dark.svg";
  }

  let modeSwitch = document.getElementById("mode-switch");

  modeSwitch.addEventListener("click", () => {
    let modeImage = document.getElementById("mode-image");
    if (light == "true") {
      light = "false";
      localStorage.setItem("mode", light);
      setMode(light);
      modeImage.src = "assets/light.svg";
    } else {
      light = "true";
      localStorage.setItem("mode", light);
      setMode(light);
      modeImage.src = "assets/dark.svg";
    }
  });

  let back = document.getElementById("back");

  if (back !== null) {
    back.addEventListener("click", () => {
      window.location.assign("index.html");
    });
  }
});
