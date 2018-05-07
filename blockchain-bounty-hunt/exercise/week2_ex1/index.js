const axios = require('axios');
const fs = require('fs');

let block_hash = "";

let timeIMS = new Date("05/02/2018").getTime();


let May2 = `https://blockchain.info/blocks/${timeIMS}?format=json`;

const url = `https://blockchain.info/rawblock/${block_hash}`;

let blocks = "";

axios.get(May2)
  .then(response => {
    
    for (let block of response.data.blocks){

        if (block.height > 520900 && block.height < 520990){
        
        console.log(block.height);
        block_hash = block.hash;
        axios.get(`https://blockchain.info/rawblock/${block_hash}`).then( r => {
    
            

                r.data.tx.forEach(element => {
                    //console.log(element.hash);
                    if (element.hash.toString().endsWith('04dfa3')){
                        console.log("Got it: " + element.hash.toString() + JSON.stringify(element));
                    }
                });
               

        }).catch( e => { console.log("");});
        
        }
    
    }
   
} ).catch(e=> {throw `Error ${e}`});










  