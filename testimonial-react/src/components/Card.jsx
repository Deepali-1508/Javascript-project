import React from 'react'
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";

const Card = (props) => {
    const testimonial = props.testimonial;
    console.log("testimionia",testimonial)
  return (
    <div className='flex flex-col md:relative'>
    <div className='absolute -top-[7rem] z-10'>
      <img src={testimonial.image} className='w-[140px] h-[140px] rounded-full aspect-ratio z-25'/>
      <div className='absolute bg-violet-500 rounded-full  w-[140px] h-[140px] aspect-ratio z-[-10] top-[-6px] left-[10px]'></div>
    </div>

    <div className='text-center mt-4'>
        <p className='font-bold text-2xl tracking-wider '>{testimonial.name}</p>
        <p className=' uppercase text-sm text-violet-400 mt-1'>{testimonial.job}</p>
    </div>
      
    <div className='text-violet-400 mx-auto mt-7 mb-1'>
        <FaQuoteLeft />
    </div>
    <div className='mx-auto mt-5 text-center text-slate-500'>
    {testimonial.text}
    </div>
     
     <div className='text-violet-400 mx-auto mt-7 mb-1'>
        <FaQuoteRight />
     </div>

    </div>
  )
}

export default Card
