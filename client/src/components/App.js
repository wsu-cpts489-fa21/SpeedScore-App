import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { faWindowClose, faEdit, faCalendar, 
        faSpinner, faSignInAlt, faBars, faTimes, faSearch,
        faSort, faTrash, faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import FeedPage from './FeedPage.js';
import RoundsPage from './RoundsPage.js';
import CoursesPage from './CoursesPage.js';
import BuddiesPage from './BuddiesPage.js';
import BadgesPage from './BadgesPage.js'
import SideMenu from './SideMenu.js';
import AppMode from './AppMode.js';
import EditProfile from './EditProfile.js';
import badges from './Badges.js'

library.add(faWindowClose,faEdit, faCalendar, 
            faSpinner, faSignInAlt, faBars, faTimes, faSearch,
            faSort, faTrash, faEye, faUserPlus, faGithub, faGoogle);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  modalOpen: false,
                  showToast: false,
                  userData: {
                    accountData: {},
                    identityData: {},
                    speedgolfData: {},
                    rounds: [],
                    roundCount: 0
                  },
                  badges: new Set(),
                  authenticated: false             
                  };
  }

  componentDidMount() {
    document.addEventListener("click",this.handleClick, true);
    if (!this.state.authenticated) { 
      //Use /auth/test route to (re)-test authentication and obtain user data
      fetch("/auth/test")
        .then((response) => response.json())
        .then((obj) => {
          if (obj.isAuthenticated) {
            this.logInUser(obj.user);
          }
        })
    } 
  }
  

  /*
   handleClick -- document-level click handler assigned in componentDidMount()
   using 'true' as third param to addEventListener(). This means that the event
   handler fires in the _capturing_ phase, not the default _bubbling_ phase.
   Thus, the event handler is fired _before_ any events reach their lowest-level
   target. If the menu is open, we want to close
   it if the user clicks anywhere _except_ on a menu item, in which case we
   want the menu item event handler to get the event (through _bubbling_).
   We identify this border case by comparing 
   e.target.getAttribute("role") to "menuitem". If that's NOT true, then
   we close the menu and stop propagation so event does not reach anyone
   else. However, if the target is a menu item, then we do not execute 
   the if body and the event bubbles to the target. 
  */
  
  handleClick = (e) => {
    if (this.state.menuOpen && e.target.getAttribute("role") !== "menuitem") {
      this.toggleMenuOpen();
      e.stopPropagation();
    }
  }

  /*
   * Menu item functionality 
   */
  logOut = () => {
    this.setState({mode:AppMode.LOGIN,
                   userData: {
                    accountData: {},
                    identityData: {},
                    speedgolfData: {},
                    rounds: [],
                    },
                   authenticated: false,
                   menuOpen: false});
  }
  
   //User interface state management methods
   
  toggleToastFunction = () => {
    this.setState(prevState => ({showToast: !prevState.showToast}));
  }

  setMode = (newMode) => {
    this.setState({mode: newMode});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  toggleModalOpen = () => {
    this.setState(prevState => ({dialogOpen: !prevState.dialogOpen}));
  }

  //Account Management methods
   
  accountExists = async(email) => {
    const res = await fetch("/user/" + email);
    return (res.status === 200);
  }

  getAccountData = (email) => {
    return JSON.parse(localStorage.getItem(email));
  }

  updateProfile = (newProfile) => {
    newProfile.rounds = this.state.userData.rounds;
    this.setState({userData: newProfile});
  }

  authenticateUser = async(id, pw) => {
    const url = "/auth/login?username=" + id + 
      "&password=" + pw;
    const res = await fetch(url,{method: 'POST'});
    if (res.status == 200) { //successful login!
      return true;
    } else { //Unsuccessful login
      return false;
    } 
  }

  logInUser = (userObj) => {
      this.setState({userData: userObj,
                     mode: AppMode.FEED,
                     authenticated: true,
                     badges: this.getBadges(userObj.rounds)
                  });
  }

  createAccount = async(data) => {
    const url = '/users/' + data.accountData.id;
    const res = await fetch(url, {
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        method: 'POST',
        body: JSON.stringify(data)}); 
    if (res.status == 201) { 
        return("New account created with email " + data.accountData.id);
    } else { 
        const resText = await res.text();
        return("New account was not created. " + resText);
    }
  }

  updateUserData = (data) => {
   localStorage.setItem(data.accountData.email,JSON.stringify(data));
   this.setState({userData: data});
  }

  //Badges methods

  getBadges = (rounds) => {
   const badgesSet = new Set();
   const roundCount = rounds.length;
   const roundCountBadges = Object.keys(badges.rounds);
   roundCountBadges.forEach(badge => { // Badges for number of rounds
      if (roundCount >= badges.rounds[badge].qualification) {
         badgesSet.add(badge);
      }
   });
   const timeBadges = Object.keys(badges.roundTime);
   const strokesBadges = Object.keys(badges.roundStrokes);
   for (let i = 0; i < rounds.length; i++) {
      const round = rounds[i];
      timeBadges.forEach(badge => { // Badges for round time
         if (round.minutes < badges.roundTime[badge].qualification) {
            badgesSet.add(badge);
         }
      });
      strokesBadges.forEach(badge => { // Badges for round strokes
         if (round.strokes <= badges.roundStrokes[badge].qualification) {
            badgesSet.add(badge);
         }
      });
   }
   const frequencyBadges = Object.keys(badges.roundsInMonth);
   // TODO: round frequency
   return badgesSet;
  }

  //Round Management methods

  addRound = async(newRoundData) => {
    const url = "/rounds/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
                  method: 'POST',
                  headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                                },
                          method: 'POST',
                          body: JSON.stringify(newRoundData)
                }); 
    if (res.status == 201) { 
      const newRounds = [...this.state.userData.rounds];
      newRounds.push(newRoundData);
      const newUserData = {accountData: this.state.userData.accountData,
                           identityData: this.state.userData.identityData,
                           speedgolfData: this.state.userData.speedgolfData,
                           rounds: newRounds};
      this.setState({userData: newUserData});
      return("New round logged.");
    } else { 
      const resText = await res.text();
      return("New Round could not be logged. " + resText);
    }
  }

  updateRound = async(newRoundData, editId) => {
    const url = "/rouds/" + this.state.userData.accountData.id + "/" + editId;
    let res = await fetch(url, {
                  method: 'POST',
                  headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                            },
                          method: 'POST',
                          body: JSON.stringify(newRoundData),
    });
    if (res.status == 201) {
      const newRounds = [...this.state.userData.rounds];
      newRounds[editId] = newRoundData;
      const newUserData = {accountData: this.state.userData.accountData,
                           identityData: this.state.userData.identityData,
                           speedgolfData: this.state.userData.speedgolfData,
                           rounds: newRounds};
      this.setState({userData: newUserData});
      return("Round updated");
    }
    else{
      const resText = await res.text();
      return("Round could not be updated. " + resText);
  }
}

  deleteRound = async(deleteId) => {
    const url = "/rounds/" + this.state.userData.accountData.id + "/" + deleteId;
    let res = await fetch(url, {
                  method: 'DELETE',
                  headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                            },
              });
    console.log(res.status)
    if (res.status == 200) {
      const newRounds = [...this.state.userData.rounds];
      newRounds.splice(deleteId, 1);
      const newUserData = {
                          accountData: this.state.userData.accountData,
                          identityData: this.state.userData.identityData,
                          speedgolfData: this.state.userData.speedgolfData,
                          rounds: newRounds};
        this.setState({userData: newUserData});
        return("Round deleted");
    }
    else{
      const resText = await res.text();
      return("Round could not be deleted. " + resText);
    }
  }

  render() {
    return (
      <>
        <NavBar mode={this.state.mode}
                menuOpen={this.state.menuOpen}
                toggleMenuOpen={this.toggleMenuOpen}
                modalOpen={this.state.modalOpen}
                toggleModalOpen={this.toggleModalOpen}
                userData={this.state.userData}
                updateUserData={this.updateUserData} 
                setMode={this.setMode}/> 

        <ModeTabs mode={this.state.mode}
                  setMode={this.setMode} 
                  menuOpen={this.state.menuOpen}
                  modalOpen={this.state.modalOpen}/> 
        {this.state.menuOpen  ? 
        <SideMenu logOut={this.logOut}/> : null}
        {
          {LoginMode:
            <LoginPage modalOpen={this.state.modalOpen}
                       toggleModalOpen={this.toggleModalOpen} 
                       logInUser={this.logInUser}
                       createAccount={this.createAccount}
                       accountExists={this.accountExists}
                       authenticateUser={this.authenticateUser}/>, 
          FeedMode:
            <FeedPage modalOpen={this.state.modalOpen}
                      toggleModalOpen={this.toggleModalOpen} 
                      menuOpen={this.state.menuOpen}
                      userId={this.state.userId}
                      toggleToastFunction={this.toggleToastFunction}
                      showToast={this.state.showToast} />,
          RoundsMode:
            <RoundsPage rounds={this.state.userData.rounds}
                        addRound={this.addRound}
                        updateRound={this.updateRound}
                        deleteRound={this.deleteRound}
                        modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>,
          CoursesMode:
            <CoursesPage modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>,
          BuddiesMode:
            <BuddiesPage modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>,
          
          

          BadgesMode:
            <BadgesPage badges={this.state.badges}
                        modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}/>,
          
          
          
          EditProfileMode:
            <EditProfile setMode={this.setMode} 
                         userData={this.state.userData}
                         getUserData={this.getUserData} 
                         updateProfile={this.updateProfile}
                         toggleToastFunction={this.toggleToastFunction} />
              
        }[this.state.mode]
        }
      </>
    ); 
  }

}
export default App;