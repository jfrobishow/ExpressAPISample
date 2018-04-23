let models = require('../models/individual');
let Individual = models.Individual;
let Address = models.Address

exports.GetIndividuals = function (req, res){
	let filters = {};

	if(req.params.individual_id){
		filters._id = req.params.individual_id;
	}

	Individual.find(filters).select('-__v').exec(function(err, individuals) {
		if (err){
			return res.status(422).send(err);
		}

		if(filters._id !== undefined && individuals.length != 1){ //if we have a filter by id, make sure we have one record and only one, else return a 404.
			return res.status(404).send("");
		}

		return res.json(individuals);
	});
}

exports.CreateIndividual = function(req, res) {
	let individual = new Individual(req.body);

	individual.save(function(err) {
		if (err){
			return res.status(422).send(err);
		}
		return res.json(individual);
  });
};

exports.PutIndividual = function(req, res) {
	res.status(501).send({message:'PUT is not implemented.'})
};

exports.PatchIndividual = function(req, res) {
	if(! require('mongoose').Types.ObjectId.isValid(req.params.individual_id)) {
		return res.status(400).send({message:'Invalid ID format'})
	}

	Individual.findByIdAndUpdate(
		req.params.individual_id,
		req.body,
		{new:true, runValidators: true},
		(err, individual) => {
    	// Handle any possible database errors
			if (err) return res.status(422).send(err);

			if(individual){
				return res.send(individual);
			} else {
				return res.status(404).send();
			}
    }
	);
};

exports.DeleteIndividual = function(req, res) {
	if(! require('mongoose').Types.ObjectId.isValid(req.params.individual_id)) {
		return res.status(400).send({message:'Invalid ID format'})
	}

	Individual.remove(
		{_id: req.params.individual_id },
		function(err, result) {
			if (err){
				return res.send(err);
			}

			if(result.n > 0){ //At least one record affected
				return res.json({ message: 'Success' });
			}

			return res.status(404).send("");
		}
	);
};

/********************************************************************************
*Addresses
********************************************************************************/
exports.GetAddresses = function (req, res){
	//.populate( 'tags', null, { tagName: { $in: ['funny', 'politics'] } } )
	//.populate('user', null, { _id: 0 })
	Individual.findById(req.params.individual_id).populate('address').exec(function(err, individual) {
		if (err){	return res.status(422).send(err); }
		if(!individual){ return res.status(404).send({});	}

		res.json(individual.address);
	});
}

exports.CreateAddress = function (req, res){
	Individual.findById(req.params.individual_id, function(err, individual){
		if(err){ return res.status(422).send(err); }
		if(!individual){ return res.status(404).send({}); }

		let address = new Address(req.body);

		address.save(function (err, address){
			if(err){ return res.status(422).send(err); }

			individual.address.push(address._id);

      individual.save(function(err, individual){
				if(err){ return res.status(422).send(err); }

				return res.json(address);
			});
    });
	});
};

exports.PutAddress = function (req, res){
	res.status(501).send({message:'PUT is not implemented.'})
};

exports.PatchAddress = function (req, res){
	res.status(501).send({message:'PATCH is not implemented.'})
};

exports.DeleteAddress = function (req, res){
	res.status(501).send({message:'DELETE is not implemented.'})
};

/********************************************************************************
*Emails
********************************************************************************/
exports.GetEmails = function (req, res){
	res.send('NOT IMPLEMENTED: GET');
};

exports.CreateEmail = function (req, res){
	res.send('NOT IMPLEMENTED: POST');
};

exports.PutEmail = function (req, res){
	res.status(501).send({message:'PUT is not implemented.'})
};

exports.PatchEmail = function (req, res){
	res.status(501).send({message:'PATCH is not implemented.'})
};

exports.DeleteEmail = function (req, res){
	res.status(501).send({message:'DELETE is not implemented.'})
};