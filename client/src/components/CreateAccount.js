/*
   Functional components for the create account form
*/

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import profilePic from './../images/DefaultProfilePic.jpg'
import { useState, useRef, useEffect } from 'react'

// Updates the UI after the form re-renders
const handleRender = (validFields, formSubmitted, setFormSubmitted,
                     refs) => {
   if (formSubmitted) {
      if (!validFields.securityAnswerValid) {
         refs.securityAnswerError.current.focus();
      }
      if (!validFields.securityQuestionValid) {
         refs.securityQuestionError.current.focus();
      }
      if (!validFields.repeatPasswordValid) {
         refs.repeatPasswordError.current.focus();
      }
      if (!validFields.passwordValid) {
         refs.passwordError.current.focus();
      }
      if (!validFields.accountValid) {
         refs.accountError.current.focus();
      } 
      if (!validFields.emailValid) {
         refs.emailError.current.focus();
      } 
      setFormSubmitted(false);
   }
}

// If the submitted form is valid, creates an account
// Otherwise, records the invalid fields
const handleSubmit = async(event, fields,
                           setFields, setValidFields, setFormSubmitted,
                           accountExists, createAccountDone) => {
   event.preventDefault();
   //Are fields valid?
   const eValid = emailIsValid(fields.email);
   const pValid = passwordIsValid(fields.password);
   const rpValid = (fields.password === fields.repeatPassword);
   const sqValid = (fields.securityQuestion.length > 0);
   const saValid = (fields.securityAnswer.length > 0);
   const acctAvail = !(await accountExists(fields.email));
   if (eValid && pValid && rpValid && sqValid && saValid && acctAvail) { 
      //All fields valid: create account
      const newAccount = {
            accountData: {
               id: fields.email,
               password: fields.password,
               securityQuestion: fields.securityQuestion,
               securityAnswer: fields.securityAnswer
            },
            identityData: {
               displayName: (fields.displayName !== "" ? fields.displayName : fields.email),
               profilePic: fields.profilePic
            },
            speedgolfData: {
               bio: "",
               homeCourse: "",
               firstRound: "",
               personalBest: {},
               clubs: {},
               clubComments: "",
            }
      };
      createAccountDone(newAccount);
   } else { //At least one field invalid
            //Clear out invalid fields and display errors
      const eVal = (!eValid ? "" : fields.email);
      const pVal = (!pValid ? "" : fields.password);
      const rpVal = (!rpValid ? "" : fields.repeatPassword);
      const dnVal = (fields.displayName !== "" ? fields.displayName : fields.email);
      setFields({ ...fields,
                  email: eVal,
                  password: pVal,
                  repeatPassword: rpVal,
                  displayName: dnVal });
      setValidFields({  emailValid: eValid,
                        passwordValid: pValid,
                        repeatPasswordValid: rpValid,
                        securityQuestionValid: sqValid,
                        securityAnswerValid: saValid,
                        accountValid: acctAvail });
      setFormSubmitted(true); //Ensures error message gets focus
   }
}

const emailIsValid = (email) => {
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

const passwordIsValid = (pass) => {
   const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
   return re.test(String(pass));
}

// If display name is left empty, set it to the email
const setDefaultDisplayName = (event, fields, setFields) => {
   if (event.target.value.length > 0 && fields.displayName === "") {
      setFields({ ...fields,
                  displayName: event.target.value });
   }
}

// Shows an error box corresponding to current error
const ErrorBox = ({validFields, refs}) => {
   if (validFields.emailValid && validFields.passwordValid &&
      validFields.repeatPasswordValid && validFields.securityQuestionValid &&
      validFields.securityAnswerValid) {
      return null;
   }
   return (
      <p id="errorBox" className="alert alert-danger centered">
         {!validFields.emailValid && 
            <a id="emailError" href="#email" 
               className="alert-link" 
               ref={refs.emailError}>
               Enter a valid email address<br/>
            </a>
         }
         {!validFields.accountValid && 
            <a id="accountError" href="#email" 
               className="alert-link" 
               ref={refs.accountError}>
               Account with that email already exists. Choose a different email address or reset password.<br/>
            </a>
         }
         {!validFields.passwordValid && 
            <a id="passwordError" href="#password" 
               className="alert-link" 
               ref={refs.passwordError}>
               Enter a valid password<br/>
            </a>
         }
         {!validFields.repeatPasswordValid && 
            <a id="repeatPasswordError" href="#repeatPassword" 
               className="alert-link" 
               ref={refs.repeatPasswordError}>
               Make sure repeated password matches original password<br/>
            </a>
         }
         {!validFields.securityQuestionValid && 
            <a id="securityQuestionError" href="#securityQuestion" 
               className="alert-link" 
               ref={refs.securityQuestionError}>
               Enter a security question<br/>
            </a>
         }
         {!validFields.securityAnswerValid && 
            <a id="securityAnswerError" href="#securityError" 
               className="alert-link" 
               ref={refs.securityAnswerError}>
               Enter a security answer<br/>
            </a>
         }
      </p>
   );
}

// Updates the state after a field is changed
const handleChange = (event, fields, setFields) => {
   if (event.target.name !== "profilePic") {
      setFields({ ...fields,
                  [event.target.name]: event.target.value });
      return;
   } 
   if (event.target.value.length == 0) {
      setFields({ ...fields,
                  profilePic: "" });
   } else {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load",function() {
         setFields({ ...fields,
                     profilePic: this.result });
      });
   }
}

