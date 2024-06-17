import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IGenre extends Document {
  name: string;
  movie_id: mongoose.Schema.Types.ObjectId;
  created_at: Date;
}

const genreSchema = new Schema<IGenre>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  movie_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, 
);

const Genre = model<IGenre>('Genre', genreSchema);

export default Genre;
