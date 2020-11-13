import React from "react";

/**
 * 感谢http://www.jq22.com/jquery-info16640
 * 这个图真好看
 */
class Star extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timer: "",
      id: "",
      arr: [],
      canvas: React.createRef(),
    };
  }

  componentDidMount() {
    // 设置canvas 防锯齿
    const { current } = this.state.canvas;
    const ctx = current.getContext("2d");
    let width = current.width,
      height = current.height;
    if (window.devicePixelRatio) {
      current.style.width = width + "px";
      current.style.height = height + "px";
      current.height = height * window.devicePixelRatio;
      current.width = width * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    const _this = this;
    _this.init(_this);
    document.addEventListener(
      "visibilitychange",
      this.changeVisibilityCallback
    );
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.state.id);
    clearInterval(this.state.timer);
    document.removeEventListener(
      "visibilitychange",
      this.changeVisibilityCallback
    );
  }

  changeVisibilityCallback = () => {
    let hidden = document.hidden;
    if (hidden) {
      window.cancelAnimationFrame(this.state.id);
      clearInterval(this.state.timer);
    } else {
      this.init();
    }
  };

  init = () => {
    let id = window.requestAnimationFrame(this.moveItem);
    let timer = setInterval(() => {
      this.setState({
        arr: [...this.state.arr, ...[this.createARC(500)]],
      });
    }, 1000);
    this.setState({
      id,
      timer,
    });
  };

  createARC = (ys) => {
    let x = Number(Math.floor(Math.random() * 1920));
    let y = Number(Math.floor(ys + Math.random() * 600));
    let radius = [1, 1.7, 2.2][Number(Math.floor(Math.random() * 3))];
    let opacity = Number(Math.random() * (0.7).toFixed(1));
    return {
      x,
      y,
      radius,
      opacity,
    };
  };

  setCanvas = (arr) => {
    const { current } = this.state.canvas;
    const ctx = current.getContext("2d");
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      ctx.globalAlpha = item.opacity;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.fillStyle = `rgb(255,255,255)`;
      ctx.strokeStyle = `rgb(255,255,255)`;
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2, false);
      ctx.shadowBlur = 3; // 模糊尺寸
      ctx.shadowColor = "rgba(255,255,255,.5)";
      ctx.fill();
      ctx.stroke();
    }
  };

  moveItem = () => {
    const { current } = this.state.canvas;
    const ctx = current.getContext("2d");
    ctx.clearRect(0, 0, current.width, current.height);
    let barr = this.state.arr.map((item) => {
      return {
        x: item.x - 1,
        y: item.y - 0.5,
        radius: item.radius + 0.001,
        opacity: item.opacity,
      };
    });
    let arr = barr.filter((item) => item.y >= 3);
    this.setCanvas(barr);
    this.setState({
      arr,
    });
    let id = window.requestAnimationFrame(this.moveItem);
    this.setState({
      id,
    });
  };

  render() {
    return (
      <>
        <canvas
          id="canvas"
          ref={this.state.canvas}
          width="1920"
          height="1000"
        ></canvas>
        <div className="bg"></div>
        {this.props.children}
      </>
    );
  }
}

export default Star;
