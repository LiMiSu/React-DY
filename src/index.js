import React from 'react';
import ReactDOM from 'react-dom';
import BallList from "./component/BallList";



// ReactDOM.render(<Ball
//         bg="lightgreen"
//         xSpeed={100} ySpeed={200}
//         left={100} top={100} />,
//     document.getElementById('root')
//     )

ReactDOM.render(<BallList />,
    document.getElementById('root')
)