import { useState, useEffect } from "react";
import MessageAlert from "../RaceForm/MessageAlert";

type Student = {
  id: number;
  name: string;
};

type Result = {
  student_id: number | null;
  position: number | null;
};

type Race = {
  id: number;
  name: string;
  results: { student: string; student_id: number; position: number | null }[];
};

const ResultForm = ({ selectedRace }: { selectedRace: Race }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/students");
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          setErrorMessage("Error fetching students");
        }
      } catch {
        setErrorMessage("Error fetching students");
      }
    };
    fetchStudents();
  }, []);

  const handleResultChange = (index: number, field: keyof Result, value: string) => {
    const newResults = [...results];
    newResults[index] = {
      ...newResults[index],
      [field]: field === "student_id" ? parseInt(value, 10) || null : parseInt(value, 10) || null,
    };
    setResults(newResults);
  };

  const addResult = () => {
    setResults([...results, { student_id: null, position: null }]);
  };

  const submitResults = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/races/${selectedRace.id}/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ results }),
      });

      if (response.ok) {
        setSuccessMessage("Results successfully recorded!");
        setErrorMessage(null);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.errors.join(", "));
      }
    } catch {
      setErrorMessage("Error recording results.");
    }
  };

  const getAvailableStudents = (index: number) => {
    const selectedStudentIds = results.map((result) => result.student_id);
    return students.filter(
      (student) =>
        !selectedStudentIds.includes(student.id) ||
        results[index]?.student_id === student.id
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Add Results</h3>
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}
      {successMessage && <MessageAlert message={successMessage} type="success" />}

      {results.map((result, index) => (
        <div key={index} className="space-y-2">
          <label className="block font-medium">Student {index + 1}</label>
          <select
            value={result.student_id || ""}
            onChange={(e) => handleResultChange(index, "student_id", e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a student</option>
            {getAvailableStudents(index).map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={result.position || ""}
            onChange={(e) => handleResultChange(index, "position", e.target.value)}
            placeholder="Position"
            className="w-full p-2 border rounded-md"
            min="1"
          />
        </div>
      ))}

      <div className="space-x-4">
        <button
          type="button"
          onClick={addResult}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Result
        </button>
        <button
          type="button"
          onClick={submitResults}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Results
        </button>
      </div>
    </div>
  );
};

export default ResultForm;
