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

    beckn_onix.stdout.on("data", (data) => {
      currentOutput += data;
      console.log("script started");
      if (currentOutput.includes("What would you like to do?")) {
        beckn_onix.stdin.write(`1 \n`);
        console.log("what you like to do", currentOutput);
      } else if (
        currentOutput.includes("Which platform would you like to set up?")
      ) {
        beckn_onix.stdin.write(`1 \n`);
        console.log("which platform", currentOutput);
        currentOutput = "";
      } else if (
        currentOutput.includes(
          "Paste the URL of the network configuration here (or press Enter to skip):"
        )
      ) {
        console.log(currentOutput, "network config");
        beckn_onix.stdin.write(``);
        console.log("network config");
        currentOutput = "";
      } else if (currentOutput.includes("Enter your registry URL: ")) {
        console.log("step 3");
        beckn_onix.stdin.write(`\n`);
        currentOutput = "";
      } else if (
        currentOutput.includes("Enter publicly accessible gateway URL:")
      ) {
        console.log("step 4");
        beckn_onix.stdin.write(`\n`);
        currentOutput = "";
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
