import React, {Component} from "react";
import './Ball.css'
//尽量考虑能让组件通用


//一个能够自动移动的小球

export default class Ball extends Component {
    constructor(props) {
        super(props);
        //有个位置
        this.state = {
            left: props.left || 0, //横坐标
            top: props.top || 0, //纵坐标
            xSpeed: props.xSpeed, //速度会变化
            ySpeed:props.ySpeed
        }

        const duration = 16; //间隔毫秒数
        setInterval(() => {
            //根据速度，改变left/top
            const xDis = this.state.xSpeed * duration / 1000; //算移动距离，位移
            const yDis = this.state.ySpeed * duration / 1000;

            let newLeft = this.state.left + xDis;
            let newTop = this.state.top + yDis;

            //撞墙情况
            if (newLeft<0) {
                newLeft =0;
                this.setState({
                    xSpeed: -this.state.xSpeed//速度取反往回走
                })
            } else if (newLeft >= document.documentElement.clientWidth - 100) {
                newLeft = document.documentElement.clientWidth -100;
                this.setState({
                    xSpeed: -this.state.xSpeed
                })
            }
            if (newTop<0){
                newTop =0;
                this.setState({
                    ySpeed: -this.state.ySpeed
                })
            } else if (newTop >= document.documentElement.clientHeight - 100) {
                newTop = document.documentElement.clientHeight -100;
                this.setState({
                    ySpeed: -this.state.ySpeed
                })
            }

            //其他情况
            this.setState({
                left:newLeft,
                top:newTop
            })
        }, duration)
    }

    render() {
        return (
            <div className="ball" style={{
                left: this.state.left,
                top: this.state.top,
                background: this.props.bg || "red"
            }}>

            </div>
        )
    }
}