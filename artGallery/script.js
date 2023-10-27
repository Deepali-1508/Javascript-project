//locomotive js -smooth scrolling

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//gsap to animate
gsap.from(".options",{
   stagger: .1,
    y:10,
    duration:1,
    ease:Power2,
    opacity:0,
})

//shery js to animate
Shery.textAnimate(".headings h1" , {
    //Parameters are optional.
    style: 2,
    y: 10,
    delay: 0.3,
    duration: 2,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    multiplier: 0.1,
  });

gsap.from(".anime2",{
    y:50,
    stagger:.3,
    opacity:0,
    duration:1,
    ease:Power4,
})

Shery.imageEffect(".imgntext img",{
    style:3,
    config: {"uFrequencyX":{"value":19.01,"range":[0,100]},"uFrequencyY":{"value":23.14,"range":[0,100]},"uFrequencyZ":{"value":11.57,"range":[0,100]},"geoVertex":{"range":[1,64],"value":32},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.75},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.4,"range":[1,5]},"scrollType":{"value":0},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    })

Shery.imageEffect(".imgff img",{
    style:5,
    config:{"a":{"value":2.48,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.6666872377190817},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.26,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    })

gsap.from(".imgntext img",{
    z:-.3,
    opacity:0,
    duration:2,
    ease:Expo.easeInOut(),
})

gsap.from("#hleftImage img",{
    z:-.3,
    opacity:0,
    duration:2,
    ease:Expo.easeInOut(),
})

Shery.imageEffect("#bimg",{
    style:4,
    config: {"uColor":{"value":false},"uSpeed":{"value":1,"range":[0.1,1],"rangep":[1,10]},"uAmplitude":{"value":0.37,"range":[0,5]},"uFrequency":{"value":1.98,"range":[0,10]},"geoVertex":{"range":[1,64],"value":32},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":1.7975169589146294},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":2.04,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.23,"range":[1,5]},"scrollType":{"value":0},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.66,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2],"_gsap":{"id":32}},"discard_threshold":{"value":0.69,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.35,"range":[0,2]},"noise_scale":{"value":11.57,"range":[0,100]}},
    gooey:true,
})


document.querySelector("#ftext button")
.addEventListener("mouseover",()=>{
   gsap.to("#future video",{
    opacity:1,
    duration:1,
    ease:Power2,
   })
})

document.querySelector("#ftext button")
.addEventListener("mouseleave",()=>{
    gsap.to("#future video",{
     opacity:0,
     duration:1,
     ease:Power2,
    })
})
