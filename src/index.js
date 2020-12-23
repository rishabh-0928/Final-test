import mongoose from 'mongoose';

const { Schema } = mongoose;

const videoSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: String, required: true },
  isbn: { type: String, required: true }
});

export const Gamedata = mongoose.model('gamedata', videoSchema);