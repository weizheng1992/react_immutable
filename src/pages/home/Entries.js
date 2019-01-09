import styles from "./index.less";
import { Map } from "immutable";
import SwipeableViews from "react-swipeable-views";
import { mod } from "react-swipeable-views-core";
import { virtualize } from "react-swipeable-views-utils";
import { shouldComponentUpdate } from "react-immutable-render-mixin";
import DefaultImage from "../../component/defaultImage";

const VirtualizeSwipeableViews = virtualize(SwipeableViews);
export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      index: Map({ index: 0 })
    };
  }

  categorySlideRenderer = (params, entries) => {
    const { index, key } = params;
    switch (mod(index, 2)) {
      case 0:
        let list = [];
        for (let i = 0; i < 10; i++) {
          list.push(
            <a className={styles.categorySwiperItem} key={i}>
              <div className={styles.container}>
                <DefaultImage
                  src={entries.length > i ? entries[i].image : ""}
                />
              </div>
              <p>{entries.length > i ? entries[i].name : ""}</p>
            </a>
          );
        }
        return (
          <div className={styles.categorySwiper} key={key}>
            {list}
          </div>
        );

      case 1:
        let list2 = [];
        for (let i = 10; i < 20; i++) {
          list2.push(
            <a className={styles.categorySwiperItem} key={i}>
              <div className={styles.container}>
                <DefaultImage
                  src={entries.length > i ? entries[i].image : ""}
                />
              </div>
              <p>{entries.length > i ? entries[i].name : ""}</p>
            </a>
          );
        }
        return (
          <div className={styles.categorySwiper} key={key}>
            {list2}
          </div>
        );
      default:
        return null;
    }
  };

  onChangeEntries = index => {
    this.setState({
      index: this.state.index.update("index", () => parseInt(mod(index, 2)))
    });
  };
  render() {
    const { entries } = this.props;
    const { index } = this.state;
    return (
      <div className={styles.entries}>
        <VirtualizeSwipeableViews
          onChangeIndex={this.onChangeEntries}
          slideRenderer={params => this.categorySlideRenderer(params, entries)}
        />
        <div className={styles.pagination}>
          <span
            className={`${styles.page} ${
              index.get("index") == 0 ? styles.select : null
            }`}
          />
          <span
            className={`${styles.page} ${
              index.get("index") == 1 ? styles.select : null
            }`}
          />
        </div>
      </div>
    );
  }
}
