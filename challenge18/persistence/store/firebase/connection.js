import admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY || "")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

console.log('Connection to Firebase successful')