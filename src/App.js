import './App.css';
import Calc from "./calc"
import React, { useEffect, useState } from 'react';


function App() {
    const [nn, setNN] = useState(100)
    const [d, dd] = useState(0)
    const distributions = [
	"uniform",
	"bernoulli",
	"exponential",
	"geometric",
    ]

    return (
	<div className="flex flex-col items-center w-screen h-screen pt-20 bg-gray-800 border-0 border-red-500 align-center center">
	    <Calc nn={nn} d={d}/>

	    <input
		className="p-2 mt-3 bg-gray-500 rounded outline-none text-gray-50"
		onChange={(e) => {
		    setNN(parseInt(e.target.value)? parseInt(e.target.value) : 100)
	    }}
		placeholder={"value of n"}
	    />
	<div className="flex flex-row pt-12 space-x-10">
	    {distributions.map((i, ii) =>
	    <div
		onClick={() => {
		    dd(ii)
		}}
		className="p-5 text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition-all" style={{
		    fontWeight: (ii == d)? "900" : "300"
		}}>{i}</div>
	    )}
	</div>
	</div>
    );
}

export default App;
