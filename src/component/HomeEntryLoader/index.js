import ContentLoader from "react-content-loader";
import styles from "./index.less";
export default class HomeEntryLoader extends React.PureComponent {
  state = {
    width: 0
  };

  componentDidMount() {
    this.setState({
      width: this.wrapper.clientWidth
    });

    window.addEventListener("resize", this.setWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setWidth);
  }

  setWidth = () => {
    this.setState({
      width: this.wrapper.clientWidth
    });
  };

  render() {
    const { width } = this.state;

    return (
      <div className={styles.foodentry}>
        <div
          ref={wrapper => {
            this.wrapper = wrapper;
          }}
        >
          <ContentLoader
            height={163*2}
            width={width}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <circle cx="80" cy="70" r="40" />
            <circle cx="230" cy="70" r="40" />
            <circle cx="375" cy="70" r="40" />
            <circle cx="515" cy="70" r="40" />
            <circle cx="655" cy="70" r="40" />

            <rect x="30" y="130" rx="0" ry="0" width="90" height="24" />
            <rect x="185" y="130" rx="0" ry="0" width="90" height="24" />
            <rect x="330" y="130" rx="0" ry="0" width="90" height="24" />
            <rect x="470" y="130" rx="0" ry="0" width="90" height="24" />
            <rect x="610" y="130" rx="0" ry="0" width="90" height="24" />

            <circle cx="80" cy="220" r="40" />
            <circle cx="230" cy="220" r="40" />
            <circle cx="375" cy="220" r="40" />
            <circle cx="515" cy="220" r="40" />
            <circle cx="655" cy="220" r="40" />

            <rect x="30" y="280" rx="0" ry="0" width="90" height="24" />
            <rect x="185" y="280" rx="0" ry="0" width="90" height="24" />
            <rect x="330" y="280" rx="0" ry="0" width="90" height="24" />
            <rect x="470" y="280" rx="0" ry="0" width="90" height="24" />
            <rect x="610" y="280" rx="0" ry="0" width="90" height="24" />
          </ContentLoader>
        </div>
      </div>
    );
  }
}
