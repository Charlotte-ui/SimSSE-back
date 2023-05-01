import express from 'express';
var router = express.Router();
import * as helpers from '../helpers/helpers'

// GET /scenarios/
router.get('/', function(req:any, res) {
	req.graphDB.select().from('Scenario').all()
	.then(function (scenarios:any) {
  		res.send(scenarios);
	});
});

// GET /scenarios/:scenario_id/
router.get('/:id/', function(req:any, res) {
	req.graphDB.record.get(helpers.getRID(req)).then(function (scenario:any) {
		res.send(scenario);
	});
});

// GET /scenarios/:scenario_id/has_groups
router.get('/:id/has_groups', function(req:any, res) {
	var queryStr = helpers.getRelationQuery(helpers.getRID(req), 'HAS_GROUP');
	req.graphDB.query(queryStr, {}).then(function (results:any){
	  res.send(results);
	});
});

// POST /scenarios/
// creates a new scenario
router.post('/', function(req:any, res){
	req.graphDB.create('VERTEX', 'Scenario')
	.set({
		title: req.body.title,
		description: req.body.description
	})
	.one()
	.then(function(vertex:any){
		res.send(vertex);
	});
});

// POST /scenarios/:scenarios_id/has_groups/:group_id
// returns the edge that was created.
router.post('/:id/scenarios_id/:group_id', function(req, res){
	helpers.createRelation(req, 'HAS_GROUP').then(function(edge:any) {
		res.send(edge);
	});
});

// DELETE /scenarios/:scenario_id
// Deleting the vertex automatically deletes all corresponding
// relation edges.
router.delete('/:id', function(req:any, res){
	req.graphDB.delete('VERTEX')
	.where('@rid = ' + helpers.getRID(req))
	.one()
	.then(function (count:any) {
  		res.send(count);
	});
});



module.exports = router;