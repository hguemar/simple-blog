import mongoose from 'mongoose';

const authorsSchema = new mongoose.Schema(
{
	username: 
	{
		type: String,
		unique: true,
	},
	password: 
	{
		type: String,
	},
	email: 
	{
		type: String,
	},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
});

authorsSchema.statics.findByLogin = async function(login) 
{
	let author = await this.findOne({ username: login, });

	if (!author) { author = await this.findOne({ email: login }); }

	return author;
};

authorsSchema.pre('remove', function(next) 
{
	this.model('Posts').deleteMany({ author: this._id }, next);
});

const Authors = mongoose.model('Authors', authorsSchema);

export default Authors;
