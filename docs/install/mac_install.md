﻿# Mac Install
## **Recommended : [Docker Install](docker_install.md)**

##

## **Manual Installation**

## Install the prerequisites:
  - Install Homebrew (if not already installed) by following the instructions on https://brew.sh/
  - Install Node.js and npm by running `brew install node`
  - Install MongoDB (if not using Docker) by running `brew tap mongodb/brew` and `brew install mongodb-community`
  
  - **Create a MongoDB database**
    
    - Navigate to https://www.mongodb.com/ and Sign In or Create an account
    - Create a new project
    - Build a Database using the free plan and name the cluster (example: chatgpt-clone)
    - Use the "Username and Password" method for authentication
    - Add your current IP to the access list
    - Then in the Database Deployment tab click on Connect
    - In "Choose a connection method" select "Connect your application"
    - Driver = Node.js / Version = 4.1 or later
    - Copy the connection string and save it somewhere(you will need it later)


 ## Instructions:

  - Open Terminal and clone the repository by running git clone https://github.com/danny-avila/chatgpt-clone.git
  - Change into the cloned directory by running cd chatgpt-clone
  - If using MongoDB Atlas, remove &w=majority from the default connection string
Follow the instructions for setting up proxies, access tokens, and user system:

### Access Tokens:

**Get your OpenAI API key** 

  - here: https://platform.openai.com/account/api-keys and save it somewhere safe (you will need it later)

**ChatGPT Free Instructions:**

  - To get your Access token for ChatGPT 'Free Version', log in to chat.openai.com, then visit https://chat.openai.com/api/auth/session.
  - Warning: There may be a high chance of your account being banned with this method. Continue doing so at your own risk.

**Get your Bing Access Token**
   
  Please follow the **[updated instructions.](https://github.com/danny-avila/chatgpt-clone/issues/370#issuecomment-1560382302)**
  
  ~~Using MS Edge, navigate to bing.com~~
   - ~~Make sure you are logged in~~
   - ~~Open the DevTools by pressing F12 on your keyboard~~
   - ~~Click on the tab "Application" (On the left of the DevTools)~~
   - ~~Expand the "Cookies" (Under "Storage")~~
   - ~~Copy the value of the "\_U" cookie~~


## Setup Instruction
  - Create a .env file in the api directory by running cp api/.env.example api/.env and edit the file with your preferred text editor, adding the required API keys, access tokens, and MongoDB connection string
  - Run npm ci from root directory `npm ci`
  - Build the client by running `npm run frontend`

**Download MeiliSearch for macOS (optional):**
  - You can download the latest MeiliSearch binary for macOS from their GitHub releases page: https://github.com/meilisearch/MeiliSearch/releases. Look for the file named meilisearch-macos-amd64 (or the equivalent for your system architecture) and download it.

**Make the binary executable:**
  - Open Terminal and navigate to the directory where you downloaded the MeiliSearch binary. Run the following command to make it executable:

```
chmod +x meilisearch-macos-amd64
```

**Run MeiliSearch:**
  - Now that the binary is executable, you can start MeiliSearch by running the following command, replacing your_master_key_goes_here with your desired master key:

```
./meilisearch-macos-amd64 --master-key your_master_key_goes_here
```

  - MeiliSearch will start running on the default port, which is 7700. You can now use MeiliSearch in your ChatGPT-Clone project.

  - Remember to include the MeiliSearch URL and Master Key in your .env file in the api directory. Your .env file should include the following lines:

```
MEILISEARCH_URL=http://127.0.0.1:7700
MEILISEARCH_KEY=your_master_key_goes_here
```

  - With MeiliSearch running and configured, the ChatGPT-Clone project should now have the Conversation search feature enabled.

  - In the chatgpt-clone directory, start the application by running `npm run backend`
Visit http://localhost:3080 (default port) & enjoy

## Optional but recommended:

  - Create a script to automate the starting process by creating a new file named start_chatgpt.sh in the chatgpt-clone directory and pasting the following code:

```
#!/bin/bash
# Replace "your_master_key_goes_here" with your MeiliSearch Master Key
if [ -x "$(command -v ./meilisearch)" ]; then
    ./meilisearch --master-key your_master_key_goes_here &
fi
npm run backend
```

**Make the script executable by running** 

```
  chmod +x start_chatgpt.sh
```

  **Start ChatGPT-Clone by running** 
```
  ./start_chatgpt.sh
```


## **Update**
- run `git pull` from the root dir
- Run npm ci from root directory `npm ci`
- Build the client by running `npm run frontend`

##

## [Go Back to ReadMe](../../README.md)
