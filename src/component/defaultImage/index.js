import Loading from "../loading";
export default class DefaultImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.src ? this.props.src : require("../../img/Bitmap.png"),
      loading: true
    };
  }

  handleImageLoaded() {
    //加载完毕
    this.setState({ loading: false });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ src: nextProps.src });
  }

  handleImageErrored() {
    //加载失败
    this.setState({
      src: require("../../img/Bitmap.png"),
      loading: false
    });
  }

  render() {
    let { src, loading } = this.state;
    return (
      <img
        src={src}
        onLoad={this.handleImageLoaded.bind(this)}
        onError={this.handleImageErrored.bind(this)}
      />
    );
  }
}
