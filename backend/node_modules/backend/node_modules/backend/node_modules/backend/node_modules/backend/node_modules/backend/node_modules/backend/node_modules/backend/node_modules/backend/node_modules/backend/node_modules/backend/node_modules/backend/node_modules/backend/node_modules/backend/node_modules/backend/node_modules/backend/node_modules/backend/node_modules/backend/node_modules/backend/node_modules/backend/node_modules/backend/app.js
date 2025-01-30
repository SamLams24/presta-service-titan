require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./src/config/database');
const clientRoutes = require("./src/routes/clientRoutes");
const prestataireRoutes = require('./src/routes/prestataireRoutes');
const prestationRoutes = require('./src/routes/prestationRoutes');
const factureRoutes = require('./src/routes/factureRoutes');

//initialisation de l'app
const app = express();
const PORT = process.env.PORT || 5000 ; 



//Middlewares
app.use(cors());
app.use(bodyParser.json());

// Autres Middlewares
// Routes API 
app.use('/api/clients', clientRoutes);
app.use('/api/prestataires', prestataireRoutes);
app.use('/api/prestations', prestationRoutes);
app.use('/api/factures', factureRoutes);

//Connexion a la DB mongo

connectDb();

//Routes
app.get('/', (req, res) => {
    res.send("API Presta-Service en cours d'execution !!");
});

app.listen(PORT , ()=> {
    console.log(`Serveur en écoute sur le port ${PORT}`);
})