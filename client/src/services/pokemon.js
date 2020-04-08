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

/*SERVICE FOR PUSH*/

const editUser = async (data) => {
  const id = data.id;
  const pokemon = data.pokemon;
  const score=data.score;
  const timesPlayed = data.timesPlayed;
  const counterRandom = data.counterRandom;

  
  
    try{
      await instance.put(`/editUserPush/${id}`,{ pokemon, score, timesPlayed, counterRandom }); 
    }catch (error) {
      throw error;
    }
  
}

/*SERVICE FOR PULL*/
const editUserPull = async (data) => {
  const id = data.id;
  const pokemon = data.pokemon;


  try{
    await instance.put(`/editUserPull/${id}`,{ pokemon }); 
  }catch (error) {
    throw error;
  }
  
}

const editUserCounter = async (data) => {
  const id = data.id;
  const counterRandom = data.counterRandom;
  
    try{
      await instance.put(`/editUserCounter/${id}`,{ counterRandom }); 
    }catch (error) {
      throw error;
    }
  
}


const singleUser = async (data) => {
    const id = data.id;
   
    try{
      const user = await instance.get(`/singleUser/${id}`); 
      return user;
    }catch (error) {
      throw error;
    }
}



export { single, editUser, singleUser, editUserPull, editUserCounter };