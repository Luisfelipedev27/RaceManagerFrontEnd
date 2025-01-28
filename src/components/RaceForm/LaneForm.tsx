import { Student, Lane } from "../../types";

type LaneFormProps = {
  index: number;
  lane: Lane;
  students: Student[];
  onChange: (index: number, field: keyof Lane, value: string) => void;
};

const LaneForm = ({ index, lane, students, onChange }: LaneFormProps) => {
  return (
    <div className="space-y-2">
      <label className="block font-medium">Student {index + 1}</label>
      <select
        value={lane.student_id}
        onChange={(e) => onChange(index, "student_id", e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select a student</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LaneForm;
