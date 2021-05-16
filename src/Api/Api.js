import axios from "axios";
export const getApiData= async data =>{
    console.log(data);
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;

   const Data={
        pincode:data.payload.pincode,
        date:today

    }
   
    return await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${Data.pincode}&date=${Data.date}`)
}