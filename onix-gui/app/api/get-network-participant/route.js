export default async function POST(req, res) {
  const body = await req.json();
  const subscriberId = body.subId;
  const uniqueKeyId = body.ukId;
  const registryUrl = body.registryUrl;
  const body = {
    extended_attributes: {},
    subscriber_id: subscriberId,
    unique_key_id: uniqueKeyId,
  };

  try {
    const response = await fetch(registryUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error making request to registry" });
  }
}
