import { MAP_ID } from "../mapProjectKey";

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 23.797994, lng:  77.855668},
        zoom: 8,
        mapId : MAP_ID,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,


    });

    const markers =[
        [23.797994, 77.855668, "./assest/yoshi_house.svg", "Mario's House"],
        [22.203867, 76.332211,  "./assest/castle.svg", "Princess Peach"],
        [21.57441881188491, 79.13760687656577,  "./assest/ghosthouse.svg", "Yoshi"],
        [21.618867515035106, 81.52784134708448,  "./assest/hil_with_eyes.svg", "Luigi"],
        [19.500388155112056, 75.91875778960055,  "./assest/pipe.svg", "Toad House"],
        [20.399097228867745, 73.64006759437272,  "./assest/pointer.svg", "Bowser Jr."]
        [20.309457730217012, 79.42443501302802,  "./assest/star.svg", "Rosalina"]
    ]

    for(let i=0; i<markers.length; i++){
        let currMarker = markers[i];
        const marker = new google.maps.Marker({
            position: {lat:currMarker[0], lng: currMarker[1]},
            map,
            title: "Hello World!",
            icon:{
                url:currMarker[2],
                scaledSize: new google.maps.Size(30,30),
            },
            animation : google.maps.Animation.DROP,
          });
    
          const infoWindow = new google.maps.InfoWindow({
            content:currMarker[3] ,
          });
    
          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          } );
    }
  
}
