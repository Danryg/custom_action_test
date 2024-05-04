const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
const fs = require("node:fs");

async function run() {
  try {
    console.log("Hello World");
    const res = await exec.exec("ls -la");
    console.log(res);
    //fetch the input
    const body = core.getInput("body");
    //write the body to a file
    fs.writeFileSync("body.txt", body);
    //run the git commands to commit and push the file
    await exec.exec("git add body.txt");
    const cmd = 'git commit -m "' + body + '"';
    await exec.exec(cmd);
    await exec.exec("git push");
    core.setOutput("out", body);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
