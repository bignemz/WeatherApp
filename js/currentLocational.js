 
 
 export default class CurrentLocation{
    constructor(){
        this._name="current location"
        this._lat=null;
        this._long=null;
        this._unit="imperial"
    }

    getname(){
        return this._name
    }
    setname(name){
       this._name=name;
    }
    getlat(){
        return this._name
    }
    setlat(lat){
       this._lat=lat;
    }
    getlong(){
        return this._long
    }
    setlong(long){
       this._long=long;
    }
    getunit(){
        return this._unit
    }
    setunit(){
        this._unit=unit
    }
    toggleunit(unit){
       this._unit=this._unit==="imperial"?"metric":"imperial";
    }
}