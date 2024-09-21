import React from 'react';


// to gdy mamy przycisk jakis na stronie plus w app.js tworzymy metode handlecitysubmit
//<form onSubmit = {props.submit}></form>
const  Form = props => {
    return (  
        <form onSubmit = {props.submit}>
            <input 
            type ="text" 
            value={props.value}
            onChange={props.change}
            placeholder="Wpisz miasto"
            
            >

            </input>
            
            
        </form>
    );
}
 
export default Form;