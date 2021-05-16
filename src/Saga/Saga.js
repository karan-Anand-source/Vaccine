import {
  REQUEST_GET_COVID_DETAILS,
  retrieveGetCovidDetails
} from "../Actions/testActions";
import {takeEvery,call, put} from "redux-saga/effects";
import {getApiData} from "../Api/Api";

function* getDetails(action){
  const response= yield call(getApiData,action);
  yield put(retrieveGetCovidDetails(response.data.centers));
  console.log(response.data.centers);
}

export  function* CovidSaga(){
 yield  takeEvery( REQUEST_GET_COVID_DETAILS,getDetails);
  console.log("Saga calling");
}