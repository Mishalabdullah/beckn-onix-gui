import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function POST(req) {
  const checked = await req.json();
  const containerName = checked.checked ? "bpp-network" : "bap-network";

  try {
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      const commands = [
        `docker ps -aqf name=${containerName}`,
        `docker exec ${containerName}  ls /usr/src/app/schemas/ | grep -v "core" | grep ".yaml" | wc -l`,
      ];

      let allStdout = "";
      let allStderr = "";

      const runCommand = (index) => {
        if (index >= commands.length) {
          resolve({ stdout: allStdout, stderr: allStderr });
          return;
        }

        const command = commands[index];
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            allStdout += stdout;
            allStderr += stderr;
            runCommand(index + 1);
          }
        });
      };

      runCommand(0);
    });

    const yamlFiles = parseInt(stdout.trim(), 10);
    console.log(yamlFiles, "yaml");

    if (isNaN(yamlFiles)) {
      return new NextResponse(`Invalid output: ${stdout}`, {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify({ yamlFiles }));
  } catch (error) {
    console.error(`exec error: ${error}`);
    return new NextResponse(`Error executing shell command: ${error}`, {
      status: 500,
    });
  }
}
