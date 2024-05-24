"use client"

import { useState } from 'react';

export default function About({ params: { name } }) {

  const [count, setCount] = useState(0);
  return <div>
    About {name}
    <button onClick={() => setCount(count + 1)}>{count}</button>;
  </div>
}
