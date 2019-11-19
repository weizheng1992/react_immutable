import styles from "./index.less";
import {
  InfiniteLoader,
  AutoSizer,
  List,
  WindowScroller,
  CellMeasurer, CellMeasurerCache
} from "react-virtualized";
import ShopBox from "./ShopBox";
const cache = new CellMeasurerCache({ minHeight: 30, fixedWidth: true });
export default class ShopList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: this.props.restaurants,
      heights: []
    };

    this.heights = [];
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurants !== this.props.restaurants) {
      this.setState({ restaurants: nextProps.restaurants });
    }
  }
  render() {
    console.log(this.state.restaurants, "__________________");
    const { restaurants } = this.state
    return (
      <section className={styles.shopList}>
        {this.state.restaurants.size == 0 ? null : (
          <InfiniteLoader
            isRowLoaded={this._isRowLoaded}
            loadMoreRows={this._loadMoreRows}
            rowCount={50}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller>
                {({ height, isScrolling, scrollTop }) => (

                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <List
                        ref={registerChild}
                        // ref={ref => (this.list = ref)}
                        className={styles.List}
                        autoHeight
                        height={height}
                        onRowsRendered={onRowsRendered}
                        rowHeight={cache.rowHeight}
                        rowCount={restaurants.length}
                        rowRenderer={this._cellRenderer}
                        width={width}
                        scrollTop={scrollTop}
                      />
                    )}
                  </AutoSizer>
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
        )}
        <div className={styles.LoadMoreWrapper}>
          <div className={styles.LoadMoreLoading} />
          <span>正在加载……</span>
        </div>
      </section>
    );
  }

  loadDummyItems = number => {

    const rooms = [];
    for (let i = 0; i < number; i++) {
      rooms.push(this.state.restaurants[i]);
    }

    return new Promise(resolve => {
      setTimeout(resolve(rooms), 600);
    });
  };

  _isRowLoaded = ({ index }) => {
    return index < this.state.restaurants.length;
  };

  _loadMoreRows = ({ startIndex, stopIndex }) => {
    console.log('load')
    const { restaurants } = this.state
    if (restaurants.length > 100) {
      return Promise.resolve();
    }

    return this.loadDummyItems(10).then(items => this.setState({ restaurants: [...restaurants, ...items] }));

    //请求 数据
    // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    // .then(response => {
    //   // Store response data in list...
    // })
  };

  _cellRenderer = ({ key, index, parent, style }) => {
    const { restaurants } = this.state;
    // return  <ShopBox item={restaurants[index]} key={key} />

    return (

      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div style={style}>
          <ShopBox item={restaurants[index]} />
        </div>
      </CellMeasurer >
    );
  };
}
