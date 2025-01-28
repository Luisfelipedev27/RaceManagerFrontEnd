import { useState, useEffect } from 'react';

type Result = {
  student: string;
  position: number;
};

type Race = {
  id: number;
  name: string;
  results: Result[];
};

const RaceList = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/races');
        if (response.ok) {
          const data = await response.json();
          setRaces(data);
        } else {
          setErrorMessage('Error fetching races');
        }
      } catch (error) {
        setErrorMessage('No races to display');
      }
    };

    fetchRaces();
  }, []);

  const handleSelectRace = async (raceId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/races/${raceId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedRace(data);
        setErrorMessage(null);
      } else {
        setErrorMessage('Error fetching race details');
      }
    } catch (error) {
      setErrorMessage('Error fetching race details');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Race List</h1>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <div className="w-full max-w-md mb-4">
        <label className="block mb-2 font-medium">Select a Race</label>
        <select
          onChange={(e) => handleSelectRace(Number(e.target.value))}
          className="w-full p-2 border rounded-md"
          defaultValue=""
        >
          <option value="" disabled>
            Select a race
          </option>
          {races.map((race) => (
            <option key={race.id} value={race.id}>
              {race.name}
            </option>
          ))}
        </select>
      </div>

      {selectedRace && (
        <div className="w-full max-w-md p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-4">{selectedRace.name}</h2>
          <ul className="space-y-2">
            {selectedRace.results.map((result, index) => (
              <li key={index} className="border p-2 rounded">
                <span className="font-medium">{result.position}º place:</span> {result.student}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RaceList;
