// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARGleD8t5FkDupzLTRd7w0n2JPdQqn_6E",
    authDomain: "newsyork.firebaseapp.com",
    projectId: "newsyork",
    storageBucket: "newsyork.appspot.com",
    messagingSenderId: "425662736970",
    appId: "1:425662736970:web:46adf96a0f017b60ed54b3",
    measurementId: "G-ETBYP08T34"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function handleLogin() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Login successful!');
                window.location.href = 'homepage.html';
            })
            .catch((error) => {
                handleError(error);
            });
    });
}
export function handleSignup() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Account created successfully!');
                window.location.href = 'index.html';
            })
            .catch((error) => {
                handleError(error);
            });
    });
}
function handleError(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === 'auth/user-not-found') {
        alert('No account found with this email. Please sign up first.');
    } else if (errorCode === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
    } else {
        alert('Error: ' + errorMessage);
    }
}
