class ToggleBtn {
  constructor({ $target }) {
    //아래 기능은 OS에서 다크모드를 설정하였으나 사용자 환경 설정을 하지 않았으면,
    //자동으로 사용자 환경을 dark모드로 변경해주는 기능입니다.
    const isDark = window.matchMedia("(prefers-color-scheme: Dark)").matches;
    const myBody = document.querySelector("body");
    if (localStorage.getItem("color-mode") === "dark" || (isDark && !localStorage.getItem("color-mode"))) {
      myBody.setAttribute("color-mode", "dark");
    }

    const $themeToggleBtn = document.createElement("button");
    this.themeToggleBtn = $themeToggleBtn;
    this.themeToggleBtn.className = "color-mode__ToggleBtn";
    this.themeToggleBtn.setAttribute("aria-label", "Toggle Btn");
    let btnInnerHTML = myBody.getAttribute("color-mode") === "Dark" ? "Light" : "Dark";
    this.themeToggleBtn.innerHTML = btnInnerHTML;
    this.themeToggleBtn.addEventListener("click", this.toggleTheme);
    $target.appendChild(this.themeToggleBtn);
  }

  toggleTheme() {
    const myBody = document.documentElement;
    const changeDarkOrLight = myBody.getAttribute("color-mode") === "Dark" ? "Light" : "Dark";
    if (changeDarkOrLight === "Dark") {
      myBody.querySelector("button").innerHTML = "Light";
    } else {
      myBody.querySelector("button").innerHTML = "Dark";
    }
    localStorage.setItem("color-mode", changeDarkOrLight);
    myBody.setAttribute("color-mode", changeDarkOrLight);
  }
  render() {}
}
