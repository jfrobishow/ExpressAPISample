let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let Emails = new Schema(
	{
		type: String,
		address: String,
	},
	{	timestamps: true }
);

let AddressSchema = new Schema(
	{
	line1: 'string',
	line2: 'string',
	city: {type:'string', required:true},
	postalCode: {type:'string'},
	province: 'string',
	country: 'string'
	},
	{	timestamps: true }
);

Address = mongoose.model('Address', AddressSchema);

let IndividualSchema   = new Schema(
	{
    firstname: { type: String, required: true, minlenght:1, maxlength:255 },
    lastname: { type: String, required: true, minlenght:1, maxlength:255 },
		emailAddress: [Emails],
		address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    gender: { type: String, required:true, enum: ['male', 'female', 'other'] }
	},
	{	timestamps: true }
);

Individual = mongoose.model('Individual', IndividualSchema);

module.exports = {
    Individual: Individual,
    Address: Address,
};