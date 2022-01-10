/**
 *  The main content component of the website
 */
import React, { Component } from "react";

class Navigation extends Component {

    handleClick = page => {
        this.props.onSelect(page);
    }

    render() {
        return (
            <div className="navigation">
                <ul className="navigation-list">
                    <li className="navigation-item">
                        <div onClick={() => this.handleClick("overview")} className="navigation-item-box selected">
                            <span>Overview</span>
                        </div>
                    </li>
                    <li className="navigation-item">
                        <div onClick={() => this.handleClick("education")} className="navigation-item-box">
                            <span>Education</span>
                        </div>
                    </li>
                    <li className="navigation-item">
                        <div onClick={() => this.handleClick("work")} className="navigation-item-box">
                            <span>Working Experience</span>
                        </div>
                    </li>
                    <li className="navigation-item">
                        <div onClick={() => this.handleClick("skills")} className="navigation-item-box">
                            <span>Skills</span>
                        </div>
                    </li>
                    <li className="navigation-item">
                        <div onClick={() => this.handleClick("references")} className="navigation-item-box">
                            <span>References</span>
                        </div>
                    </li>
                    <li className="navigation-item">
                        <div onClick={() => this.handleClick("projects")} className="navigation-item-box">
                            <span>Project portfolio</span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navigation;
