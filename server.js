const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./scratch');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});
app.get('/registered', (req, res) => {    
    res.sendFile(path.join(__dirname, 'public', 'registered.html'));
});
app.get('/signIn', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signIn.html'));
});

// app.post('/registration', (req, res) => {
//     const { name, email } = req.body;
//     const registrationData = {
//       name,
//       email
//     };
//     console.log("data =>", registrationData)
//     let submissions = localStorage.getItem('submissions');
//     if (!submissions) {
//       submissions = [];
//     } else {
//       submissions = JSON.parse(submissions);
//     }
//     submissions.push(registrationData);
//     localStorage.setItem('submissions', JSON.stringify(submissions));
//     res.redirect('/');
//   });

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
