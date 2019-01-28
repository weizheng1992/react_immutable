import styles from "./index.less";
import {
  InfiniteLoader,
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller
} from "react-virtualized";
import ReactHeight from "react-height";
import ShopBox from "./ShopBox";

export default class ShopList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: this.props.restaurants,
      heights: []
    };
    this.measureCache = new CellMeasurerCache({
      defaultHeight: 300,
      fixedWidth: true
    });
    this.heights = [];
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurants !== this.props.restaurants) {
      this.setState({ restaurants: nextProps.restaurants });
    }
  }
  render() {
    console.log(this.state.restaurants, "__________________");
    return (
      <section className={styles.shopList}>
        {this.state.restaurants.size == 0 ? null : (
          <InfiniteLoader
            isRowLoaded={this._isRowLoaded}
            loadMoreRows={this._loadMoreRows}
            rowCount={10}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller>
                {({ height, isScrolling, scrollTop }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <List
                        // ref={registerChild}
                        ref={ref => (this.list = ref)}
                        className={styles.List}
                        autoHeight
                        height={height}
                        onRowsRendered={onRowsRendered}
                        rowHeight={this._getRowHeight}
                        rowCount={10}
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
      </section>
    );
  }

  handleHeightReady = (height, index) => {
    this.heights = [
      ...this.heights,
      {
        index,
        height
      }
    ];
    this.setState(
      {
        heights: this.heights
      },
      this.list.recomputeRowHeights(index)
    );
  };

  _getRowHeight = ({ index }) => {
    const row = this.heights.find(item => item.index === index);
    return row ? row.height : 100;
  };

  _isRowLoaded = ({ index }) => {
    return index < this.state.restaurants.length;
  };

  _loadMoreRows = ({ startIndex, stopIndex }) => {
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
      <div key={key} style={style}>
        <ReactHeight
          onHeightReady={height => this.handleHeightReady(height, index)}
        >
          <ShopBox item={restaurants[index]} key={key} />
        </ReactHeight>
      </div>
    );
    return (
      <CellMeasurer
        cache={this.measureCache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
        style={style}
      >
        <ShopBox item={restaurants[index]} />
      </CellMeasurer>
    );
  };
}
