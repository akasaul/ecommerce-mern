import axios from "axios";

const toggleFav = async (id, token, url) => {
    const config = {
        headers: {
        Authorization: 'Bearer ' + token
        }
    }
    const {data} = await axios.post(url, {id}, config);
    const {favs} = data;
    return favs;
}

const getFavs = async (token, url) => {
    const config = {
        headers: {
        Authorization: 'Bearer ' + token
        }
    }
    const {data} = await axios.get(url, config);
    return data;
}


export default {toggleFav, getFavs};