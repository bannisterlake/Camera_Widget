import React, { useEffect, useState } from "react";
import "./App.css";
import "./loadingAnimation.css"
let config = require('./widget.config.json')

//Components
import Map from './components/map'
import Test from './components/test'


const App = () => {
	const [cameraData, setCameraData] = useState(null)
	const [loading, toggleLoading] = useState(true)
	const [rectangle, setRectangle] = useState([config.config.pt1, config.config.pt2])
	const [error, toggleError] = useState(null)

	useEffect(()=> {
		getData()
		
	}, [])


	const getData = (pt1 = config.config.pt1, pt2 = config.config.pt2) => {
		toggleError(null)
		toggleLoading(true)
		console.log("getData",pt1, pt2)
		let lat1 = pt1[0]
		let lat2 = pt2[0]
		let lng1 = pt1[1]
		let lng2 = pt2[1]


		let url = `https://cors-anywhere.herokuapp.com/http://www.vizzion.com/TrafficCamsService/TrafficCams.asmx/GetCamerasInBox2?
			dblMinLongitude=${Math.min(lng1,lng2)}&
			dblMaxLongitude=${Math.max(lng1, lng2)}&
			dblMinLatitude=${Math.min(lat1, lat2)}&
			dblMaxLatitude=${Math.max(lat1,lat2)}&strRoadNames=&intOptions=0&strPassword=${config.config.apiKey}`
		fetch(url)
			.then(res=>{
				if (res.ok) {
					return res.text()
				}
			})
			.then(res=>{
				let parser = new DOMParser(),
					xmlDoc = parser.parseFromString(res, 'text/xml')

				let test = xmlDoc.getElementsByTagName('Cameras')
				console.log("test", xmlDoc)

				let data = []
				let state = {}
				if (xmlDoc.getElementsByTagName('Cameras').length === 0) {
					toggleError("No Cameras Detected in Selected Area")
				} else {
					for (let i = 0; i < xmlDoc.getElementsByTagName('Cameras').length; i++) {
						let object = {}
						object["id"] = xmlDoc.getElementsByTagName('Cameras')[i].getElementsByTagName("CameraID")[0].innerHTML;
						object["region"] = xmlDoc.getElementsByTagName('Cameras')[i].getElementsByTagName("RegionID")[0].innerHTML;
						object["name"] = xmlDoc.getElementsByTagName('Cameras')[i].getElementsByTagName("Name")[0].innerHTML;
						object["lat"] = xmlDoc.getElementsByTagName('Cameras')[i].getElementsByTagName("Latitude")[0].innerHTML;
						object["long"] = xmlDoc.getElementsByTagName('Cameras')[i].getElementsByTagName("Longitude")[0].innerHTML;
						// object["view"] = xmlDoc.getElementsByTagName('Cameras')[0].getElementsByTagName('View')[0].innerHTML
						object["service"] = xmlDoc.getElementsByTagName('Cameras')[i].getElementsByTagName("DetectedOutOfService")[0].innerHTML;

						data.push(object)
					}
					console.log(data)

					state["cameras"] = data

					setCameraData(state)

				}
				toggleLoading(false)


			})
			.catch(e=>{
				console.log(e)
				toggleError("Error fetching camera data")
				toggleLoading(false)


			})

	}

	const updateRectangle = (rect) => {
		console.log("App", rect)
		toggleLoading(true)
		toggleError(null)
		setRectangle(rect)
		setCameraData(null)
		getData(rect[0], rect[1])
	}


	const handleReset = () => {
		toggleError(null)
	}

	return (
		<div className="main">
			<Map 
				error={error}
				handleReset={handleReset}
				searchArea={rectangle}
				config={config.config} 
				loading={loading} 
				cameras={cameraData} 
				handleNewRectangle={updateRectangle}
				/>
		</div>
	);
}

export default App;