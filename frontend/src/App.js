console.log("app is running!");

class App {
  $target = null;
  data = [];

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
        this.loadingComponent.setState(false);
        const { data } = await api.fetchCats(keyword);
        this.setState(data);
        this.loadingComponent.setState(true);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        console.log(image);
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

    this.loadingComponent.setResultComponent(this.searchResult);
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
