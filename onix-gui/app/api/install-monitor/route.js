import { execSync } from "child_process";
import os from "os";

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const platform = os.platform();

      if (platform === "darwin") {
        execSync("brew install prometheus", { stdio: "inherit" });
      } else if (platform === "linux") {
        execSync("sudo apt-get update && sudo apt-get install prometheus", {
          stdio: "inherit",
        });
      } else {
        res
          .status(500)
          .send(
            `Installation not supported automatically for ${platform}. Please install Prometheus manually.`
          );
        return;
      }

      res.status(200).send("Prometheus has been installed successfully.");
    } catch (error) {
      res.status(500).send(`Failed to install Prometheus: ${error.message}`);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
