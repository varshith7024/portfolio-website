import { TypedText } from "./typedtext.js";

function checkIfEmpty(id) {
  let elem = document.getElementById(id);
  if (elem.value == "") {
    elem.classList.add("shake");
    elem.addEventListener(
      "animationend",
      () => {
        elem.classList.remove("shake");
      },
      { once: true },
    );
    return false;
  }
  return true;
}

document.getElementById("submit").addEventListener("click", () => {
  let name = checkIfEmpty("name");
  let email = checkIfEmpty("email");
  let content = checkIfEmpty("content");

  if (name && email && content) {
    let submit = document.getElementById("submit");
    submit.classList.add("finished");
    submit.innerText = "Submitted";

    setTimeout(() => {
      submit.classList.remove("finished");
      submit.innerText = "Submit";
    }, 1500);
  }
});

const typer = new TypedText(document.querySelector("#title"), {
  strings: ["CONTACT ME", "WHATS UP", "HELLO"],
  typingSpeed: 120,
  eraseSpeed: 40,
  pauseDuration: 1800,
});

typer.start();
