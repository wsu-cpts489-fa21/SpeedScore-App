import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import badges from './Badges.js'


import ModalPopup from './modal_popup';


class BadgesPage extends React.Component {



   constructor() {  
      super();  
      this.state = {  
        showModalPopup: false  
      }  
    }  
    isShowPopup = (status, badge) => {  
      this.setState({ showModalPopup: status,
                      badge: badge});  
    };  


   
   renderTable = () => {
      const table = [];
      for (let r = 0; r < Object.keys(badges).length; ++r) {
         table.push(
            <tr key={r} onClick={() => this.isShowPopup(true, Object.values(badges)[r])} className="centered">
               <td>
                  <div>
                     <img src={Object.values(badges)[r].badge} height="100px"/>
                  </div>
                  <div>
                     <FontAwesomeIcon icon="star" color="gold"/>
                     <FontAwesomeIcon icon="star"/>
                     <FontAwesomeIcon icon="star"/>
                  </div>
               </td>
               <td>
                  {Object.values(badges)[r].name}
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
            ></ModalPopup>  
            <h1 className="mode-page-header">BADGES</h1>
            <table id="roundsTable" className="table table-hover caption-top">
               <thead className="table-light">
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