const search = document.querySelector('#search')
const suggestions = document.querySelector('#suggestions')

/* Gère les suggestions de recherches */
async function searchCities(searchText) {
    /* Charge le JSON des villes de France */
    const res = await fetch('./france.json')
    const cities = await res.json()

    /* Retourne un tableau 'matches' de toutes les villes qui commencent par 'searchText' */
    let matches = cities.filter(city => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return city.Nom_commune.match(regex)
    })

    if (search.value.length == 0){
        matches = []
    }

    /* Efface toutes les suggestions précédentes */
    suggestions.innerHTML = ''

    /* Ajoute chaque élement du tableau 'matches' comme suggestion */
    for (let i = 0; i < 5 && i < matches.length; i++) {
        const para = document.createElement('p')
        const suggestion = document.createTextNode(`${matches[i]['Nom_commune']} (${matches[i]['Code_postal']})`)
        para.appendChild(suggestion)
        suggestions.appendChild(para)
    }
}

/* Dès que l'input a une valeur, appelle la fonction 'searchCities()' avec la valeur en paramètre */
search.addEventListener('input', () => searchCities(search.value));

async function getCoos(code_postal) {
    /* Charge le JSON des villes de France */
    const res = await fetch('./france.json')
    const cities = await res.json()

    /* Retourne un tableau 'coordonnes' de la ville correspondante */
    let match = cities.filter(city => {
        return city.Code_postal == code_postal
    })
    lon = match[0]['Coordonnees'].match(/\d+\.\d+/g)[0]
    lat = match[0]['Coordonnees'].match(/\d+\.\d+/g)[1]
    coordonnes = [lon,lat]
    return coordonnes
}

