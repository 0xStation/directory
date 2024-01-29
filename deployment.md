# Deployment guide

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/vJ6TmR?referralCode=MNLZs0)

1. Click the button above to start deploying to Railway. You will need to sign in with a Github account.

2. There are two packages you will need to deploy. One is the frontend UI, and the other is the Ponder indexing service. Click configure to start configuring the frontend package. Under repository details, enter the name you want to use for your project. Railway will automatically clone the repo to your Github account with this name. You will also need to provide an environment variable `NEXT_PUBLIC_PONDER_PUBLIC_URL`, but for now we can ignore it since we do not yet know the public url (we need to deploy the ponder service first.) Click `save config`.

3. Configure the ponder package. Here we need to set the `NEXT_PUBLIC_ALCHEMY_API_KEY` environment variable. You can get an alchemy API key by going to [Alchemy](https://www.alchemy.com/) and signing up for their service. Click `save config`.

4. Once the project is deployed you will see three services. Click on the Ponder service. Now click on settings, then networking. Hover over public networking and copy the URL. It should look something like `ponder-production-f009.up.railway.app`. This is the public URL of the ponder indexing service, which we will need to copy into the frontend UI package.

5. Click on frontend, then variables. Find `NEXT_PUBLIC_PONDER_PUBLIC_URL` and click on the three dots to the right to edit it. Enter the ponder URL you copied in the last step. We will need to prepend `https://` to the start of the URL, so it looks like `https://ponder-production-f009.up.railway.app`. Now click the check to save.

6. In order to propogate these changes, click deploy, which will be hovering over the three services on the left. Now your services are ready to go. Wait a few minutes for them to finish building. Once they are finished they will have a green checkmark.

7. To view your app, click on frontend, then deployments. Click the URL in the most recent deployment.

8. Out of the box, the groupos.config.js comes with a sensible default. You can set your own to add your own tokens. In order to do so, go to the github repo that was created by Railway. It should be in your own profile under the name you set in step 2. Once you are on the repo page, go to packages, then directory, then groupos.config.js. You can click the pencil icon in the top right to edit in Github. Once you are satisfied with your changes, click save, which will automatically trigger a new deployment on Railway.
