import React from 'react'

const Refresh = (props) => {
    function clickHandler(){
        props.setTour(props.data);
    }
  return (
    <div className=' w-[100%] h-[100vh] flex flex-col items-center justify-center mx-auto'>
      <h1 className='font-bold text-4xl'>No more tour</h1>
      <button
      className='bg-red-500 text-white px-3 py-2 rounded-md mt-2 cursor-pointer hover:bg-red-700 transition-all duration-700'
       onClick={clickHandler}>Refresh</button>
    </div>
  )
}

export default Refresh
