import React, {Component} from "react";
import Ball from "./Ball";
import {getRandom} from "../util";
//每隔一段时间，自动产生一个小球，各种数据随机
export default class BallList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            ballInfoes:[//存放每一个小球的属性对象
                // {left:;top:;}//可以这样
                // <Ball></Ball>//也可以直接存放个组件
            ]
        }
        //每隔一秒钟产生一个小球
        const timer=setInterval(()=>{
            //涉及随机数，写一个随机数文件
            let info = {//一个随机的属性信息
                left:getRandom(0,document.documentElement.clientWidth-100),
                top:getRandom(0,document.documentElement.clientHeight-100),
                xSpeed: getRandom(50,500),
                ySpeed: getRandom(50,500),
                bg:`rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})`
            }
            //然后重新设置状态
            this.setState({
                ballInfoes:[...this.state.ballInfoes,info]
            })
            if (this.state.ballInfoes.length===30){
                clearInterval(timer);
            }
        },1000)
    }
    render() {
        const balls=this.state.ballInfoes.map((item,i)=><Ball {...item} key={i}/>)//映射成组件
        return (
            <div>
                {balls}
            </div>
        )
    }
}