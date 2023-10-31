import Testimonials from "./components/Testimonials";
import data from "./data"

function App() {

  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] bg-gray-200" >
      <div className="text-center">
        <h1 className="text-4xl font-bold">Our Testimonials</h1>
        <div className="bg-violet-400 h-2 w-1/2 mt-1 mx-auto"></div>
      </div>

      <Testimonials data={data}/>
    </div>
  );
}

export default App;
