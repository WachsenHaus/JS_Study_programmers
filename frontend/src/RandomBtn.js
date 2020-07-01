class RandomBtn {
  constructor({ $target, onRandom }) {
    this.$target = $target;
    this.onRandom = onRandom;
    const randomBtn = document.createElement("div");
    this.$randomBtn = randomBtn;
    randomBtn.className = "randomButton";
    randomBtn.style.display = "inline-block";
    randomBtn.innerHTML = "R";

    randomBtn.addEventListener("click", () => {
      this.onRandom();
    });
    $target.appendChild(this.$randomBtn);
  }

  async getRandomCat(e) {
    const { data } = await api.fetchRandom();
  }
  render() {}
}
