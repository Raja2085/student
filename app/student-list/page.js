'use client';

import { useState } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, regNo: "2025000001", name: "John Doe", dob: "2005-03-15", email: "john@example.com", phone: "9876543210", place: "Chennai" },
    { id: 2, regNo: "2025000002", name: "Jane Smith", dob: "2006-07-20", email: "jane@example.com", phone: "9123456789", place: "Bangalore" },
    { id: 3, regNo: "2025000003", name: "Michael Johnson", dob: "2004-11-02", email: "michael@example.com", phone: "9988776655", place: "Mumbai" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    regNo: '', name: '', dob: '', email: '', phone: '', place: ''
  });

  const handleAddClick = () => {
    setEditingStudent(null);
    setFormData({ regNo: '', name: '', dob: '', email: '', phone: '', place: '' });
    setShowForm(true);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setFormData({ ...student });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingStudent !== null) {
      setStudents(prev => prev.map(s => s.id === editingStudent ? { ...formData, id: editingStudent } : s));
    } else {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      setStudents(prev => [...prev, { ...formData, id: newId }]);
    }
    setShowForm(false);
  };

  const handleDeleteClick = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Student List</h2>
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-black px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Student
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input required type="text" name="regNo" placeholder="Registration No" className="border p-2 rounded" value={formData.regNo} onChange={handleInputChange}/>
            <input required type="text" name="name" placeholder="Name" className="border p-2 rounded" value={formData.name} onChange={handleInputChange}/>
            <input required type="date" name="dob" className="border p-2 rounded" value={formData.dob} onChange={handleInputChange}/>
            <input required type="email" name="email" placeholder="Email" className="border p-2 rounded" value={formData.email} onChange={handleInputChange}/>
            <input required type="text" name="phone" placeholder="Phone" className="border p-2 rounded" value={formData.phone} onChange={handleInputChange}/>
            <input required type="text" name="place" placeholder="Place" className="border p-2 rounded" value={formData.place} onChange={handleInputChange}/>
          </div>
          <div className="flex justify-end space-x-2">
            {/* Submit / Update Button */}
            <button
              type="submit"
              className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {editingStudent !== null ? 'Update Student' : 'Add Student'}
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Student Table */}
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">S.No</th>
            <th className="px-4 py-2 border">Reg No</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">DOB</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone No</th>
            <th className="px-4 py-2 border">Place</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student.id}>
              <td className="px-4 py-2 border">{idx + 1}</td>
              <td className="px-4 py-2 border">{student.regNo}</td>
              <td className="px-4 py-2 border">{student.name}</td>
              <td className="px-4 py-2 border">{student.dob}</td>
              <td className="px-4 py-2 border">{student.email}</td>
              <td className="px-4 py-2 border">{student.phone}</td>
              <td className="px-4 py-2 border">{student.place}</td>
              <td className="px-4 py-2 border space-x-2">
                {/* Edit Button */}
                <button
                  onClick={() => handleEditClick(student)}
                  className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(student.id)}
                  className="bg-red-600 text-black px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
