import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function POST(req) {
  const checked = await req.json();
  const containerName = checked.checked ? "bpp-network" : "bap-network";
  const command = `docker ps -aqf name=${containerName}`;

  try {
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });

    const containerIds = stdout.trim().split("\n");

    if (containerIds.length === 0) {
      console.log(`No containers found with name "${containerName}"`);
      return new NextResponse(
        `No containers found with name "${containerName}"`
      );
    } else {
      console.log(`Container IDs for "${containerName}":`);
      const containerIdList = containerIds.join(", ");
      console.log(containerIdList);
      return new NextResponse(
        `Container IDs for "${containerName}": ${containerIdList}`
      );
    }
  } catch (error) {
    console.error(`exec error: ${error}`);
    return new NextResponse(`Error executing shell command: ${error}`, {
      status: 500,
    });
  }
}
