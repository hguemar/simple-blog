import mongoose from 'mongoose';

import Authors from './authors';
import Posts from './posts';

const connectDb = () => {
	mongoose.set('useCreateIndex', true);
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { Authors, Posts };

export { connectDb };

export default models;
