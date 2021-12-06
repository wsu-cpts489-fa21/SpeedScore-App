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

    renderTable = () => {
        const table = [];

        table.push(
            <tr key={0} className="centered">
                <td>
                    <div>
                        <img src={this.props.badge.badge} height="100px"/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon="star" color="gold"/>
                    </div>
                </td>
                <td>
                    {this.props.badge.level1.name}
                </td>
                <td>
                    {this.props.badge.level1.description}
                </td>
            </tr>)
        table.push(
            <tr key={1} className="centered">
                <td>
                    <div>
                        <img src={this.props.badge.notBadge} height="100px"/>
                    </div>
                    <div className="centered">
                        <FontAwesomeIcon icon="star"/>
                        <FontAwesomeIcon icon="star"/>
                    </div>
                </td>
                <td>
                    {this.props.badge.level2.name}
                </td>
                <td>
                    {this.props.badge.level2.description}
                </td>
            </tr>
        )
        table.push(
            <tr key={2} className="centered">
                <td>
                    <div>
                        <img src={this.props.badge.notBadge} height="100px"/>
                    </div>
                    <div className="centered">
                        <FontAwesomeIcon icon="star"/>
                        <FontAwesomeIcon icon="star"/>
                        <FontAwesomeIcon icon="star"/>
                    </div>
                </td>
                <td>
                    {this.props.badge.level3.name}
                </td>
                <td>
                    {this.props.badge.level3.description}
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