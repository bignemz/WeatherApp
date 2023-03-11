
// THIS ADDS AND REOMOVE SPIN FROMT THE BUTTON

export const setPlaceHolderText=()=>{
   const input = document.getElementById("searchBar_text");
   window.innerWidth < 400 ? (input.placeholder= "city,state,Country"):(input.placeholder= "City,State,Country or Zip code")
}

export function addspinner(element){
    animateButton(element);
    setTimeout(animateButton,1000,element);

}
function animateButton(element){

  console.log(element)
    element.classList.toggle('none')
    element.nextElementSibling.classList.toggle("block")
    element.nextElementSibling.classList.toggle("none")
}

export const displayError=(headerMsg,srMsg)=>{
   updateWeatherHeader(headerMsg);
   updateScreenReader(srMsg);
}
export const displayApiError=(statusCode)=>{
  const  properMsg = toProperCase(statusCode.message)
  updateWeatherHeader(properMsg)
  updateScreenReader( `${properMsg} .Please try again.`)
  console.error(properMsg)
}

function toProperCase(text){
   const words= text.split(" ");
   const properWords= words.map((word)=>{
      return word.charAt(0).toUpperCase() + word.slice(1);
   });
   return properWords.join(" ")
}

function  updateWeatherHeader(headerMsg){
   const h1=document.getElementById("currentForecast_location")
   console.log(h1)
   h1.textContent= headerMsg
}
export function updateScreenReader(message){
const po=document.getElementById("confirmation")
console.log(po)
po.textContent=message;
  
}