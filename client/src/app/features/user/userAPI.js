import axios from "axios"

const API_URL = 'auth'

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

export default {signup, login}