
/* Return le nom de toutes les villes commençant par *paramètre* */
function cityStartsWith(letters) {
    return fetch('./france.json')
        .then((response) => response.json())
        .then((json) => {
            var cities = [];
            for (let i = 0; i < json.length; i++) {
                if (json[i]['Nom_commune'].startsWith(letters)) {
                    cities.push([json[i]['Nom_commune'], json[i]['Code_postal'], json[i]['coordonnees_gps']])
                }
            }
            return cities;
        });
}

/* Affiche en suggestion les 3 premières villes commençant par *paramètre* renvoyées par la fonction cityStartsWith() */
function ShowCities(letters){
    cityStartsWith(letters)
    .then((filteredCities) => {
        const element = document.getElementById("suggestion");

        while (element.childElementCount !== 0) {
            element.removeChild(element.querySelectorAll('p')[0])
        }
        console.log('Suggestions précédentes effacées')

        for (let i = 0; i < 3; i++) {
            if(filteredCities[i] !== undefined){
                const p = document.createElement("p");
                const citySuggestion = document.createTextNode(filteredCities[i][0] + ` (${filteredCities[i][1]})`);
                p.appendChild(citySuggestion);
                element.appendChild(p);
            }
        }
        console.log('Nouvelles suggestions affichés')
    })
    .catch((error) => {
        console.error('Erreur lors de la récupération et du filtrage des villes :', error);
    });
}

/* Donne les coordonées (lon et lat) à partir d'un code postal */
function getCoos(zip) {
    return fetch('./france.json')
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                if (json[i]['Code_postal'] == zip || json[i]['Code_postal'] == zip.slice(1)) {
                    return json[i]['coordonnees_gps'];
                }
            }
        });
}

/* Affiche les données des 7 prochains jours à partir d'un JSON */
function showWeather(json) {
    json = json;
    for (let i = 0; i < 7 ; i++) {
        document.querySelector('.cards').children[i].querySelector('h5').innerHTML = Math.round(json['daily']['temperature_2m_max'][i]) + '°C';
        document.querySelector('.cards').children[i].querySelector('img').src = 'img/weather_code/' + json['daily']['weather_code'][i] + '.svg';
        
        date = new Date(json['daily']['time'][i])
        day = date.getDay()
        dayElement = document.querySelector('.cards').children[i].querySelector('p').innerHTML
        switch (day) {
            case 0:
                document.querySelector('.cards').children[i].querySelector('p').innerHTML = 'Sun'
                break;
            case 1:
                document.querySelector('.cards').children[i].querySelector('p').innerHTML = 'Mon'
                break;
            case 2:
                document.querySelector('.cards').children[i].querySelector('p').innerHTML = 'Tue'
                break;
            case 3:
                document.querySelector('.cards').children[i].querySelector('p').innerHTML = 'Wed'
                break;
            case 4:
                document.querySelector('.cards').children[i].querySelector('p').innerHTML = 'Thu'
                break;
            case 5:
                document.querySelector('.cards').children[i].querySelector('p').innerHTML = 'Fri'
                break;
            case 6:
                document.querySelector('.cards').children[i].querySelector('p').innerHTML = 'Sat'
                break;
            default:
                console.log(day == '0');
        }
    }
}

