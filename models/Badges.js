import mongoose from 'mongoose';

const BadgeSchema = new mongoose.Schema({
    level: {type: String, required: true},
    badge: {type: String, required: true},
    name: {type: String, required: true}
  },
  {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true
    } 
  });
 

const Badge = mongoose.model("Badge", BadgeSchema);
export {BadgeSchema, Badge};