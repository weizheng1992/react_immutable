import styles from "./index.less";
class Loading extends React.Component {
  render() {
    return (
      <div className={styles.modal}>
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

const LoadingComponent = props => {
  console.log(props);
  if (props.error) {
    return (
      <div className={styles.loadingCompoent}>
        <div className={styles.error}>加载错误</div>
        <button onClick={() => window.location.reload()}>重新加载</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div className={styles.loadingCompoent}>
        <div className={styles.error}>加载超时</div>
        <button onClick={() => window.location.reload()}>重新加载</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <Loading />;
  } else {
    return null;
  }
};

export default LoadingComponent;
