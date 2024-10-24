import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from './config.js';

const timeout = function(s) {
    return new Promise(function (_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too logn! Timeout after ${s} seconds`));
        }, s*1000);
    });
};

export const AJAX = async function(url, updloadData=undefined) {
    try {
    const fetchPro =  updloadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updloadData),
        }) : fetch(url);

        
            const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
            const data = await res.json();
    
            if(!res.ok) throw new Error(`${data.message} ${res.status}`);
            console.log(data);
            return data;
        }catch(err) {
            throw err;
        }
}

// export const getJSON = async function(url) {
    
// }

// export const sendJSON = async function(url, updloadData) {
//     try {
        
//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//         const data = await res.json();

//         if(!res.ok) throw new Error(`${data.message} ${res.status}`);
//         return data;
//     }catch(err) {
//         throw err;
//     }
// }
