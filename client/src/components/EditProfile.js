import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppMode from './AppMode';
import App from './App';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.userData.accountData.id.toLowerCase().indexOf('@google') > -1
            || this.props.userData.accountData.id.toLowerCase().indexOf('@github') > -1)
        {
            // For OAuth.
            this.state = {
                // accountData:
                    id: this.props.userData.accountData.id,
                // identityData:
                    displayName: this.props.userData.identityData.displayName,
                    profilePic: this.props.userData.identityData.profilePic,
                // speedgolfData:
                    bio: this.props.userData.speedgolfData.bio,
                    homeCourse: this.props.userData.speedgolfData.homeCourse,
                    firstRound: this.props.userData.speedgolfData.firstRound,
                    clubComments: this.props.userData.speedgolfData.clubComments,
                    idValid: true,
                    securityQuestionValid: true,
                    securityAnswerValid: true,
                    displayNameValid: true
            }
        }
        else
        {
            this.state = {
                // accountData:
                    id: this.props.userData.accountData.id,
                    password: this.props.userData.accountData.password,
                    securityQuestion: this.props.userData.accountData.securityQuestion,
                    securityAnswer: this.props.userData.accountData.securityAnswer,
                // identityData:
                    displayName: this.props.userData.identityData.displayName,
                    profilePic: this.props.userData.identityData.profilePic,
                // speedgolfData:
                    bio: this.props.userData.speedgolfData.bio,
                    homeCourse: this.props.userData.speedgolfData.homeCourse,
                    firstRound: this.props.userData.speedgolfData.firstRound,
                    clubComments: this.props.userData.speedgolfData.clubComments,
                    idValid: true,
                    securityQuestionValid: true,
                    securityAnswerValid: true,
                    displayNameValid: true
            }
        }

        this.dataIsInvalid = false;
        this.idError = React.createRef();
        this.securityQuestionError = React.createRef();
        this.securityAnswerError = React.createRef();
        this.displayNameError = React.createRef();
    }

    componentDidUpdate() {
        if (this.dataIsInvalid) 
        {
          if (!this.state.displayNameValid)
              this.displayNameError.current.focus();

          if (!this.state.securityAnswerValid) {
              this.securityAnswerError.current.focus();
          }
          if (!this.state.securityQuestionValid) {
              this.securityQuestionError.current.focus();
          }
          if (!this.state.idValid) {
              this.idError.current.focus();
          } 
          
          this.dataIsInvalid = false;
        }
    }

    idIsValid = (id) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(id).toLowerCase());
    }

    handleChange = (event) => {
        const name = event.target.name;

        // Set the new value to state values.
        this.setState({[name]: event.target.value});
    } 

    handleSubmit = async(event) => {
        event.preventDefault();

        // Variables defining validity of input fields
        const idValid = this.idIsValid(this.state.id);
        const sqValid = (this.state.securityQuestion.length > 0);
        const saValid = (this.state.securityAnswer.length > 0);
        const dnValid = (this.state.displayName.length > 0);

        let newUserData = {};

        if (idValid && sqValid && saValid && dnValid)
        {
            // If user is logged in through OAuth.
            if (this.props.userData.accountData.id.toLowerCase().indexOf('@google') > -1
                || this.props.userData.accountData.id.toLowerCase().indexOf('@github') > -1)
            {
                newUserData = {
                    accountData: {
                        id: this.state.id
                    },
                    identityData: {
                        displayName: this.state.displayName,
                        profilePic: this.state.profilePic
                    },
                    speedgolfData: {
                        bio: this.state.bio,
                        homeCourse: this.state.homeCourse,
                        clubComments: this.state.clubComments
                    }
                }
            }
            else
            {
                newUserData = {
                    accountData: {
                        id: this.state.id,
                        password: this.state.password,
                        securityQuestion: this.state.securityQuestion,
                        securityAnswer: this.state.securityAnswer
                    },
                    identityData: {
                        displayName: this.state.displayName,
                        profilePic: this.state.profilePic
                    },
                    speedgolfData: {
                        bio: this.state.bio,
                        homeCourse: this.state.homeCourse,
                        clubComments: this.state.clubComments
                    }
                }
            }

            // Call the PUT userRoute to update database.
            const url = '/users/' + this.props.userData.accountData.id;
            let res = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                
                method: 'PUT',
                body: JSON.stringify(newUserData)
            });

            if (res.status == 200)
            {
                // If userData is updated in database, update it in UI.
                this.props.setMode(AppMode.FEED);
                this.props.updateProfile(newUserData);
                this.props.toggleToastFunction();
                // this.props.getUserData(this.state.id);
            }
            else
            {
                alert('ERROR: User profile not updated ' + res.status);
                return false;
            }
        }

        // Data entered is one or more fields is invalid.
        // Check which field is invalid.
        const idVal = (!idValid ? "" : this.state.id);
        const sqVal = (!sqValid ? "" : this.state.securityQuestion);
        const saVal = (!saValid ? "" : this.state.securityAnswer);
        const dnVal = (!dnValid ? "" : this.state.displayName);

        this.setState({
            id: idVal,
            securityQuestion: sqVal,
            securityAnswer: saVal,
            displayName: dnVal,
            idValid: idValid,
            securityQuestionValid: sqValid,
            securityAnswerValid: saValid,
            displayNameValid: dnValid
        });

        this.dataIsInvalid = true;
    }

    renderErrorBox = () => {
        if (this.state.idValid && this.state.securityQuestionValid && this.state.securityAnswerValid && this.state.displayNameValid) {
            return null;
        }
        return (
        <p id="errorBox" className="alert alert-danger centered">
          {!this.state.idValid ?
            <a id="idError" href="#id" 
                className="alert-link" 
                ref={this.idError}>
                Enter a valid email address<br/>
            </a> : null
          }

           {!this.state.securityQuestionValid ?
            <a id="securityQuestionError" href="#securityQuestion" 
                className="alert-link" 
                ref={this.securityQuestionError}>
                Enter a security question<br/>
            </a> : null
          }

          {!this.state.securityAnswerValid ?
            <a id="securityAnswerError" href="#securityAnswer" 
                className="alert-link" 
                ref={this.securityAnswerError}>
                Enter a security answer<br/>
            </a> : null
          }

          {!this.state.displayNameValid ?
            <a id="displayNameError" href="#displayName" 
                className="alert-link" 
                ref={this.displayNameError}>
                Enter a display Name<br/>
            </a> : null
          }
        </p>
        );
    }

    render() {

        return(
            <>
            <h1 className="mode-page-header">Account & Profile</h1>

            {/* Render renderErrorBox() if any field is invalid */}
            {this.dataIsInvalid ? this.renderErrorBox() : null}

            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header id="accountAccordion">Account</Accordion.Header>
                    <Accordion.Body>
                    {/* Email */}
                    <form noValidate>
                        <div className="mb-3 centered">
                            <label htmlFor="email" className="form-label">
                                Email: 
                                <input id="id" className="form-control centered"
                                    value={this.state.id}
                                    name="id"
                                    type="email"
                                    size="35"
                                    aria-describedby="emailDescr"
                                    required={true}
                                    onChange={(event) => {this.handleChange(event)}}/>
                            </label>
                            <div id="emailDescr" className="form-text">
                                Enter a valid email address
                            </div>
                        </div>

                        {/* Password */}
                    {this.props.userData.accountData.id.toLowerCase().indexOf('@google') > -1
                        || this.props.userData.accountData.id.toLowerCase().indexOf('@github') > -1 ? null : 
                        <>
                        <div className="mb-3 centered">
                            <label htmlFor="password" className="form-label">
                                Password:
                                <input id="password"
                                    className="form-control centered"
                                    value={this.state.password}
                                    name="password"
                                    type="password"
                                    size="35"
                                    aria-describedby="passwordDescr"
                                    readOnly/>
                            </label>  
                            <div id="passwordDescr" className="form-text">
                                Password must be at least eight characters with at least one upper case letter, one upper case letter, and one number
                            </div>
                        </div>

                        {/* Security Question */}
                        <div className="mb-3 centered">
                            <label htmlFor="securityQuestion" className="form-label">
                                Security Question:
                                <textarea id="securityQuestion" className="form-control centered"
                                    value={this.state.securityQuestion}
                                    name="securityQuestion"
                                    size="35"
                                    rows="2"
                                    cols="35"
                                    maxLength="100"
                                    aria-describedby="securityQuestionDescr"
                                    onChange={this.handleChange}/>
                            </label>
                            <div id="securityQuestionDescr" className="form-text">
                                Enter a question whose answer you can easily remember
                            </div>
                        </div>

                    {/* Security Answer */}
                        <div className="mb-3 centered">
                            <label htmlFor="securityAnswer" className="form-label">
                                Answer to Security Question:
                                <textarea id="securityAnswer" className="form-control centered"
                                    value={this.state.securityAnswer}
                                    name="securityAnswer"
                                    type="text"
                                    rows="2"
                                    cols="35"
                                    maxLength="100"
                                    aria-describedby="securityAnswerDescr"
                                    onChange={this.handleChange}/>
                            </label>
                            <div id="securityAnswerDescr" className="form-text">
                                Enter an easily remembered answer to the security question
                            </div>
                        </div>
                    </>
                }
                    </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Name & Picture</Accordion.Header>
                    <Accordion.Body>
                    {/* Display Name */}
                    <form noValidate>
                    <div className="mb-3 centered">
                        <label htmlFor="displayName" className="form-label">
                            Display Name:
                            <input id="displayName" className="form-control centered"
                                value={this.state.displayName}
                                name="displayName"
                                type="text"
                                size="35"
                                aria-describedby="displayNameDescr" 
                                onChange={this.handleChange}/>
                        </label>
                        <div id="displayNameDescr" className="form-text">
                            Your name within the app (defaults to your email)
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div className="mb-3 centered">
                        <label htmlFor="profilePic" className="form-label">
                            Profile Picture:<br/>
                            <input id="profilePic"
                                className="form-control centered"
                                value={this.state.profilePic}
                                name="profilePic"
                                type="file"
                                accept=".png, .gif, .jpg"
                                aria-describedby="profilePicDescr"
                                onChange={this.handleChange}/>
                        </label>
                        <div id="profilePicDescr" className="form-text">
                            A profile picture that represents you in the app (defaults to a generic picture)
                        </div>
                    </div>
                    </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Speedgolf Info</Accordion.Header>
                    <Accordion.Body>
                    <form noValidate>
                    {/* Personal Speedgolf Bio */}
                    <div className="mb-3 centered">
                        <label htmlFor="profilePic" className="form-label">
                            Personal Speedgolf Bio (Optional):
                            <textarea id="profilePic"
                                className="form-control centered"
                                value={this.state.bio}
                                name="bio"
                                type="text"
                                rows="5"
                                cols="40"
                                maxLength="500"
                                aria-describedby="profilePicDescr"
                                onChange={this.handleChange}/>
                        </label>
                        <div id="profilePicDescr" className="form-text">
                            A short personal bio about your speedgolf journey, Maximum of 500 characters.
                        </div>
                    </div>

                    {/* Home Cuorse */}
                    <div className="mb-3 centered">
                        <label htmlFor="sgHomeCourse" className="form-label">
                            Home Course (Optional):
                            <input id="sgHomeCourse"
                                className="form-control centered"
                                value={this.state.homeCourse}
                                name="homeCourse"
                                type="text"
                                size="35"
                                aria-describedby="sgHomeCourseDescr"
                                onChange={this.handleChange} />
                        </label>
                        <div id="sgHomeCourseDescr" className="form-text">
                            Course where you play most of your speedgolf.
                        </div>
                    </div>

                    {/* Comments on Clubs */}
                    <div className="mb-3 centered">
                        <label htmlFor="sgClubComments" className="form-label">
                            Comments on Clubs (Optional):
                            <textarea id="sgClubComments"
                                className="form-control centered"
                                value={this.state.clubComments}
                                name="clubComments"
                                type="text"
                                rows="2"
                                cols="40"
                                maxLength="500"
                                aria-describedby="sgClubCommentsDescr" 
                                onChange={this.handleChange}/>
                        </label>
                        <div id="sgClubCommentsDescr" className="form-text">
                            Describe your clubs in greater detail.
                        </div>
                    </div>
                    </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="mode-page-btn-container">
                <button id="updateProfileBtn" type="button" className="mode-page-btn action-dialog action-button" onClick={this.handleSubmit}>
                  <FontAwesomeIcon icon="edit"/>
                    &nbsp;Update Profile
                </button>
                <button type="button" id="updateProfileCancelBtn"
                        className="mode-page-btn-cancel action-dialog cancel-button" 
                        onClick={() => {this.props.setMode(AppMode.FEED)}}>
                  <FontAwesomeIcon icon="window-close"/>&nbsp;Cancel
                </button>
            </div>
            </>
        );
    }
}

export default EditProfile;