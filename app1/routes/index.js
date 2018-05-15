var express = require('express');
var router = express.Router();
var fs = require('fs');
var fse = require('fs-extra');
/* GET home page. */
var i = 1;


router.post('/writefile', function (req, res, next) {

  var gitUrl = req.body.gitUrl;
  var repoBranch = req.body.repoBranch;
  var fileName = 'file-' + new Date().getTime() + '.yml';
  var content = `
        ---
        jobName: '`+ req.body.jobname + `'
        #description: 'Builds and tests the Geldzin4 web application, with sources in BitBuScket.'
        #projectUrl: https://bitbucket.org/jmithe day i yelled remba/geldzin4dev/
        #displayName: 'Development project on BitBucket'
        gitUrl: '` + gitUrl + `'
        repoBranch: '`+ repoBranch + `'
        #browserClass: 'hudson.plugins.git.browser.BitbucketWeb'
        #browserUrl: 'https://bitbucket.org/jmiremba/geldzin4dev'
        #scmPolling: 'H/10 * * * *'
        #mavenGoals: 'clean cobertura:cobertura site:site site:stage -Pjenkins_sanity'
        #mavenJvmOptions: '-Dgeldzin.config=/var/builds/geldzin4/geldzin.properties'
        #ansibleInventory: ansible/ansible.inventory
        #ansibleTestPrepPlaybook: ansible/test-preparation.yml
        #ansibleTestConclPlaybook: ansible/test-conclusion.yml
  `
  var destPath = '../build' + i;
  if (!fs.existsSync(destPath)) {
    fse.copy('builds', destPath)
      .then(() => {
        fs.writeFile(destPath + '/jenkins/test/' + fileName, content, function (err) {
          if (err) {
            res.send('Unable to Generate Directory');
          } else {
            i++;
            res.send('Directory Generated Successfully')
          }
        })
      })
      .catch(() => {
        res.send('Error while trying to generate');
      })
  }else{
    i++;
  }



});

module.exports = router;
