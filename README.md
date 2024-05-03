
<p align="center">
   <br/>
   <a href="https://developers.sitecore.com/contribute" target="_blank"><img width="150px" src="/src/assets/sitecore.png" /></a>
   <h1 align="center">SITECORE</h1>
   <p align="center">
   Open Source. Full Stack. Own Your Data.
   </p>
  
  

## Build Prerequisites

### 1. Node.js

The developer portal is built with Next.js, so you'll need to have Node.js installed to build the project. You can find the latest version of Node.js here. We recommend using the LTS version of Node.js.

### 2. Environment Variables

The Sitecore developer portal incorporates a number of third party services to bring in content. For full functionality, you must create a .env.local file in the root of the project and add in the below environment variables.

The following variables should exist within the .env.local file:
```
YOUTUBE_API_KEY="An API key with YouTube Data API v3 access enabled"
TWITTER_BEARER_TOKEN="A bearer token from Twitter "

```
> _Note: The site will still function without the above keys. The components that require these environment variables will fail gracefully and not display on the pages._

## Getting Started

1. Install Node.js, we recommend the LTS version.

2. Clone the repository git clone https://github.com/Sitecore/developer-portal.git

3. Inside the repository run npm install to install all the dependencies.

4. Create a .env.local file in the root of the project and add the following environment variables
```
YOUTUBE_API_KEY=""
TWITTER_BEARER_TOKEN="

```
> _For more information on populating environment variables see section Environment Variables above._

5. Run npm run dev to start the development server.

6. Open the http://localhost:3000 in your browser to see the result!



