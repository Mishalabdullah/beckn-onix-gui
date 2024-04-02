import { spawn } from "child_process";
import { NextResponse } from "next/server";

export async function GET(request) {
  return new Promise((resolve, reject) => {
    const beckn_onix = spawn("sudo", [
      "bash",
      "/tmp/beckn-onix/install/beckn-onix.sh",
    ]);
    beckn_onix.stdout.setEncoding("utf8");

    let currentOutput = "";
    let currentError = "";
    // let logs = "";

    beckn_onix.stdout.on("data", (data) => {
      currentOutput += data;
      // console.log("script started");
      if (currentOutput.includes("What would you like to do?")) {
        beckn_onix.stdin.write(`1 \n`);
        console.log("console.log of output \n", currentOutput);
        currentOutput = "";
      } else if (
        currentOutput.includes("Which platform would you like to set up?")
      ) {
        beckn_onix.stdin.write(`1 \n`);
        console.log("console.log of output \n", currentOutput);
        currentOutput = "";
      } else if (
        currentOutput.includes(
          "Please provide the network-specific configuration URL."
        )
      ) {
        // console.log(currentOutput, "network config");
        beckn_onix.stdin.write(`\n`);
        currentOutput = "";
      } else if (
        currentOutput.includes(
          "No network configuration URL provided, proceeding without it."
        )
      ) {
        console.log("step 3");
        beckn_onix.stdin.write(`\n`);
        // console.log("console.log of output \n", currentOutput);
        currentOutput = "";
      } else if (currentOutput.includes("setting up registry")) {
        console.log("step 4", currentOutput);
        beckn_onix.stdin.write(`\n`);
        currentOutput = "";
      } else if (currentOutput.includes("Registry URL not found:")) {
        console.log("step 5", currentOutput);
        beckn_onix.stdin.write(`\n`);
        currentOutput = "";
      } else {
        console.log("Registry URL not found:", currentOutput);
      }
    });

    beckn_onix.stderr.on("data", (data) => {
      currentError += data;
    });

    beckn_onix.on("close", (code) => {
      if (code === 0) {
        resolve(NextResponse.json({ success: true, output: currentOutput }));
      } else {
        reject(
          NextResponse.json(
            { success: false, error: currentError },
            { status: 500 }
          )
        );
      }
    });
  });
}
