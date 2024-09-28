import React, { useState } from 'react';

function MathOperation() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(null);

  const handleAddition = () => {
    setResult(num1 + num2);
  };

  const handleSubtraction = () => {
    setResult(num1 - num2);
  };

  return (
    <div>
      <h2>Math Operations</h2>
      <input 
        type="number" 
        value={num1} 
        onChange={(e) => setNum1(parseInt(e.target.value))} 
      />
      <input 
        type="number" 
        value={num2} 
        onChange={(e) => setNum2(parseInt(e.target.value))} 
      />
      <button onClick={handleAddition}>Add</button>
      <button onClick={handleSubtraction}>Subtract</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
}

export default MathOperation;