import styles from "./index.less";
import toast from "../toast";
export default class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: "获取验证码",
      timer: 60,
      discodeBtn: false,
      clearInterval: false
    };
  }
  handleClick = () => {
    const discodeBtn = this.state.discodeBtn;
    let phoneNum = this.props.mobile;
    
    if (
      /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
        phoneNum
      )
    ) {
      if (!discodeBtn) {
        this.props.handleSendCode();
        this.count();
      }
    } else {
      toast("请填写正确手机号!");
    }
  };

  count = () => {
    let timer = this.state.timer;
    this.siv = setInterval(() => {
      this.setState(
        { timer: timer--, btnText: timer, discodeBtn: true },
        () => {
          if (timer === 0) {
            this.siv && clearInterval(this.siv);
            this.setState({ btnText: "重新发送", discodeBtn: false });
          }
        }
      );
    }, 1000);
  };

  componentWillUnmount() {
    this.siv && clearInterval(this.siv);
  }
  render() {
    const { className } = this.props;
    const { btnText, discodeBtn } = this.state;
    return (
      <div
        onClick={this.handleClick}
        className={`${discodeBtn ? styles.disable : null} ${className}`}
      >
        {!discodeBtn ? "获取验证码" : `${btnText}s`}
      </div>
    );
  }
}
