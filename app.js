const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000

let isDatasetReady = false;
let zipCodes = {};
console.log("initial", zipCodes);
console.log("Before Promise");
const getZip = async ()=>{
    const zipCodesBody = await fetch("https://swe432tomcat.herokuapp.com/zipLookup?zip=22033");
    // console.log(zipCodesBody);
    zipCodes = [await zipCodesBody.json()];
    // console.log("promise resolved", zipCodes);

    //Equivalent code using promise directly: not clean, leads to callback hell

    // fetch("https://swe432tomcat.herokuapp.com/zipLookup?zip=22033").then(
    //   v=>{
    //     zipCodesBody = v;
    //     zipCodesBody.json().then((v2)=>{
    //       zipCodes = ve;
    //     });
    //   }
    // );
};

getZip().then(()=>{
  isDatasetReady = true;
//  console.log("After Promise");
//done 1
}).catch(error=>{
  // user, we are sorry, the data is not ....
  //getZip()
  console.log(error);
});
// getZip().then(()=>{
//  // done 2
// });
//
// Promise.all().then();
//
// (done1 and done2)=>{
//   // do 3
// }

const cities = ["Fairfax", "Vienna", "Falls Church", "Arlington"];

const populations = [24019, 16489, 14128, 236842];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cities', (req, res) => {
  return res.json(cities)
})

app.get('/populations', (req, res) => {
  return res.json(populations)
})

app.get(
  '/zipCodes',
  (req, res) =>{
    if(!isDatasetReady){
      res.status(503);
      return res.json({error: "no ready"});
    }
  return res.json(zipCodes)  ;
}
);

app.post(
  '/zipCodes/:code/:name',
  (req, res) =>{
    if(!isDatasetReady){
      res.status(503);
      return res.json({error: "no ready"});
    }
    const {code, name} = req.params;

    if(code && name){
      zipCodes.push({
      "code": code,
      "city": name,
      "state": "VA",
    });
      //console.log("post ", zipCodes);
    }
  return res.json(zipCodes);
}
);
console.log("Main code ended", zipCodes);
module.exports = app;
