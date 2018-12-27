import styles from "./index.less";
export default class Loading extends React.Component {
  render() {
    const { visible } = this.props;
    return (
      <div
        className={styles.modal}
        style={{ display: visible ? "block" : "none" }}
      >
        <div className={styles.spinner}>
          <div className={`${styles.spinneContainer} ${styles.container1}`}>
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.circle3} />
            <div className={styles.circle4} />
          </div>
          <div className={`${styles.spinneContainer} ${styles.container2}`}>
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.circle3} />
            <div className={styles.circle4} />
          </div>
          <div className={`${styles.spinneContainer} ${styles.container3}`}>
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.circle3} />
            <div className={styles.circle4} />
          </div>
        </div>
      </div>
    );
  }
}
