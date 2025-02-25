import React, { useState } from 'react';
import '../styles/Counter.css';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="counter-container">
      <h2>Counter</h2>
      <p className="count-display">Count: {count}</p>
      <div className="button-group">
        <button className="btn increment" onClick={increment}>Increment</button>
        <button className="btn decrement" onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;

