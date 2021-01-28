//var latitude = 12.878701, longitude  = 77.530220 ;
var latitude =0, longitude = 0;
console.log('hi');

// function handleChange(){
//     latitude = document.getElementById('latitude').value ;
//     longitude = document.getElementById('longitude').value; 
//     console.log(latitude, longitude);
// }

/*
function handleChange(e){
    let {name, value} = e.target;
    if(name === "latitude"){ latitude = value;}
    else if(name === "longitude"){longitude = value;}
    console.log(latitude, longitude);
}
*/

function getLocation(e){
    e.preventDefault()
    try{
        navigator.geolocation.getCurrentPosition(function (pos){
            latitude = pos.coords.latitude.toFixed(6);
            longitude = pos.coords.longitude.toFixed(6);
            document.getElementById('latitude').value = latitude;
            document.getElementById('longitude').value = longitude;
        })        
    }
    catch(error){
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert( "User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert( "Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert( "The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert( "An unknown error occurred.")
                break;
            default:
                alert("Unknown Error Occured")
        }
    }
}
