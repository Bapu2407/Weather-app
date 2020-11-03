const req = require('request');
const location = (location,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYmFwdW0iLCJhIjoiY2tnc3p3NjdpMDlyNzJwbmE5YW8zdjh0dSJ9.CEt9qkSWGLsHAZvAUlWj_g&limit=1';
    req({url: url,json: true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service',undefined);
        }else if(response.body.features.length === 0)
        {
            callback('Unable to find location, Try another',undefined);
        }else{
        const data = response.body.features[0].center;
       callback(undefined,{
           latitude:data[1],
           longitude: data[0],
           location: response.body.features[0].place_name
        })
        }
    })

}
module.exports = location;