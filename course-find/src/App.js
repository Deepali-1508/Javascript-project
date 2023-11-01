import { useEffect, useState } from "react";
import Courses from "./components/Courses";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { apiUrl, filterData } from "./data";
import Spinner from "./components/Spinner";

function App() {
  const [data ,setData] = useState([]);
  const [category,setCategory] = useState("All");
  const [loading ,setLoading] = useState(false);

  async function fetchData(){
    setLoading(true);
    try{
      const response =await fetch(apiUrl);
      const output =await response.json();
      setData(output.data);
    }
    catch(e){
      console.log(e);
    }
    setLoading(false);
  }

  useEffect(()=>{
   fetchData();
  },[]);

  return (
    <div className="bg-bgDark2 w-[100vw] " >
      <Header />
      <div className="min-h-screen bg-bgDark2">
      <Nav filterData={filterData} category={category} setCategory={setCategory}/>
      <div className="w-11/12 mt-6 max-w-[1200px] mx-auto flex flex-wrap items-center justify-center" >
        {loading ? <Spinner /> :
        <Courses data={data} category={category} />
        }
      </div>
      </div>
     
      
    </div>
  );
}

export default App;
