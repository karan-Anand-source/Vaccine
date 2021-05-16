import {createAction} from "redux-actions";

export const REQUEST_GET_COVID_DETAILS="REQUEST_GET_COVID_DETAILS";
export const requestGetCovidDetails= createAction(
    REQUEST_GET_COVID_DETAILS,
    null
);
export const RETRIEVE_GET_COVID_DETAILS="RETRIEVE_GET_COVID_DETAILS";
export const retrieveGetCovidDetails= createAction(
    RETRIEVE_GET_COVID_DETAILS,
    null
);