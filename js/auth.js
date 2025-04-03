// Initialize Firebase
import { firebaseConfig } from './firebase-config.js';
firebase.initializeApp(firebaseConfig);

// Google Signup/Login
document.getElementById('googleSignup')?.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            window.location.href = '../dashboard.html';
        }).catch((error) => {
            console.error(error);
        });
});

// Facebook Signup/Login
document.getElementById('facebookSignup')?.addEventListener('click', () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            window.location.href = '../dashboard.html';
        }).catch((error) => {
            console.error(error);
        });
});

// Email Signup
document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Update user profile
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            window.location.href = '../dashboard.html';
        })
        .catch((error) => {
            alert(error.message);
        });
});