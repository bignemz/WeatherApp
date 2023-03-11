
const API_key=  'ddae933da7d72657b1e96d68841d7cb3'
const API_keys= 'f59a3ec92c88e62dd98edb38281c193d'

export function setLocation(locationObj,myCoordsObj){
    const {lat,long,name,unit}=myCoordsObj
    locationObj.setlat(lat)
    locationObj.setlong(long)
    locationObj.setname(name)

    if(unit){

        locationObj.setunit(unit)

    }
    
}
export function displayApiError(){

}

export function getHomeLocation(){
    return localStorage.getItem('defaultweatherLocation')
}

export const getCoordsFromApi=async(entryText,units)=>{
  
    const regex=/^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q" ;
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${API_key}`
   
    const encodeUrl= encodeURI(url)

    try {
        const dataStream = await fetch(encodeUrl)
        const jsonData= await dataStream.json()
        console.log(jsonData)
        return jsonData;
    } catch (err) {

        console.error(err.stack)
        
    }


}
export const getweatherFromCoords= async(locationObj)=>{
    console.log(locationObj)
            const  lat=locationObj.getlat()
            
            const long=locationObj.getlong()
            const unit=locationObj.getunit()
            const url=`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&unit=${unit}&appid=${API_key}`

            try {
                const waetherStream= await fetch(url)
                const weatherJson= waetherStream.json()
                return weatherJson
            } catch (err) 
            {
                console.error(err)
                
            }
}


export const cleanText=(text)=>{
    const regex = / {2, }/g;
    const entryText= text.replaceAll(regex," ").trim()
    return entryText
}