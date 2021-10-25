import './App.css';
import PrintDistance from "./PrintDistance";
import { Table } from 'react-bootstrap';

const data = [
  {
    name:"Karlskrona",
    longitude:15.5866422,
    latitude:56.1621073,
    data:"20.03.2021",
  },
  {
    name:"Gdynia",
    longitude:18.5402738,
    latitude:54.5164982,
    data:"20.03.2021",
  },
  {
    name:"Malmo",
    longitude:13.0001566,
    latitude:55.6052931,
    data:"20.03.2021",
  },
  {
    name:"Copenhagen",
    longitude:12.5700724,
    latitude:55.6867243,
    data:"20.03.2021",
  },
  {
    name:"Kristiansand",
    longitude:7.9957333,
    latitude:58.14615,
    data:"20.03.2021",
  },
]

function convertLatLong(coords, type) {
  let isNegative = coords < 0
  let degrees = Math.abs(Math.floor(coords))

  coords = Math.abs(coords)
  let delta = coords - degrees
  let seconds = Math.abs(Math.floor(3600 * delta))
  let minutes = Math.abs(Math.floor(seconds / 60))
  seconds %= 60

  let coordsArr = [degrees, minutes, seconds]
  let coordsStr = []

  coordsArr.forEach(num => {
      let numStr = num.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
      })
      coordsStr.push(numStr)
  })
  let coordDirection = ""
  switch(type) {
      case "latitude":
          coordDirection = isNegative ? "S" : "N"
          break

      case "longitude":
          coordDirection = isNegative ? "W" : "E"
          break

      default:
          break
  }
  let coordStr = `${coordsStr[0]}° ${coordsStr[1]}' ${coordsStr[2]}" ${coordDirection}`
  return coordStr
}

function Place(props){
  return (
        <tr>
          <td className='propName'>{props.name}</td>
          <td>{convertLatLong(props.latitude, "latitude")} </td>
          <td>{convertLatLong(props.longitude, "longitude")}</td>
          <td>{props.data}</td>
        </tr>
  )
}


function App() {
  let dist= []
  for(let i = 0; i<data.length - 1; i++){
    dist.push(<PrintDistance firstPoint = {data[i]} secondPoint={data[i+1]}></PrintDistance>)
  }
  return (
    <div className="App">
     <div className="App-header">
        <Table striped bordered cellPadding="10px">
          <thead>
          <tr>
            <th>Name</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
        {data.map((_, idx) => {
          return Place(data[idx])
        })}
        </tbody>
        </Table>
        {dist}
        </div>
    </div>
  );
}

export default App;
