// app/Student_list/page.js
import Link from 'next/link';

const students = [
  { id: 1, name: 'John Doe', grade: '10', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', grade: '11', email: 'jane@example.com' }
];

export default function StudentList() {
  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link href={`/Student_list/${student.id}`}>
              {student.name} - Grade {student.grade}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
