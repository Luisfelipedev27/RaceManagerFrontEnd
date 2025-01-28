export const API_BASE_URL = 'http://localhost:3000/api/v1';

export const getStudents = async () => fetch(`${API_BASE_URL}/students`);
export const getRaces = async () => fetch(`${API_BASE_URL}/races`);
export const postRaceResults = async (raceId: number, results: any) =>
  fetch(`${API_BASE_URL}/races/${raceId}/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ results }),
  });
