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

// Get User 
const getUser = async (id) => {
    const res = await axios.get('/user/profiles/' + id);
    return res.data;
}

export default {signup, login, getUser}