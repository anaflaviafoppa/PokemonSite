import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/pokemon'
});



//Service for random single Pokemon:
const single = async id => {
  try{
    const pokemon = await instance.get(`/${id}`);
    return pokemon;
  }catch (error) {
    throw error;
  }
};

export { single };