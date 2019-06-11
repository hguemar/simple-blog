const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema(
{
	tag: 
	{
		type: String,
	},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
});

tagsSchema.statics.findByTag = async function(mot) 
{
	let tag = await this.findOne({ tag: mot, });

	return tag;
};

tagsSchema.pre('remove', function(next) 
{
	this.model('Posts').deleteMany({ tag: this._id }, next);
});

const Tags = mongoose.model('Tags', tagsSchema);

module.exports = Tags;
