class LoadingComponent {
  isLoaded = null;
  $resultComponent = null;
  resultComponentDisplayState = null;
  constructor({ $target }) {
    this.$target = $target;
    const $loading = document.createElement("div");
    const $spinner = document.createElement("div");
    this.$loading = $loading;
    this.$spinner = $spinner;

    $loading.className = "Loading";
    $spinner.className = "spinner";

    $loading.appendChild($spinner);
    $loading.style.display = "none";
    $target.appendChild(this.$loading);
  }
  setState(nextData) {
    this.isLoaded = nextData;
    if (this.isLoaded === false) {
      this.$resultComponent.$searchResult.style.display = "none";
      this.$loading.style.display = "block";
      return;
    }
    this.$loading.style.display = "none";
    this.$resultComponent.$searchResult.style.display = this.resultComponentDisplayState;
  }
  setResultComponent(resultComponent) {
    this.$resultComponent = resultComponent;
    this.resultComponentDisplayState = resultComponent.$searchResult.style.display;
  }
}
