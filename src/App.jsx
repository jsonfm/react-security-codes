import { useState } from 'react';
import { UseState } from "@/components/UseState";
import { ClassState } from "@/components/ClassState";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <UseState name="UseState" />
      <ClassState name="ClassState" />
    </div>
  )
}

export default App
