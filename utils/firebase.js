import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyAc5R48XRDx2jxyGscKmfCZUqcdpnnmWCw",
    authDomain: "chat-app-50a48.firebaseapp.com",
    projectId: "chat-app-50a48",
    storageBucket: "chat-app-50a48.appspot.com",
    messagingSenderId: "294060158276",
    appId: "1:294060158276:web:182b5dd69cc88fbe56bb11",
    measurementId: "G-R1FJ2081Y0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
