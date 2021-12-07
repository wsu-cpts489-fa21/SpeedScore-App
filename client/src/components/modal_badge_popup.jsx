import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Popup modal to display new badges unlocked
class ModalBadgePopup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false  
        };  
    }  
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  
  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    }  

    // Button to add badge to display badges list
    handleAdd = (r) => {
        let test = {level: Object.values(this.props.newBadges)[r].level,
                    badge: Object.values(this.props.newBadges)[r].badge,
                    name: Object.keys(this.props.newBadges)[r]}
        this.props.addDisplayBadges(test)
    }

    // Button to removed badge from display badges list
    handleRemove = (r) => {
        let test = {level: Object.values(this.props.newBadges)[r].level,
                    badge: Object.values(this.props.newBadges)[r].badge,
                    name: Object.keys(this.props.newBadges)[r]}
        this.props.removeDisplayBadges(test)
    }

    renderTable = () => {
        const table = [];
        for (let r = 0; r < Object.keys(this.props.newBadges).length; ++r) {            
            if (Object.values(this.props.newBadges)[r].level != this.props.oldBadges[Object.keys(this.props.newBadges)[r]]) {
                table.push(
                    <tr key={r} className="centered">
                        <td>
                            <div>
                                <div>
                                    <img src={Object.values(this.props.newBadges)[r].badge} height="100px"/>
                                </div>    
                            </div>
                            <div>
                                {Object.values(this.props.newBadges)[r].level === "level1" ?
                                    <div>
                                        <FontAwesomeIcon icon="star" color="gold"/> 
                                    </div> :
                                    Object.values(this.props.newBadges)[r].level === "level2" ?
                                    <div>
                                        <FontAwesomeIcon icon="star" color="gold"/> 
                                        <FontAwesomeIcon icon="star" color="gold"/> 
                                    </div> :
                                    <div>
                                        <FontAwesomeIcon icon="star" color="gold"/> 
                                        <FontAwesomeIcon icon="star" color="gold"/> 
                                        <FontAwesomeIcon icon="star" color="gold"/> 
                                    </div>
                                }
                            </div>
                        </td>
                        <td>
                            {Object.values(this.props.newBadges)[r].level === "level1" ?
                                    <div>
                                        {Object.values(this.props.newBadges)[r].level1.name}
                                    </div> :
                                    Object.values(this.props.newBadges)[r].level === "level2" ?
                                    <div>
                                        {Object.values(this.props.newBadges)[r].level2.name}
                                    </div> :
                                    <div>
                                        {Object.values(this.props.newBadges)[r].level3.name}
                                    </div>
                            }
                        </td>
                        <td>
                            {Object.values(this.props.newBadges)[r].level === "level1" ?
                                    <div>
                                        {Object.values(this.props.newBadges)[r].level1.description}
                                    </div> :
                                    Object.values(this.props.newBadges)[r].level === "level2" ?
                                    <div>
                                        {Object.values(this.props.newBadges)[r].level2.description}
                                    </div> :
                                    <div>
                                        {Object.values(this.props.newBadges)[r].level3.description}
                                    </div>
                            }
                        </td>
                        <td>
                            {Object.keys(this.props.newBadges)[r] in this.props.displayBadges ?
                                <button onClick= {() => this.handleRemove(r)}>
                                    <FontAwesomeIcon icon="times" color="red"/> 
                                </button> :
                                null
                            }
                            {!(Object.keys(this.props.newBadges)[r] in this.props.displayBadges) && Object.keys(this.props.displayBadges).length < 3 ?
                                <button onClick= {() => this.handleAdd(r)}>
                                    <FontAwesomeIcon icon="check-square" color="green"/> 
                                </button> :
                                null
                            }
                        </td>
                    </tr>
                )
            }
        }
        return table;
    }
  
    render() {  
        return (  
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered>  
                    <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                            NEW BADGE!
                         </Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <table id="roundsTable" className="table table-hover caption-top centered">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" role="columnheader" 
                                        className="sortable-header cell-align-middle" 
                                        aria-sort="none">
                                        Badge
                                    </th>
                                    <th scope="col" role="columnheader"
                                        className="sortable-header cell-align-middle"
                                        aria-sort="none">
                                        Name
                                    </th>
                                    <th scope="col" role="columnheader"
                                        className="sortable-header cell-align-middle"
                                        aria-sort="none">
                                        Description
                                    </th>
                                    <th>
                                        Select
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.newBadges === undefined ? 
                                    null: this.renderTable()
                                }
                            </tbody>
                        </table>  
                    </Modal.Body>  
                </Modal>  
            </Fragment>  
        );  
    }  
}  
  
export default (ModalBadgePopup);