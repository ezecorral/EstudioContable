export async function getdata (lat,lon) { 

    const API2 = "http://www.7timer.info/bin/api.pl"

let lati=lat, long=lon, product="civillight", output="json"; 
let API=`${API2}?lon=${long}&lat=${lati}&product=${product}&output=${output}`;
//console.log(API);
const response = await fetch(API); 

const data = await response.json();

//console.log(data)

return [data.dataseries[0].weather,data.dataseries[0].temp2m.min,data.dataseries[0].temp2m.max];



}


//export const timerMap = await getdata(-34.6,-58.3);//NS,EO
//console.log(timerMap);

