export type Student = {
  id: number;
  name: string;
};

export type Lane = {
  student_id: string;
};

export type Result = {
  student_id: number | null;
  position: number | null;
};

export type Race = {
  id: number;
  name: string;
  results: { student: string; student_id: number; position: number | null }[];
};
