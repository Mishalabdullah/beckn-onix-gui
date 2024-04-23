import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function POST(req) {
  const checked = await req.json();
  const containerName = checked.checked ? "bpp-network" : "bap-network";
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
    const result = await executeCommand(
      `docker exec ${containerName}  ls /usr/src/app/schemas/ | grep -v "core" | grep ".yaml" | wc -l`
    );

    return new NextResponse(JSON.stringify({ result }));
  } catch (error) {
    console.error(`exec error: ${error}`);
    return new NextResponse(`Error executing shell command: ${error}`, {
      status: 500,
    });
  }
}
