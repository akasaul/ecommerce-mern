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


const updateProduct = async(productData, token, url) => {
    const config = {
            headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const { data } = await axios.put(url, productData, config);
    return data;
}


const deleteProduct = async(token, url) => {
    const config = {
            headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const { data } = await axios.delete(url, config);
    console.log(data);
    return data;
}


const searchProduct = async(url) => {
    const { data } = await axios.get(url);
    return data;
}


const rateProduct = async(value, token, url) => {
    const config = {
            headers: {
            Authorization: 'Bearer ' + token
        }
    }
    console.log({value});
    const { data } = await axios.post(url, {value}, config);
    return data;
}



export default {getProducts, addProduct, getProduct, searchProduct, updateProduct, deleteProduct, rateProduct}