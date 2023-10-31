import React, { useState } from 'react'

const Card = (props) => {
    const [readMore, setReadmore] = useState(false);
    const tour = props.tour;
    const description = readMore ?  tour.info : `${tour.info.substring(0,200)}...`;

  return (
    <div className='flex flex-col w-[400px] h-max gap-[10px] mr-3 mt-2 items-center justify-start border-[10px] shadow-lg'>
     <div className='w-[380px]'>
        <img src={tour.image}  className='object-cover w-[100%] aspect-[1/1] '/>
     </div> 
     <div className='mt-2'>
        <h3 className='text-emerald-500 text-xl'>₹{tour.price}</h3>
        <h2 className='font-semibold text-3xl'>{tour.name}</h2>
        <p className='text-gray-600'>
            {description}
            <span className='text-sky-500 cursor-pointer' onClick={()=>{setReadmore(!readMore)}}>
              {readMore ? "show less":"read more"}
            </span>
            
        </p>

     </div>

     <button
      className='bg-red-500 text-white px-3 py-2 rounded-md mt-2 hover:bg-red-700 cursor-pointer transition-all duration-700'
      onClick={()=>{props.getRemoveId(tour.id)}}>Not interested</button>
    </div>
  )
}

export default Card
