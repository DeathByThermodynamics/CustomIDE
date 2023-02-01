'use strict';

const domContainer = document.querySelector('#toolbar');
const root = ReactDOM.createRoot(domContainer);
const isEmpty = str => !str.trim().length;
const e = React.createElement; 

class Toolbar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        ///numOfLines += 1;
        return <div> Unlucky </div>
    }
}

root.render(<Toolbar></Toolbar>)