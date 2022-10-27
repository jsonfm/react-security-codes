// import { useState } from 'react';
import { UseState } from "@/components/UseState";
// import { ClassState } from "@/components/ClassState";
import { UseReducer } from "@/reducer/";


function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      {/* <ClassState name="ClassState" /> */}
      <UseReducer name="UseReducer" />
    </div>
  )
}

export default App
