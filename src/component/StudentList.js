import React from 'react';
import Student from "./Student";
export default function StudentList(props) {
    let stus = props.stus.map(item=><Student {...item} key={item.id}/>)
    return (
        <div>
            <ul>
                {stus}
            </ul>
        </div>
    )
}