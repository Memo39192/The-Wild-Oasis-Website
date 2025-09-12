'use client';

import { useState } from 'react';

function Counter({ data }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <p>{data.length}</p>
    </div>
  );
}

export default Counter;
