# Plugins Endpoint

![image](https://github.com/danny-avila/chatgpt-clone/assets/110412045/0ba6c38c-4014-4c3a-a671-d2d64bb2490a)

The plugins endpoint opens the door to prompting LLMs in new ways other than traditional input/output prompting.

The first step is using chain-of-thought prompting for using plugins/tools in a fashion mimicing the official ChatGPT Plugins feature.

More than this, you can use this endpoint for changing your conversation settings mid-conversation. Unlike the official ChatGPT site and all other endpoints, you can switch models, presets, and settings mid-convo, even when you have no plugins selected. This is useful if you first want a creative response from GPT-4, and then a deterministic, lower cost response from GPT-3. Soon, you will be able to use PaLM2 and HuggingFace models, all in this endpoint in the same modular manner.

### Roadmap:
- More plugins and advanced plugin usage
- More LLMs to choose from for both Thinking and Completion Phases
- Alternative prompting methods such as Tree-of-Thought

## Using Plugins 

The LLM process when using Plugins is illustrated below.

![Untitled-2023-06-04-1543(1)](https://github.com/danny-avila/chatgpt-clone/assets/110412045/88483ba0-6b09-43dd-9b70-fb9778871c91)

**When you open the settings with the Plugins endpoint selected, you will view the default settings for the Completion Phase.**

Clicking on **"Show Agent Settings"** will allow you to modify parameters for the thinking phase

![image](https://github.com/danny-avila/chatgpt-clone/assets/110412045/3d0a1e23-b111-459a-a1bc-19ff9262c2b6)

---

![image](https://github.com/danny-avila/chatgpt-clone/assets/110412045/87e5ba8a-194b-4ca3-bec4-820f7434c8c8)

- You can specify which plugins you would like to select from by installing/uninstalling them in the Plugin store
- See this guide on how to create your own plugins (WIP)
- ChatGPT Plugins, both community-made and official versions, will be available for use in a future update

### Notes
- Every additional plugin selected will increase your token usage as there are detailed instructions the LLM needs for each one
- For best use, be selective with plugins per message and narrow your requests as much as possible
- If you need help coming up with a good plugin prompt, ask the LLM for suggestions before using one!
- Chain-of-thought prompting (plugin use) will always be more expensive than regular input/output prompting, so be sure it meets your need.
- Currently, the cheapest use will be to use gpt-3.5 for both phases
- From my testing, the best "bang for your buck" will be to use gpt-3.5 for the thinking phase, and gpt-4 for completion.
- Adding to above, if you ask for a poem and an image at the same time, it may work, but both may suffer in quality
  - Instead, ask for a poem first with creative settings
  - Then, ask for a good prompt for Stable Diffusion based on the poem
  - Finally, use the Stable Diffusion plugin by referencing the pre-generated prompt
- Presets are only available when no Plugins are selected as the final review of the thinking phase has a specific system message.
- ⚠️ The **Browser/Scraper, Serpapi, and Zapier NLA plugins** are official langchain integrations and don't work the best. Improvements to them will be made

### Plugins Setup Instructions
- **[Google Search](./google_search.md)**
- **[Stable Diffusion](./stable_diffusion.md)**
- **[Wolfram](./wolfram.md)**
- **DALL-E** - same setup as above, you just need an OpenAI key, and it's made distinct from your main API key to make Chats but it can be the same one
- **Zapier** - You need a Zapier account. Get your [API key from here](https://nla.zapier.com/credentials/) after you've made an account
  - Create allowed actions - Follow step 3 in this [getting start guide](https://nla.zapier.com/start/) from Zapier
    - ⚠️ NOTE: zapier is known to be finicky with certain actions. I found that writing email drafts is probably the best use of it
    -  there are improvements that can be made to override the official NLA integration and that is TBD
- **Browser/Scraper** - This is not to be confused with 'browsing' on chat.openai.com (which is technically a plugin suite or multiple plugins)
  - This plugin uses OpenAI embeddings so an OpenAI key is necessary, similar to DALL-E, and it's made distinct from your main API key to make Chats but it can be the same one
  - This plugin will simply scrape html, and will not work with dynamic Javascript pages as that would require a more involved solution
  - A better solution for 'browsing' is planned but can't guarantuee when
  - This plugin is best used in combination with google so it doesn't hallucinate webpages to visit
- **Serpapi** - an alternative to Google search but not as performant in my opinion
  - You can get an API key here: https://serpapi.com/dashboard
  - For free tier, you are limited to 100 queries/month
  - With google, you are limited to 100/day for free, which is a better deal, and any after may cost you a few pennies

### Showcase

![image](https://github.com/danny-avila/chatgpt-clone/assets/110412045/c5d3aba8-8ab5-4f41-a1fa-202ece5849db)


![image](https://github.com/danny-avila/chatgpt-clone/assets/110412045/9ddeb874-4323-45a3-b2aa-5492bc324716)

---

## [Go Back to ReadMe](../../../README.md)
