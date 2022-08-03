import { useState } from "react"
const Test = () =>{

    const [active, setActive] = useState("NULL")

    return(
        <div className="test">
            <div>Active : {active} </div>
            <button onClick={()=>setActive("A")} className="bg-primary-300 block my-5 p-3">Active A</button>
            <button onClick={()=>setActive("B")} className="bg-primary-300 block my-5 p-3">Active B</button>
        </div>
    )
}

export default Test