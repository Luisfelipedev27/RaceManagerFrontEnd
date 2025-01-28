export const fetchStudents = async (
  setStudents: (students: any[]) => void,
  setErrorMessage: (message: string | null) => void
) => {
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
