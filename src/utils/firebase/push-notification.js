import admin from "firebase-admin";
import {getMessaging} from "firebase-admin/messaging";

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "medec-4494c",
        "private_key_id": "0625ce3e165339d8a07a4ca3f310ccba371a497d",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtPbXv7W5vdFI2\ncrysG3fgD4tNLMzkwlj2LQdoEbb156T9Qv3/f5mepTXDl5nVWXZ2Dy9Qy7NV//5z\nqJLDhGrrOgflxmWUV5AyNNRLG7MHmqcH5Hr9m8qPypV5cK5cdMmA4W/7oBa9hdaa\nPCwpZRlEZ8oNjvuNo6ofL33k4zn7fVu4nC843vmjdexqxEbLAhYvR2XzKWjdCtdv\nJprHsBcJhAst1A3fTE+1NLvavH7Z2FBDoPrlmpCgZx2nHSkvLCFReqaTcpprpNRZ\nhOyu5DEmaS/bbRQUJ+oWGSUzH4NDklDUz6C19166Th1ZPGjDCqSKe9HQtoV4BYNL\nw98K7QrzAgMBAAECggEAFwMfA09tP4Xak9v63vvJGSzHasl8MBj220CQ/sx3msOa\nAYBgIAvRmqbEdQZSy2nWWAldViSw3kgigzeNw0X4M+Xh/a40eReGkny9BHsZ9XUg\nIebCRaTnq+ETqO2EY8ipqaKIjwqtaqB4KMW8cgU5bYJB7zoihSaL5xeWaAyc+6Br\noR6e9p9tlMAzzjyhJXts8a50YMi8jpRHDhrpwi9jffs/S6AkiidlCO01WnqEHnKc\n+RcwHsFyCKuriPVfnTEZwemhyNPELox8O8tbCe9vMf/NH74Oy/j2niazGNU097rt\noEWcqNWNTiM4nNmkxsSCmePaNFAasGaV3HqBL9UPaQKBgQDluW21XpD6CUOGBpG+\nQG985oaG/Tchn2mEKev1LHbc/hnfAVtRvLxzit6inkm8tdklE/yDBO1JauxDJHxT\nn6Yo10NO3cek9PQnCaI0lA7YkadX987tjGgbhzoD6yWfYIiGXWKd5ESv96zYXSPo\nscyiJ+2iWPOkv480f24X0RwHmQKBgQDBDmRkBpvrkjRiHVCAkZ0KUgT9Y79lCP8/\nDoiX5mH6rU5njLEw3vF0jl7pj/eV5jid9FbQTiQwuVzpV5ggsV025IoSk2DLfbLf\ny42Iac5MnVCM5pjis+zXL4LUbQFDLl3W5k+9GPG2OVgRn7T/vTgHZtmj5hYKNpgW\noSfAe1eOawKBgCa3MoMfleVdzFB5KPTcXS26mC+F21XCTQEmI4slXD7wYCHSU7aZ\nzVTXsZ/Md3bjWt5B2Qunt+noqDrEmmNpg5JcfQ58mBn34nH10K11ym67VW2g6PHl\n+OGyz5c7eRK8LSYf9O/RObZCUpIAWH3uASPPAOCchytb0WGynDZNWqD5AoGAbVr8\nrNg9jAQGXilix2E0RntNTkcpTE77XrmZ0Al1KKzww6EjYZ53wWFADCc7xJJjMb4N\nSvNodp0ZLygqCSLOvWBZgcovwzTRlQlVg5cDf8yAqz+YDJqEpyPHhRK161shVrCh\nLGkryd/Tri/8M/z39uFgmQGlLGXeYrsorFRxtT8CgYEAnfoERHOX2+LF6C7bJEAG\nqK+URbvUSSEPTzKKU4Cb4Si4qjjvBUb38cL5FTeqw2n8qQvtT7lF59LNhZDiuYsX\nyw78tcMLE7EcrIQZDzyq0zfH3pcyExW8LCr7v7P98LPESdWSPw/VdM1enO+zBhXK\nuxSHSnNauY/e+wnvgEU41kI=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-guahs@medec-4494c.iam.gserviceaccount.com",
        "client_id": "117346201793443442035",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-guahs%40medec-4494c.iam.gserviceaccount.com"
    })
});

export const sendPushNotificationToAll = async (title, body, tokens) => {
    try {
        const messages = [];
        messages.push({
            notification: {title: 'Price drop', body: '5% off all electronics'},
            token: "egJDiiH_TpWmgP6wFdb5b2:APA91bEh58UcQzWechYi4NDEO0xnbZ00R6RYrJLVayPLyh050fis3Vg2Juqx5WcWMKqUVO2rMpqoRasbdnGWUs4J-GD5D4Da9Gz8CenNzA8hUugazv-3jqAyQHTLX4-3D8BFXanATvAe",
        });
        let result = await getMessaging().sendAll(messages);
        console.log(result);
        // res.status(200).json({ message: "Successfully sent notifications!" });
        console.log('Successfully sent notifications!');
    } catch (err) {
        console.log(`message: ${err.message} || "Something went wrong 1!"`);
    }
}

export const sendPushNotificationToOne = async (title, body, token) => {
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
        console.log(`message: ${err.message} || "Something went wrong 2!"`);
    }
}

export const sendPushNotificationAll = async (title, body) => {
    let messages = [];

    messages.push({
        notification: {title: title, body: body},
        topic: 'MEDEC',
    });

    try {
        let result = await admin.messaging().sendAll(messages);
        // res.status(200).json({ message: "Successfully sent notifications!" });
        console.log(result);
        console.log('Successfully sent notifications to all with out token!');
    } catch (err) {
        console.log(`message: ${err.message} || "Something went wrong 3!"`);
    }
}