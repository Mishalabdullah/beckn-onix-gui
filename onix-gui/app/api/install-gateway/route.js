import { spawn } from "child_process";
import { NextApiResponse } from "next";

export async function GET(req, res) {
  return new Promise((resolve, reject) => {
    console.log("Cloning GitHub repository...");
    const repoUrl = "https://github.com/beckn/beckn-onix";
    const destination = "/tmp/beckn-onix";
    const gitProcess = spawn("git", ["clone", repoUrl, destination]);

    gitProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    gitProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    gitProcess.on("close", (code) => {
      if (code === 0) {
        console.log("Repository cloned successfully");
        res.status(200).json({ success: true });
        resolve();
      } else {
        console.error(`git process exited with code ${code}`);
        res.status(500).json({ success: false });
        reject();
      }
    });
  });
}
