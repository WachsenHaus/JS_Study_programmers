console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target; //target은 htmldivelemetn를 뜻한다.
    this.toggleBtn = new ToggleBtn({
      $target,
    });

    this.lodingComponent = new LoadingComponent({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.lodingComponent.setState(false);
        const { data } = await api.fetchCats(keyword);
        this.setState(data);
        this.lodingComponent.setState(true);
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

    this.lodingComponent.setResultComponent(this.searchResult);
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
