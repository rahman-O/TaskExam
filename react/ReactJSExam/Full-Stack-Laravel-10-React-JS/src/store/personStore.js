import {create} from "zustand"
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

 export const  usePersonStore = create(
    devtools(
        immer((set)=>({
            personData: [],

            getApi:async ()=>{
                const apiResponse =await axios.get("http://127.0.0.1:8000/api/persons");
                set((state)=>{
                  
                    state.personData=apiResponse.data.data;  
                    console.log(state.personData);
                });
            },

            createPersonApi:async (payload) =>{
                console.log(payload);
                const apiResponse =await axios.post("http://127.0.0.1:8000/api/persons",payload,{headers:{

                'Content-Type': 'multipart/form-data',
                }});
                set((state)=>{
                    state.personData.push(apiResponse.data);
                });
            },
            updatePersonApi: async(payload)=>{
                console.log(payload);
                const apiResponse =await axios.put(
                    `http://127.0.0.1:8000/api/persons/${payload.id}`,payload,{
                        headers:{
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                );
                set((state)=>{
                    let personState =state.personData.filter((_)=>_.id==payload.id);
                    personState.push(apiResponse);
                    state.personData=personState;

                })
            },

            deletePersonApi:async(id)=>{
                const apiResponse = await axios.delete(
                    `http://localhost:8000/api/persons/${id}`,{ headers: {
                        'Content-Type': 'application/json', // Adjust headers as needed
                      },}
                  );
                  set((state) => {
                    state.personData = state.personData.filter((_) => _.id !== id);
            });
            
            }


        }))
      
    )



);

  export const  getPersonyId = (id) => {
    return (state) => {
      let person = state.personData.filter((c) => c.id === Number(id));
      console.log(person)
      if (person) {
        return person[0];
      }
      return null;
    };
  };
export default {usePersonStore,getPersonyId};