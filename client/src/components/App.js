import React,{useState} from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { faWindowClose, faEdit, faCalendar, 
        faSpinner, faSignInAlt, faBars, faTimes, faSearch,
        faSort, faTrash, faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub} from '@fortawesome/free-brands-svg-icons';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import FeedPage from './FeedPage.js';
import RoundsPage from './RoundsPage.js';
import CoursesPage from './CoursesPage.js';
import BuddiesPage from './BuddiesPage.js';
import SideMenu from './SideMenu.js';
import AppMode from './AppMode.js';
import EditProfile from './EditProfile.js';

library.add(faWindowClose,faEdit, faCalendar, 
            faSpinner, faSignInAlt, faBars, faTimes, faSearch,
            faSort, faTrash, faEye, faUserPlus, faGithub);

const App = ()=>{


    const [state,setState] = useState(
      {mode: AppMode.LOGIN,
      menuOpen: false,
      modalOpen: false,
      showToast: false,
      userData: {
        accountData: {},
        identityData: {},
        speedgolfData: {},
        rounds: [],
        roundCount: 0},
      authenticated: false             
      });

  // const componentDidMount() {
  //   document.addEventListener("click",this.handleClick, true);
  //   if (!this.state.authenticated) { 
  //     //Use /auth/test route to (re)-test authentication and obtain user data
  //     fetch("/auth/test")
  //       .then((response) => response.json())
  //       .then((obj) => {
  //         if (obj.isAuthenticated) {
  //           this.logInUser(obj.user);
  //         }
  //       })
  //   } 
  // }
  

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
  
  const handleClick = (e) => {
    if (state.menuOpen && e.target.getAttribute("role") !== "menuitem") {
      toggleMenuOpen();
      e.stopPropagation();
    }
  }

  /*
   * Menu item functionality 
   */
  const logOut = () => {
    setState({mode:AppMode.LOGIN,
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
   
   const toggleToastFunction = () => {
    setState(prevState => ({showToast: !prevState.showToast}));
  }

  const setMode = (newMode) => {
    setState({mode: newMode});
  }

  const toggleMenuOpen = () => {
    setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  const toggleModalOpen = () => {
    setState(prevState => ({dialogOpen: !prevState.dialogOpen}));
  }

  //Account Management methods
   
  const accountExists = async(email) => {
    const res = await fetch("/user/" + email);
    return (res.status === 200);
  }

  const getAccountData = (email) => {
    return JSON.parse(localStorage.getItem(email));
  }

  const updateProfile = (newProfile) => {
    newProfile.rounds = state.userData.rounds;
    setState({userData: newProfile});
  }

  const authenticateUser = async(id, pw) => {
    const url = "/auth/login?username=" + id + 
      "&password=" + pw;
    const res = await fetch(url,{method: 'POST'});
    if (res.status == 200) { //successful login!
      return true;
    } else { //Unsuccessful login
      return false;
    } 
  }

  const logInUser = (userObj) => {
      setState({userData: userObj,
                     mode: AppMode.FEED,
                     authenticated: true});
  }

  const createAccount = async(data) => {
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

  const updateUserData = (data) => {
   localStorage.setItem(data.accountData.email,JSON.stringify(data));
   setState({userData: data});
  }

  //Round Management methods

  const addRound = async(newRoundData) => {
    const url = "/rounds/" + state.userData.accountData.id;
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
      const newRounds = [...state.userData.rounds];
      newRounds.push(newRoundData);
      const newUserData = {accountData: state.userData.accountData,
                           identityData: state.userData.identityData,
                           speedgolfData: state.userData.speedgolfData,
                           rounds: newRounds};
      setState({userData: newUserData});
      return("New round logged.");
    } else { 
      const resText = await res.text();
      return("New Round could not be logged. " + resText);
    }
  }

  const updateRound = (newRoundData) => {
    const newRounds = [...state.userData.rounds];
    let r;
    for (r = 0; r < newRounds.length; ++r) {
        if (newRounds[r].roundNum === newRoundData.roundNum) {
            break;
        }
    }
    newRounds[r] = newRoundData;
    const newUserData = {
      accountData: state.userData.accountData,
      identityData: state.userData.identityData,
      speedgolfProfileData: state.userData.speedgolfProfileData,
      rounds: newRounds, 
      roundCount: state.userData.roundCount
    }
    localStorage.setItem(newUserData.accountData.email,JSON.stringify(newUserData));
    setState({userData: newUserData}); 
  }

  const deleteRound = (id) => {
    const newRounds = [...state.userData.rounds];
    let r;
    for (r = 0; r < newRounds.length; ++r) {
        if (newRounds[r].roundNum === state.deleteId) {
            break;
        }
    }
    delete newRounds[r];
    const newUserData = {
      accountData: state.userData.accountData,
      identityData: state.userData.identityData,
      speedgolfProfileData: state.userData.speedgolfProfileData,
      rounds: newRounds, 
      roundCount: state.userData.roundCount
    }
    localStorage.setItem(newUserData.accountData.email,JSON.stringify(newUserData));
    setState({userData: newUserData});
  }


    return (
      <>
        <NavBar mode={state.mode}
                menuOpen={state.menuOpen}
                toggleMenuOpen={toggleMenuOpen}
                modalOpen={state.modalOpen}
                toggleModalOpen={toggleModalOpen}
                userData={state.userData}
                updateUserData={updateUserData} 
                setMode={setMode}/> 

        <ModeTabs mode={state.mode}
                  setMode={setMode} 
                  menuOpen={state.menuOpen}
                  modalOpen={state.modalOpen}/> 
        {state.menuOpen  ? 
        <SideMenu logOut={logOut}/> : null}
        {
          {LoginMode:
            <LoginPage modalOpen={state.modalOpen}
                       toggleModalOpen={toggleModalOpen} 
                       logInUser={logInUser}
                       createAccount={createAccount}
                       accountExists={accountExists}
                       authenticateUser={authenticateUser}/>, 
          FeedMode:
            <FeedPage modalOpen={state.modalOpen}
                      toggleModalOpen={toggleModalOpen} 
                      menuOpen={state.menuOpen}
                      userId={state.userId}
                      toggleToastFunction={toggleToastFunction}
                      showToast={state.showToast} />,
          RoundsMode:
            <RoundsPage rounds={state.userData.rounds}
                        addRound={addRound}
                        updateRound={updateRound}
                        deleteRound={deleteRound}
                        modalOpen={state.modalOpen}
                        toggleModalOpen={toggleModalOpen} 
                        menuOpen={state.menuOpen}
                        userId={state.userId}/>,
          CoursesMode:
            <CoursesPage modalOpen={state.modalOpen}
                        toggleModalOpen={toggleModalOpen} 
                        menuOpen={state.menuOpen}
                        userId={state.userId}/>,
          BuddiesMode:
            <BuddiesPage modalOpen={state.modalOpen}
                        toggleModalOpen={toggleModalOpen} 
                        menuOpen={state.menuOpen}
                        userId={state.userId}/>,
          
          EditProfileMode:
            <EditProfile setMode={setMode} 
                         userData={state.userData}
                         
                         updateProfile={updateProfile}
                         toggleToastFunction={toggleToastFunction} />
              
        }[state.mode]
        }
      </>
    ); 
  

}
export default App;