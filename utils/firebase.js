import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: 'AIzaSyDRjLuTfjjBWAmUn8YmG0IE48VfCBHJm54',
    authDomain: 'otp-chat-45f02.firebaseapp.com',
    projectId: 'otp-chat-45f02',
    storageBucket: 'otp-chat-45f02.appspot.com',
    messagingSenderId: '445148443097',
    appId: '1:445148443097:web:d9dd87417bd459ac5729c8',
    measurementId: 'G-EVDW3LDZJG',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
