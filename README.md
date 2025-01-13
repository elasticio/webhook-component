# Webhook Component
## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
   * [Receive](#receive)
* [Actions](#actions)
   * [Send data](#send-data)
* [Known Limitations](#known-limitations)

## Description
The Webhook component receives data at the specified URL to initiate your workflow.

## Credentials
The Webhook component supports the following authorization methods:

* **No Auth** - Use this method to interact with any open REST API.
* **Basic Auth** - Utilize this method to provide login credentials, such as username and password.
* **API Key Auth** - Use this method to provide an API key as part of the headers to access the resource.
* **HMAC Verification with Shared Secret** - Use this method to verify requests using a shared secret.

## Triggers
### Receive
This is a simple webhook trigger that receives data as input and initiates the execution of the workflow.

#### Output Metadata
The message body emitted from the webhook will contain:
* A JSON object that was transferred using the `POST` method or query parameters in the case of a `GET` request.
* `_query` (object) - Contains the query parameters.
* `_headers` (object) - Contains the headers of the received request.
* `_method` (string, `POST` or `GET`) - Indicates the HTTP method of the received request.
* `_url` (string) - The full URL that was received.

#### Webhook Response
By default, the webhook URL will respond with the following structure: 
```json
{
    "requestId": "86ad47dfbce4a8ae8a1eb505b85d8bd5",
    "message": "thank you"
}
```

However, you can specify the exact content of the reply using the [HTTP Reply](https://docs.elastic.io/components/request-reply/index.html) component. In this case, you will receive a reply only when the message reaches the step where the `HTTP Reply` is used, or if an error occurs in other steps between the `Webhook` step and the `HTTP Reply`.

## Known Limitations
* Currently, the component supports the following HTTP methods: `POST` and `GET`.
* When using a `POST` request, only `JSON` or `XML` data can be transferred to the workflow; other types, such as text or files, are not supported.
* `XML` data will be automatically converted to `JSON` format.
* The base path of the URL begins with the keyword `hook` followed by the flow ID, for example, `/hook/678119de28021e00129641fe`. You can append the desired path only after this base path, such as `/hook/678119de28021e00129641fe/sales/orders`.