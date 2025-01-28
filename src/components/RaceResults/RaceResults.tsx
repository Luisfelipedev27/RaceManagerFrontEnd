import { useState } from "react";
import ResultForm from "./ResultForm";

type Race = {
  id: number;
  name: string;
  results: { student: string; student_id: number; position: number | null }[];
};

const RaceResults = ({ races }: { races: Race[] }) => {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const handleSelectRace = (raceId: number) => {
    const race = races.find((r) => r.id === raceId) || null;
    setSelectedRace(race);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-4 space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold">Race Results</h2>

        <div className="space-y-4">
          <label className="block font-medium">Select Race</label>
          <select
            onChange={(e) => handleSelectRace(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a race</option>
            {races.map((race) => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </select>

          {selectedRace && (
            <ResultForm selectedRace={selectedRace} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceResults;
