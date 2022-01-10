/**
 *  The main content component of the website
 */
import React, { Component } from "react";
import Education from "./Content/Education";

import Overview from "./Content/Overview";
import Project from "./Content/Project";
import References from "./Content/References";
import Skills from "./Content/Skills";
import Work from "./Content/Work";

class Content extends Component {
    
    constructor(props) {
        super(props);
        this.state = {page: "overview"};
    }

    // change the state on call of different page
    changePage = page => {
        this.setState({
            page: page
        });
    }

    renderSwitch(page) {
        switch(page) {
          case 'overview':
            return <Overview/>;
          case 'education':
            return <Education/>;
          case 'projects':
            return <Project/>;
          case 'references':
            return <References/>;
          case 'skills':
            return <Skills/>;
          case 'work':
            return <Work/>;
          default:
            return <Overview/>;
        }
    }
    
    render() {
        return (
            <div className="content">
                {this.renderSwitch(this.state.page)}
            </div>
        );
    }
}
export default Content;
