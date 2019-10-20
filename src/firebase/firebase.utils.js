import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBp8fQEAEUZBq9lgZzEJW9jmPZtaSefgfI",
  authDomain: "crown-db-a498a.firebaseapp.com",
  databaseURL: "https://crown-db-a498a.firebaseio.com",
  projectId: "crown-db-a498a",
  storageBucket: "crown-db-a498a.appspot.com",
  messagingSenderId: "729508311397",
  appId: "1:729508311397:web:1ea22b8d1a1147d62b318c",
  measurementId: "G-M0SZK0Z7G6"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error createing user", error);
    }
  }

  return userRef;
};
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
