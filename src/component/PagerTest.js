import React, {Component} from 'react';
import Pager from "./pager";
import StudentList from "./StudentList";
import Modal from "./Modal";

export default class PagerTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            total: 0,
            limit: 10,
            panelNumber: 5,
            students: [],
            isLoading:false
        };

        this.fetchStudents();
    }

    //获取学生数据
    async fetchStudents() {
        this.setState({
            isLoading:true
        })
        //https://open.duyiedu.com/api/student/findByPage?appkey=demo13_1545210570249&page=1&size=10
        const resp = await fetch(`http://api.duyiedu.com/api/student/findByPage?appkey=demo13_1545210570249&page=${this.state.current}&size=${this.state.limit}`)
            .then(resp => resp.json())
            .then(resp => resp.data);
        this.setState({
            total: resp.cont,
            students: resp.findByPage,
            isLoading:false
        })
    }

    //改变当前页码
    onPageChange = (newPage) => {
        this.setState({
            current: newPage,//一变就渲染，连锁反应
        })
        this.fetchStudents();
    }

    render() {
        return (
            <div className="container">
                <StudentList stus={this.state.students} />
                <div className="pager">
                    <Pager {...this.state} onPageChange={this.onPageChange}/>
                </div>
                <Modal show={this.state.isLoading}/>
            </div>
        )
    }
}