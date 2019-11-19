import styles from "./index.less";
import { Map } from "immutable";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { shouldComponentUpdate } from "react-immutable-render-mixin";
import DefaultImage from "../../component/defaultImage";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      index: 0
    };
  }



  onChangeBanner = index => {
    this.setState({
      index: index
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
              onChangeIndex={this.onChangeBanner}
              index={index}
            >
              {banners.map((item, index) => (
                <div key={item.id}>
                  <DefaultImage src={item.img} />
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <div className={`${styles.pagination} ${styles.bannerPage}`}>
              {banners.map((item, k) => (
                <span
                  key={item.id}
                  className={`${styles.page} ${
                    index === k ? styles.select : null
                    }`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
