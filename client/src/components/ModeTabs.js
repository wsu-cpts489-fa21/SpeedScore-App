/*
   Functional components for the tabs container
*/

import AppMode from './AppMode';

const ModeTabs = (props) => {
   return(
      (props.mode !== AppMode.LOGIN && !props.modalOpen && props.mode != AppMode.EDITPROFILE) ?
      <div id="modeTabs" 
           className={"modetab-container" + (props.menuOpen ? " disabled" : "") + (Object.keys(props.displayBadges).length == 0 ? "" : " shifted")}  
           role="tablist" 
           aria-label="App Modes">
          <button id="feedMode" type="button" 
              className={"modetab-btn" + 
                (props.mode === AppMode.FEED ? " modetab-selected" : "")}
              role="tab" tabIndex="0" aria-selected="true" 
              aria-controls="feedModeTab"
              onClick={() => props.setMode(AppMode.FEED)}>
              Feed
          </button>
          <button id="roundsMode" type="button" 
              className={"modetab-btn" +  
                  (props.mode === AppMode.ROUNDS ? " modetab-selected" : "") } 
              role="tab" tabIndex="-1" aria-selected="false" 
              aria-controls="roundsModeTab"
              onClick={() => props.setMode(AppMode.ROUNDS)}>
              Rounds
          </button>
          <button id="coursesMode" type="button" 
              className={"modetab-btn" +  
                  (props.mode === AppMode.COURSES ? " modetab-selected" : "") } 
              role="tab" tabIndex="-1" aria-selected="false" 
              aria-controls="coursesModeTab"
              onClick={() => props.setMode(AppMode.COURSES)}>
              Courses
          </button>
          <button id="buddiesMode" type="button" 
              className={"modetab-btn" +  
                  (props.mode === AppMode.BUDDIES ? " modetab-selected" : "") } 
              role="tab" tabIndex="-1" aria-selected="false" 
              aria-controls="buddiesModeTab"
              onClick={() => props.setMode(AppMode.BUDDIES)}>
              Buddies
          </button>
          <button id="badgesMode" type="button" 
              className={"modetab-btn" +  
                  (props.mode === AppMode.BADGES ? " modetab-selected" : "") } 
              role="tab" tabIndex="-1" aria-selected="false" 
              aria-controls="badgesModeTab"
              onClick={() => props.setMode(AppMode.BADGES)}>
              Badges
          </button>
      </div> : null
      );
}

export default ModeTabs;