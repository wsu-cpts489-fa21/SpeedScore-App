/*
   Functional components for the side menu
*/

const SideMenu = (props) => {
   return (
      <ul id="sideMenu" role="menu" className="sidemenu"
        arial-labelledby="menuBtn">
          <li role="menuitem" tabIndex="-1">
          Settings
          </li>
          <li role="menuitem" tabIndex="-1">
          About
          </li>
          <li role="menuitem" tabIndex="-1"
              onClick={props.logOut}>
          Log Out
          </li>
      </ul>  
  ); 
}

export default SideMenu;