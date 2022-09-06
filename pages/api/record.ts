import mongoose from "mongoose"
import Record from "../../models/record"
import connectMongo from "../../utils/connectMongo";

 
//to parse json content
export default async function addTest(req: any, res: any) {
    try {
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');
  
      console.log('CREATING DOCUMENT');
      const masterpiece = await Record.create(req.body);
      console.log('CREATED DOCUMENT');
  
      res.json({ masterpiece });
        
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }