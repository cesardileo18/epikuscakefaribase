import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDHbuzfdjid18eaVhKxt5dS3cYVvaxmZRE",
//   authDomain: "backendepikuscake.firebaseapp.com",
//   projectId: "backendepikuscake",
//   storageBucket: "backendepikuscake.appspot.com",
//   messagingSenderId: "280077221603",
//   appId: "1:280077221603:web:0b4d37d3f2f961a9210fd6"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)
