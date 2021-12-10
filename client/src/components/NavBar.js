import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../images/sslogo.png'
import profilePic from '../images/DefaultProfilePic.jpg';
import AppMode from './AppMode';
import CreateAccount from './CreateAccount';
import SearchBar from './SearchBar';

class NavBar extends React.Component {

    // Displays up to three badges in navbar
    displayBadges = () => {
      const table = [];
      for (let r = 0; r < Object.keys(this.props.displayBadges).length; ++r) {
        table.push(
          <td key={r}>
            <div style={{height: '38px'}}>
              <img src={Object.values(this.props.displayBadges)[r].badge} height="45px;"/>
            </div>
            <div className="centered">
              {Object.values(this.props.displayBadges)[r].level === "level0" ? 
                <FontAwesomeIcon icon="star" color="transparent"/> :
                Object.values(this.props.displayBadges)[r].level === "level1" ?
                    <div>
                      <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
                    </div> :
                    Object.values(this.props.displayBadges)[r].level === "level2" ?
                      <div>
                          <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
                          <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
                      </div> :
                      <div>
                          <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
                          <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
                          <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/> 
                      </div>}                     
              </div>
          </td>
        );
      }
      return table;
    }
  
    render() {
       return (
        <header className="navbar">  
        <a id="sLink" className="skip-link" tabIndex="0">
         Skip to content</a>
         {this.props.mode != AppMode.LOGIN && !this.props.modalOpen && this.props.mode != AppMode.EDITPROFILE ?
         <button id="menuBtn" type="button" className="navbar-btn" 
            title="Menu" aria-controls="sideMenu" 
            aria-label="Actions" aria-haspopup="true" 
            aria-expanded={this.props.menuOpen ? "true" : "false"}
            onClick={this.props.toggleMenuOpen}>
            <FontAwesomeIcon 
              icon={this.props.menuOpen ? "times" : "bars"}
              className="navbar-btn-icon"/>
          </button> : null }
          <img src={logo} className="navbar-app-icon" 
            alt="SpeedScore logo" />
           <h1 id="appName" className="navbar-title">SpeedScore</h1> 
           {this.props.mode != AppMode.LOGIN && !this.props.modalOpen && this.props.mode != AppMode.EDITPROFILE ?
             <div className="navbar-right-items">
                <table id="roundsTable">
                  <tbody>
                      {this.displayBadges()}
                  </tbody>
                </table>        
                <input id="searchBox" className="form-control hidden" 
                aria-label="Search Rounds" size="30"
                type="search" />
                {this.props.searchBarOpen ? <SearchBar getSearchedText={this.props.getSearchedText}/> : null}
                <button id="searchBtn" type="button" className="navbar-btn" 
                    aria-label="Open Rounds Search" 
                      onClick={this.props.toggleSearchBarOpen}>
                    <FontAwesomeIcon icon="search" className="navbar-btn-icon"/>
                </button>
                <button id="profileBtn" type="button" 
                  className="navbar-btn navbar-profile-btn" 
                  aria-label="Account and Profile Settings"
                  onClick={() => {this.props.setMode(AppMode.EDITPROFILE)}}
                  style={{backgroundImage: this.props.userData.identityData.profilePic === "" ? 
                            `url(${profilePic})` : 
                            `url(${this.props.userData.identityData.profilePic})`}}>
                </button> 
              </div>: 
              <div className="navbar-right-items"></div>}
      </header>
    ); 
  }
}

export default NavBar;