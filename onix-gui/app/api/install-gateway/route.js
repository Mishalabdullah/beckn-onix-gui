import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const runtimeArgs = ""; // Assuming you have runtimeArgs defined elsewhere

  const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Error:", error);
          reject(error);
          return;
        }
        const output = stdout + stderr;
        console.log("Output:", output);
        resolve(output);
      });
    });
  };

  try {
    const result1 = await executeCommand(
      `bash /tmp/beckn-onix/install/scripts/package_manager.sh ${runtimeArgs}`
    );
    console.log("Result 1:", result1);

    const result2 = await executeCommand(
      `sudo bash /tmp/beckn-onix/install/scripts/update_gateway_details.sh ${"https://registry.mishalabdullah.xyz"} ${"https://gateway.mishalabdullah.xyz"}`
    );
    console.log("Result 2:", result2);

    const result3 = await executeCommand(
      `docker-compose -f /tmp/beckn-onix/install/docker-compose-v2.yml up -d gateway`
    );
    console.log("Result 3:", result3);

    const result4 = await executeCommand(`sleep 10`);
    console.log("Result 4:", result4);

    const result5 = await executeCommand(
      `bash /tmp/beckn-onix/install/scripts/register_gateway.sh ${"https://gateway.mishalabdullah.xyz"}`
    );
    console.log("Result 5:", result5);

    return NextResponse.json({ result1, result2, result3, result4, result5 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
