# Deployment guide

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/vJ6TmR?referralCode=MNLZs0)

1. Click the button above to start deploying to Railway. You will need to sign in with a Github account.

2. There are two packages you will need to deploy. One is the frontend UI, and the other is the Ponder indexing service. Click configure to start configuring the frontend package. Under repository details, enter the name you want to use for your project. Railway will automatically clone the repo to your Github account with this name. You will also need to provide an environment variable `NEXT_PUBLIC_PONDER_PUBLIC_URL`, but for now we can ignore it since we do not yet know the public url (we need to deploy the ponder service first.) Click `save config`.

<img width="632" alt="Screenshot 2024-01-29 at 8 05 48 AM" src="https://github.com/0xStation/directory/assets/12549482/9c15fa23-409e-470f-abf9-f9f0ebfaafbb">
<img width="581" alt="Screenshot 2024-01-29 at 8 06 51 AM" src="https://github.com/0xStation/directory/assets/12549482/fcb78aa9-875b-4776-bfca-51732eb98244">


3. Configure the ponder package. Here we need to set the `NEXT_PUBLIC_ALCHEMY_API_KEY` environment variable. You can get an alchemy API key by going to [Alchemy](https://www.alchemy.com/) and signing up for their service. Click `save config`.

<img width="578" alt="Screenshot 2024-01-29 at 8 07 06 AM" src="https://github.com/0xStation/directory/assets/12549482/604f2d31-2958-46ce-a5e2-f37a4053d417">

4. Once the project is deployed you will see three services. Click on the Ponder service. Now click on settings, then networking. Hover over public networking and copy the URL. It should look something like `ponder-production-f009.up.railway.app`. This is the public URL of the ponder indexing service, which we will need to copy into the frontend UI package.

<img width="709" alt="Screenshot 2024-01-29 at 8 28 37 AM" src="https://github.com/0xStation/directory/assets/12549482/3065338d-a33b-4263-82a4-2d0c137f24f3">
<img width="995" alt="Screenshot 2024-01-29 at 8 16 34 AM" src="https://github.com/0xStation/directory/assets/12549482/a2d8abc9-25ec-43dd-b41e-db0c006d74bd">


5. Click on frontend, then variables. Find `NEXT_PUBLIC_PONDER_PUBLIC_URL` and click on the three dots to the right to edit it. Enter the ponder URL you copied in the last step. We will need to prepend `https://` to the start of the URL, so it looks like `https://ponder-production-f009.up.railway.app`. Now click the check to save.

<img width="996" alt="Screenshot 2024-01-29 at 8 31 06 AM" src="https://github.com/0xStation/directory/assets/12549482/690fe732-2ed2-4540-91bd-6f6705fe0c77">

6. In order to propogate these changes, click deploy, which will be hovering over the three services on the left. Now your services are ready to go. Wait a few minutes for them to finish building. Once they are finished they will have a green checkmark.

<img width="466" alt="Screenshot 2024-01-29 at 8 19 10 AM" src="https://github.com/0xStation/directory/assets/12549482/b177fac6-d632-4976-b252-1706fe76dea8">

7. To view your app, click on frontend, then deployments. Click the URL in the most recent deployment.

<img width="995" alt="Screenshot 2024-01-29 at 8 30 20 AM" src="https://github.com/0xStation/directory/assets/12549482/ae73dcc3-6c6a-4cbf-87e1-002a65012d6b">

8. Out of the box, the groupos.config.js comes with a sensible default. You can set your own to add your own tokens. In order to do so, go to the github repo that was created by Railway. It should be in your own profile under the name you set in step 2. Once you are on the repo page, go to packages, then directory, then groupos.config.js. You can click the pencil icon in the top right to edit in Github. Once you are satisfied with your changes, click save, which will automatically trigger a new deployment on Railway.
