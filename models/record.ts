import { Schema, model, models } from 'mongoose';

const recordSchema = new Schema({
  masterpiece: String,
});

const Record = models.Record || model('Record', recordSchema);

export default Record;