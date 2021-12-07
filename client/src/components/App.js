import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { faWindowClose, faEdit, faCalendar, 
        faSpinner, faSignInAlt, faBars, faTimes, faSearch,
        faSort, faTrash, faEye, faUserPlus, faStar, faCheckSquare} from '@fortawesome/free-solid-svg-icons';
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


import ModalBadgePopup from './modal_badge_popup';

library.add(faWindowClose,faEdit, faCalendar, 
            faSpinner, faSignInAlt, faBars, faTimes, faSearch,
            faSort, faTrash, faEye, faUserPlus, faGithub, faGoogle, faStar, faCheckSquare);

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
                  badges: {},
                  authenticated: false,
                  displayBadges: {}         
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
    this.setState(
                    {mode:AppMode.LOGIN,
                      userData: {
                        accountData: {},
                        identityData: {},
                        speedgolfData: {},
                        rounds: [],
                        },
                      authenticated: false,
                      menuOpen: false
                    }
                  );
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
                     badges: this.getBadges(userObj.rounds),
                     displayBadges: this.getDisplayBadges(userObj.badges)
                  });
  }

  getDisplayBadges = (badges) => {
    var displayBadges = {}
    for (let r = 0; r < Object.keys(badges).length; ++r) {
      displayBadges[badges[r].name] = {
        name: badges[r].name,
        badge: badges[r].badge,
        level: badges[r].level
      }
    }
    return displayBadges
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
   localStorage.setItem(data.accountData.email, JSON.stringify(data));
   this.setState({userData: data});
  }

  //Badges methods

  getBadges = (rounds) => {
    this.getRoundCountBadges(rounds);
    this.getRoundTimeBadges(rounds);
    this.getRoundStrokesBadges(rounds);
    this.getRoundFrequencyBadges(rounds);
    return badges;
  }

  getRoundCountBadges = (rounds) => {
      badges.rounds["level"] = "level0"

      Object.keys(badges.rounds).forEach(level => {
        if (rounds.length >= badges.rounds[level].qualification) {
          badges.rounds["level"] = level
        }
      });

      return badges;
  }

  getRoundTimeBadges = (rounds) => {
    badges.roundTime["level"] = "level0"
    const roundsTimeCounter = {0: 200};

    for (let i = 0; i < rounds.length; i++) {
        if (rounds[i].minutes < roundsTimeCounter[0]) {
          roundsTimeCounter[0] = parseInt(rounds[i].minutes)
        }
    }

    Object.keys(badges.roundTime).forEach(level => {
        if (roundsTimeCounter[0] < badges.roundTime[level].qualification) {
          badges.roundTime["level"] = level;
        }
    });
    return badges;
  }

  getRoundStrokesBadges = (rounds) => {
    badges.roundStrokes["level"] = "level0"
    const roundsStrokesCounter = {0: 100};

    for (let i = 0; i < rounds.length; i++) {
      if (rounds[i].strokes < roundsStrokesCounter[0]) {
        roundsStrokesCounter[0] = parseInt(rounds[i].strokes)
      }
    }

    Object.keys(badges.roundStrokes).forEach(level => {
      if (roundsStrokesCounter[0] <= badges.roundStrokes[level].qualification) {
          badges.roundStrokes["level"] = level
      }
    });

    return badges;
  }

  getRoundFrequencyBadges = (rounds) => {

      badges.roundsInMonth["level"] = "level0"

      const roundsPerMonthCounter = {};
      for (let i = 0; i < rounds.length; i++) {
          const roundMonth = new Date(rounds[i].date).getMonth();
          roundsPerMonthCounter[roundMonth] = !roundsPerMonthCounter[roundMonth] ?
                1 : roundsPerMonthCounter[roundMonth] + 1;
      }
      Object.keys(badges.roundsInMonth).forEach(level => {
          if (Math.max(Object.values(roundsPerMonthCounter)) >= badges.roundsInMonth[level].qualification) {
            badges.roundsInMonth["level"] = level;
          }
      });

    return badges;
  }

  addDisplayBadges = async(badge) => {
    const url = "/badges/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(badge)
    }); 

    const displayBadges = this.state.displayBadges;

    displayBadges[badge.name] = badge;
    this.setState({displayBadges: displayBadges})

    //this.setState({ displayBadges: displayBadges})
  }

  removeDisplayBadges = async(badge) => {
    const url = "/bages/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(badge)
    }); 

    const displayBadges = this.state.displayBadges;

    delete displayBadges[badge.name]
    this.setState({displayBadges: displayBadges})

    //this.setState({ displayBadges: displayBadges})
  }

  //Round Management methods



  getOldBadges = () => {
    let result = {};
    for (let r = 0; r < Object.keys(this.state.badges).length; ++r) {
      result[Object.keys(this.state.badges)[r]] = Object.values(this.state.badges)[r].level
    }
    return result
  }

  newBadgeAlert = (oldBadges) => {
    for (let r = 0; r < Object.keys(this.state.badges).length; ++r) {
      if (Object.values(this.state.badges)[r].level != oldBadges[Object.keys(this.state.badges)[r]]) {
        if (Object.keys(this.state.badges)[r] in this.state.displayBadges) {
          let test = {level: Object.values(this.state.badges)[r].level,
                    badge: Object.values(this.state.badges)[r].badge,
                    name: Object.keys(this.state.badges)[r]}
          this.addDisplayBadges(test)
        }
        if (parseInt(oldBadges[Object.keys(this.state.badges)[r]][5]) < parseInt(Object.values(this.state.badges)[r].level[5])) {
          this.isShowPopup(true, oldBadges, this.state.badges)
        }
      }
    }
  }

  removeDisplayBadgeAlert = (oldBadges) => {
    for (let r = 0; r < Object.keys(this.state.badges).length; ++r) {
      if (Object.values(this.state.badges)[r].level != oldBadges[Object.keys(this.state.badges)[r]]) {
        if (Object.values(this.state.badges)[r].level === "level0") {
          let test = {level: Object.values(this.state.badges)[r].level,
                    badge: Object.values(this.state.badges)[r].badge,
                    name: Object.keys(this.state.badges)[r]}
          this.removeDisplayBadges(test)
        } else {
          let test = {level: Object.values(this.state.badges)[r].level,
                    badge: Object.values(this.state.badges)[r].badge,
                    name: Object.keys(this.state.badges)[r]}
          this.addDisplayBadges(test)
        }
      }
    }
  }

  isShowPopup = (status, oldBadges, newBadges) => {  
    this.setState({ showModalPopup: status,
                      oldBadges: oldBadges,
                      newBadges: newBadges});  
  };  



  addRound = async(newRoundData) => {   
    var oldBadges = this.getOldBadges()
    const url = "/rounds/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
                  method: 'POST',
                  headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(newRoundData)
                }); 
    if (res.status == 201) { 
      const newRounds = [...this.state.userData.rounds];
      newRounds.push(newRoundData);
      const newUserData = {accountData: this.state.userData.accountData,
                           identityData: this.state.userData.identityData,
                           speedgolfData: this.state.userData.speedgolfData,
                           rounds: newRounds};
      this.setState({userData: newUserData,
                     badges: this.getBadges(newRounds)});
      this.newBadgeAlert(oldBadges);
      return("New round logged.");
    } else { 
      const resText = await res.text();
      return("New Round could not be logged. " + resText);
    }
  }

  updateRound = async(newRoundData, editId) => {
    var oldBadges = this.getOldBadges()
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
      this.setState({userData: newUserData,
                     badges: this.getBadges(newRounds)});
      this. newBadgeAlert(oldBadges)
      return("Round updated");
    }
    else{
      const resText = await res.text();
      return("Round could not be updated. " + resText);
  }
}

  deleteRound = async(deleteId) => {
    var oldBadges = this.getOldBadges()
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
        this.setState({userData: newUserData,
                        badges: this.getBadges(newRounds)});
        this. removeDisplayBadgeAlert(oldBadges)
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


        <ModalBadgePopup  
               showModalPopup={this.state.showModalPopup}  
               onPopupClose={this.isShowPopup}
               oldBadges={this.state.oldBadges}
               newBadges={this.state.newBadges}
               displayBadges={this.state.displayBadges}
               addDisplayBadges={this.addDisplayBadges}
               removeDisplayBadges={this.removeDisplayBadges}/>



        <NavBar mode={this.state.mode}
                menuOpen={this.state.menuOpen}
                toggleMenuOpen={this.toggleMenuOpen}
                modalOpen={this.state.modalOpen}
                toggleModalOpen={this.toggleModalOpen}
                userData={this.state.userData}
                updateUserData={this.updateUserData} 
                setMode={this.setMode}
                displayBadges={this.state.displayBadges}/> 

        <ModeTabs mode={this.state.mode}
                  setMode={this.setMode} 
                  menuOpen={this.state.menuOpen}
                  modalOpen={this.state.modalOpen}
                  displayBadges={this.state.displayBadges}/> 
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
                        userId={this.state.userId}
                        badges={this.state.badges}/>,
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
                        menuOpen={this.state.menuOpen}
                        displayBadges={this.state.displayBadges}
                        addDisplayBadges={this.addDisplayBadges}
                        removeDisplayBadges={this.removeDisplayBadges}/>,
          
          
          
          EditProfileMode:
            <EditProfile setMode={this.setMode} 
                         userData={this.state.userData}
                         getUserData={this.getUserData} 
                         updateProfile={this.updateProfile}
                         toggleToastFunction={this.toggleToastFunction}/>
              
        }[this.state.mode]
        }
      </>
    ); 
  }

}
export default App;