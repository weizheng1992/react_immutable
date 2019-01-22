import styles from "./index.less";
import { Link } from "react-router-dom";
import { mod } from "react-swipeable-views-core";
import IconSvg from "../../component/iconSvg";
import DefaultImage from "../../component/defaultImage";
import { shouldComponentUpdate } from "react-immutable-render-mixin";
import Entries from "./Entries";
import Recommend from "./Recommend";
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
    const { entries, recommend, banners } = this.props.home;
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
              <IconSvg glyph={"dropDown"} className={styles.dropDown}  />
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
      </div>
    );
  }
}
