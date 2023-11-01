import React,{useState} from 'react'
import Course from './Course';

const Courses = (props) => {
  const courses = props.data;
  const category = props.category;


  const [likedCourses,setLikedCourses] = useState([]);

  function getAllCourse(){
    if(category === "All"){
      let newCoursesData = [];

      Object.values(courses).forEach((course)=>{
        course.forEach((oneCourse)=>{
          newCoursesData.push(oneCourse);
        })
      })
      // console.log(newCoursesData)
      // console.log("data")
      return newCoursesData;
    }
    else{
      return courses[category];
    }
  }
  

  return (
    <div className=' flex flex-row flex-wrap gap-4 justify-center'>
          {
            getAllCourse().map((course)=>(
              <Course course={course} key={course.id} likedCourses={likedCourses} setLikedCourses={setLikedCourses}/>
            ))
          }
    </div>
  )
}

export default Courses
