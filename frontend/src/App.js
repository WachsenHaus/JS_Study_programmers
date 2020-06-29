console.log("app is running!");

class App {
  $target = null;
  data = [];
  keyword = null;
  page = 1;
  isFlag = false;
  constructor($target) {
    this.$target = $target; //target은 htmldivelemetn를 뜻한다.
    this.toggleBtn = new ToggleBtn({
      $target,
    });

    this.loadingComponent = new LoadingComponent({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.keyword = keyword;
        this.loadingComponent.setState(false);
        const { data } = await api.fetchCats(keyword);
        console.log(data);
        if (data.length == 0 || data == undefined) {
          alert("검색한 결과가 없습니다.");
        }
        this.setState(data);
        this.loadingComponent.setState(true);
      },
    });
    this.randomBtn = new RandomBtn({
      $target,
      onRandom: async () => {
        this.loadingComponent.setState(false);
        const { data } = await api.fetchRandom();
        this.setState(data);
        this.loadingComponent.setState(true);
      },
    });
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  init() {
    this.loadingComponent.setResultComponent(this.searchResult);

    window.addEventListener("scroll", async (e) => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      //현재 스크롤탑의 값
      let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

      //현재 화면 높이 값
      let clientHeight = document.documentElement.clientHeight;

      console.log(`${scrollTop + clientHeight}`);
      if (this.isFlag === false && scrollTop + clientHeight == scrollHeight) {
        try {
          this.isFlag = true;
          this.page = this.page + 1;
          console.log(`page입니다 ${this.page}`);
          const { data } = await api.fetchCats(this.keywords, this.page);

          this.data = [...this.data, ...data];
          console.log(this.data);
          this.setState(this.data);
          this.isFlag = false;
        } catch (e) {
          const { message } = e;
          console.log(message);
        }
      }
    });
  }
}
