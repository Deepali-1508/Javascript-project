import React, { useState } from 'react'


const Nav = (props) => {
    const category = props.category;
    const setCategory = props.setCategory;
    const coursesField = props.filterData;

    const handleFilterClick = (title) =>{
        setCategory(title);
        console.log(title)
    }
  return (
    <div className='flex items-center justify-center gap-[15px] flex-row mt-4'>
      {
        coursesField.map((course)=>(
                <button key={course.id} 
                onClick={()=>{handleFilterClick(course.title)}}
                className={`bg-black p-2 text-bold text-xl rounded-md 
               hover:bg-opacity-50 text-white 
                border-2 transition-all duration-300
                ${category === course.title ? "bg-opacity-60 border-white":"bg-opacity-40 border-transparent" }  
                `}>
                {course.title}
                </button>
        ))
      }
    </div>
  )
}

export default Nav
