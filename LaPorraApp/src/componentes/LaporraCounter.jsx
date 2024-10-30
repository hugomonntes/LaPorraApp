import React, { useEffect, useState } from 'react';

const LaporraCounter = () => {
const [participants, setParticipants] = useState([]);
const [totalPot, setTotalPot] = useState(0);
const [match1, setMatch1] = useState('');
const [match2, setMatch2] = useState('');
const [currentRound, setCurrentRound] = useState(13);
const [participantName, setParticipantName] = useState('');
const [prediction1, setPrediction1] = useState('');
const [prediction2, setPrediction2] = useState('');
const [euros, setEuros] = useState(0);

useEffect(() => {
const storedData = localStorage.getItem('participants');
const storedPot = localStorage.getItem('totalPot');
if (storedData) {
    setParticipants(JSON.parse(storedData));
}
if (storedPot) {
    setTotalPot(JSON.parse(storedPot));
}
}, []);

useEffect(() => {
localStorage.setItem('participants', JSON.stringify(participants));
localStorage.setItem('totalPot', JSON.stringify(totalPot));
}, [participants, totalPot]);

const addParticipant = () => {
if (!participantName || !prediction1 || !prediction2) return;

const newParticipant = {
    name: participantName,
    prediction1,
    prediction2,
    euros: 0,
    paid: false,
};

setParticipants([...participants, newParticipant]);
setTotalPot(totalPot + euros);
setParticipantName('');
setPrediction1('');
setPrediction2('');
setEuros(0);
};

const updateEuros = (index, value) => {
const newParticipants = [...participants];
newParticipants[index].euros += value;
setParticipants(newParticipants);
setTotalPot(totalPot + value);
};

const togglePaidStatus = (index) => {
const newParticipants = [...participants];
newParticipants[index].paid = !newParticipants[index].paid;
setParticipants(newParticipants);
};

return (
<div className="p-5 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-4 text-center">LAPORRA - Jornada {currentRound}</h1>
    <div className="bg-white p-4 rounded shadow-md mb-4">
    <label className="block mb-2 font-semibold">Nombre del Participante:</label>
    <input
        className="border border-gray-300 p-2 mb-2 w-full rounded"
        type="text"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
    />
    <label className="block mb-2 font-semibold">Nombre del Partido 1:</label>
    <input
        className="border border-gray-300 p-2 mb-2 w-full rounded"
        type="text"
        value={match1}
        onChange={(e) => setMatch1(e.target.value)}
    />
    <label className="block mb-2 font-semibold">Predicción 1:</label>
    <input
        className="border border-gray-300 p-2 mb-2 w-full rounded"
        type="text"
        value={prediction1}
        onChange={(e) => setPrediction1(e.target.value)}
    />
    <label className="block mb-2 font-semibold">Nombre del Partido 2:</label>
    <input
        className="border border-gray-300 p-2 mb-2 w-full rounded"
        type="text"
        value={match2}
        onChange={(e) => setMatch2(e.target.value)}
    />
    <label className="block mb-2 font-semibold">Predicción 2:</label>
    <input
        className="border border-gray-300 p-2 mb-2 w-full rounded"
        type="text"
        value={prediction2}
        onChange={(e) => setPrediction2(e.target.value)}
    />
    <label className="block mb-2 font-semibold">Euros:</label>
    <div className="flex mb-4 items-center">
        <button className="border border-blue-500 text-blue-500 p-2 rounded hover:bg-blue-500 hover:text-white transition" onClick={() => updateEuros(participants.length - 1, 1)}>+</button>
        <button className="border border-blue-500 text-blue-500 p-2 rounded hover:bg-blue-500 hover:text-white transition ml-2" onClick={() => updateEuros(participants.length - 1, -1)}>-</button>
        <span className="ml-2">Total: {euros} €</span>
    </div>
    <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" onClick={addParticipant}>Agregar Participante</button>
    </div>
    <table className="table-auto w-full border border-gray-300">
    <thead>
        <tr className="bg-blue-200">
        <th className="border p-2">Participante</th>
        <th className="border p-2">Partido 1: {match1}</th>
        <th className="border p-2">Partido 2: {match2}</th>
        <th className="border p-2">Euros</th>
        <th className="border p-2">Pagado</th>
        </tr>
    </thead>
    <tbody>
        {participants.map((participant, index) => (
        <tr key={index} className="hover:bg-gray-100">
            <td className="border p-2">{participant.name}</td>
            <td className="border p-2">{participant.prediction1}</td>
            <td className="border p-2">{participant.prediction2}</td>
            <td className="border p-2 flex items-center">
            {participant.euros} €
            <button className="ml-2 border border-blue-500 text-blue-500 p-1 rounded hover:bg-blue-500 hover:text-white transition" onClick={() => updateEuros(index, 1)}>+</button>
            <button className="ml-2 border border-blue-500 text-blue-500 p-1 rounded hover:bg-blue-500 hover:text-white transition" onClick={() => updateEuros(index, -1)}>-</button>
            </td>
            <td className="border p-2">
            <button 
                className={`p-1 rounded ${participant.paid ? 'bg-green-500' : 'bg-red-500'} text-white`} 
                onClick={() => togglePaidStatus(index)}
            >
                {participant.paid ? 'Pagado' : 'No Pagado'}
            </button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
    <h2 className="mt-4 text-xl font-bold">Bote Total: {totalPot} €</h2>
</div>
);
};

export default LaporraCounter;
