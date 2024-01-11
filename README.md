# GroupOS 

A batteries-included open-source repo for creating and managing token ecosystems.

## Design Principles
1. Configurable boilerplate -> easy to start using immediately and make small adjustments
2. Extendable framework -> inherit opinions, but maintain control to build your own solutions

## Goals
1. Inspire people to think about new use cases for tokens, freed from the burden of fundamental infrastructure
2. Foster collaboration on token design, empowered by a shared web and smart contract framework
3. Give users full ownership of the tool, advocating for open-source and self-hosting

## Features
* json config file
  * define token contracts and metadata
    * create tokens with a simple creation form and save the contract in your file afterwards
  * define auxiliary features
* token directory
  * view all token holders
  * powered by ponder
* onchain admin controls
  * add/remove admins
  * customize rails contract modules
  * manipulate permissions, controllers, guards, extensions
    * custom mint logic
    * custom transferability
    * custom extensions
    * custom metadata
  * mint/burn/transfer tokens within directories
    * mint rep to members
    * burn members
    * transfer memberships to new addresses
* mint page
  * connect with a mint controller
  * optionally collect personal metadata, eg social handles (requires Dynamic)
* portal
  * connect as your 721 NFTs to any dApp
  * optionally connect a Pimlico account to subsidize for users
* customize brand identity
  * colors configurable in json file
  * extend components with your own code
