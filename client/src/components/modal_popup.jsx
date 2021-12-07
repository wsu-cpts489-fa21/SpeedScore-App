import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  
class ModalPopup extends Component {  
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

    handleAdd = () => {
        let test = this.props.displayBadges
        test[this.props.name] = {level: this.props.badge.level,
                                 badge: this.props.badge.badge}
        this.props.updateDisplayBadges(test)
    }

    handleRemove = () => {
        let test = this.props.displayBadges
        delete test[this.props.name]
        this.props.updateDisplayBadges(test)
    }

    renderTable = () => {
        const table = [];

        table.push(
            <tr key={0} className="centered">
                <td>
                    <div>
                        {this.props.badge.level === "level1" || this.props.badge.level === "level2" || this.props.badge.level === "level3" ?
                            <div>
                                <img src={this.props.badge.badge} height="100px"/> 
                            </div> :
                            <div>
                                <img src={this.props.badge.notBadge} height="100px"/>
                            </div>    
                        }
                    </div>
                    <div>
                        {this.props.badge.level === "level1" || this.props.badge.level === "level2" || this.props.badge.level === "level3" ?
                            <div>
                                <FontAwesomeIcon icon="star" color="gold"/> 
                            </div> :
                            <div>
                                <FontAwesomeIcon icon="star"/>
                            </div>
                        }
                    </div>
                </td>
                <td>
                    {this.props.badge.level1.name}
                </td>
                <td>
                    {this.props.badge.level1.description}
                </td>
                <td>
                    {this.props.name in this.props.displayBadges && this.props.badge.level == "level1" ?
                        <button onClick= {() => this.handleRemove()}>
                            <FontAwesomeIcon icon="times" color="red"/> 
                        </button> :
                        null
                    }
                    {!(this.props.name in this.props.displayBadges) && Object.keys(this.props.displayBadges).length < 3 && this.props.badge.level == "level1" ? 
                        <button onClick= {() => this.handleAdd()}>
                            <FontAwesomeIcon icon="check-square" color="green"/> 
                        </button> :
                        null
                    }
                </td>
            </tr>)
        table.push(
            <tr key={1} className="centered">
                <td>
                    <div>
                        {this.props.badge.level === "level2" || this.props.badge.level === "level3"?
                            <div>
                                <img src={this.props.badge.badge} height="100px"/> 
                            </div> :
                            <div>
                                <img src={this.props.badge.notBadge} height="100px"/>
                            </div>    
                        }
                    </div>
                    <div className="centered">
                        {this.props.badge.level === "level2" || this.props.badge.level === "level3" ?
                            <div>
                                <FontAwesomeIcon icon="star" color="gold"/> 
                                <FontAwesomeIcon icon="star" color="gold"/> 
                            </div> :
                            <div>
                                <FontAwesomeIcon icon="star"/>
                                <FontAwesomeIcon icon="star"/>
                            </div>
                        }
                    </div>
                </td>
                <td>
                    {this.props.badge.level2.name}
                </td>
                <td>
                    {this.props.badge.level2.description}
                </td>
                <td>
                    {this.props.name in this.props.displayBadges && this.props.badge.level == "level2" ?
                        <button onClick= {() => this.handleRemove()}>
                            <FontAwesomeIcon icon="times" color="red"/> 
                        </button> :
                        null
                    }
                   {!(this.props.name in this.props.displayBadges) && Object.keys(this.props.displayBadges).length < 3 && this.props.badge.level == "level2" ?
                        <button onClick= {() => this.handleAdd()}>
                            <FontAwesomeIcon icon="check-square" color="green"/> 
                        </button> :
                        null
                    }
                </td>
            </tr>
        )
        table.push(
            <tr key={2} className="centered">
                <td>
                    <div>
                        {this.props.badge.level === "level3"?
                            <div>
                                <img src={this.props.badge.badge} height="100px"/> 
                            </div> :
                            <div>
                                <img src={this.props.badge.notBadge} height="100px"/>
                            </div>   
                        }
                    </div>
                    <div className="centered">
                        {this.props.badge.level === "level2" || this.props.badge.level === "level3" ?
                            <div>
                                <FontAwesomeIcon icon="star" color="gold"/> 
                                <FontAwesomeIcon icon="star" color="gold"/> 
                                <FontAwesomeIcon icon="star" color="gold"/> 
                            </div> :
                            <div>
                                <FontAwesomeIcon icon="star"/>
                                <FontAwesomeIcon icon="star"/>
                                <FontAwesomeIcon icon="star"/>
                            </div>
                        }
                    </div>
                </td>
                <td>
                    {this.props.badge.level3.name}
                </td>
                <td>
                    {this.props.badge.level3.description}
                </td>
                <td>
                    {this.props.name in this.props.displayBadges && this.props.badge.level == "level3" ?
                        <button onClick= {() => this.handleRemove()}>
                            <FontAwesomeIcon icon="times" color="red"/> 
                        </button> :
                        null
                    }
                    {!(this.props.name in this.props.displayBadges) && Object.keys(this.props.displayBadges).length < 3 && this.props.badge.level == "level3" ?
                        <button onClick= {() => this.handleAdd()}>
                            <FontAwesomeIcon icon="check-square" color="green"/> 
                        </button> :
                        null
                    }
                </td>
            </tr>
        )

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
                            {this.props.badge === undefined ? 
                                null: this.props.badge.name
                            }
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
                                {this.props.badge === undefined ? 
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
  
export default (ModalPopup);