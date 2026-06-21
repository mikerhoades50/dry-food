# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# ########################################################################## #
Navigate to the root directory of the project and run
    npm install
    npm run dev

If authentication fails on the initial attempt at running the site locally, leave that instance running, and open a new console window and repeat the process. The Google Authentication through Supabase is port specific, and it may not work correctly when running on the default port

When launching the site you will have very limited options without authentication, but when you click on the links to other pages, you will be prompted to log in with Google (If you don't have a google account or don't want to authenticate with Google, use somebody elses site)

After authentication, the Calculator site allows the user to calculate the water needed to to rehydrate freeze dried food after the freeze drying process. the user muse add weights before freeze drying, after freeze drying and the total food weight. the site allows the user to input the number of containers that the food is split into, and tells the user how much water will be needed to rehydrate the food. The site also keeps track of when the oil needs to be changed in the machine, this is incramented when the user clicks the "add to inventory button" 

The add to inventory button prompts the user to enter some addational information before saving. 

The site also prompts the user to save changes when they make updates to the page to prevent accidental data loss

The site saves the data to a supabase SQL database based on there Google authentication. Multiple users can access the same set of data after manual changes are made to the user tables in supabase

the inventory tracker does what it says, it tracks inventory :-) this is also saved in a supabase SQL database based on the authenticated user. The UI allows the end user to add/update/delete any items that are in inventory. It also allows the user to search for specific food for example "Cheese" will display all records that have cheese in them. The user is also able to download a csv copy of the inventory that is displayed on the page

The Resources tab contains helpful links to supplies, products and videos realated to Freeze Drying. It also allows the user to add custom links that are saved to the supabase SQL database and are only visable to the user that saved them. For Example if you save a link to  "www.brentrocks.com" only you will be able to see the link.

Buy me a Beer page --- self explanitory -- Buy me a beer dang it! this is an integration with paypal.me, and allows the user to click a button (or enter a custom amount) buttons allow the user to select up to a half a million to donate, or they can enter a custom amount if they want to give me even more. why? because Brent rocks, an Mike is a superstar
