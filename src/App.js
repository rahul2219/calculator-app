
import { useState } from 'react';

function App() {
  const [calc,setCalc]=useState('');
  const [result,setResult]=useState('');
  const operators = ['+','-','.','/','*'];
  const updateCalc = (value)=>{
    // We write this if condition because we don't want to add multiple operators in the display and also we don't want to display an operator without a digit.  
    if((operators.includes(value) && calc === '') || (operators.includes(value)&&operators.includes(calc.slice(-1)))){
      return;
    }
    // we set the calc with calc+value so as to update and show the user what he has entered.
    setCalc(calc+value);

     
    if(!operators.includes(value)){
      // we set the result here using the eval function that calculates the result.
      setResult(eval(calc+value).toString());
    }
  }
  // This gets triggered when the user clicks on equals and it uses the eval function here to calculate the result and display the result using setCalc
  const calculate=()=>{
    setCalc(eval(calc).toString());
  }

  // If the user clicks on del button it deletes the last digit 
  const deleteLastDigit = ()=>{
    if(calc === ''){
      return;
    }
    const value=calc.slice(0,-1);
    setCalc(value);
  }

  // We use this because instead of manually creating all the buttons we take help of an array and store buttons in array and then display using {createDigits()}. 
  const createDigits = () =>{
    const digits=[];
    for(let i=1;i<10;i++){
      digits.push(
        <button onClick = {()=>updateCalc(i.toString())}key={i}>{i}</button>
      )
    }
    return digits
  }
  
  const deleteAll=()=>{
    setCalc('');
    setResult(0);

  }

  return (
    <div className="App">
      
      <div className="calculator">
        <h1>My Calculator</h1>
        
        <div className="display">
            {result?<span>({result})</span>:''}&nbsp;{calc||'0'}
        </div>
        <div className="operators">
            <button onClick={()=>updateCalc('/')}>/</button>
            <button onClick={()=>updateCalc('*')}>*</button>
            <button onClick={()=>updateCalc('+')}>+</button>
            <button onClick={()=>updateCalc('-')}>-</button>
            <button onClick={deleteLastDigit}>DEL</button>
            <button onClick={deleteAll}>AC</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={()=>updateCalc('0')}>0</button>
          <button onClick={()=>updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
