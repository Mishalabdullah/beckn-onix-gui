import { writeFileSync } from "fs";
import { join } from "path";
import os from "os";
import { NextResponse } from "next/server";

export default function POST(req, res) {
  const dataDir = join(os.homedir(), "prometheus_data");
  const configPath = join(dataDir, "prometheus.yml");
  const configContent = `
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

storage:
  tsdb:
    path: ${dataDir}
  retention: 15d
`;

  try {
    writeFileSync(configPath, configContent);
    return NextResponse(
      {
        message: `Prometheus configuration written to: ${configPath}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse(
      {
        error: `Failed to write Prometheus configuration: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
