import {
    REQUEST_GET_COVID_DETAILS,
    RETRIEVE_GET_COVID_DETAILS
} from "../Actions/testActions"


const initialState={
    data:[],
    failed:""
};

export const CovidReducer = (state = initialState,action) =>{
    console.log(state);
  switch(action.type){
   
      case REQUEST_GET_COVID_DETAILS:
          return state
      case RETRIEVE_GET_COVID_DETAILS:
          if(action.payload.length==0){
            return state={...state,data:action.payload,failed:true} 
          }
          else{
            return state={...state,data:action.payload,failed:false} 
          }
            
     default:
          return state
  }
};