import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect, useState} from 'react';
import RoundsMode  from './RoundsMode.js';

const RoundForm = (props) => {
  //Initiallizing the "state"
  let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
  const [state, setState] = useState({date: today.toISOString().substr(0,10), course:"", 
              type: "practice", holes: "18", strokes: 80, minutes: 60,
              seconds: "00", SGS: "140:00", pictures: [], mainPic: "", 
              videos: [], videoLinks: [], notes: "", btnIcon: "calendar", btnLabel: "Log Round"});
//Handles the updating a round
  const handleUpdate = () => {
    setState(props.roundData); //Sets state to roundData from db
    setState(prevState => ({...prevState, btnIcon: "edit", btnLabel: "Update Round"}));
  }
//Use effect allowed the app to update roundForm state if props.mode is changed
//Basically this allows the app to only call setState once edit round is triggered
//App would re render over and over again without. 
  useEffect(() => {
    if (props.mode === RoundsMode.EDITROUND) {
      handleUpdate();
    }
  }, [props.mode]);
//Computing SGS
  const computeSGS = (strokes, min, sec) =>{
    return (Number(strokes) + Number(min)) 
              + ":" + sec;
  } //Handle changes of data
  const handleChange = (event) =>{
    const {name, value} = event.target;
     if (name === "seconds") { //If user changes seconds
      setState(prevState => ({...prevState, seconds: event.target.value.length < 2 ? "0" + 
      event.target.value : event.target.value, SGS: computeSGS(state.strokes, state.minutes, 
        state.seconds)}));
    } else if (name === "strokes") { //If the user changes strokes
      setState(prevState => ({...prevState, strokes: event.target.value,
      SGS: computeSGS(state.strokes, state.minutes, state.seconds)}));

    } else if (name === "minutes") { //If the user changes minutes
      setState(prevState => ({...prevState, minutes: event.target.value,
      SGS: computeSGS(state.strokes, state.minutes, state.seconds)}));
        //Checks if input is a link
    } else if (name === "videoLinks"){ //If user adds a youtube link
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if(pattern.test(event.target.value)){
        setState(prevState => ({...prevState, videoLinks: event.target.value}));
      }
      else{
        alert("This is not a link. Please only paste links!")
      } 
     //Videos
    } else if (name === "videos") {
      const reader = new FileReader();
      if(event.target.files[0].size > 1e8){ //checks if file is under 100mb
        alert("file is too big it will not be added to your round!");
        }
      else { 
          reader.readAsDataURL(event.target.files[0]);
          reader.addEventListener("load",function() {
            setState(prevState => ({...prevState, videos: state.videos.concat(reader.result)}));
          });}//Everything else
    } else if (name !== "pictures") {
      setState(prevState => ({...prevState, [name]: event.target.value}));
    } else { //If user changes pictures
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load",function() {
        setState(prevState => ({...prevState, pictures: state.pictures.concat(reader.result)}));
      });
    }
  }

//Submit callback
const handleSubmitCallback = async() => {
  const newRound = {...state} //Sets round object as the current state
  delete newRound.btnIcon;
  delete newRound.btnLabel;
  const res = await props.saveRound(newRound, props.editId); //Calls save round
  props.toggleModalOpen();
  props.setMode(RoundsMode.ROUNDSTABLE); //Sets mode to table
}
//Handles submits
const handleSubmit = (event) => {
  event.preventDefault();
  setState(prevState => ({...prevState, btnIcon: "spinner", btnLabel: "Saving..."}));
  handleSubmitCallback();
}

