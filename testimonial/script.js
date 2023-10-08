    const userName = document.querySelector("[data-name]");
    const job = document.querySelector("[data-job]");
    const image = document.querySelector("[data-userImg]");
    const text = document.querySelector("[data-description]");
    const prevBtn = document.querySelector("[data-leftBtn]");
    const nextBtn = document.querySelector("[data-rightBtn]");
    const surpriseBtn = document.querySelector("[data-surpriseMeBtn]");


    const reviews = [
        {
         id:1,
           name:"Pranay Gupta",
           job:"Designer",
           image:"https://aeccc.targettechnology.in/static/media/PranayGupta.f3c530b7630ba8efb2ab.jpg",
           text:"I had the pleasure of working on a recent project, and I couldn't be happier with the results. Their creativity and attention to detail are truly impressive.He has a knack for turning abstract ideas into stunning visual designs that perfectly capture the essence of our brand. Their ability to communicate and collaborate effectively with our team made the entire process smooth and enjoyable. I highly recommend for anyone seeking top-notch design work.",
        },
       
        {
           id:2,
             name:"Abhir Pal",
             job:"Developer",
             image:"https://aeccc.targettechnology.in/static/media/AbirPal.574a09ad7cb325853b29.jpg",
             text:"I've had the privilege of working alongside for the past two years, and I must say, their coding skills are exceptional. [Developer's Name] consistently delivers high-quality code that is not only efficient but also maintainable. They have a deep understanding of programming languages and frameworks, and their problem-solving abilities are second to none. [Developer's Name] is a true asset to any development team, and I look forward to many more successful projects together.",
          },
       
       
          {
           id:3,
             name:"Soumya Banerjee",
             job:"Software Engineer",
             image:"https://aeccc.targettechnology.in/static/media/SoumyaBanerjee.2e2521d6029842435080.jpg",
             text:"A brilliant software engineer who consistently goes above and beyond to tackle complex challenges. Their in-depth knowledge of software architecture and system design is truly impressive. I've had the pleasure of working with [Software Engineer's Name] on a project that required solving intricate technical problems, and they delivered outstanding results. Their dedication to writing clean, scalable, and efficient code is commendable. I highly recommend for any software engineering endeavor",
          },
       
          {
           id:4,
             name:"Saikat Mukherjee",
             job:"Tester",
             image:"https://aeccc.targettechnology.in/static/media/SaikatMukherjee.033310703edff52d0532.jpg",
             text:"Working has been a game-changer for our quality assurance process. Their meticulous attention to detail and rigorous testing methodologies have helped us identify and address critical issues in our software. [Tester's Name] has an exceptional ability to think like an end user, uncovering even the most subtle bugs and usability issues. Their comprehensive test plans and clear bug reports have significantly improved our product's overall quality. I can confidently say that is an invaluable member of our testing team.",
          },
       
          {
           id:5,
             name:"Aritra Biswas",
             job:"Data Analyst",
             image:"https://avatars.githubusercontent.com/u/93366359?v=4",
             text:"It is an exceptional data analyst with a keen ability to extract valuable insights from complex datasets. Their expertise in data manipulation, statistical analysis, and data visualization has been instrumental in driving data-driven decision-making within our organization. [Data Analyst's Name] has a knack for turning raw data into actionable recommendations that have positively impacted our business strategies. I highly recommend [Data Analyst's to anyone in need of a data analyst who can turn data into valuable insights",
          },
         
       ]

    let index = 0;

    prevBtn.addEventListener("click",function(){
     if(index-1 === -1){
       index = reviews.length-1;
     }

     index -- ;
     changeReview(index);
    })

    nextBtn.addEventListener("click",function(){
        if(index+1 === reviews.length){
            index = 0;
        }
     
        index ++ ;
        changeReview(index);
         })

    surpriseBtn.addEventListener("click",function(){
        let randomIndex = Math.floor(Math.random()*reviews.length);
        changeReview(randomIndex);
    });

    // function changeReview(index){
    //     userName.textContent = reviews[index].name;
    //     job.textContent = reviews[index].job;
    //     image.src = reviews[index].image;
    //     text.textContent = reviews[index].text;
    // }

    function changeReview(index){
        let item = reviews[index];

        userName.innerText = item.name;
        job.innerText = item.job;
        image.src = item.image;
        text.innerText = item.text;
    }
    changeReview(index);








