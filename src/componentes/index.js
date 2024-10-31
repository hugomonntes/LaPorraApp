// Archivo: index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB', error));

// Modelo de Mongoose para los datos de la apuesta
const ParticipantSchema = new mongoose.Schema({
name: String,
prediction: String,
bet: Number,
});

const BetSchema = new mongoose.Schema({
totalEuros: Number,
participants: [ParticipantSchema],
});

const Bet = mongoose.model('Bet', BetSchema);

// Endpoint para obtener los datos
app.get('/api/bet', async (req, res) => {
const bet = await Bet.findOne();
res.json(bet);
});

// Endpoint para actualizar los datos
app.post('/api/bet', async (req, res) => {
const { totalEuros, participants } = req.body;
let bet = await Bet.findOne();

if (bet) {
    bet.totalEuros = totalEuros;
    bet.participants = participants;
} else {
    bet = new Bet({ totalEuros, participants });
}

await bet.save();
res.json(bet);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
