import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Laporra() {
  const [matches, setMatches] = useState({
    match1: { local: "Equipo Local 1", visitor: "Equipo Visitante 1" },
    match2: { local: "Equipo Local 2", visitor: "Equipo Visitante 2" },
  });

  const [name, setName] = useState("");
  const [match1Result, setMatch1Result] = useState("");
  const [match2Result, setMatch2Result] = useState("");
  const [paid, setPaid] = useState<boolean | "indeterminate">(false);
  const [entries, setEntries] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalPot, setTotalPot] = useState(0);

  useEffect(() => {
    const storedMatches = localStorage.getItem("matches");
    const storedEntries = localStorage.getItem("entries");
    const storedTotalPot = localStorage.getItem("totalPot");

    if (storedMatches) setMatches(JSON.parse(storedMatches));
    if (storedEntries) setEntries(JSON.parse(storedEntries));
    if (storedTotalPot) setTotalPot(JSON.parse(storedTotalPot));
  }, []);

  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      name,
      match1Result,
      match2Result,
      paid,
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    updateLocalStorage("entries", updatedEntries);

    if (paid) {
      const newTotalPot = totalPot + 1;
      setTotalPot(newTotalPot);
      updateLocalStorage("totalPot", newTotalPot);
    }
    setName("");
    setMatch1Result("");
    setMatch2Result("");
    setPaid(false);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const updatedMatches = {
      match1: {
        local: e.target.match1Local.value,
        visitor: e.target.match1Visitor.value,
      },
      match2: {
        local: e.target.match2Local.value,
        visitor: e.target.match2Visitor.value,
      },
    };
    setMatches(updatedMatches);
    updateLocalStorage("matches", updatedMatches);
  };

  const handlePayment = (index) => {
    const updatedEntries = [...entries];
    updatedEntries[index].paid = !updatedEntries[index].paid;
    setEntries(updatedEntries);
    updateLocalStorage("entries", updatedEntries);

    const newTotalPot = totalPot + (updatedEntries[index].paid ? 1 : -1);
    setTotalPot(newTotalPot);
    updateLocalStorage("totalPot", newTotalPot);
  };

  const clearParticipants = () => {
    setEntries([]);
    updateLocalStorage("entries", []);
  };

  // Función para reiniciar el localStorage
  const resetLocalStorage = () => {
    localStorage.clear();
    alert("Local Storage reiniciado.");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8">
      <h1 className="font-light text-3xl sm:text-6xl mb-6 sm:mb-8 text-center text-blue-400">
        LaPorra Del Vivas
      </h1>

      <Card className="bg-gray-800 mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="text-blue-400">Partidos Actuales</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Partido 1: {matches.match1.local} vs {matches.match1.visitor}
          </p>
          <p>
            Partido 2: {matches.match2.local} vs {matches.match2.visitor}
          </p>
          <p className="mt-4 text-xl font-bold text-blue-400">
            Bote Total: {totalPot} €
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 space-y-4">
        <div>
          <Label htmlFor="name" className="text-blue-400">
            Nombre de usuario
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
            required
          />
        </div>
        <div>
          <Label htmlFor="match1Result" className="text-blue-400">
            {matches.match1.local} vs {matches.match1.visitor}
          </Label>
          <Input
            id="match1Result"
            value={match1Result}
            onChange={(e) => setMatch1Result(e.target.value)}
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
            required
          />
        </div>
        <div>
          <Label htmlFor="match2Result" className="text-blue-400">
            {matches.match2.local} vs {matches.match2.visitor}
          </Label>
          <Input
            id="match2Result"
            value={match2Result}
            onChange={(e) => setMatch2Result(e.target.value)}
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="paid"
            checked={paid}
            onCheckedChange={setPaid}
            className="border-blue-400 text-blue-400"
          />
          <Label htmlFor="paid" className="text-blue-400">
            Pagado
          </Label>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 text-gray-900 hover:bg-blue-400"
        >
          Añadir entrada
        </Button>
      </form>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-400">Nombre</TableHead>
              <TableHead className="text-blue-400">
                {matches.match1.local} vs {matches.match1.visitor}
              </TableHead>
              <TableHead className="text-blue-400">
                {matches.match2.local} vs {matches.match2.visitor}
              </TableHead>
              <TableHead className="text-blue-400">Pagado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.match1Result}</TableCell>
                <TableCell>{entry.match2Result}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handlePayment(index)}
                    className={`w-16 h-8 rounded-full ${
                      entry.paid ? "bg-green-500" : "bg-red-500"
                    } text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200`}
                    aria-label={entry.paid ? "Pagado" : "No pagado"}
                  >
                    {entry.paid ? "Sí" : "No"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 sm:mt-8 flex justify-end">
        <Button
          onClick={clearParticipants}
          variant="destructive"
          className="bg-red-500 hover:bg-red-600"
        >
          Borrar Participantes
        </Button>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={resetLocalStorage}
          className="bg-orange-500 text-gray-900 hover:bg-orange-400"
        >
          Reiniciar Local Storage
        </Button>
      </div>

      <Card className="bg-gray-800 mt-6 sm:mt-8">
        <CardHeader>
          <CardTitle className="text-blue-400">Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="paid"
              checked={paid === true}
              onCheckedChange={() => setIsAdmin(!isAdmin)}
              className="border-blue-400 text-blue-400"
            />
            <Label htmlFor="paid" className="text-blue-400">
              Admin Mode
            </Label>
          </div>
          {isAdmin && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <Label htmlFor="match1Local" className="text-blue-400">
                  Equipo Local Partido 1
                </Label>
                <Input
                  id="match1Local"
                  defaultValue={matches.match1.local}
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="match1Visitor" className="text-blue-400">
                  Equipo Visitante Partido 1
                </Label>
                <Input
                  id="match1Visitor"
                  defaultValue={matches.match1.visitor}
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="match2Local" className="text-blue-400">
                  Equipo Local Partido 2
                </Label>
                <Input
                  id="match2Local"
                  defaultValue={matches.match2.local}
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="match2Visitor" className="text-blue-400">
                  Equipo Visitante Partido 2
                </Label>
                <Input
                  id="match2Visitor"
                  defaultValue={matches.match2.visitor}
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-gray-900 hover:bg-blue-400"
              >
                Actualizar Partidos
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      <p className="text-white m-5 ml-0">Developed by Hugo Montes ©️</p>
    </div>
  );
}
