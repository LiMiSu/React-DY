import React from 'react';


/*
* 分页组件
* 属性：
* 初始页码：current
* 总的页码：可以算
* 总数据量：total
* 每页显示的数据量：页容量limit
* 数字页码最多显示多少个：panelNumber
*
*
* 有没有自己维护的状态：
* 当前页码：current---也可以放到初始页面
*
* 不要状态了，那就写成函数组件吧
* */

export default function Pager(props) {
    //我负责根据props显示页面
    const pagerNumber = getPageNumber(props);//总页数
    const min = getMinNumber(props);
    const max = getMaxNumber(min, pagerNumber, props);
    const numbers = [];
    for (let i=min; i<=max; i++) {//牛逼 你给我数据，我来展示
        numbers.push(<span onClick={()=>{toPage(i,props)}} className={i === props.current?"item active data":"item data"} key={i}>{i}</span>)
    }
    return (
        <>
            <span 
                onClick={()=>{toPage(1,props)}}
                className={props.current===1 || props.total===0?"item disabled":"item"}>首页</span>
            <span
                onClick={()=>{toPage(props.current - 1 <1? 1 : props.current-1, props)}}
                className={props.current===1 || props.total===0?"item disabled":"item"}>上一页</span>

            {/*数字页码  关键点：算出第一个*/}
            {numbers}

            <span
                onClick={()=>{toPage(props.current + 1 > pagerNumber? pagerNumber : props.current + 1, props)}}
                className={props.current===pagerNumber || props.total===0?"item disabled":"item"}>下一页</span>
            <span
                onClick={()=>{toPage(pagerNumber,props)}}
                className={props.current===pagerNumber || props.total===0?"item disabled":"item"}>尾页</span>
            
            {/*页码显示*/}
            <span className="page">{props.total===0?0:props.current}</span> / <span>{pagerNumber}</span>
        </>
    )
}

//计算总页数
function getPageNumber(props) {
    //总页数除以页容，然后向上取整
    return Math.ceil(props.total / props.limit)
}

//点击跳转页码函数
//跳转就要改数据，没有状态怎么改
//把事件扔出去，通知数据所有者我希望改成什么
//target 目标页码
//props 所有属性

function toPage(target, props) {
    if (props.current === target) {
        return
    }
    props.onPageChange && props.onPageChange(target)
}

//计算数字页码最小数字
function getMinNumber(props) {
  let min = props.current-Math.floor(props.panelNumber / 2);
  if (min<1){
      min=1;
  }
  return min;
}
//计算最大
function getMaxNumber(min, pageNumber, props) {
    let max = min + props.panelNumber - 1;
    if (max>pageNumber){
        max = pageNumber;
    }
    return max;
}