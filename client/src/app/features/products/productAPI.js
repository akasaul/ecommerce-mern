import axios from 'axios';

const getProducts = async (url) => {
    const { data } = await axios.get(url);
    return data;
}

const addProduct = async(productData, token, url) => {
    const config = {
            headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const { data } = await axios.post(url, productData, config);
    return data;
}

const getProduct = async(url) => {
    const {data} = await axios.get(url);
    return data;
}

export default {getProducts, addProduct, getProduct}