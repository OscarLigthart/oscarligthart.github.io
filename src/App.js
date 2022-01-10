/**
 *  The main application
 */
import React, { Component } from "react";
import './styles.css';

import Sidebar from "./Components/Sidebar"
import Content from "./Components/Content"

class App extends Component {

  handleSelect = page => {

    console.log(page)
  }

  render()
  {
    return (
      <div className="container">
          <Sidebar onSelect={this.handleSelect}/>
          <Content/>
      </div>
    );
  }
}

export default App;
