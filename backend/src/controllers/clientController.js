const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Pour créer un nouveau Client

exports.createClient = async (req, res) => {
    try {
        
        const {nom, prenom, email, motDePasse, pays, ville, quartier } = req.body;

        //Verifions les champs obligatoires
        if(!nom || !prenom || !email || !motDePasse) {
            return res.status(400).json({ message: "Tous les Champs Obligatoires doivent etre reneignés ! "});
        }

        // On Hache le password !!
        const passHashed = await hasherPassword(motDePasse);
        //Creation du client

        const client = new Client({
            nom, 
            prenom,
            email,
            motDePasse : passHashed,
            pays,
            ville,
            quartier,
        });

        await client.save();
        res.status(201).json({ message : "Client créé avec succès.", client });
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la Création du Cient.', error: error.message });
    }
};

//Obtenir un client par ID

exports.getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findById(id);

        if(!client) {
            return res.status(404).json({ message: "Client non trouvé !"});
        }

        res.status(200).json(client);
    } catch(error) {
        res.status(500).json({ message : "Erreur Lors de la récupération du client.", error: error.message});
    }
};

//Mettre a jour un client 
exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body

        const client = await Client.findByIdAndUpdate(id, updatedData, {new : true});

        if(!client) {
            return res.status(404).json({ message: "Client non trouvé !"});

        }
        res.status(200).json({ message : "Client mis a jour avec Succès", client})
    } catch (error ) {
        res.status(500).json({message : 'Erreur lors de la mise a jour du client', error: error.message})
    }
};

//Supprimer un Client 
exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await Client.findByIdAndDelete(id);

        if(!client) {
            return res.status(404).json({ message: "Client non trouvé !"});

        }
        res.status(200).json({  message: "Client supprimé avec succès." })
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du client.", error: error.message });
    }
}

const hasherPassword = async (motDePasse) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedpass = await bcrypt.hash(motDePasse, salt);
        console.log('Password Hashé avec Succès :', hashedpass);

        return hashedpass;
    } catch (error) {
        console.error('Erreur lors du hashage de Mot de Passe : ', error);
        throw error;
    }
}

const verifierPassword = async (motDePasse, hashedPassword) => {
    try {
        const match = await bcrypt.compare(motDePasse, hashedPassword);
        if(match) {
            console.log('Mot de Passe Valide');
        } else {
            console.log('Mot de passe Invalide !');
        }
        return match;
    } catch (error) {
        console.error('Erreur lors de la verification du mot de passe : ', error);
        throw error;
    }
}

// Obtenir tous les clients
exports.getAllClients = async (req, res) => {
    try {
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des clients.", error: error.message });
    }
  };