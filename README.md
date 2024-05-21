# Directory

A batteries-included open-source repo for creating and managing token ecosystems on 0xRails.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/vJ6TmR?referralCode=MNLZs0)

## Design Principles

1. Configurable boilerplate -> easy to start using immediately and make small adjustments
2. Extendable framework -> inherit opinions, but maintain control to build your own solutions

## Goals

1. Make onchain token data more legible and interactive
2. Give users full ownership of the tool, advocating for open-source and self-hosting

## Features

- json config file
  - define token contracts
  - toggle optional features
  - customize brand identity
    - color system and logo
    - extend components with your own code
- token directory pages
  - view all token holders
  - enable ERC-6551 tokenbound accounts on ERC-721 NFTs
  - powered by ponder

## Set Up Locally

**Install app dependencies**

```bash
npm i
```

**Define environment variables**

We recommend [Alchemy](https://www.alchemy.com/) given their wide range of services from access to ethereum nodes to token indexing.
This key will be re-used across many potential networks and parts of the app. Make a free account to get your API key or keep the default
API key provided.

```
echo "ALCHEMY_API_KEY=m2OWVY-4guxSOIeP174kQUwKZKBddt16" >> ./packages/ponder/.env.local
echo "NEXT_PUBLIC_ALCHEMY_API_KEY=m2OWVY-4guxSOIeP174kQUwKZKBddt16" >> ./packages/ponder/.env.local

echo "ALCHEMY_API_KEY=m2OWVY-4guxSOIeP174kQUwKZKBddt16" >> ./packages/next/.env.local
echo "NEXT_PUBLIC_ALCHEMY_API_KEY=m2OWVY-4guxSOIeP174kQUwKZKBddt16" >> ./packages/next/.env.local
```

**Run packages**

Directory by Station includes two packages in a monorepo setup. The first is the UI, and the second is a token indexing server written with [Ponder](https://ponder.sh/). You can launch both packages in dev mode.

```bash
npm run dev
```

**Open app**

You can now view your GroupOS app at [localhost:3000](http://localhost:3000/)
In dev mode, you can view a GraphQL client at [localhost:42069](http://localhost:42069/)

Note that if this does not work, you may need to run the next app and ponder app in separate terminal tabs.