async function changeWeather(code_postal) {
    getCoos(code_postal).then(async (coordonnees) => {
        lat = coordonnees[0]
        lon = coordonnees[1]

        /* Appelle l'API d'Open-Meteo */
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max&timezone=Europe%2FBerlin`)
        const weather = await res.json()

        /* Modifie le DOM des 7 prochains jours */
        const cards = document.querySelector('.cards')
        for (let i = 0; i < 7 ; i++) {
            cards.children[i].querySelector('h5').innerHTML = Math.round(weather['daily']['temperature_2m_max'][i]) + '°C';
            cards.children[i].querySelector('img').src = 'img/weather_code/' + weather['daily']['weather_code'][i] + '.svg';
            
            date = new Date(weather['daily']['time'][i])
            day = date.getDay()
            dayElement = cards.children[i].querySelector('p').innerHTML
            switch (day) {
                case 0:
                    cards.children[i].querySelector('p').innerHTML = 'Sun'
                    break;
                case 1:
                    cards.children[i].querySelector('p').innerHTML = 'Mon'
                    break;
                case 2:
                    cards.children[i].querySelector('p').innerHTML = 'Tue'
                    break;
                case 3:
                    cards.children[i].querySelector('p').innerHTML = 'Wed'
                    break;
                case 4:
                    cards.children[i].querySelector('p').innerHTML = 'Thu'
                    break;
                case 5:
                    cards.children[i].querySelector('p').innerHTML = 'Fri'
                    break;
                case 6:
                    cards.children[i].querySelector('p').innerHTML = 'Sat'
                    break;
                default:
                    console.log(day == '0');
            }
        }
        /* Modifie les conditions actuelles */
        const main_card = document.querySelector('.main-card')
        date = new Date(weather['current']['time'])
        main_card.querySelector('h6').innerHTML = `Conditions observed at ${date.getHours()}:00`
        main_card.querySelector('img').src = 'img/weather_code/' + weather['current']['weather_code'] + '.svg';
        main_card.querySelector('h5').innerHTML = Math.round(weather['current']['temperature_2m']) + '°C';
        switch (weather['current']['weather_code']) {
            case 0:
                main_card.querySelector('p').innerHTML = 'Clear sky'
                break;
            case 1:
                main_card.querySelector('p').innerHTML = 'Mainly clear'
                break;
            case 2:
                main_card.querySelector('p').innerHTML = 'Partly cloudy'
                break;
            case 3:
                main_card.querySelector('p').innerHTML = 'Overcast'
                break;
            case 45:
                main_card.querySelector('p').innerHTML = 'Fog'
                break;
            case 48:
                main_card.querySelector('p').innerHTML = 'Depositing rime fog'
                break;
            case 51:
                main_card.querySelector('p').innerHTML = 'Light drizzle'
                break;
            case 53:
                main_card.querySelector('p').innerHTML = 'Moderate drizzle'
                break;
            case 55:
                main_card.querySelector('p').innerHTML = 'Dense intensity drizzle'
                break;
            case 56:
                main_card.querySelector('p').innerHTML = 'Light freezing drizzle'
                break;
            case 57:
                main_card.querySelector('p').innerHTML = 'Dense intensity freezing drizzle'
                break;
            case 61:
                main_card.querySelector('p').innerHTML = 'Slight rain'
                break;
            case 63:
                main_card.querySelector('p').innerHTML = 'Moderate rain'
                break;
            case 65:
                main_card.querySelector('p').innerHTML = 'Heavy intensity rain'
                break;
            case 66:
                main_card.querySelector('p').innerHTML = 'Light freezing rain'
                break;
            case 67:
                main_card.querySelector('p').innerHTML = 'Heavy intensity freezing rain'
                break;
            case 71:
                main_card.querySelector('p').innerHTML = 'Slight snow fall'
                break;
            case 73:
                main_card.querySelector('p').innerHTML = 'Moderate snow fall'
                break;
            case 75:
                main_card.querySelector('p').innerHTML = 'Heavy intensity snow fall'
                break;
            case 77:
                main_card.querySelector('p').innerHTML = 'Snow grains'
                break;
            case 80:
                main_card.querySelector('p').innerHTML = 'Slight rain showers'
                break;
            case 81:
                main_card.querySelector('p').innerHTML = 'Moderate rain showers'
                break;
            case 82:
                main_card.querySelector('p').innerHTML = 'Violent rain showers'
                break;
            case 85:
                main_card.querySelector('p').innerHTML = 'Slight snow showers'
                break;
            case 86:
                main_card.querySelector('p').innerHTML = 'Heavy snow showers'
                break;
            case 95:
                main_card.querySelector('p').innerHTML = 'Slight or Moderate thunderstorm'
                break;
            case 96:
                main_card.querySelector('p').innerHTML = 'Thunderstorm with slight hail'
                break;
            case 99:
                main_card.querySelector('p').innerHTML = 'Thunderstorm with heavy hail'
                break;
        }  
    
        const card = document.querySelectorAll('.actuellement .card')
        card[0].querySelector('h5').innerText = Math.round(weather['current']['apparent_temperature']) + '°C';
        card[1].querySelector('h5').innerText = Math.round(weather['current']['relative_humidity_2m']) + '%';
        card[2].querySelector('h5').innerText = Math.round(weather['current']['wind_speed_10m']) + ' km/h';
        card[3].querySelector('h5').innerText = Math.round(weather['current']['precipitation']) + ' mm';
        card[4].querySelector('h5').innerText = Math.round(weather['current']['cloud_cover']) + '%';
        card[5].querySelector('h5').innerText = Math.round(weather['current']['surface_pressure']) + ' hPa';        

    })
}

/* Fonction principale qui, à partir d'une ville, change toutes les informations de la page */
function main(city){
    code_postal = city.match(/\(\d+\)/g)[0].slice(1,-1)
    console.log(city, code_postal)
    changeWeather(code_postal)

    nom_commune = city.match(/^[A-z, ]+/g)[0].slice(0,-1)
    nom_commune_capitalize = nom_commune.slice(0,1).toUpperCase() + nom_commune.slice(1).toLowerCase()
    document.querySelector('.location').querySelector('h3').innerHTML = `${nom_commune_capitalize}, France`

    search.value = ''
    
    suggestions.innerHTML = ''
}

/* Appelle la fonction principale si l'on clique sur une suggestion */
suggestions.onclick = function (e) {
    main(e.target.innerText)
}
/* Appelle la fonction principale avec la première suggestion si l'on fait Enter dans la barre de recherche */
search.addEventListener('keydown', function (e) {
    if(e.key == 'Enter' && suggestions.firstChild !== null){
        main(suggestions.firstChild.innerText)
    }
})

window.addEventListener("load", (event) => {
    main('MONTPELLIER (34000)')
    search.removeAttribute("value")
});