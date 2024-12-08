const admin = require('firebase-admin');
const serviceAccount = require('./newsapp-16d3e-firebase-adminsdk-xx5hu-1be8449365.json');  // Caminho para o arquivo JSON gerado do Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
