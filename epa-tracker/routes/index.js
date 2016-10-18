var sql = require('mysql')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/details/1',function(req,res) {
  res.json({
    "id" : "1",
    "criteria" : [
      {
        "mainCriteria" : "Information gathering and physical exam maneuvers:",
        "subCriteria" : [
          "Obtains a complete and accurate history in an organized fashion.",
          "Identifies pertinent history elements in common presenting situations, symptoms, complaints, disease states (acute and chronic).",
          "Obtains focused, pertinent histories in urgent, emergent, and consultation settings.",
          "Identifies and uses alternate sources of information to obtain history when needed, including from family members, primary care physicians, living facilities, and pharmacies.",
          "Performs a complete and accurate physical exam in logical and fluid sequence.",
          "Performs a clinically relevant, focused physical exam pertinent to the setting and focus of the patient visit.",
          "Identifies, describes, and documents abnormal physical exam findings."
        ]
      },
      {
        "mainCriteria" : "Scientific foundation and/or reasoning skills:",
        "subCriteria" : [
          "Demonstrates clinical reasoning in gathering focused information relevant to a patient’s care.",
          "Links current findings to those from previous patients.",
          "Uses analytic reasoning and activation of prior knowledge to guide process."
        ]
      },
      {
        "mainCriteria" : "Patient-centered skills:",
        "subCriteria" : [
          "Demonstrates patient-centered interview skills (attentive to patient verbal and nonverbal cues, patient/ family culture, social determinants of health, need for interpretive or adaptive services; demonstrates active listening skills).",
          "Demonstrates patient-centered examination techniques that reflect respect for patient privacy, comfort, and safety (that is, explaining physical exam maneuvers, telling the patient what the physician is doing at each step, keeping patients covered during the examination)."
        ]
      }
    ]
  });
});
router.get('/users/1',function(req,res) {
  res.json({
    graphData:{
      'Mastery1': [1,3,2,5],
      'Mastery2': [4,13,11,7,6],
      'Mastery3': [8,9,12],
      'Mastery4': [10]
    },
    summaryDeltas:{
      'Regressed': [11],
      'Even': [1,2,3,4,5,6,7,10,12,13],
      'Improved': [8,9]
    }
  });
});

module.exports = router;
