/* Global Variables */
const api = 'ce0c8b18ddfe9e4707572b4f22e06479&units=imperial';
let http = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+' / '+ d.getDate()+' / '+ d.getFullYear();
document.getElementById('generate').addEventListener('click', startAction);

async function startAction(){
    let zip = document.getElementById('zip').value;
    getInfo(http+zip+'&appid='+api).then((data)=>{
        if(data.cod !="200"){
            //When recieveing bad data
            HTMLError();
        }else{
            postInfo('/postData',{
                temp: data.main.temp,
                weather: data.weather[0].main,
                description: data.weather[0].description,
            }).then(changeHTML());
           
        }
    });
}

async function getInfo(url=""){
    let response = await fetch(url);
    try{
        response = await response.json();
        return response;
    }
    catch(error){
        console.log(error);
    }
}

async function postInfo(url='', data={}){
    let response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        response = await response.text();
        return;
    }catch(error){
        console.log(error);
    }
}

async function changeHTML(){
    let response = await fetch('/getData');
    try{
        response = await response.json();
        console.log(response);
        document.getElementById('title').innerHTML = '<p>Most Recent Entry</p>';
        document.getElementById('date').innerHTML = `<p>Today's date is ${newDate} </p> `;
        document.getElementById('temp').innerHTML = `<p>Temperature is ${response.temp} &degC</p>`;
        document.getElementById('content').innerHTML = `<p>Weather description is: ${response.weather}, ${response.description}`;
    }catch(err){
        console.log(err);
    }
     //Setting the information of weather date, temperature, and weather description
     
}

function HTMLError(){
    alert("Wrong zipcode, please try another one!");
    document.getElementById('title').innerHTML = '<p>Cannot find city, please try again with another zip!</p>';
    document.getElementById('date').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('content').innerHTML = '';
}