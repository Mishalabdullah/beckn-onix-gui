import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req, res) {
  const response = await req.json();
  const serverName = response.serverName;
  const portNumber = response.proxyname;
  try {
    const scriptPath = "../../scripts/configure-nginx.sh";
    const { stdout, stderr } = await exec(
      `${scriptPath} ${serverName} ${portNumber}`
    );

    if (stderr) {
      return res.status(500).json({ error: stderr });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 },
      { error: error.message }
    );
  }
}
