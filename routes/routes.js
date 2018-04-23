let express = require('express');
let router = express.Router();
let IndividualController = require('../app/controllers/IndividualController');

router.use(function(req, res, next) {
	console.log('Received request');
	next(); // make sure we go to the next routes and don't stop here
});

router.use("/api", router);

router.get("/", function(req, res) {
	res.status(200).send("Hello!");
});

router.route('/individuals')
	.get(IndividualController.GetIndividuals)
	.post(IndividualController.CreateIndividual)

router.route('/individuals/:individual_id')
	.get(IndividualController.GetIndividuals)
	.put(IndividualController.PutIndividual)
	.patch(IndividualController.PatchIndividual)
	.delete(IndividualController.DeleteIndividual);

router.route('/individuals/:individual_id/emails')
	.get(IndividualController.GetEmails)
	.post(IndividualController.CreateEmail);

router.route('/individuals/:individual_id/emails/:email_id')
	.get(IndividualController.GetEmails)
	.put(IndividualController.PutEmail)
	.patch(IndividualController.PatchEmail)
	.delete(IndividualController.DeleteEmail);

router.route('/individuals/:individual_id/addresses')
	.get(IndividualController.GetAddresses)
	.post(IndividualController.CreateAddress);

router.route('/individuals/:individual_id/addresses/:address_id')
	.get(IndividualController.GetAddresses)
	.put(IndividualController.PutAddress)
	.patch(IndividualController.PatchAddress)
	.delete(IndividualController.DeleteAddress);

module.exports = router;
