class ToggleBtn {
  isDarkMode = null;
  constructor({ $target }) {
    //아래 기능은 OS에서 다크모드를 설정하였으나 사용자 환경 설정을 하지 않았으면,
    //자동으로 사용자 환경을 dark모드로 변경해주는 기능입니다.
    this.$target = $target; //부모로 부터 전달받은 html div element이다.
    this.DARK_THEME = "Dark";
    this.LIGHT_THEME = "Light";
    ToggleBtn.prototype.TestMode = null;

    const $themeToggleBtn = document.createElement("input");
    this.$themeToggleBtn = $themeToggleBtn;
    this.$themeToggleBtn.setAttribute("type", "checkbox");
    $target.appendChild(this.$themeToggleBtn);
    this.$themeToggleBtn.addEventListener("click", (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode() {
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: Dark)").matches;
    ToggleBtn.prototype.TestMode = this.isDarkMode;
    this.$themeToggleBtn.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute("color-mode", isDarkMode ? this.DARK_THEME : this.LIGHT_THEME);
    localStorage.setItem("color-mode", isDarkMode);
  }
  render() {}
}
