class ToggleBtn {
  constructor({ $target }) {
    const $lightBtn = document.createElement("button");
    const $darkBtn = document.createElement("button");

    this.lightBtn = $lightBtn;
    this.lightBtn.className = "color-mode__btn light--hidden";
    this.lightBtn.setAttribute("aria-label", "Toggle light mode");
    this.lightBtn.innerHTML = "light모드";
    this.darkBtn = $darkBtn;
    this.darkBtn.className = "color-mode__btn dark--hidden";
    this.darkBtn.setAttribute("aria-label", "Toggle dark mode");
    this.darkBtn.innerHTML = "dark모드";

    $target.appendChild(this.lightBtn);
    $target.appendChild(this.darkBtn);

    this.lightBtn.addEventListener("click", this.toggleTheme);
    this.darkBtn.addEventListener("click", this.toggleTheme);

    const myBody = document.querySelector("body");
    const isDark = window.matchMedia("(prefers-color-scheme: Dark)").matches;

    //아래 기능은 OS에서 다크모드를 설정하였으나 사용자 환경 설정을 하지않았으면. 자동으로 사용자 환경을 dark모드로 변경해주는 기능입니다.
    if (localStorage.getItem("color-mode") === "dark" || (isDark && !localStorage.getItem("color-mode"))) {
      myBody.setAttribute("color-mode", "dark");
    }
  }
  toggleTheme(e) {
    if (e.currentTarget.classList.contains("light--hidden")) {
      document.documentElement.setAttribute("color-mode", "light");
      localStorage.setItem("color-mode", "light");
      return;
    }
    document.documentElement.setAttribute("color-mode", "dark");
    localStorage.setItem("color-mode", "dark");
  }
  render() {}
}
