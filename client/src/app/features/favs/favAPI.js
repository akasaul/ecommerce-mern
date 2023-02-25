import axios from "axios";

const toggleFav = async (id, token, url) => {
    const config = {
        headers: {
        Authorization: 'Bearer ' + token
        }
    }
    const {data} = axios.post(url, {id}, config);
    console.log(data);
    return data;
}


export default {toggleFav};