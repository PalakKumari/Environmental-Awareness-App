import initDB from '../../helpers/db'
import { sendError,sendSuccess } from '../../utilities/response-helpers';
var Indiv =require("../../models/Individual")
import potentialIndividual from "./auth/signupin"

export default async function indProfileCompletion (req, res){
    if (req.method === "POST"){

        initDB()
        const {inProfValues} = req.body
        const {id,individualName,
            areaName,
            cityName,
            stateName,
            pincode,
            countryName,
            occupation,
            facebook,
            linkedin} = inProfValues
            console.log(inProfValues)
           
            //checking if id exists in verified account or not
            var idExists = await VerAcc.find({_id:{$eq:id}})
            console.log(idExists);
        if (idExists !== null) {
             const {email,password,contact,dob} = idExists   
            console.log(email,contact,dob)
            
            try {
                if (!individualName || !areaName || !cityName || !stateName || !pincode || !countryName || !occupation || !facebook || !linkedin) {
                    return sendError(res,"Please fill all fields",11,422)
                }


                const newIndividual = await  new Indiv({
                        name:individualName,
                        
                        email,password,contact,dob,
                        
                    address:{area:areaName,city:cityName,state:stateName,pincode,nation:countryName},occupation,facebook,linkedin
                      }).save()
                if (newIndividual) return sendSuccess(res, newIndividual)
                else return sendError(res, err.message,err.message,422);
            } catch (err) {
                console.log(err.message)
                return sendError(res, err.message,err.message,422); 
            }
        }else{
            return sendError(res,"Such id not exists in verified accounts",18,700)
        }
    }
}
