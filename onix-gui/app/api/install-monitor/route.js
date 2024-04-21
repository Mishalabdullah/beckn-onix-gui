import { execSync } from "child_process";
import os from "os";
import { NextResponse } from "next/server";

// export const config = {
//   runtime: "edge",
// };

export default async function POST(req) {
  try {
    const platform = os.platform();
    if (platform === "darwin") {
      execSync("brew install prometheus", { stdio: "inherit" });
    } else if (platform === "linux") {
      execSync("sudo apt-get update && sudo apt-get install prometheus", {
        stdio: "inherit",
      });
    } else {
      return new NextResponse(
        `Installation not supported automatically for ${platform}. Please install Prometheus manually.`,
        { status: 500 }
      );
    }

    return new NextResponse("Prometheus has been installed successfully.", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Failed to install Prometheus: ${error.message}`, {
      status: 500,
    });
  }
}
