import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function Calc(props) {
    const [hist, setHist] = useState([])
    const [s, ss] = useState()
    const [stats, setStats] = useState([0,0])
    let x
    useEffect(() => {
	setTimeout(() => {
	    setHist(getHistogram(10000, props.nn))
	}, 0.1 * 1000)
    })

    const ds = [
	() => {
	    return Math.random()
	},
	() => {
	    return Math.round(Math.random())
	},
	(rate, randomUniform) => {
	    rate = rate || 1;
	    // Allow to pass a random uniform value or function
	    // Default to Math.random()
	    var U = randomUniform;
	    if (typeof randomUniform === 'function') U = randomUniform();
	    if (!U) U = Math.random();

	    return -Math.log(U)/rate;
	},

	(successProbability, randomUniform) => { 
	    successProbability = successProbability || 1 - Math.exp(-1); 

	    var rate = -Math.log(1 - successProbability);

	    return Math.floor(ds[2](rate, randomUniform));
	}
    ]

    const getSampleMean = (n) => {
	let nums = new Array(n).fill(0)
	nums = nums.map(() => ds[props.d]())
	let sum = nums.reduce((a, b) => a + b, 0)
	let avg = (sum / n) || 0
	return avg
    }

    const getHistogram = (l, n) => {
	let nums = new Array(l).fill(0)
	nums = nums.map(() => getSampleMean(n))
	return [nums, arrAvg(nums), findVariance(nums)]
    }

    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

    const findVariance = (arr = []) => {
	if(!arr.length){
	    return 0;
	};
	const sum = arr.reduce((acc, val) => acc + val);
	const { length: num } = arr;
	const median = sum / num;
	let variance = 0;
	arr.forEach(num => {
	    variance += ((num - median) * (num - median));
	});
	variance /= num;
	return variance;
    };

    return (
	<div className="flex flex-col items-center justify-center align-middle border-0 border-blue-500 h-2/3">
	    <span className="text-gray-300">mean: {hist[1] && hist[1].toFixed(3)},   variance: {hist[2] && hist[2].toFixed(3)} </span>
	    <Plot
		data={[
		    {
			x: hist[0],
			    type: 'histogram',
			    marker: {
				color: "#e0364a",
			    },
		    }
		]}
		layout={
		    {
			showlegend: false,
			paper_bgcolor: 'rgba(0,0,0,0)',
			plot_bgcolor: 'rgba(0,0,0,0)',
			color: "red",
			xaxis: {
			    showgrid: false,
			    zeroline: false,
			    visible: false,
			},

			yaxis: {
			    showgrid: false,
			    zeroline: false,
			    visible: false,
			},
			width: 1000, height: 500,
		    }
		}
	    />
	</div>
    );
}
export default Calc;
