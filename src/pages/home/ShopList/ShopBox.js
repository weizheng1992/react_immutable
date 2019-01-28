import styles from "./index.less";
import DefaultImage from "../../../component/defaultImage";
import LazyLoad from "react-lazyload";

export default class ShopBox extends React.PureComponent {

  render() {
    const { item } = this.props;
    return (
      <div className={styles.shopBox}>
        <div className={styles.shopInfo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoMain}>
              <LazyLoad once height="100">
                <DefaultImage
                  alt={item.name}
                  className={styles.logoLogo}
                  src={item.image}
                />
              </LazyLoad>
            </div>
          </div>
          <div className={styles.indexMain}>
            <section className={styles.indexLine}>
              <h3>
                <span>{item.name}</span>
              </h3>
              <ul>
                <span className={styles.indexOmit}>···</span>
              </ul>
            </section>
            <section className={styles.indexLine}>
              <div className={styles.indexRateWarp}>
                <div className={styles.RatingWarp}>
                  <div className={styles.ratingGray}>
                    <img src={require("../../../img/rate-gray.svg")} />
                  </div>
                  <div
                    className={styles.ratingActive}
                    style={{ width: `${(item.rating / 5) * 100}%` }}
                  >
                    <img src={require("../../../img/rate-active.svg")} />
                  </div>
                </div>
                <span className={styles.indexRate}>{item.rating}</span>
                <span>月售{item.recent_order_num}单</span>
              </div>
              <div className={styles.indexDelivery}>
                <div
                  className={styles.deliverIcon}
                  content="蜂鸟专送"
                  alt="蜂鸟专送"
                >
                  蜂鸟专送
                </div>
              </div>
            </section>
            <section className={styles.indexLine}>
              <div className={styles.IndexMoneylimit}>
                <span>¥{item.float_minimum_order_amount}起送</span>
                <span>
                  {item.float_delivery_fee > 0
                    ? `配送费¥${item.float_delivery_fee}`
                    : "免配送费"}
                </span>
              </div>
              <div className={styles.indexTimedistanceWrap}>
                <span className={styles.indexDistanceWrap}>
                  {item.distance > 1000
                    ? `${(item.distance / 1000).toFixed(2)}km`
                    : `${item.distance}m`}
                </span>
                <span>{item.order_lead_time}分钟</span>
              </div>
            </section>
          </div>
        </div>
        <div className={styles.indexActivityWrap}>
          <section className={styles.indexTagLine}>
            {item.support_tags.map((tag, k) => (
              <span
                className={`${styles.miniTagTag} ${styles.indexTag}`}
                key={k}
              >
                {tag.name}
                <span
                  className={`${styles.indexTagGhost} ${styles.miniTagGhost}`}
                  style={{
                    borderColor: "rgb(221, 221, 221)",
                    color: "rgb(102, 102, 102)"
                  }}
                >
                  {tag.name}
                </span>
              </span>
            ))}

            <span className={`${styles.indexRecommendTag}`}>
              <img src={item.recommend.image} />
              <span>{item.recommend.reason}</span>
            </span>
          </section>
          <span>
            <img
              src={require("../../../img/dashedline.svg")}
              className={styles.dashedline}
            />
          </span>
          <section className={styles.indexActivities}>
            <div className={styles.indexActivityList}>
              {item.activities.map((activity, j) => (
                <div
                  className={styles.indexActRow}
                  key={j}
                  style={j > 1 ? { display: "none" } : null}
                >
                  <span className={styles.indexIconWrap}>
                    <span
                      className={styles.indexIcon}
                      style={{
                        backgroundColor: `#${activity.icon_color}`
                      }}
                    >
                      {activity.icon_name}
                    </span>
                  </span>
                  <span className={styles.indexDesc}>
                    {activity.description}
                  </span>
                </div>
              ))}
              {item.supports.map((sup, l) => (
                <div
                  className={styles.indexActRow}
                  style={
                    item.activities.length > 1 ||
                    (item.activities.length < 2 && l > 0)
                      ? { display: "none" }
                      : null
                  }
                  key={l}
                >
                  <span className={styles.indexIconWrap}>
                    <span
                      className={styles.indexIcon}
                      style={{ backgroundColor: `#${sup.icon_color}` }}
                    >
                      {sup.icon_name}
                    </span>
                  </span>
                  <span className={styles.indexDesc}>{sup.description}</span>
                </div>
              ))}
            </div>
            <div className={styles.indexActivityBtn}>
              <span>{item.activities.length + item.supports.length}个活动</span>
              <img src={require("../../../img/activityArrow.svg")} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