// Displays the account form
const AccountForm = (props) => {
   const [fields, setFields] = useState({
         email: "",
         password: "",
         repeatPassword: "",
         displayName: "",
         profilePic: "",
         securityQuestion: "",
         securityAnswer: ""
      });
   const [validFields, setValidFields] = useState({
         emailValid: true,
         passwordValid: true,
         repeatPasswordValid: true,
         securityQuestionValid: true,
         securityAnswerValid: true,
         accountValid: true
      });
   const [formSubmitted, setFormSubmitted] = useState(false);
   const refs = {
      accountError: useRef(null),
      emailError: useRef(null),
      passwordError: useRef(null),
      repeatPasswordError: useRef(null),
      securityQuestionError: useRef(null),
      securityAnswerError: useRef(null)
   };
   
   useEffect(() => {
      handleRender(validFields, formSubmitted, setFormSubmitted, refs);
   });
   
   return (
      <div className="mode-page action-dialog" role="dialog" 
         aria-modal="true" aria-labelledby="createAccountHeader" tabIndex="0">
         <h1 id="createAccountHeader" className="mode-page-header">
          Create Account
         </h1>
         <ErrorBox validFields={validFields} refs={refs}/>
         <form onSubmit={(event) => handleSubmit(event, fields,
                  setFields, setValidFields, setFormSubmitted,
                  props.accountExists, props.createAccountDone)} noValidate>
            <div className="mb-3 centered">
            <label htmlFor="email" className="form-label">
               Email: 
               <input id="email"
                  value={fields.email}
                  onChange={(event) => handleChange(event, fields, setFields)}
                  onBlur={(event) => setDefaultDisplayName(event, fields, setFields)}
                  className="form-control centered"
                  name="email"
                  type="email"
                  size="35"
                  aria-describedby="emailDescr"
               />
            </label>
            <div id="emailDescr" className="form-text">
               Enter a valid email address
               </div>
            </div>
            <div className="mb-3 centered">
            <label htmlFor="password" className="form-label">
               Password:
               <input id="password"
                  value={fields.password}
                  onChange={(event) => handleChange(event, fields, setFields)}
                  className="form-control centered"
                  name="password"
                  type="password"
                  size="35"
                  aria-describedby="passwordDescr"
               />
            </label>  
            <div id="passwordDescr" className="form-text">
               Password must be at least eight characters with at least one upper case letter, one upper case letter, and one number
               </div>
            </div>
            <div className="mb-3 centered">
            <label htmlFor="repeatPassword" className="form-label">
               Repeat Password:
               <input id="repeatPassword"
                  value={fields.repeatPassword}
                  onChange={(event) => handleChange(event, fields, setFields)}
                  className="form-control centered"
                  name="repeatPassword"
                  type="password"
                  size="35"
                  aria-describedby="repeatPasswordDescr"
               />
            </label>
            <div id="repeatPasswordDescr" className="form-text">
               Repeated password must exactly match original password
            </div>
            </div>
            <div className="mb-3 centered">
            <label htmlFor="displayName" className="form-label">
               Display Name:
               <input id="displayName"
                  value={fields.displayName}
                  onChange={(event) => handleChange(event, fields, setFields)}
                  className="form-control centered"
                  name="displayName"
                  type="text"
                  size="35"
                  aria-describedby="displayNameDescr"
               />
            </label>
            <div id="displayNameDescr" className="form-text">
               Your name within the app (defaults to your email)
            </div>
            </div>
            <div className="mb-3 centered">
            <label htmlFor="profilePic" className="form-label">
               Profile Picture:<br/>
               <img id="acctProfilePicImage" 
                  src={fields.profilePic == "" ? profilePic :
                        fields.profilePic} 
                  className="fm-profile-pic" height="46" width="auto"/>
               <input id="profilePic"
                  
                  onChange={(event) => handleChange(event, fields, setFields)}
                  className="form-control centered"
                  name="profilePic"
                  type="file"
                  accept=".png, .gif, .jpg"
                  aria-describedby="profilePicDescr"
               />
            </label>
            <div id="profilePicDescr" className="form-text">
               A profile picture that represents you in the app (defaults to a generic picture)
            </div>
            </div>
            <div className="mb-3 centered">
            <label htmlFor="securityQuestion" className="form-label">
               Security Question:
               <textarea id="securityQuestion"
                  value={fields.securityQuestion}
                  onChange={(event) => handleChange(event, fields, setFields)}
                  className="form-control centered"
                  name="securityQuestion"
                  size="35"
                  rows="2"
                  cols="35"
                  maxLength="100"
                  aria-describedby="securityQuestionDescr"
               />
            </label>
            <div id="securityQuestionDescr" className="form-text">
               Enter a question whose answer you can easily remember
            </div>
            </div>
            <div className="mb-3 centered">
            <label htmlFor="securityAnswer" className="form-label">
               Answer to Security Question:
               <textarea id="securityAnswer"
                  value={fields.securityAnswer}
                  onChange={(event) => handleChange(event, fields, setFields)}
                  className="form-control centered"
                  name="securityAnswer"
                  type="text"
                  rows="2"
                  cols="35"
                  maxLength="100"
                  aria-describedby="securityAnswerDescr"
                  required={true}
               />
            </label>
            <div id="securityAnswerDescr" className="form-text">
               Enter an easily remembered answer to the security question
            </div>
            </div>
            <div className="mode-page-btn-container">
               <button type="submit" className="mode-page-btn action-dialog action-button">
                  <FontAwesomeIcon icon="user-plus"/>
                  &nbsp;Create Account
               </button>
               <button type="button" 
                     className="mode-page-btn-cancel action-dialog cancel-button"
                     onClick={props.createAccountCancel}>
               <FontAwesomeIcon icon="window-close"/>&nbsp;Cancel
               </button>
            </div>
         </form>
      </div>
    );
}

export default AccountForm;