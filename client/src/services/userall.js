import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});



//Service for random single Pokemon:
const all = async () => {
  try{
    const dataUsers = await instance.get(`/all`);
    const users = dataUsers.data;
    return users;
  }catch (error) {
    throw error;
  }
};

export default all;