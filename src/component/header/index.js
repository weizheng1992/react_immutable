import PropTypes from "prop-types";
import styles from "./index.less";

// 导航条和状态栏的高度
const STATUS_BAR_HEIGHT = 20;

export default class Header extends React.Component {
  render() {
    // 左侧图片title都没有的情况下
    var noneLeft = false;
    if (!(this.props.leftItemTitle.length > 0) && !this.props.leftImageSource) {
      noneLeft = true;
    }

    // 判断是否自定义titleView
    var hasTitleView = false;
    if (this.props.title && this.props.titleView) {
      hasTitleView = true;
    } else if (this.props.titleView) {
      hasTitleView = true;
    }

    // 判断右Item的类型
    var onlyRightIcon = false; // 是否只是图片
    if (this.props.rightItemTitle && this.props.rightImageSource) {
      onlyRightIcon = true;
    } else if (this.props.rightImageSource) {
      onlyRightIcon = true;
    }

    // 右侧图片title都没有的情况下
    var noneRight = false;
    if (
      !(this.props.rightItemTitle.length > 0) &&
      !this.props.rightImageSource
    ) {
      noneRight = true;
    }

    let headerStyle= Object.assign({}, { backgroundColor: this.props.barBGColor,opacity: this.props.barOpacity},this.props.barStyle)
    return (
      <div className={`${styles.header} ${styles.flex}`} style={headerStyle}>
        <div
          className={`${styles.left} ${styles.flex}`}
          onClick={this.props.leftItemFunc}
        >
          {// 左侧是图片还是文字
          this.props.leftIcon ? (
            <img
              src={
                this.props.leftImageSource
                  ? this.props.leftImageSource
                  : require("../../img/arrow_back.png")
              }
            />
          ) : (
            <span style={{ color: this.props.leftTextColor }}>
              {this.props.leftItemTitle}
            </span>
          )}
        </div>
        {hasTitleView ? (
          <div
            className={`${styles.title} ${styles.flex1}`}
            onClick={this.props.titleViewFunc}
          >
            {this.props.titleView}
          </div>
        ) : (
          <div
            className={`${styles.title} ${styles.flex1}`}
            style={{ color: this.props.titleTextColor }}
          >
            {this.props.title}
          </div>
        )}
        <div className={`${styles.right}`}>
          {// 右侧item
          !noneRight ? (
            <div
              onClick={this.props.rightItemFunc}
              className={`${styles.flex} ${styles.rightImg}`}
            >
              {// 右侧是图片还是文字
              onlyRightIcon ? (
                <img src={this.props.rightImageSource} />
              ) : (
                <span>{this.props.rightItemTitle}</span>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  title: "title",
  titleTextColor: "#383838",
  titleView:"",
  titleViewFunc() {},
  barBGColor: "#f8f8f8",
  barOpacity: 1,
  barStyle: {},
  barBorderBottomColor: "#D4D4D4",
  barBorderBottomWidth: 0.8,
  statusbarShow: true,
  leftItemTitle: "",
  leftTextColor: "#383838",
  leftIcon: true,
  leftItemFunc() {},
  rightItemTitle: "",
  rightTextColor: "#383838"
};

Header.propTypes = {
  title: PropTypes.string, // nav标题
  titleTextColor: PropTypes.string, // nav标题颜色
  titleView: PropTypes.node, // nav自定义标题View(节点)
  titleViewFunc: PropTypes.func, // nav的titleView点击事件
  barBGColor: PropTypes.string, // Bar的背景颜色
  barOpacity: PropTypes.number, // Bar的透明度
  barStyle: PropTypes.object, // Bar的扩展属性,nav样式(暂未使用)
  barBorderBottomColor: PropTypes.string, // Bar底部线的颜色
  barBorderBottomWidth: PropTypes.number, // Bar底部线的宽度
  statusbarShow: PropTypes.bool, // 是否显示状态栏的20高度(默认true)
  leftIcon: PropTypes.bool, // left是否显示(默认true)
  leftItemTitle: PropTypes.string, // 左按钮title
  leftImageSource: PropTypes.node, // 左Item图片(source)
  leftTextColor: PropTypes.string, // 左按钮标题颜色
  leftItemFunc: PropTypes.func, // 左Item事件
  rightItemTitle: PropTypes.string, // 右按钮title
  rightImageSource: PropTypes.node, // 右Item图片(source)
  rightTextColor: PropTypes.string, // 右按钮标题颜色
  rightItemFunc: PropTypes.func // 右Item事件
};
