/*
   Functional components for the top navigation bar
*/

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../images/sslogo.png'
import profilePic from '../images/DefaultProfilePic.jpg';
import AppMode from './AppMode';
import SearchBar from './SearchBar';

// Displays up to three badges in navbar
const PinnedBadges = (props) => {
   const table = [];
      for (let r = 0; r < Object.keys(props.displayBadges).length; ++r) {
         table.push(
            <td key={r}>
               <div style={{height: '38px'}}>
               <img src={Object.values(props.displayBadges)[r].badge} height="45px;"/>
               </div>
               <div className="centered">
                  {Object.values(props.displayBadges)[r].level === "level0" ? 
                  <FontAwesomeIcon icon="star" color="transparent"/> :
                  Object.values(props.displayBadges)[r].level === "level1" ?
                     <div>
                        <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
                     </div> :
                     Object.values(props.displayBadges)[r].level === "level2" ?
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

// class NavBar extends React.Component {

//     // Displays up to three badges in navbar
//     displayBadges = () => {
//       const table = [];
//       for (let r = 0; r < Object.keys(this.props.displayBadges).length; ++r) {
//         table.push(
//           <td key={r}>
//             <div style={{height: '38px'}}>
//               <img id={"badgeImg" + r} src={Object.values(this.props.displayBadges)[r].badge} height="45px;"/>
//             </div>
//             <div className="centered">
//               {Object.values(this.props.displayBadges)[r].level === "level0" ? 
//                 <FontAwesomeIcon icon="star" color="transparent"/> :
//                 Object.values(this.props.displayBadges)[r].level === "level1" ?
//                     <div>
//                       <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
//                     </div> :
//                     Object.values(this.props.displayBadges)[r].level === "level2" ?
//                       <div>
//                           <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
//                           <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
//                       </div> :
//                       <div>
//                           <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
//                           <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/>
//                           <FontAwesomeIcon icon="star" color="gold" style={{fontSize: '8px'}}/> 
//                       </div>}                     
//               </div>
//           </td>
//         );
      }
      return table;
}

// Displays the navbar
const NavBar = (props) => {
   return (
      <header className="navbar">  
         <a id="sLink" className="skip-link" tabIndex="0">
         Skip to content</a>
         {props.mode != AppMode.LOGIN && !props.modalOpen && props.mode != AppMode.EDITPROFILE ?
         <button id="menuBtn" type="button" className="navbar-btn" 
            title="Menu" aria-controls="sideMenu" 
            aria-label="Actions" aria-haspopup="true" 
            aria-expanded={props.menuOpen ? "true" : "false"}
            onClick={props.toggleMenuOpen}>
            <FontAwesomeIcon 
               icon={props.menuOpen ? "times" : "bars"}
               className="navbar-btn-icon"/>
         </button> : null }
         <img src={logo} className="navbar-app-icon" 
            alt="SpeedScore logo" />
         <h1 id="appName" className="navbar-title">SpeedScore</h1> 
         {props.mode != AppMode.LOGIN && !props.modalOpen && props.mode != AppMode.EDITPROFILE ?
         <div className="navbar-right-items">
            <table id="navbarBadges">
               <tbody>
                  <PinnedBadges displayBadges={props.displayBadges}/>
               </tbody>
            </table>        
            <input id="searchBox" className="form-control hidden" 
            aria-label="Search Rounds" size="30"
            type="search" />
            {props.searchBarOpen ? <SearchBar getSearchedText={props.getSearchedText}/> : null}
            <button id="searchBtn" type="button" className="navbar-btn" 
                  aria-label="Open Rounds Search" 
                  onClick={props.toggleSearchBarOpen}>
                  <FontAwesomeIcon icon="search" className="navbar-btn-icon"/>
            </button>
            <button id="profileBtn" type="button" 
               className="navbar-btn navbar-profile-btn" 
               aria-label="Account and Profile Settings"
               onClick={() => {props.setMode(AppMode.EDITPROFILE)}}
               style={{backgroundImage: props.userData.identityData.profilePic === "" ? 
                        `url(${profilePic})` : 
                        `url(${props.userData.identityData.profilePic})`}}>
            </button> 
         </div>: 
            <div className="navbar-right-items"></div>}
    </header>
  ); 
}

export default NavBar;