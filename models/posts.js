import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema(
{
	title:
	{
		type: String,
		required: true,
	},
	text:
	{
		type: String,
	},
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'Authors' },
});

const Posts = mongoose.model('Posts', postsSchema);

export default Posts;
