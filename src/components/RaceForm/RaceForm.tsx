import { useState, useEffect } from "react";
import LaneForm from "./LaneForm";
import MessageAlert from "./MessageAlert";
import { Student, Lane } from "../../types";
import { fetchStudents } from "../../hooks/useFetchStudents";

const RaceForm = ({ onRaceCreated }: { onRaceCreated: () => void }) => {
  const [name, setName] = useState<string>("");
  const [lanes, setLanes] = useState<Lane[]>([{ student_id: "" }, { student_id: "" }]);
  const [students, setStudents] = useState<Student[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents(setStudents, setErrorMessage);
  }, []);

  const handleLaneChange = (index: number, field: keyof Lane, value: string) => {
    const updatedLanes = [...lanes];
    updatedLanes[index][field] = value;
    setLanes(updatedLanes);
  };

  const addLane = () => setLanes([...lanes, { student_id: "" }]);

  const resetForm = () => {
    setName("");
    setLanes([{ student_id: "" }, { student_id: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lanes.length < 2) {
      setErrorMessage("The race must have at least 2 students.");
      return;
    }

    const uniqueStudentIds = new Set(lanes.map((lane) => lane.student_id));
    if (uniqueStudentIds.size !== lanes.length) {
      setErrorMessage("Each student must be unique in a race.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/races", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ race: { name, lanes_attributes: lanes } }),
      });

      if (response.ok) {
        setSuccessMessage("Race created successfully!");
        resetForm();
        onRaceCreated();
      } else {
        const { errors } = await response.json();
        setErrorMessage(errors.join(", "));
      }
    } catch {
      setErrorMessage("Error adding race.");
    }
  };

  const getAvailableStudents = (index: number) => {
    const selectedStudentIds = lanes.map((lane) => lane.student_id);
    return students.filter((student) => !selectedStudentIds.includes(student.id.toString()) || lanes[index].student_id === student.id.toString());
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold">Add Race</h2>

        <MessageAlert message={errorMessage} type="error" />
        <MessageAlert message={successMessage} type="success" />

        <div>
          <label className="block mb-1 font-medium">Race Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter the name"
          />
        </div>

        {lanes.map((lane, index) => (
          <LaneForm
            key={index}
            index={index}
            lane={lane}
            students={getAvailableStudents(index)}
            onChange={handleLaneChange}
          />
        ))}

        <div className="space-x-2">
          <button
            type="button"
            onClick={addLane}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Race
          </button>
        </div>
      </form>
    </div>
  );
};

export default RaceForm;
