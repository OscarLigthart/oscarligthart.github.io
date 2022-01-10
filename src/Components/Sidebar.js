/**
 *  The sidebar component of the website
 * 
 */
import React, { Component } from "react";
import Navigation from "./Sidebar/Navigation"

// import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faCalendar, faHome } from '@fortawesome/free-solid-svg-icons'

class Sidebar extends Component {

    bubbleSelect = page => {

        this.props.onSelect(page);
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-contact">
                    <div className="sidebar-contact-photo">
                        <img src= {process.env.PUBLIC_URL + '/Images/Sidebar/profile_picture_good.jpg'} className="sidebar-contact-photo-image" alt=""/>
                    </div>
                    <div className="sidebar-contact-name center">
                        <span>Oscar Ligthart</span>
                    </div>
                    <div className="sidebar-contact-info">
                        <div className="sidebar-contact-info-item">
                            <span className="icon">
                                <FontAwesomeIcon icon={faHome}/>
                            </span>
                            
                            <span className="text-bundle">
                                <span>Carel Willinkgracht 897</span>
                                <span>1112 ZK Diemen</span>
                            </span>
                        </div>
                        <div className="sidebar-contact-info-item">
                            <span className="icon">
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </span>
                            <span>oscarligthart@gmail.com</span>
                        </div>
                        <div className="sidebar-contact-info-item">
                            <span className="icon">
                                <FontAwesomeIcon icon={faPhone}/>
                            </span>
                            <span>+31 6 55115149</span>
                        </div>
                        <div className="sidebar-contact-info-item">
                            <span className="icon">
                                <FontAwesomeIcon icon={faCalendar}/>
                            </span>
                            <span>12-02-1995</span>
                        </div>
                    </div>
                </div>
                <div className="sidebar-navigation">
                    <Navigation onSelect={this.bubbleSelect}/>
                </div>
            </div>
        );
    }
}


export default Sidebar;
