/**
 *  The main content component of the website
 */
import React, { Component } from "react";

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {selected: "overview"};

        this.pages = {
            "overview": "Overview",
            "education": "Education",
            "work": "Working Experience",            
            "skills": "Skills",
            "references": "References",
            "projects": "Project Portfolio",
        }
    }

    handleClick = page => {
        this.props.onSelect(page);
        this.setState({
            selected: page
        })
    }




    render() {
        return (
            <div className="navigation">
                <ul className="navigation-list">

                {
                    /**
                     *  This code below looks complicated, but all it does
                     *  is create the menu items based on the this.pages object above.
                     *  
                     *  Furthermore, it houses functionality that ensure whenever a page is 
                     *  clicked, it will be highlighted in the sidebar
                     */
                    Object.keys(this.pages).map((key, index) => {
                        
                        return <li className="navigation-item">
                        <div 
                            onClick={() => this.handleClick(key)} 
                            className={`navigation-item-box ${key == this.state.selected ? "selected" : ""}`}
                        >
                            <span>{this.pages[key]}</span>
                        </div>
                    </li>
                    })
                }

                </ul>
            </div>
        );
    }
}

export default Navigation;
