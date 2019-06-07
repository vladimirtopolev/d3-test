import React, { Component } from 'react';
import CoordinatePanel from './components/CoordinatePanel';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.workspaceRef = React.createRef();
    }

    componentDidMount() {
        this.coordinatePanel = new CoordinatePanel(this.workspaceRef.current);
    }

    render(){
      return <div ref={this.workspaceRef}></div>;
  }
}

export default App;
