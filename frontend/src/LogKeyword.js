class LogKeyword {
  constructor({ $target, onClick }) {
    this.$target = $target;
    this.onClick = onClick;
    this.logMaxCnt = 5;
    this.logData = "logData";
    this.logCnt = "logCnt";

    if (!localStorage[this.logCnt]) {
      this.logIndex = 0;
      localStorage.setItem(this.logCnt, JSON.stringify(this.logIndex));
    } else {
      this.logIndex = parseInt(localStorage[this.logCnt]) + 1;
    }

    if (!localStorage[this.logData]) {
      localStorage[this.logData] = "[]";
    }
    this.logDataArray = JSON.parse(localStorage[this.logData]);

    const $container = document.createElement("div");
    $container.className = "SearchReuslt__log";
    this.$container = $container;
    const $ul = document.createElement("ul");
    this.$ul = $ul;

    this.$container.appendChild(this.$ul);
    $target.appendChild(this.$container);

    this.render();
  }

  getItem() {}

  setItem(keyword) {
    this.logDataArray[this.logIndex] = keyword;
    localStorage.setItem(this.logData, JSON.stringify(this.logDataArray));
    localStorage.setItem(this.logCnt, JSON.stringify(this.logIndex));
    this.logIndex = (this.logIndex + 1) % this.logMaxCnt;

    this.render();
  }

  render() {
    const data = JSON.parse(localStorage[this.logData]);
    console.log(data);
    this.logDataArray = data;
    this.$ul.innerHTML = this.logDataArray
      .map(
        (log) => `
        <li class='log'>
        ${log}
        </li>
      `
      )
      .join("");

    this.$ul.querySelectorAll(".log").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.logDataArray[index]);
      });
    });
  }
}
