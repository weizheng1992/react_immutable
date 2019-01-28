import styles from "./index.less";
import { Link } from "react-router-dom";
import { mod } from "react-swipeable-views-core";
import IconSvg from "../../component/iconSvg";
import DefaultImage from "../../component/defaultImage";
import { shouldComponentUpdate } from "react-immutable-render-mixin";
import HomeEntryLoader from "../../component/HomeEntryLoader";
import Entries from "./Entries";
import Recommend from "./Recommend";
import Fifter from "./Fifter";
import ShopList from "./ShopList";
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
        <header style={{ position: "sticky", top: 0, zIndex: 999 }}>
          <div className={styles.search}>
            <a>搜索饿了么商家、商品名称</a>
          </div>
        </header>
        {entries.length > 0 ? (
          <Entries entries={entries} />
        ) : (
          <HomeEntryLoader />
        )}
        <Recommend banners={banners} recommend={recommend} />

        <div className={styles.shopListTitle}>推荐商家</div>
        <Fifter />
        <ShopList restaurants={restaurants} />
      </div>
    );
  }
}
