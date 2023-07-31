# Webhook Setup

## Prerequisites

- Nylas application configured
- Webhook setup pointing to `${ngrok or https url}/api/webhook`
  - Webhooks won’t work locally you have to expose your PORT via ngrok or a similar tool
  - Once you have done that add the URL and configure your webhook
- .env file
  - `CLIENT_ID` Nylas Client Id
  - `CLIENT_SECRET` Nylas Client Secret
  - `PORT` Port

## Webhook Implementation

- When you configure a webhook, Nylas will make a GET request to your endpoint with a challenge query. You have to return this query back as it is
  ```json
  router.get("/", (req, res) => {
    console.log(req.query);
    res.status(200).send(req.query.challenge);
  });
  ```
- Any object notifications will go through your POST route.

  - I will also wrote a helper function for verifying Nylas Webhooks
  - Verification:
    - [https://developer.nylas.com/docs/developer-guide/webhooks/set-up-webhooks/#verify-nylas-webhooks](https://developer.nylas.com/docs/developer-guide/webhooks/set-up-webhooks/#verify-nylas-webhooks)

  ```
  router.post("/", async (req, res) => {
    const isValid = isNylasSignature(req);
    if (!isValid) {
      res.send(401);
    }
    console.log("Is valid secret ", isValid);
    // HERE you will process the webhook body and retrieve the object via Nylas API
    console.log(req.body);
    res.send(200);
  });

  function isNylasSignature(req) {
    const signature = req.headers["x-nylas-signature"];
    const digest = crypto
      .createHmac("sha256", process.env.CLIENT_SECRET)
      .update(req.rawBody)
      .digest("hex");

    return digest === signature;
  }
  ```

- Docs
  - [https://developer.nylas.com/docs/developer-guide/webhooks/](https://developer.nylas.com/docs/developer-guide/webhooks/)
  - [https://developer.nylas.com/docs/developer-guide/webhooks/set-up-webhooks/](https://developer.nylas.com/docs/developer-guide/webhooks/set-up-webhooks/)
