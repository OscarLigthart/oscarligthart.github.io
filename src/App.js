/**
 *  The main application
 */
import React, { Component } from "react";
import './styles.css';

import Sidebar from "./Components/Sidebar"
import Content from "./Components/Content"

class App extends Component {

  constructor(props) {
    super(props);

    // reference to content page
    this.contentRef = React.createRef();
  }

  /**
   * Method that listens to clicks from the navigation bar
   * @param {string} page the page to render
   */
  handleSelect = page => {
    
    // use the reference to the content to change the page
    this.contentRef.current.changePage(page);
  }


  render()
  {
    return (
      <div className="container">
          <Sidebar onSelect={this.handleSelect}/>
          <Content ref={this.contentRef} />
      </div>
    );
  }
}

export default App;
