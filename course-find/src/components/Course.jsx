import React, { useState } from 'react'
import {toast} from 'react-toastify'
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Course = (props) => {
  const likedCourses = props.likedCourses;
  const setLikedCourses = props.setLikedCourses;

  function clickHandler(){
    if(likedCourses.includes(props.course.id)){
      setLikedCourses((prev)=>prev.filter(id => id !== props.course.id));
      toast.warning("Liked Removed");
    }

    else{
      setLikedCourses((prev)=> [...prev,props.course.id]);
      toast.success("Liked Successfully")
    }
   
  }

  return (
    <div className='w-[300px] overflow-hidden bg-bgDark bg-opacity-80 rounded-md '>
      <div className='relative'>
        <img 
        className='w-full min-h-[168px] object-cover'
        src={props.course.image.url} alt="props.course.image.alt" />
     
     <div className='w-[40px] h-[40px] rounded-full absolute grid place-items-center bg-slate-100 right-2 -bottom-3 shadow-xl'>
      <button onClick={clickHandler}>
        {
          likedCourses.includes(props.course.id) ? <FcLike fontSize={"1.75rem"}/> : <FcLikePlaceholder fontSize={"1.75rem"}/> 
        }
      </button>
     </div>
      </div>

      <div className='p-4 text-white'>
        <h1 className='font-semibold text-lg leading-6 '>{props.course.title}</h1>
        <p className='text-base mt-2'>
        {props.course.description.length > 100 ? props.course.description.substring(0,100)+"...": props.course.description}
        </p>
      </div>
    </div>
  )
}

export default Course
