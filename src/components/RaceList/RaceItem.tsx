type Race = {
  id: number;
  name: string;
  lanes: { student_name: string; position: number | null }[];
};

const RaceItem = ({ race }: { race: Race }) => {
  return (
    <li className="border p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold">{race.name}</h3>
      <ul className="space-y-2 mt-2">
        {race.lanes.map((lane, index) => (
          <li key={index} className="flex justify-between">
            <span>{lane.student_name}</span>
            <span className="text-sm text-gray-600">
              {lane.position ? `Position: ${lane.position}` : "No Position"}
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default RaceItem;
