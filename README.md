## Overview

Welcome to a set of command line tools developed to help RingCentral developers better manage their account, applications and other settings. This toolset is a simple wrapper around a number of RingCentral APIs to make access easier. Output is generally in JSON format. For example, the first tool added to this suite outputs a list of subscriptions associated with a token. It was developed to provide greater visibility to Glip bot developers into the specific endpoints that would be notified when a user posted a message to a bot. It is invoked thusly:

```
LMRC8950:tools byrne.reese$ rc-subscriptions -e sandbox
Current Subscriptions:  {
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/subscription",
    "records": [
        {
            "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/subscription/7e7f084a-7287-458f-8c17-161270f89b9e",
            "id": "7e7f084a-7287-458f-8c17-161270f89b9e",
            "creationTime": "2018-11-05T19:28:33.749Z",
            "status": "Active",
            "eventFilters": [
                "/restapi/v1.0/subscription/~?threshold=60&interval=15",
                "/restapi/v1.0/glip/posts",
                "/restapi/v1.0/glip/groups"
            ],
            "expirationTime": "2018-11-12T19:28:32.749Z",
            "expiresIn": 594821,
            "deliveryMode": {
                "transportType": "WebHook",
                "encryption": false,
                "address": "https://5c1067b2.ngrok.io/callback"
            }
        }
    ]
}
```

## Installation

To install these tools:

```
% git clone https://github.com/byrnereese/ringcentral-js-tools.git
% npm install -g
% rc-subscriptions 
```

### Development

If you are developing or extending these tools, it is recommended you run `npm link` to symlink your global scripts to your local ones in development. To do this, following these installation instructions instead:

```
% git clone https://github.com/byrnereese/ringcentral-js-tools.git
% npm install -g
% npm link
% rc-subscriptions 
```

## Setup

Once installed, run `rc-init`. This will prompt you to enter your Client ID and Secret, and your access token if you have it. To setup your access credentials for sandbox you would run:

```
% rc-init -e sandbox
```

## Available Scripts

Upon installation, the following scripts become available via the command line.

### rc-init

```
Usage: rc-init [options]

Options:
  -e, --env <environment>  The environment you are configuring, either "sandbox" or "production"
  -h, --help               output usage information
```

### rc-subscriptions

```
Usage: rc-subscriptions [options]

Options:
  -d, --delete <delete_id>  The subscription to delete
  -i, --info <info_id>      The subscription to get information on
  -h, --help                output usage information
```