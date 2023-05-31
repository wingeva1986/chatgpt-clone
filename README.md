﻿
<p align="center">
  <a href="https://discord.gg/NGaa9RPCft">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/110412045/228325485-9d3e618f-a980-44fe-89e9-d6d39164680e.png">
      <img src="https://user-images.githubusercontent.com/110412045/228325485-9d3e618f-a980-44fe-89e9-d6d39164680e.png" height="128">
    </picture>
    <h1 align="center">ChatGPT Clone</h1>
  </a>
</p>

<p align="center">
  <a aria-label="Join the community on Discord" href="https://discord.gg/NGaa9RPCft">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=DISCORD&labelColor=000000&logoWidth=20">
  </a>
  <a aria-label="Sponsors" href="#sponsors">
    <img alt="" src="https://img.shields.io/badge/SPONSORS-brightgreen.svg?style=for-the-badge&labelColor=000000&logoWidth=20">
  </a>
</p>

## All AI Conversations under One Roof. ##
  Assistant AIs are the future and OpenAI revolutionized this movement with ChatGPT. While numerous UIs exist, this app commemorates the original styling of ChatGPT, with the ability to integrate any current/future AI models, while integrating and improving upon original client features, such as conversation/message search and prompt templates (currently WIP). Through this clone, you can avoid ChatGPT Plus in favor of free or pay-per-call APIs. I will soon deploy a demo of this app. Feel free to contribute, clone, or fork. Currently dockerized.
  
  ![clone3](https://user-images.githubusercontent.com/110412045/230538752-9b99dc6e-cd02-483a-bff0-6c6e780fa7ae.gif)

# Features

- Response streaming identical to ChatGPT through server-sent events
- UI from original ChatGPT, including Dark mode
- AI model selection (through 3 endpoints: OpenAI API, BingAI, and ChatGPT Browser)
- Create, Save, & Share custom presets for OpenAI and BingAI endpoints - [More info on customization here](https://github.com/danny-avila/chatgpt-clone/releases/tag/v0.3.0)
- Edit and Resubmit messages just like the official site (with conversation branching)
- Search all messages/conversations - [More info here](https://github.com/danny-avila/chatgpt-clone/releases/tag/v0.1.0)
- Integrating plugins soon

##
# Sponsors

  Sponsored by <a href="https://github.com/DavidDev1334"><b>@DavidDev1334</b></a>, <a href="https://github.com/mjtechguy"><b>@mjtechguy</b></a>, <a href="https://github.com/Pharrcyde"><b>@Pharrcyde</b></a>, & <a href="https://github.com/fuegovic"><b>@fuegovic</b></a>

##

## **Google's PaLM 2 is now supported as of [v0.4.3](https://github.com/danny-avila/chatgpt-clone/releases/tag/v0.4.3)**
  
  ![image](https://github.com/danny-avila/chatgpt-clone/assets/110412045/ec5e8ff3-6c3a-4f25-9687-d8558435d094)
 
<details>
<summary><strong>How to Setup PaLM 2 (via Google Cloud Vertex AI API)</strong></summary>
- Enable the Vertex AI API on Google Cloud:
- - https://console.cloud.google.com/vertex-ai
- Create a Service Account:
- - https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts/create?walkthrough_id=iam--create-service-account#step_index=1
- Make sure to click 'Create and Continue' to give at least the 'Vertex AI User' role.
- Create a JSON key, rename as 'auth.json' and save it in /api/data/.

**Alternatively**

- In your ./api/.env file, set PALM_KEY as "user_provided" to allow the user to provide a Service Account key JSON from the UI.
- They will follow the steps above except for renaming the file, simply importing the JSON when prompted.
- The key is sent to the server but never saved except in your local storage

**Note:**

- Vertex AI does not (yet) support response streaming for text generations, so response may seem to take long when generating a lot of text.
- Text streaming is simulated
</details>

---

## [Read all Latest Updates here](CHANGELOG.md)

<h1>Table of Contents</h1>

<details open>
  <summary><strong>Getting Started</strong></summary>

  * [Docker Install](/docs/install/docker_install.md)
  * [Linux Install](docs/install/linux_install.md)
  * [Mac Install](docs/install/mac_install.md)
  * [Windows Install](docs/install/windows_install.md)
</details>

<details>
  <summary><strong>General Information</strong></summary>

  * [Code of Conduct](CODE_OF_CONDUCT.md)
  * [Project Origin](docs/general_info/project_origin.md)
  * [Multilingual Information](docs/general_info/multilingual_information.md)
  * [Roadmap](docs/general_info/roadmap.md)
  * [Tech Stack](docs/general_info/tech_stack.md)
  * [Changelog](CHANGELOG.md)
  * [Bing Jailbreak Info](docs/general_info/bing_jailbreak_info.md)
</details>

<details>
  <summary><strong>Features</strong></summary>

  * [User Auth System](docs/features/user_auth_system.md)
  * [Proxy](docs/features/proxy.md)
</details>

<details>
  <summary><strong>Cloud Deployment</strong></summary>

  * [Heroku](docs/deployment/heroku.md)
</details>

<details>
  <summary><strong>Contributions</strong></summary>

  * [Contributor Guidelines](CONTRIBUTING.md)
  * [Documentation Guidelines](docs/contributions/documentation_guidelines.md)
  * [Code Standards and Conventions](docs/contributions/coding_conventions.md)
  * [Testing](docs/contributions/testing.md)
  * [Security](SECURITY.md)
  * [Trello Board](https://trello.com/b/17z094kq/chatgpt-clone)
</details>


##

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=danny-avila/chatgpt-clone&type=Date)](https://star-history.com/#danny-avila/chatgpt-clone&Date)

## Contributors
Contributions and suggestions bug reports and fixes are welcome!
Please read the documentation before you do!

For new features, components, or extensions, please open an issue and discuss before sending a PR. 

- Join the [Discord community](https://discord.gg/uDyZ5Tzhct)

This project exists in its current state thanks to all the people who contribute
---
<a href="https://github.com/danny-avila/chatgpt-clone/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=danny-avila/chatgpt-clone" />
</a>
