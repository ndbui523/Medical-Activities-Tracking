var mysql = require('mysql')
var express = require('express');
var router = express.Router();
var fs = require('fs');
var con = mysql.createConnection({
  host: 'mydb.cs.unc.edu',
  user: 'granthum',
  password: 'CH@ngemenow99Please!granthum',
  database: 'medtrackdb'
});

con.connect(function(err){
  if(err){
    console.log("Connection error with sql");
    console.log(err);
    return;
  }
  console.log("Connection established");
  return;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/details/:epa',function(req,res) {
  var epaDetails = JSON.parse(fs.readFileSync('assets/epa-details-list.json', 'utf8'));
  res.json(epaDetails.EPAs[req.params.epa-1])
});

router.get('/users/:id/deltas',function(req,res){
  con.query('SELECT SUM(newval), epaid, count(*) FROM EPAHistory WHERE student = ? GROUP BY epaid', req.params.id, function(err, rows, fields)
  {
    if(err){
      console.log('Connection result error '+err);
    }
    else{
      console.log('no of records is '+rows.length);
      res.set({'Content-Type':'text/json'});
      res.send(JSON.stringify(rows));
      res.end();
    }
  });
});

router.get('/users/:id/summary',function(req,res){
  //con.connect();
  con.query('SELECT newval, MAX(uploaded), epaid FROM EPAHistory WHERE student = ? GROUP BY epaid', req.params.id, function(err, rows, fields)
  {
    if(err){
      console.log('Connection result error '+err);
    }
    else{
      console.log('no of records is '+rows.length);
      res.set({'Content-Type':'text/json'});
      res.send(JSON.stringify(rows));
      res.end();
    }
  });
});



router.get('/adviser/:id/advisees',function(req,res){
  con.query('SELECT fname, lname, email, uid, year FROM Users u WHERE u.adviserid = ?', req.params.id, function(err, rows, fields)
  {
    if(err){
      console.log('Connection result error '+err);
    }
    else{
      console.log('no of records is '+rows.length);
      res.set({'Content-Type':'text/json'});
      res.send(JSON.stringify(rows));
      res.end();
    }
  });
});

router.get('/users/:id',function(req,res){
  con.query('SELECT fname, lname, permissions FROM Users WHERE uid = ?', req.params.id, function(err, rows, fields)
  {
    if(err){
      console.log('Connection result error '+err);
    }
    else{
      console.log('no of records is '+rows.length);
      res.set({'Content-Type':'text/json'});
      res.send(JSON.stringify(rows));
      res.end();
    }
  });
});

// router.get('/tests/:id/:epa',function(req,res){
//   connection.connect();
//   connection.query('SELECT title, uploaded, newval  FROM EPAHistory WHERE student = ? AND epaid = ? SORT BY updated datetime LIMIT 10', req.params.id, req.params.epa function(err, rows, fields)
//   {
//           console.log('Connection result error '+err);
//           console.log('no of records is '+rows.length);
//           res.writeHead(200, { 'Content-Type': 'application/json'});
//           res.end(JSON.stringify(rows));
//   });
// });
//
// router.get('/comments/:id',function(req,res){
//   connection.connect();
//   connection.query('SELECT comment FROM EPAHistory WHERE id = ? SORT BY updated datetime LIMIT 2', req.params.id, function(err, rows, fields)
//   {
//           console.log('Connection result error '+err);
//           console.log('no of records is '+rows.length);
//           res.writeHead(200, { 'Content-Type': 'application/json'});
//           res.end(JSON.stringify(rows));
//   });
// });


module.exports = router;
