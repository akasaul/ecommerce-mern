import axios from "axios"

const API_URL = 'https://nikoshop-beta-api.onrender.com/auth'

const API_ENTRY = 'https://nikoshop-beta-api.onrender.com';

// Sign up req 
const signup = async (userData) => {
    const res = await axios.post(API_URL + '/signup', userData);
    return res.data;
}

// Login in req 
const login = async (userData) => {
    const res = await axios.post(API_URL + '/login', userData);
    return res.data;
}

// Get User 
const getUser = async (id) => {
    const res = await axios.get(API_ENTRY + '/user/profiles/' + id);
    return res.data;
}

// Get User 
const getMe = async (token) => {
    const config = {
        headers: {
        Authorization: 'Bearer ' + token
    }
}

    const { data } = await axios.get(API_ENTRY + '/user/profile/me', config);
    return data;
}


export default {signup, login, getUser, getMe}