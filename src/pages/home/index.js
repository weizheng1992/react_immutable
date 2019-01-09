import styles from "./index.less";
import { Link } from "react-router-dom";
import { mod } from "react-swipeable-views-core";
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

        <Link to={"/details"}>toDetails</Link>
      </div>
    );
  }
}
