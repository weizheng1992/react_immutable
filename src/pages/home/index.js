import styles from "./index.less";
import { Link } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { autoPlay, virtualize } from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
import DefaultImage from "../../component/defaultImage";
const VirtualizeSwipeableViews = virtualize(SwipeableViews);
const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews));
export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    const { homeActions } = this.props;
    homeActions.requestInfo();
  }

  slideRenderer = params => {
    const { index, key } = params;
    // console.log(mod(index, 3));
    switch (mod(index, 3)) {
      case 0:
        return (
          <div key={key}>
            <img src="https://fuss10.elemecdn.com/9/7a/8db07c2fcd4c1b0bfeb418eec71ddjpeg.jpeg?imageMogr/format/webp/thumbnail/568x/" />
          </div>
        );

      case 1:
        return (
          <div key={key}>
            <img src="https://fuss10.elemecdn.com/f/cd/2fc2f610e0d42065b8418327572a1jpeg.jpeg?imageMogr/format/webp/thumbnail/568x/" />
          </div>
        );

      case 2:
        return <div key={key}>{"slide n°3"}</div>;

      default:
        return null;
    }
  };

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

  render() {
    const { entries } = this.props.home;
    return (
      <div>
        <header>
          <div className={styles.search}>
            <a>搜索饿了么商家、商品名称</a>
          </div>
        </header>
        <VirtualizeSwipeableViews
          slideRenderer={params => this.categorySlideRenderer(params, entries)}
        />
        <div className={styles.banner}>
          <AutoPlaySwipeableViews
            interval={5000}
            slideRenderer={this.slideRenderer}
          />
        </div>
        <Link to={"/details"}>toDetails</Link>
      </div>
    );
  }
}
