import styles from "./index.less";
import IconSvg from "../../../component/iconSvg";
export default class Fifter extends React.Component {
  render() {
    return (
      <div style={{ position: "sticky", top: "1.35rem", zIndex: 100 }}>
        <div className={styles.fifter}>
        <div className={styles.fifterHeader}>

        </div>
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
      </div>
    );
  }
}
