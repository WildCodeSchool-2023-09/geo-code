## 📄 A Propos
Welcome to GéoCode Portal, your trusted companion for practical and worry-free electric mobility. Our innovative platform was designed to simplify your electric vehicle charging experience, allowing you to quickly and easily find the nearest charging stations, wherever you are.

## 💡 Concept

At GéoCode, our mission is to facilitate the transition to sustainable mobility by providing you with an interactive map of charging stations. We firmly believe in a future where every electric driver can access efficient charging solutions, thus contributing to the preservation of our planet.


### ⚙️ Project Initialization

- Clone this repo, enter it
- Run command `npm install`
- Create environment files (`.env`) in both `backend` and `frontend`: you can copy `.env.sample` files as starters (**don't** delete them)

### ⌨️ Available Commands

- `db:migrate` : Run the database migration script
- `db:seed` : Run the database seed script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools (will be executed on every _commit_, and refuse unclean code)



### 🪛 Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- Axios: link between the front and the backend
- React-Leaflet : use for create an interactive map
- Lottie Files : for some of our animation
- Supercluster: used to create terminal clusters
- Dropzone : usefull for the drag'n drop
- Emailjs/Browser : allow the user to send us an email
- CSV-Parser
- Express : allows us to create the router for our API Rest
- Multer : used to store a file
- Argon2 : hash the password
- JWT : usefull for the connexion 

## ✏️ Languages
-HTML
-SCSS
-Javascript
-React/JSX

## 🏹 Deployment with Traefik

> ⚠️ Prerequisites : You must have installed and configured Traefik on your VPS beforehand.
> https://github.com/WildCodeSchool/vps-traefik-starter-kit/

For deployment, you have to go to `secrets` → app `actions` on the github repo to insert via `New repository secret` :

- SSH_HOST : IP address of your VPS
- SSH_USER : SSH login to your VPS
- SSH_PASSWORD : SSH connection password to your VPS

And a public variable from the tab `/settings/variables/actions` :

- PROJECT_NAME : the name of the project used to create the subdomain.

> ⚠️ Warning : underscores are not allowed. They can cause trouble with the let's encrypt certificate

Use this same tab to add the other environment variables required for the project if any.

Only the backend will be accessible. The root path `"/"` will redirect to the dist folder on your frontend. In order to allow that, please uncomment the line as explain on `backend/src/app.js` (Line 102).
Because the backend will serve the front, the global variable VITE_BACKEND_URL will be set with an empty string.

Your url will be ` https://${PROJECT-NAME}.${subdomain}.wilders.dev/`.

### 💾 About the database

The database is automaticaly deployed with the name of your repo. During the build of the projet (`docker-entry.sh`), the `node migrate.js` command is executed in the backend. If you want to seed automaticaly your database using the `seed.js` script, replace the command _build_ on you `backend/package.json` by `node migrate.js && node seed.js`.



### ⚠️ About Logs

If you want to access the logs of your online projet (to follow the deployement or to watch any bug error), connect to your VPS (`ssh user@host`).
Then, go on your specific project and run  `docker compose logs -t -f`.

## 🙏 The Team
[Baptiste Save](https://github.com/Batsave)
[Raphaël Foulon Binet](https://github.com/Rapha2202)
[Jérémy Illien](https://github.com/Merafath)
[Morgane Debarge](https://github.com/Enagrom5)