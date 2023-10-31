import { useState } from "react";
import Tours from "./components/Tours";
import data from "./data";
import Refresh from "./components/Refresh";

function App() {
  const [tours,setTour] = useState(data)

  function removeTour(id){
    const newTour = tours.filter(tour => tour.id !==id)
    setTour(newTour)
  }

  if(tours.length === 0){
    return <Refresh data={data} setTour={setTour}/>
  }
  
  return (
    <div className="w-[100%] h-[100vh] flex flex-col bg-gray-200 items-center overflow-x-hidden overflow-y-auto">
      <Tours tours={tours} removeTour={removeTour}/>
    </div>
  );
}

export default App;
