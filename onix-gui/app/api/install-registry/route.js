import { exec } from "child_process";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";

export async function GET(req, res) {
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
  const updateRegistryDetails = async (url) => {
    let registryUrl = "";
    let registryPort = "";
    let protocol = "";

    if (url) {
      if (url.startsWith("https://")) {
        registryUrl = url.replace("https://", "");
        registryPort = "443";
        protocol = "https";
      } else if (url.startsWith("http://")) {
        registryUrl = url.replace("http://", "");
        registryPort = "80";
        protocol = "http";
      }
    } else {
      registryUrl = "registry";
      registryPort = "3030";
      protocol = "http";
    }

    console.log("Registry URL:", registryUrl);

    const configFile =
      "/tmp/beckn-onix/install/registry_data/config/swf.properties";
    const sampleFile =
      "/tmp/beckn-onix/install/registry_data/config/swf.properties-sample";

    try {
      await fs.copyFile(sampleFile, configFile);

      const tempFile = join(tmpdir(), "tempfile.XXXXXXXXXX");
      const configData = await fs.readFile(configFile, "utf8");
      const updatedConfigData = configData
        .replace(/REGISTRY_URL/g, registryUrl)
        .replace(/REGISTRY_PORT/g, registryPort)
        .replace(/PROTOCOL/g, protocol);

      await fs.writeFile(tempFile, updatedConfigData);
      await fs.rename(tempFile, configFile);
      await executeCommand(
        "docker-compose -f /tmp/beckn-onix/install/docker-compose-v2.yml up -d registry"
      );

      // Wait for 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 10000));

      console.log("Registry installation successful");
    } catch (error) {
      console.error("Error updating registry details:", error);
      throw error;
    }
  };

  try {
    const url = "https://registry.mishalabdullah.xyz"; // Assuming you have the URL defined elsewhere
    await updateRegistryDetails(url);
    return NextResponse.json({
      message: "Registry details updated successfully",
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
