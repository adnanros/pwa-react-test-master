import axios from "axios";

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY ='6fc06895fb6a6d2dc014b63e32b8a144'

export const fetchWeather = async (query) => {
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}