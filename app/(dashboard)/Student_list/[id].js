import { useRouter } from 'next/router';

// Example data -- Ideally, you would fetch this from an API or database
const students = [
  { id: 1, name: 'John Doe', grade: '10', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', grade: '11', email: 'jane@example.com' },
  { id: 3, name: 'Samuel Lee', grade: '10', email: 'samuel@example.com' },
];

export default function StudentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const student = students.find(s => s.id === Number(id));

  if (!student) return <div>Student not found</div>;

  return (
    <div>
      <h2>{student.name}</h2>
      <p>Grade: {student.grade}</p>
      <p>Email: {student.email}</p>
      {/* Add any additional fields you'd like here */}
    </div>
  );
}
