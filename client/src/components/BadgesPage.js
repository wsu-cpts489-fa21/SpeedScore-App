import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalPopup from './modal_popup';

class BadgesPage extends React.Component {

   constructor() {  
      super();  
      this.state = {  
        showModalPopup: false  
      }  
   } 

   // Displays popup modal to give badge information
   isShowPopup = (status, badge, name) => {  
   this.setState({ showModalPopup: status,
                     badge: badge,
                     name: name});  
   };  

   // Helper function to render table with badge information
   renderTable = () => {
      const table = [];
      for (let r = 0; r < Object.keys(this.props.badges).length; ++r) {
         table.push(
            <tr id={"badge" + r} key={r} onClick={() => this.isShowPopup(true, Object.values(this.props.badges)[r], Object.keys(this.props.badges)[r])} className="centered"> 
               <td>
                  <div>
                     {Object.values(this.props.badges)[r].level === "level0" ?
                        <div>
                           <img src={Object.values(this.props.badges)[r].notBadge} height="100px"/> 
                        </div> :
                        <div>
                           <img src={Object.values(this.props.badges)[r].badge} height="100px"/>
                        </div>
                     }
                  </div>
                  <div>
                     {Object.values(this.props.badges)[r].level === "level0" ? 
                        <div>
                           <FontAwesomeIcon icon="star"/>
                           <FontAwesomeIcon icon="star"/>
                           <FontAwesomeIcon icon="star"/> 
                        </div> :
                        Object.values(this.props.badges)[r].level === "level1" ?
                           <div>
                              <FontAwesomeIcon icon="star" color="gold"/>
                              <FontAwesomeIcon icon="star"/>
                              <FontAwesomeIcon icon="star"/> 
                           </div> :
                           Object.values(this.props.badges)[r].level === "level2" ?
                              <div>
                                 <FontAwesomeIcon icon="star" color="gold"/>
                                 <FontAwesomeIcon icon="star" color="gold"/>
                                 <FontAwesomeIcon icon="star"/> 
                              </div> :
                              <div>
                                 <FontAwesomeIcon icon="star" color="gold"/>
                                 <FontAwesomeIcon icon="star" color="gold"/>
                                 <FontAwesomeIcon icon="star" color="gold"/> 
                              </div>}                     
                  </div>
               </td>
               <td>
                  {Object.values(this.props.badges)[r].name}
               </td>
            </tr>
         )
      }
      return table;
   }

   render() {
      return(
         <div id="roundsModeTab" className="mode-page" role="tabpanel"
            aria-label="Rounds Tab" tabIndex="0">
            <ModalPopup  
               showModalPopup={this.state.showModalPopup}  
               onPopupClose={this.isShowPopup}
               badge={this.state.badge}
               displayBadges={this.props.displayBadges}
               addDisplayBadges={this.props.addDisplayBadges}
               removeDisplayBadges={this.props.removeDisplayBadges}
               name={this.state.name}/>
            <h1 className="mode-page-header">BADGES</h1>
            <table id="roundsTable" className="table table-hover caption-top">
               <thead className="table-light">
               <th> Select up to 3 to display </th>
               <tr>
                  <th scope="col" role="columnheader" 
                     className="sortable-header cell-align-middle centered" 
                     aria-sort="none">
                     Badge
                  </th>
                  <th scope="col" role="columnheader"
                     className="sortable-header cell-align-middle centered"
                     aria-sort="none">
                     Name
                  </th>
               </tr>
               </thead>
               <tbody>
                  {this.renderTable()}
               </tbody>
            </table>        
      </div>
      );
   }   
}

export default BadgesPage;