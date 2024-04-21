import { exec } from "child_process";
import open from "open";
import { NextResponse } from "next/server";

export default function POST(req, res) {
  const prometheusPath = "/usr/local/bin/prometheus"; // Adjust this path as necessary
  const configPath = "/path/to/your/prometheus.yml"; // Adjust this path as necessary
  const port = 9090; // Set your desired port here

  const command = `${prometheusPath} --config.file=${configPath} --web.listen-address=:${port}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return NextResponse(`Failed to start Prometheus: ${error.message}`, {
        status: 500,
      });
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    // Open a new browser tab to the Prometheus UI
    open(`http://localhost:${port}`)
      .then(() => {
        return NextResponse(
          `Prometheus is running on port ${port}. and the UI has been opened in your browser.`,
          {
            status: 200,
          }
        );
      })
      .catch((err) => {
        return NextResponse(`Failed to open browser: ${err.message}`, {
          status: 500,
        });
      });
  });
}
