# webhook-component

##Description
An open source component for sending and receiving [WebHooks](https://en.wikipedia.org/wiki/Webhook) on [elastic.io platform](https://www.elastic.io "elastic.io platform"). 

Before you can deploy any code into our system **you must be a registered elastic.io platform user**. Please see our home page at [https://www.elastic.io](https://www.elastic.io) to learn how.

##Credentials
Webhook component supports the following authorisation types:
* **No Auth** - use this method to work with any open REST API
* **Basic Auth** - use it to provide login credentials like username/password
* **API Key Auth** - use it to provide API Key to access the resource
* **HMAC verification shared secret** - use it to verify via a shared secret

![Webhook Credentials](https://user-images.githubusercontent.com/8449044/61962330-ec5c2c00-afd1-11e9-8e5f-6a1c89126034.png)

##Triggers
### Receive
Simple webhook trigger which receives data as an input and starts the flow execution after this.

Receive trigger has 1 field: sample data field to define your incoming message.

To use the Receive trigger for WebHook at elastic.io you would need to define the sample structure which would be used to send your data. 
You are able to input your desired data structure either as JSON data, XML or as List of properties.

#### Sending JSON
Send WebHook using JSON data and Content-Type of `application/json` - in this case you just paste a sample of such JSON payload in the WebHook configuration window.
```json
{
  "foo" : "bar",
  "myJSON" : "is the best!"
}
```

#### Receive. Config fields
* **[required]** Payload. This is the place you define your incoming data. 
Renders an input text area field to define a payload metadata for the WebHook component.

##Actions
### Send Data
Simply sends data it receives as an input to a URL provided.

WebHook action can also be used to troubleshoot many processes to see the outcome. 
For example one could create Invoices (in Salesforce) to Webhook flow and configure the Webhook with a url created in https://webhook.site or with any similar services.

#### Send Data. Config fields
* **[required]** **HTTP Verb**
  * **POST**. The WebHook component can POST information to preconfigured WebHook address. This action could be used for different purposes. For example WebHook can be used to inform your custom connector about an event which it waits to work.
  * **PUT**. The WebHook component can also PUT a specific preconfigured JSON into specific address where the process will not be handled by the server. For this reason the "Output JSON Sample" field can be used.
* **[required]** **URI**. This is the address to send WebHook.
* **[not required]** **Secret**. This is an optional field to authenticate WebHook POST. There maybe cases when a special password or a secret might be required. For example the WebHook address was generated explicitly with a password so that to prevent any third parties to use it. This could be your specific WebHook address that you use to send your Wordpress posts into your server.

![Send Data config fields](https://user-images.githubusercontent.com/8449044/61964168-eff1b200-afd5-11e9-8928-2890c3360d13.png)

## Known Limitations

1. Maximal possible size for an attachment is 10 MB.
2. Attachments mechanism does not work with [Local Agent Installation](https://support.elastic.io/support/solutions/articles/14000076461-announcing-the-local-agent-)
