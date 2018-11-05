Welcome to a growing suite of command line tools to assist RingCentral developers. 

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