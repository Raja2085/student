<<<<<<< HEAD
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
=======
const students = [
  {
    id: 1,
    regNo: "2025000001",
    name: "John Doe",
    dob: "2005-03-15",
    email: "john@example.com",
    phone: "9876543210",
    place: "Chennai",
  },
  {
    id: 2,
    regNo: "2025000002",
    name: "Jane Smith",
    dob: "2006-07-20",
    email: "jane@example.com",
    phone: "9123456789",
    place: "Bangalore",
  },
  {
    id: 3,
    regNo: "2025000003",
    name: "Michael Johnson",
    dob: "2004-11-02",
    email: "michael@example.com",
    phone: "9988776655",
    place: "Mumbai",
  },
];

export default function StudentDetail({ params }) {
  const student = students.find((s) => s.id === Number(params.id));

  if (!student) {
    return <div style={{ padding: "20px" }}>Student not found</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{student.name}</h2>
      <p><strong>Reg No:</strong> {student.regNo}</p>
      <p><strong>Date of Birth:</strong> {student.dob}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <p><strong>Place:</strong> {student.place}</p>
>>>>>>> Muthuraj
    </div>
  );
}
