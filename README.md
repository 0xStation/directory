# Directory 

A batteries-included open-source repo for creating and managing token ecosystems.

## Design Principles
1. Configurable boilerplate -> easy to start using immediately and make small adjustments
2. Extendable framework -> inherit opinions, but maintain control to build your own solutions

## Goals
1. Make onchain token data more legible and interactive
2. Give users full ownership of the tool, advocating for open-source and self-hosting

## Features
* json config file
  * define token contracts
  * toggle optional features
  * customize brand identity
    * color system and logo
    * extend components with your own code
* token directory pages
  * view all token holders
  * enable ERC-6551 tokenbound accounts on ERC-721 NFTs
  * powered by ponder
  
## Set Up Locally

**Clone this repo**

```bash
git clone https://github.com/0xStation/groupos.git
cd groupos
```

**Install app dependencies**

```bash
npm i
```

**Define environment variables**

We recommend [Alchemy](https://www.alchemy.com/) given their wide range of services from access to ethereum nodes to token indexing.
This key will be re-used across many potential networks and parts of the app. Make a free account to get your API key or keep the default
API key provided.

```
echo "ALCHEMY_API_KEY=m2OWVY-4guxSOIeP174kQUwKZKBddt16" >> .env.local
echo "NEXT_PUBLIC_ALCHEMY_API_KEY=m2OWVY-4guxSOIeP174kQUwKZKBddt16" >> .env.local
```

**Run app**

```bash
npm run dev
```

Your NextJS app will now occupy this tab. Create a new tab and navitage to the root of this `groupos` repo for the remaining steps.

**Move to Ponder sub-directory**

```bash
cd ponder
```

[Ponder](https://ponder.sh/) is an open-source indexing framework used to track token balances for GroupOS. It has a dedicated subdirectory, [`ponder/`](./ponder), 
with its own package management and environment variables.

**Install ponder dependencies**

```bash
npm i
```

**Copy environment variables**

We will reuse the same alchemy environment variables defined before.

```bash
cp ../.env.local .
```

**Run ponder**

```bash
npm run dev
```

Ponder will now occupy this tab. Create new tabs as needed or cancel Ponder with `ctrl+C`.

**Open app**

You can now view your GroupOS app at [localhost:3000](http://localhost:3000/)
