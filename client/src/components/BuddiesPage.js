import React,{useState} from 'react';
import logo from '../images/sslogo2.png'

//This is the previous class based BuddiePage

// class BuddiesPage extends React.Component {

//     // render() {
//     //     return (
//     //         <div id="buddiesModeTab" className="mode-page" role="tabpanel"
//     //              aria-label="Buddies Tab" tabIndex="0">
//     //             <h1 className="mode-page-header">Buddies</h1>
//     //             <p className="mode-page-content">This page is under construction.</p>
//     //             <img className="mode-page-icon" 
//     //                  src={logo} alt="SpeedScore logo"></img>
//     //         </div>
//     //     );
//     // }   
// }


//I change this from class to finction based-hook
const  BuddiesPage = () =>{

    //The below usestate is an exampleof hook
    //useState will make the value will reactive
    //we can use setName to change it
    const [name,setName] = useState("This page is under construction.");
    const handleClick = () =>{
        setName("This page is Ready for deploy");
        //<button onClick={handleClick}>Click me </button>
    }

    return (
    <div id="buddiesModeTab" className="mode-page" role="tabpanel"
         aria-label="Buddies Tab" tabIndex="0">
        <h1 className="mode-page-header">Buddies</h1>
        <p className="mode-page-content">{name}</p>
        <img className="mode-page-icon" 
             src={logo} alt="SpeedScore logo"></img>
    </div>
    );




}







export default BuddiesPage;