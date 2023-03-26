const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotificationToAll = async(title, body, tokens) => {
    try {
        await admin.messaging().sendMulticast({
          tokens,
          notification: {
            title,
            body,
          },
        });
        // res.status(200).json({ message: "Successfully sent notifications!" });
        console.log('Successfully sent notifications!');
      } catch (err) {
        console.log(`message: ${err.message} || "Something went wrong!"`);
      }
}

export const sendPushNotificationToOne = async(title, body, token) => {
    try {
        await admin.messaging().sendToDevice({
          token,
          notification: {
            title,
            body,
          },
        });
        // res.status(200).json({ message: "Successfully sent notifications!" });
        console.log('Successfully sent notifications to one!');
      } catch (err) {
        console.log(`message: ${err.message} || "Something went wrong!"`);
      }
}