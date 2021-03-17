import axios from 'axios';

const api=axios.create({
    baseURL: 'http://localhost:3333/', // endereço com porta onde está o backend 
})

export default api;