function showCurrentWeather(json) {
    json = json;
    for (let i = 0; i < 7 ; i++) {
        document.querySelector('.main-card').querySelector('img').src = 'img/weather_code/' + json['current']['weather_code'] + '.svg';
        document.querySelector('.main-card').querySelector('h5').innerHTML = Math.round(json['current']['temperature_2m']) + '°C';

        date = new Date(json['current']['time'])
        document.querySelector('.main-card').querySelector('h6').innerHTML = `Conditions observed at ${date.getHours()}:00`

        switch (json['current']['weather_code']) {
            case 0:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Clear sky'
                break;
            case 1:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Mainly clear'
                break;
            case 2:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Partly cloudy'
                break;
            case 3:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Overcast'
                break;
            case 45:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Fog'
                break;
            case 48:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Depositing rime fog'
                break;
            case 51:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Light drizzle'
                break;
            case 53:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Moderate drizzle'
                break;
            case 55:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Dense intensity drizzle'
                break;
            case 56:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Light freezing drizzle'
                break;
            case 57:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Dense intensity freezing drizzle'
                break;
            case 61:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Slight rain'
                break;
            case 63:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Moderate rain'
                break;
            case 65:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Heavy intensity rain'
                break;
            case 66:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Light freezing rain'
                break;
            case 67:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Heavy intensity freezing rain'
                break;
            case 71:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Slight snow fall'
                break;
            case 73:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Moderate snow fall'
                break;
            case 75:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Heavy intensity snow fall'
                break;
            case 77:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Snow grains'
                break;
            case 80:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Slight rain showers'
                break;
            case 81:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Moderate rain showers'
                break;
            case 82:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Violent rain showers'
                break;
            case 85:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Slight snow showers'
                break;
            case 86:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Heavy snow showers'
                break;
            case 95:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Slight or Moderate thunderstorm'
                break;
            case 96:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Thunderstorm with slight hail'
                break;
            case 99:
                document.querySelector('.main-card').querySelector('p').innerHTML = 'Thunderstorm with heavy hail'
                break;
        }  
        
        document.querySelectorAll('.actuellement .card')[0].querySelector('h5').innerText = Math.round(json['current']['apparent_temperature']) + '°C';
        document.querySelectorAll('.actuellement .card')[1].querySelector('h5').innerText = Math.round(json['current']['relative_humidity_2m']) + '%';
        document.querySelectorAll('.actuellement .card')[2].querySelector('h5').innerText = Math.round(json['current']['wind_speed_10m']) + ' km/h';
        document.querySelectorAll('.actuellement .card')[3].querySelector('h5').innerText = Math.round(json['current']['precipitation']) + ' mm';
        document.querySelectorAll('.actuellement .card')[4].querySelector('h5').innerText = Math.round(json['current']['cloud_cover']) + '%';
        document.querySelectorAll('.actuellement .card')[5].querySelector('h5').innerText = Math.round(json['current']['surface_pressure']) + ' hPa';        
        
    }
}


/* Récupère les données météo à partir d'un code postal (getCoos()) et appelle la fonction showWeather() avec ces données */
function getWeather(zip){
    getCoos(zip)
    .then((coosCities) => {
        console.log(coosCities)
        console.log(coosCities.substring(0, coosCities.indexOf(",")))
        const lat = coosCities.substring(0, coosCities.indexOf(","));
        const lon = coosCities.substring(coosCities.indexOf(",")+2);

        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max&timezone=Europe%2FBerlin`; 
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            showWeather(data)
            showCurrentWeather(data)
        })
    })
}



/* Détecte les mots écrits dans la searchbar puis utilise la fonction ShowCities() sur les lettres écrites */
const searchbar = document.getElementById('search');
searchbar.addEventListener('keydown', function (e) {
    if (e.key !== 'Backspace'){
        ShowCities(searchbar.value.toUpperCase() + e.key.toUpperCase());
    }
    else{
        ShowCities(searchbar.value.slice(0,-1).toUpperCase());
    }
    
}, false);


const element = document.getElementById("suggestion");
element.onclick = e => {
        console.log('Code postal récupéré : ' + e.target.innerText.slice(-6,-1))
        getWeather(e.target.innerText.slice(-6,-1));
        document.querySelector('.location').querySelector('h3').innerHTML = e.target.innerText.slice(0,-8).charAt(0).toUpperCase() + e.target.innerText.slice(1,-8).toLowerCase() + ', France'
        
        while (element.childElementCount !== 0) {
            element.removeChild(element.querySelectorAll('p')[0])
        }
        console.log('Suggestions précédentes effacées')
}

element.onclick = e => {
    getWeather(e.target.innerText.slice(-6,-1));
    document.querySelector('.location').querySelector('h3').innerHTML = e.target.innerText.slice(0,-8).charAt(0).toUpperCase() + e.target.innerText.slice(1,-8).toLowerCase() + ', France'
    
    while (element.childElementCount !== 0) {
        element.removeChild(element.querySelectorAll('p')[0])
    }
    console.log('Suggestions précédentes effacées')
}

searchbar.addEventListener('keydown', function (e) {
    if (e.key == 'Enter'){
        if (document.getElementById("suggestion").firstElementChild !== null){
            getWeather(document.getElementById("suggestion").firstElementChild.innerText.slice(-6,-1));
            document.querySelector('.location').querySelector('h3').innerHTML = document.getElementById("suggestion").firstElementChild.innerText.slice(0,-8).charAt(0).toUpperCase() + document.getElementById("suggestion").firstElementChild.innerText.slice(1,-8).toLowerCase() + ', France'
            
            while (element.childElementCount !== 0) {
                element.removeChild(element.querySelectorAll('p')[0])
            }
            console.log('Suggestions précédentes effacées')
        }
    }
    
}, false);



window.addEventListener("load", (event) => {
    getWeather('34000');
    document.querySelector('.location').querySelector('h3').innerHTML = 'Montpellier, France'
    
});
  

function addstyle()
{
    document.getElementById('style').href='style.css';
}





/* Presser Enter dans la searchbar */

