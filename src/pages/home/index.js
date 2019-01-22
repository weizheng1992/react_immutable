import styles from "./index.less";
import { Link } from "react-router-dom";
import { mod } from "react-swipeable-views-core";
import IconSvg from "../../component/iconSvg";
import DefaultImage from "../../component/defaultImage";
import { shouldComponentUpdate } from "react-immutable-render-mixin";
import Entries from "./Entries";
import Recommend from "./Recommend";
import { tag } from "../../../node_modules/postcss-selector-parser";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const { homeActions } = this.props;
    homeActions.requestInfo();
  }

  render() {
    console.log(this.props);
    const { entries, recommend, banners, restaurants } = this.props.home;
    return (
      <div>
        <header>
          <div className={styles.search}>
            <a>搜索饿了么商家、商品名称</a>
          </div>
        </header>
        <Entries entries={entries} />
        <Recommend banners={banners} recommend={recommend} />

        <div className={styles.shopListTitle}>推荐商家</div>
        <div className={styles.fifter}>
          <div className={`${styles.fifterTabs} ${styles.flex}`}>
            <div className={`${styles.tab} ${styles.flex1}`}>
              <span>综合排序</span>
              <IconSvg glyph={"dropDown"} className={styles.dropDown} />
            </div>
            <div className={`${styles.tab} ${styles.flex1}`}>
              <span>距离最近</span>
            </div>
            <div className={`${styles.tab} ${styles.flex1}`}>
              <span>品质联盟</span>
            </div>
            <div className={`${styles.tab} ${styles.flex1}`}>
              <span>筛选</span>
              <IconSvg glyph={"fifter"} className={styles.fifterIcon} />
            </div>
          </div>
        </div>
        <section className={styles.shopList}>
          {restaurants.map((item, i) => (
            <div className={styles.shopBox} key={i}>
              <div className={styles.shopInfo}>
                <div className={styles.logoContainer}>
                  <div className={styles.logoMain}>
                    <img
                      alt={item.name}
                      className={styles.logoLogo}
                      src={item.image}
                    />
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
                          <img src={require("../../img/rate-gray.svg")} />
                        </div>
                        <div
                          className={styles.ratingActive}
                          style={{ width: `${(item.rating / 5) * 100}%` }}
                        >
                          <img src={require("../../img/rate-active.svg")} />
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
                        className={`${styles.indexTagGhost} ${
                          styles.miniTagGhost
                        }`}
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
                    src={require("../../img/dashedline.svg")}
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
                        style={item.activities.length>1||(item.activities.length<2&&l>1) ?{ display: "none" }:null}
                        key={l}
                      >
                        <span className={styles.indexIconWrap}>
                          <span
                            className={styles.indexIcon}
                            style={{ backgroundColor:  `#${sup.icon_color}`}}
                          >
                            {sup.icon_name}
                          </span>
                        </span>
                        <span className={styles.indexDesc}>
                          {sup.description}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.indexActivityBtn}>
                    <span>{item.activities.length+item.supports.length}个活动</span>
                    <img src={require("../../img/activityArrow.svg")} />
                  </div>
                </section>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
