// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

const weatherApi = {
  city: "Seoul",
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const request = require("request");
exports.apicall = functions.https.onRequest((req, response) => {
  cors(req, response, () => {
    request(`${weatherApi.base}weather?q=${weatherApi.city}&appid=${weatherApi.key}`,
    // request("https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=cd8a73751f029a029d33328b0a1abd5f",
        (error, res, body) => {
          response.send(res);
        });
  });
});