return(
  <div id="roundsModeDialog" 
        className="mode-page action-dialog" role="dialog" 
        aria-modal="true" aria-labelledby="roundFormHeader" tabIndex="0">

    <form id="logRoundForm" onSubmit={handleSubmit} noValidate>

      <div className="mb-3 centered">
        <label htmlFor="roundDate" className="form-label"> Date:
          <input id="roundDate" name="date"  
            className="form-control centered" type="date" 
            aria-describedby="roundDateDescr" value={state.date} 
            onChange={handleChange} required/>
        </label>
        <div id="roundDateDescr" className="form-text">
          Enter a valid date
        </div>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundCourse" className="form-label"> Course:
          <input id="roundCourse" name="course" 
            className="form-control centered" type="text" 
            aria-describedby="roundCourseDescr"
            size="50" maxLength="50"  value={state.course} 
            onChange={handleChange} required />
        </label>
        <div id="roundCourseDescr" className="form-text">
          Enter a course name of at most 50 characters
        </div>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundType"> Type:
          <select id="roundType" name="type" id="roundType" className="form-control centered"
            value={state.type} onChange={handleChange}>
              <option value="practice">Practice</option>
              <option value="tournament">Tournament</option>
          </select> 
        </label>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundHoles"> Holes:
          <select id="roundHoles" name="holes" 
            className="form-control centered" value={state.holes} onChange={handleChange}>
              <option value="9">9</option>
              <option value="18">18</option>
          </select> 
        </label>
      </div>
      
      <div className="mb-3 centered">
        <label htmlFor="roundStrokes"> Strokes:
          <input id="roundStrokes" name="strokes" className="form-control centered" type="number" 
            min="9" max="200" value={state.strokes} aria-describedby="roundStrokesDescr"
            onChange={handleChange} required/>
        </label>
        <div id="roundStrokesDescr" className="form-text">
          Enter a strokes value between 9 and 200
        </div>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundMinutes"> Time:
          <input id="roundMinutes" name="minutes" type="number" size="3"
            aria-describedby="roundTimeDescr"
            min="10" max="400" value={state.minutes} style={{textAlign: "right"}}
            onChange={handleChange} required/> : 
          <input id="roundSeconds" name="seconds" type="number" size="2"
            aria-describedby="roundTimeDescr"
            min="0" max="60" value={state.seconds} onChange={handleChange}
            required/>
        </label>
        <div id="roundTimeDescr" className="form-text">
          Enter a minutes value between 10 and 400, and a seconds value between 0 and 59
        </div>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundSGS"> Speedgolf Score:
          <input name="SGS" className="form-control centered" type="text" 
            size="6" value={state.SGS} readOnly={true}/>
        </label>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundNotes"> Notes:
          <textarea name="notes" id="roundNotes" className="form-control centered" 
            aria-describedby="roundNotesDescr"
            rows="6" cols="75" maxLength="500"
            value={state.notes} onChange={handleChange}>
          </textarea>
        </label>
        <div id="roundNotesDescr" className="form-text">
          Enter optional round notes of up to 500 characters
        </div>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundPictures" className="form-label">
          Add pictures to your round:
          {state.pictures.map((image) => (<div className="round-pic"><img src={image} className="fm-round-pictures round-pic" 
            height="100" width="100" onClick={() => setState(prevState => ({...prevState, mainPic: image}))}/>
              <button type="button" 
                className="pic-delete-btn"
                onClick={() => setState(prevState => ({...prevState,pictures: state.pictures.filter(function(picture){
                return picture !== image})}))}>
                <span>&nbsp;Delete</span>
              </button>
          </div> ))}             
          <input id ="pictures"
            className="form-control centered"
            name="pictures"
            type="file"
            accept=".png, .gif, .jpg"
            aria-describedby="roundPicturesDescr"
            onChange={handleChange}/>
        </label>
      </div>

      {/* <div className="mb-3 centered">
        <label htmlFor="roundMainPicture" className="form-label">
          Click on the main picture that you would like to display on your round table!:
          <img id="roundMainPic"
            aria-describedby="roundNotesDescr"
            src={state.mainPic === "" ?
            "" : state.mainPic }
            className="fm-round-pictures round-pic" 
            height="125" width="125"/>
        </label>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundVideos" className="form-label">
          If you have video files add them here:
        <input id ="videos"
          className="form-control centered"
          name="videos"
          type="file"
          accept="video/*"
          aria-describedby="roundVideoDescr"
          onChange={handleChange}/>
        </label>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="videoLinks"> If you have youtube links add them here:
          <textarea name="videoLinks" id="videoLinks" className="form-control centered" 
            aria-describedby="videoLinksDescr"
            rows="6" cols="75" maxLength="500"
            onChange={handleChange}>
          </textarea>
        </label>
      </div>
            
      <div className="mode-page-btn-container">
        <button id="roundFormSubmitBtn" type="submit" className="mode-page-btn action-dialog action-button">
          <FontAwesomeIcon icon={state.btnIcon}  className={state.btnIcon == "spinner" ? "fa-spin" : ""}/>
          <span>
            &nbsp;{state.btnLabel}
          </span>
        </button>
        <button type="button" 
          className="mode-page-btn-cancel action-dialog cancel-button"
          onClick={() => {props.setMode(RoundsMode.ROUNDSTABLE);
                          props.toggleModalOpen();}}>
            <FontAwesomeIcon icon="window-close"/>
          <span>
            &nbsp;Cancel
          </span>
        </button>
      </div> */}
      
      <div className="mb-3 centered">
        <label htmlFor="roundMainPicture" className="form-label">
          Click on the main picture that you would like to display on your round table!:
          <img id="roundMainPic"
            aria-describedby="roundNotesDescr"
            src={state.mainPic === "" ?
            "" : state.mainPic }
            className="fm-round-pictures round-pic" 
            height="125" width="125"/>
        </label>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="roundVideos" className="form-label">
          If you have video files add them here:
          <input id ="videos"
            className="form-control centered"
            name="videos"
            type="file"
            accept="video/*"
            aria-describedby="roundVideoDescr"
            onChange={handleChange}/>
        </label>
      </div>

      <div className="mb-3 centered">
        <label htmlFor="videoLinks"> If you have youtube links add them here:
          <textarea name="videoLinks" id="videoLinks" className="form-control centered" 
            aria-describedby="videoLinksDescr"
            rows="6" cols="75" maxLength="500"
            onChange={handleChange}>
          </textarea>
        </label>
      </div>

      <div className="mode-page-btn-container">
        <button type="submit" className="mode-page-btn action-dialog action-button">
          <FontAwesomeIcon icon={state.btnIcon}  className={state.btnIcon == "spinner" ? "fa-spin" : ""}/>
          <span>
            &nbsp;{state.btnLabel}
          </span>
        </button>
        <button type="button" 
          className="mode-page-btn-cancel action-dialog cancel-button"
          onClick={() => {props.setMode(RoundsMode.ROUNDSTABLE);
          props.toggleModalOpen();}}>
          <FontAwesomeIcon icon="window-close"/>
          <span>
            &nbsp;Cancel
          </span>
        </button>
      </div>  

    </form>
  </div>);
}

export default RoundForm;