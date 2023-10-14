

Shery.imageEffect("#back", {
    style: 6,
   //  debug:true,
   config:{"noiseDetail":{"value":7.44,"range":[0,100]},"distortionAmount":{"value":2.98,"range":[0,10]},"scale":{"value":36.36,"range":[0,100]},"speed":{"value":0.79,"range":[0,1]},"aspect":{"value":2.558333333333333},"gooey":{"value":true},"infiniteGooey":{"value":true},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.3,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},

   gooey: true,
  })
 
 
  var elements = document.querySelectorAll(".ele");
  elements.forEach((ele)=>{
   var h1s = ele.querySelectorAll("h1");
   var index = 0;
   var animating = false;
   document.querySelector(".wrapper").addEventListener("click",()=>{
      if(!animating){
         animating = true;
         gsap.to(h1s[index],{
            top: "-=100%",
            duration: 1,
            ease:Expo.easeInOut,
            onComplete: function(){
             gsap.set(this._targets[0],{top: "100%"});
             animating = false;
            }
           })
           index === h1s.length -1 ? (index = 0) :index++;
    
          gsap.to(h1s[index],{
             top: "-=100%",
             duration: 1,
             ease:Expo.easeInOut,
          })
         
      }
       
   })
   })
 
   