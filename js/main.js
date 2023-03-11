
import {setPlaceHolderText, addspinner , displayError , updateScreenReader, displayApiError} from "./domFunction.js";

import CurrentLocation from "./currentLocational.js";
import { setLocation, getHomeLocation, cleanText,getCoordsFromApi, getweatherFromCoords} from "./dataFunction.js";

const currentloc=new CurrentLocation

console.log(navigator.geolocation)
const initApp=()=>{
    // add event listeners
    const geoButton=document.getElementById("getLocation")
    geoButton.addEventListener("click", GeoWeather);
    const homeButton=document.getElementById("home");
    homeButton.addEventListener('click',loadWeather);
    const saveButton= document.getElementById("Save");
    saveButton.addEventListener("click",saveLocation);
    const unitButton= document.getElementById("unit");
    unitButton.addEventListener("click",setUnitPref);
    const refreshButton= document.getElementById("refresh");
    refreshButton.addEventListener("click",refreshWeather);

    const locationEntry= document.getElementById('searchBar_form')
    locationEntry.addEventListener("submit",submitNewLocation);



    //set up 
    setPlaceHolderText();


    // load the default weather
    loadWeather();

}
document.addEventListener('DOMContentLoaded',initApp)
function GeoWeather(event){

 if(event){
        if(event.type==="click"){

            const mapicon=document.querySelector(".fa-map-marker-alt")
            addspinner(mapicon)
       
        }

        whereAm()
}
}
const getPosition=function(){
    return new Promise(function(resolve,reject){
         navigator.geolocation.getCurrentPosition(
                    position=>resolve(position),
                    err=>reject(err)
                );
               
            });
        };
const whereAm = async function (){

    try {
       const pos= await getPosition()
    //    const{latitude:lat,longitude:long,name:name}=pos.coords;
    geoSucess(pos)
       console.log(pos.coords)
   
    } catch (error) {
       console.log(error)
       geoError(`Somthin went wrong ${error}`);
       
    }
   }
   



   

const geoSucess=(position)=>{
    console.log(position)
    const myCoordsObj={
        lat:position.coords.latitude,
        long:position.coords.longitude,
        name:`lat:${position.coords.latitude} ,long:${position.coords.longitude}`
    
    }
    setLocation(currentloc,myCoordsObj);
    console.log(currentloc)
    updateDateAndDisplay(currentloc)

}
const loadWeather=(event)=>{
    const saveLocation= getHomeLocation();
    if(!saveLocation && !event) return getGeoWeather();
    if(!saveLocation && event.type==="click") {
        geoError(
            

            "No Home location saved",
            "jqsljlqeelek"
            
           )
    }
    else if(saveLocation && !event){
        displayHomeLocationWeather(saveLocation);
        
    }
    else{
        const homeIcon=document.querySelector(".fa-house-chimney")
        addspinner(homeIcon)
        displayHomeLocationWeather(saveLocation);

    }
}
function displayHomeLocationWeather(home){
    if(typeof home== "string"){
    const locationJson= JSON.parse(home);
    const myCoordsObj={
        lat:locationJson.lat,
        long:locationJson.long,
        name:locationJson.name,
        unit:locationJson.unit,
        
    };
    setLocation(currentloc,myCoordsObj);
    updateDateAndDisplay(currentloc);
}
}
const saveLocation=()=>{
    if(currentloc.getlat() && currentloc.getlong()){
        const saveIcon= document.querySelector(".fa-save")
        addspinner(saveIcon);
        const location={
            name:currentloc.getname(),
            lat:currentloc.getlat(),
            long:currentloc.getlong(),
            unit:currentloc.getunit()

        };
        localStorage.setItem('defaultweatherLocation',JSON.stringify(location))
        updateScreenReader(
            `Saved ${currentloc.getname()} as home location`
        )
    }
}

const setUnitPref= ()=>{
    const unitIcon= document.querySelector(".fa-chart-bar")
    addspinner(unitIcon)
    currentloc.toggleunit();
    updateDateAndDisplay(currentloc)
}
const submitNewLocation=async(event)=>{
    event.preventDefault();
    const text=document.getElementById("searchBar_text").value;
    console.log(text)
    const entryText= cleanText(text)
    if(!entryText.length) return;
    const locationIcon= document.querySelector(".fa-search")
    addspinner(locationIcon)
    const coordsData= await getCoordsFromApi(entryText,currentloc.getunit)

    if(coordsData){

    if(coordsData.cod===200)
    {
        const myCoordsObj = {
            lat:coordsData.coord.lat,
            long:coordsData.coord.lon,
            name:coordsData.sys.country ? `${coordsData.name},${coordsData.sys.country}`:coordsData.name
        }


        setLocation(currentloc,myCoordsObj)
        updateDateAndDisplay(currentloc)

    }
}
    else{
        displayApiError(coordsData)
    }
}
const refreshWeather= ()=>{
    const refreshIcon= document.querySelector(".fa-sync-alt")
    addspinner(refreshIcon)
    updateDateAndDisplay(currentloc)
   
}

const updateDateAndDisplay= async(locationObj)=>{
    console.log(locationObj)
    const weatherJson= await getweatherFromCoords(locationObj) 
    console.log(weatherJson)
updateDateAndDisplay(weatherJson,locationObj);
} 



const geoError=(errobj)=>{
    const errMsg=errobj?errobj.message:'gelocation is not supported'
    displayError(errobj,errMsg)
};

// function renderLocation(data){
        
//     const html=` 
//     <h2 id="currentForecast_location" class="currentForecast_location"> ${lat},${long}
//     </

//     `
 
//      forecast.insertAdjacentHTML("beforeend",html)
//  };
// const whereAm = async function (){

//     try {
//        const pos= await getPosition()
//        const{latitude:lat,longitude:long}=pos.coords;
   
   
//     } catch (error) {
//        console.log(error)
//        renderError(`Somthin went wrong ${error}`);
       
//     }
//    }
   



// function GeoWeather(event){

//  if(event){
//         if(event.type==="click"){

//             const mapicon=document.querySelector(".fa-map-marker-alt")
//             addspinner(mapicon)
       
//         }

//         console.log(event.type)
//     }
//     if(navigator.geolocation) {
//     return new Promise(function(resolve,reject){
//         navigator.geolocation.getCurrentPosition(
//             position=>resolve(position),
//             err=>reject(err)
//         );
       
//     });
   
// }
// else{
//     return  geoError()
  
// }



// function addspinner(element){
//     animateButton(element);
//     setTimeout(animateButton,1000,element);

// }
// function animateButton(element){

//   console.log(element)
//     element.classList.toggle('none')
//     element.nextElementSibling.classList.toggle("block")
//     element.nextElementSibling.classList.toggle("none")
    
    

   
 
// }


