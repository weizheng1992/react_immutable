import styles from "./index.less";
import { Map } from "immutable";
import SwipeableViews from "react-swipeable-views";
import { mod } from "react-swipeable-views-core";
import { autoPlay, virtualize } from "react-swipeable-views-utils";
import { shouldComponentUpdate } from "react-immutable-render-mixin";
import DefaultImage from "../../component/defaultImage";
const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews));
export default class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      index: Map({ index: 0 })
    };
  }

  slideRenderer = (params, banners) => {
    const { index, key } = params;
    let num = mod(index, banners.length);
    if (!isNaN(num)) {
      return (
        <div key={key}>
          <DefaultImage src={banners[parseInt(num)].img} />
        </div>
      );
    }
    return null;
  };

  onChangeBanner = index => {
    this.setState({
      index: this.state.index.update("index", () => parseInt(mod(index, 2)))
    });
  };

  render() {
    const { banners, recommend } = this.props;
    const { index } = this.state;
    return (
      <div className={styles.index}>
        <div className={`${styles.activity} ${styles.flex}`}>
          {recommend.map((item, i) => (
            <div
              className={`${styles.flex1} ${styles.activityItem}`}
              key={item.id}
            >
              <h3>{item.name}</h3>
              <div className={styles.desc}>{item.description}</div>
              <div className={styles.thridTitle}>
                {item.third_title}
                {item.third_desc}
              </div>
              <DefaultImage src={item.img} />
            </div>
          ))}
        </div>
        {banners.length > 0 ? (
          <div className={styles.banner}>
            <AutoPlaySwipeableViews
              interval={5000}
              slideRenderer={params => this.slideRenderer(params, banners)}
              onChangeIndex={this.onChangeBanner}
            />
            <div className={`${styles.pagination} ${styles.bannerPage}`}>
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
        ) : null}
      </div>
    );
  }
}
