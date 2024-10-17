# Backend
## To Run
- Install NPM packages with `npm i`
- Create .env file in backend folder and use the following format
  ```
  PORT=5000
  MONGO_URI=<your_uri_string>
  ```

### Automatic Build
- `npm run start` to start application and watch for changes (might need to use `npm run clean` before)

### Manual Build
- Install typescript globally with `npm i typescript -g`
- Build with `tsc`
- Start application with `node ./dist/server.js`