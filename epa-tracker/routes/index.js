var mysql = require('mysql')
var express = require('express');
var router = express.Router();
var fs = require('fs');
// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'user',
//   password: 'pass',
//   database: 'medtrackdb'
// });
//
// con.connect(function(err){
//   if(err){
//     console.log("Connection error with sql");
//     console.log(err);
//     return;
//   }
//   console.log("Connection established");
//   return;
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/details/:epa',function(req,res) {
  var epaDetails = JSON.parse(fs.readFileSync('assets/epa-details-list.json', 'utf8'));
  res.json(epaDetails.EPAs[req.params.epa-1])
});

router.get('/users/1',function(req,res) {
  res.json({
    graphData:{
      'PreEntrustable': [1,3,2,5],
      'Mastery2': [4,13,11,7,6],
      'Mastery3': [8,9,12],
      'Entrustable': [10]
    },
    summaryDeltas:{
      'Regressed': [11],
      'Even': [1,2,3,4,5,6,7,10,12,13],
      'Improved': [8,9]
    }
  });
});

/*router.get('/students/:id/deltas',function(req,res){
res.json({
  connection.connect();
  connection.query('SELECT newval FROM EPAHistory WHERE id = ? SORT BY updated datetime LIMIT 2', req.params.id, function(err, rows, fields)
  {
          console.log('Connection result error '+err);
          console.log('no of records is '+rows.length);
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify(rows));
  });
});

router.get('/students/:id/summary',function(req,res){
res.json({
  connection.connect();
  connection.query('SELECT ..., req.params.id, function(err, rows, fields)
  //GROUP BY and FIND IN SET (group by epa #, find most recent 1 in set, return most recent value for each) !TODO
  {
          console.log('Connection result error '+err);
          console.log('no of records is '+rows.length);
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify(rows));
  });
});

router.get('/advisers/:id',function(req,res){
  connection.connect();
  connection.query('SELECT student FROM advisees WHERE advisor = ?', req.params.id, function(err, rows, fields)
  {
          console.log('Connection result error '+err);
          console.log('no of records is '+rows.length);
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify(rows));
  });
});

router.get('/tests/:id/:epa',function(req,res){
  connection.connect();
  connection.query('SELECT title, uploaded, newval  FROM EPAHistory WHERE student = ? AND epaid = ? SORT BY updated datetime LIMIT 10', req.params.id, req.params.epa function(err, rows, fields)
  {
          console.log('Connection result error '+err);
          console.log('no of records is '+rows.length);
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify(rows));
  });
});

router.get('/comments/:id',function(req,res){
  connection.connect();
  connection.query('SELECT comment FROM EPAHistory WHERE id = ? SORT BY updated datetime LIMIT 2', req.params.id, function(err, rows, fields)
  {
          console.log('Connection result error '+err);
          console.log('no of records is '+rows.length);
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify(rows));
  });
});
*/

module.exports = router;
