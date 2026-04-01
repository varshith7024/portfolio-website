class TypedText {
  constructor(element, config) {
    this._elem = element;
    this._strings = config.strings;
    this._typingSpeed = config.typingSpeed;
    this._eraseSpeed = config.eraseSpeed;
    this._pauseDuration = config.pauseDuration;

    this._index = 0;
    this._charPosition = 0;
    this._timer = null;
    this._running = false;
    this._phase = "idle";

    this._elem.classList.add("typed-host");
    this._elem.setAttribute("aria-live", "polite");
    this._elem.setAttribute("aria-atomic", "true");

    this._textSpan = document.createElement("span");
    this._textSpan.className = "tt-text";

    this._cursorSpan = document.createElement("span");
    this._cursorSpan.className = "tt-cursor";
    this._cursorSpan.setAttribute("aria-hidden", "true");

    this._elem.appendChild(this._textSpan);
    this._elem.appendChild(this._cursorSpan);
  }

  start() {
    if (this._running) {
      return;
    }

    this._running = true;
    this._setPhase("typing");
    this._tick();
  }

  stop() {
    this._running = false;
    clearTimeout(this._timer);
    this._timer = null;
    this._setPhase("idle");
  }
  _tick() {
    if (!this._running) return;

    const current = this._strings[this._index];

    if (this._phase === "typing") {
      if (this._charPosition < current.length) {
        this._charPosition++;
        const text = current.slice(0, this._charPosition);
        this._textSpan.textContent = text || "\u00A0";
        this._schedule(this._typingSpeed);
      } else {
        this._setPhase("pausing");
        this._schedule(this._pauseDuration, () => {
          if (!this._running) return;
          this._setPhase("erasing");
          this._tick();
        });
      }
    } else if (this._phase === "erasing") {
      if (this._charPosition > 0) {
        this._charPosition--;
        const text = current.slice(0, this._charPosition);
        this._textSpan.textContent = text || "\u00A0";
        this._schedule(this._eraseSpeed);
      } else {
        this._index = (this._index + 1) % this._strings.length;
        this._setPhase("typing");
        this._schedule(this._typingSpeed, () => this._tick());
      }
    }
  }
  _schedule(delay, fn) {
    clearTimeout(this._timer);
    this._timer = setTimeout(fn || (() => this._tick()), delay);
  }

  _setPhase(phase) {
    this._phase = phase;
    this._elem.classList.remove("typing", "erasing", "pausing");
    if (phase !== "idle") {
      this._elem.classList.add(phase);
    }
  }
}

export { TypedText };
