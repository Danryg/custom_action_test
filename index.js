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
    const input = core.getInput("file-input")
    console.log(input)
    const body = core.getInput("body");
    const head = core.getInput("head");
    //write the body to a file
    fs.writeFileSync(`./js_res/${head}-body.txt`, body);
    //run the git commands to commit and push the file
    await exec.exec("ls -la");
    await exec.exec("git pull");
    await exec.exec("git config --global user.email 'action@github.com'");
    await exec.exec("git config --global user.name 'GitHub Action'");
    const cmd = "git add ./js_res/" + head + "-body.txt";
    await exec.exec(`git add ./js_res/${head}-body.txt`);
    await exec.exec('git commit -m "Add body.txt"');
    await exec.exec("git push");
    //set the output
    core.setOutput("out", body);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
