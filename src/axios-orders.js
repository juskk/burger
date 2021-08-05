import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-7f304-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance
