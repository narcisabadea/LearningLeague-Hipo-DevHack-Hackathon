import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyCbdkoKhX5rHX9FXSww5v-wcBqzRIBBfmg",
    authDomain: "devhacks2020-1c585.firebaseapp.com",
    databaseURL: "https://devhacks2020-1c585.firebaseio.com",
    projectId: "devhacks2020-1c585",
    storageBucket: "devhacks2020-1c585.appspot.com",
    messagingSenderId: "399419580036",
    appId: "1:399419580036:web:23cc695e48159b700facd1",
    measurementId: "G-PRKQTSPJFM"
}

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp