import { useState, useEffect } from 'react';
import RaceForm from './RaceForm/RaceForm';
import RaceResults from './RaceResults/RaceResults';
import RaceList from './RaceList/RaceList';

type Race = {
  id: number;
  name: string;
  results: { student: string; student_id: number; position: number | null }[];
};

const App = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [view, setView] = useState<'form' | 'results' | 'list'>('form');

  const fetchRaces = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/races');
      if (response.ok) {
        const data = await response.json();
        setRaces(data);
      } else {
        console.error('Error fetching races');
      }
    } catch (error) {
      console.error('Error fetching races:', error);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setView('form')}
          className={`px-4 py-2 font-bold rounded ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Create Race
        </button>
        <button
          onClick={() => setView('results')}
          className={`px-4 py-2 font-bold rounded ${view === 'results' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Add Results
        </button>
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 font-bold rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Race List
        </button>
      </div>

      {view === 'form' && <RaceForm onRaceCreated={fetchRaces} />}
      {view === 'results' && <RaceResults races={races} />}
      {view === 'list' && <RaceList />}
    </div>
  );
};

export default App;
