# GitHub Profile Clone

A fully responsive GitHub–style profile UI built using React, TypeScript, CSS, TailwindCSS, and shadcn/ui components.
This project recreates GitHub's header, sidebar, tabs, and content layout with pixel-accurate UI elements.


## Setup Instructions
1. Clone the repo
git clone
cd PROJECT_DIR

2. Install dependencies
npm install

3. Add environment variables (optional)
Create .env from .env.example

4. Start development server
npm run dev


## API Endpoints Used
1. Fetch GitHub User Data
GET https://api.github.com/users/{username}


2. Implemented API for fetching contributions -> heatmap does not support normal api call so we are using a custom api with graphql call made from our backend code.

Backend is hosted here => https://github-token-api-app.onrender.com/ => but as it is free plan it goes to inactive state after 30 min of inactivity. so after hitting once please wait for some time for it to come again.

Example =>
curl --location 'https://github-token-api-app.onrender.com/api/contributions' \
--header 'Content-Type: application/json' \
--data '{
  "username": "shreeramk",
    "from": "2025-01-01T00:00:00Z",
  "to": "2025-12-31T23:59:59Z"
}'


## Future Improvements
1. Interfaces can be handled in central way
2. Error Handling
3. CSS can be improvised
