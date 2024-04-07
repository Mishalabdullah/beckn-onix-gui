import { exec } from "child_process";
import { NextResponse } from "next/server";

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

export async function startSupportServices() {
  try {
    process.env.COMPOSE_IGNORE_ORPHANS = "1";

    const result1 = await executeCommand(
      "docker-compose -f /tmp/beckn-onix/install/docker-compose-app.yml up -d mongo_db"
    );
    console.log("Result 1:", result1);

    const result2 = await executeCommand(
      "docker-compose -f /tmp/beckn-onix/install/docker-compose-app.yml up -d queue_service"
    );
    console.log("Result 2:", result2);

    const result3 = await executeCommand(
      "docker-compose -f /tmp/beckn-onix/install/docker-compose-app.yml up -d redis_db"
    );
    console.log("Result 3:", result3);

    return NextResponse.json({ result1, result2, result3 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    await startSupportServices();
    const data = req.json();

    const registryUrl = data.registryUrl;
    const bppSubscriberId = data.subscriberId;
    const bppSubscriberUrl = data.subscriberUrl;
    const networkconfigurl = data.networkconfigurl;

    // let updateBppConfigCommand = "bash scripts/update_bpp_config.sh";
    // if (registryUrl) {
    //   updateBppConfigCommand += ``;
    // }
    let updateBppConfigCommand = `bash /tmp/beckn-onix/install/scripts/update_bap_config.sh  ${registryUrl} ${bppSubscriberId}  ${bppSubscriberUrl} ${networkconfigurl}`;
    const result1 = await executeCommand(updateBppConfigCommand);
    console.log("Result 1:", result1);

    const result2 = await executeCommand("sleep 10");
    console.log("Result 2:", result2);

    const result3 = await executeCommand(
      ' docker-compose -f /tmp/beckn-onix/install/docker-compose-v2.yml up -d  "bap-client"'
    );
    console.log("Result 3:", result3);

    const result4 = await executeCommand(
      ' docker-compose -f /tmp/beckn-onix/install/docker-compose-v2.yml up -d  "bap-network"'
    );
    console.log("Result 4:", result4);

    const result5 = await executeCommand("sleep 10");
    console.log("Result 5:", result5);

    return NextResponse.json({ result1, result2, result3, result4, result5 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
