// app/Student_list/[id]/page.js
import { useParams } from 'next/navigation';

const students = [
  { id: 1, name: 'John Doe', grade: '10', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', grade: '11', email: 'jane@example.com' }
];

export default function StudentDetail() {
  const params = useParams();
  const student = students.find(s => s.id === Number(params.id));

  if (!student) return <div>Student not found</div>;

  return (
    <div>
      <h2>{student.name}</h2>
      <p>Grade: {student.grade}</p>
      <p>Email: {student.email}</p>
    </div>
  );
}
