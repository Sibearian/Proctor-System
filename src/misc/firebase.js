import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
	apiKey: "AIzaSyC4hTkNgv_a8xnRBGQHWkV3Q33CprfTMvI",
	authDomain: "proctor-system-project.firebaseapp.com",
	projectId: "proctor-system-project",
	storageBucket: "proctor-system-project.appspot.com",
	messagingSenderId: "1085981692290",
	appId: "1:1085981692290:web:838d057a4cfa57d6b57f9b",
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
