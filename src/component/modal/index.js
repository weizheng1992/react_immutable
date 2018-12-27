import styles from "./index.less";
import { isTag } from "../../../node_modules/postcss-selector-parser";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible ? this.props.visible : false
    };
  }
  componentDidMount(){
      if(this.props.visible){
        document.getElementById("modal").style.display = "block";
      }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
    if (!nextProps.visible) {
      setTimeout(() => {
        document.getElementById("modal").style.display = "none";
      }, 1000);
    } else {
      document.getElementById("modal").style.display = "block";
    }
  }

  modalHide = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible } = this.state;
    return (
      <div
        id="modal"
        className={`${styles.modal} ${
          visible ? styles.slideInUp : styles.slideOutDown
        }`}
        onClick={this.modalHide}
      >
        {this.props.children}
      </div>
    );
  }
}
