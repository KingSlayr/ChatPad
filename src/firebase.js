// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBDHO0INwuthDYNDAo3aRn4qE07hvwjmFI",
  authDomain: "whatsapp-web-a335f.firebaseapp.com",
  projectId: "whatsapp-web-a335f",
  storageBucket: "whatsapp-web-a335f.appspot.com",
  messagingSenderId: "113222352130",
  appId: "1:113222352130:web:07dbe593976d2bee83561b",
  measurementId: "G-B5NZCMPTSN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider;

export {auth,provider};
export default db;