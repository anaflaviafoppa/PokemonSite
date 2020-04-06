import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/pokemon'
});



//Service for random single Pokemon:
const single = async data => {
  const number = data.number;
  
  try{
    const dataPokemon = await instance.get(`/single/${number}`);
    const pokemon = dataPokemon.data;
   
    return pokemon;
  }catch (error) {
    throw error;
  }
};

const editUser = async (id,pokemon) => {
  try{
  
    await instance.put(`/edituser/${id}/${pokemon}`); 
  }catch (error) {
    throw error;
  }
}

export { single, editUser };