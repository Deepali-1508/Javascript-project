import React from 'react'
import Card from './Card'

const Tours = (props) => {
    

    function getRemoveId(id){
        props.removeTour(id);
    }
    
    const tours = props.tours;
  return (
    <div className='flex flex-col items-center justify-center mx-auto'>
     <h1 className="text-center font-bold text-5xl mt-8">Plan with me</h1>
     <div className='mt-1 mb-4 w-[320px] h-2 bg-slate-500 rounded-md'></div>
     <div className='max-w-[1600px] flex flex-row flex-wrap pt-3 gap-5 items-center justify-center'>
     {
        tours.map((tour)=>{
            return <Card key={tour.id} tour={tour} getRemoveId={getRemoveId}/>
        })
     }  
     </div>
    
    </div>
  )
}

export default Tours
