import React, { useState } from 'react'
import Card from './Card';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Testimonials = (props) => {
    const data = props.data;
    // console.log(data[0])
    const [index,setIndex] = useState(0);
    function leftHandler(){
       index-1 <0 ? setIndex(data.length-1):setIndex(index-1);;
    }
    function rightHandler(){
      index+1 === data.length ? setIndex(0):setIndex(index+1);
    }
    function surpriseHandler(){
      const randomIndex = Math.floor(Math.random()*data.length);
      setIndex(randomIndex);
    }

  return (
    <div className='flex flex-col items-center justify-center w-[85vw] md:w-[700px] bg-white hover:shadow-xl rounded-md transition-all duration-700 mt-10 p-10'>

        <Card testimonial={data[index]}/>
      <div className='flex mt-6 gap-3 mx-auto text-3xl text-violet-400'>
        <button onClick={leftHandler} 
        className='cursor-pointer w-fit hover:text-violet-500 mt-5'
        >
            <FiChevronLeft />
        </button>
        <button 
         className='cursor-pointer w-fit hover:text-violet-500 mt-5'
        onClick={rightHandler}><FiChevronRight /></button>
      </div>

      <div className='mt-5'>
      <button 
      className='bg-violet-400 text-white font-bold p-3 rounded-md hover:bg-violet-500 transition-all duration-700 text-lg'
      onClick={surpriseHandler}>Surprise Me</button>
      </div>
    </div>
  )
}

export default Testimonials
