const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('node:fs');



async function run() {
  try {
    // `who-to-greet` input defined in action metadata file
    const body = core.getInput('body');
    fs.writeFileSync('body.txt', body);
    await exec.exec('git add body.txt');
    const cmd = 'git commit -m "' + body + '"';
    await exec.exec(cmd);
    await exec.exec('git push');
    core.setOutput("out", body);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}


run();
