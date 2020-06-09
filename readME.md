Vizzion traffic camera data map widget

Requirements: 
-Upon downloading this project, fill out widget.config.json with your Vizzion apiKey and starting lat/lng coordinates
-npm is installed (or yarn)


Running app locally: 
1. npm install 
2. npm start
3. navigate to localhost:3000

Create production build for deployment:
1. make sure the widget.config.json file is filled in. This file will be built into the app and will not change post build
2. npm run build //this creates a folder named dist
3. Move contents of dist folder to desired location using and ftp etc. 
