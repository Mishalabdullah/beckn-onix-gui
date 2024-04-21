import { mkdirSync, existsSync } from "fs";
import { join } from "path";
import os from "os";
import { NextResponse } from "next/server";

export default function POST(req, res) {
  const homeDir = os.homedir();
  const dataDir = join(homeDir, "prometheus_data");

  try {
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
      return NextResponse(
        {
          message: `Data directory created at: ${dataDir}`,
        },
        { status: 200 }
      );
    } else {
      return NextResponse(
        {
          message: `Data directory already exists at: ${dataDir}`,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse(
      {
        error: `Failed to create data directory: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
