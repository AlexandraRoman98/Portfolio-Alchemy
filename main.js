const baseURL = "https://alchemy-kd0l.onrender.com"
const startURL = `${baseURL}/start`
const statusURL = ` ${baseURL}/status;`
const submitURL = `${baseURL}/submit;`
const clueURL = `${baseURL}/clue;`

//START

const userConfig = {"email": "alexandrr@uia.no",
    "nick": "Alexandra", "pin": "1013"
 };


 // start get
    let respons = await (await fetch(statusURL, {
        body: JSON.stringify(userConfig),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })).json();

    
    token = respons.token; 

    console.log(token);

    respons = await (await fetch(statusURL, { 
       method: "GET",
       headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token,
      }
    })).json();


