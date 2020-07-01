class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();

    document.querySelector("body").addEventListener("keyup", (e) => {
      if (e.keyCode == 27) {
        this.$imageInfo.style.display = "none";
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  async render() {
    if (this.data.visible) {
      const { data } = await api.fetchCatInfo(this.data.image.id);
      const { name, url, temperament, origin } = data;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      document.querySelector(".close").addEventListener("click", (e) => {
        this.$imageInfo.style.display = "none";
      });

      this.$imageInfo.addEventListener("click", (e) => {
        if (e.target.className == "") {
          return false;
        }
        this.$imageInfo.style.display = "none";
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
