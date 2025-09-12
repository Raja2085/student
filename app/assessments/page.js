'use client';
import { useState } from 'react';

export default function Assessments() {
  const [assessments, setAssessments] = useState([
    { id: 1, course: "Java Basics", duration: "1 hr", date: "2025-09-15", startTime: "10:00 AM", endTime: "11:00 AM", totalMarks: 50, level: "Beginner" },
    { id: 2, course: "Python Intermediate", duration: "1.5 hrs", date: "2025-09-17", startTime: "02:00 PM", endTime: "03:30 PM", totalMarks: 75, level: "Intermediate" },
    { id: 3, course: "C++ Advanced", duration: "2 hrs", date: "2025-09-20", startTime: "11:30 AM", endTime: "01:30 PM", totalMarks: 100, level: "Advanced" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    course: '', duration: '', date: '', startTime: '', endTime: '', totalMarks: '', level: ''
  });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ course: '', duration: '', date: '', startTime: '', endTime: '', totalMarks: '', level: '' });
    setShowForm(true);
  };

  const handleEditClick = (assessment) => {
    setEditingId(assessment.id);
    setFormData({ ...assessment });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setAssessments(prev =>
        prev.map(a => a.id === editingId ? { ...formData, id: editingId } : a)
      );
    } else {
      const newId = assessments.length > 0 ? Math.max(...assessments.map(a => a.id)) + 1 : 1;
      setAssessments(prev => [...prev, { ...formData, id: newId }]);
    }
    setShowForm(false);
  };

  const handleDeleteClick = (id) => {
    setAssessments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Assessments</h2>
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-black px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Assessment
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input required type="text" name="course" placeholder="Course Name"
              className="border p-2 rounded" value={formData.course} onChange={handleInputChange} />
            <input required type="text" name="duration" placeholder="Duration (e.g. 1 hr)"
              className="border p-2 rounded" value={formData.duration} onChange={handleInputChange} />
            <input required type="date" name="date"
              className="border p-2 rounded" value={formData.date} onChange={handleInputChange} />
            <input required type="text" name="startTime" placeholder="Start Time (e.g. 10:00 AM)"
              className="border p-2 rounded" value={formData.startTime} onChange={handleInputChange} />
            <input required type="text" name="endTime" placeholder="End Time (e.g. 11:00 AM)"
              className="border p-2 rounded" value={formData.endTime} onChange={handleInputChange} />
            <input required type="number" name="totalMarks" placeholder="Total Marks"
              className="border p-2 rounded" value={formData.totalMarks} onChange={handleInputChange} />
            <select required name="level"
              className="border p-2 rounded" value={formData.level} onChange={handleInputChange}>
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 transition">
              {editingId !== null ? 'Update Assessment' : 'Add Assessment'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">S.No</th>
            <th className="px-4 py-2 border">Course</th>
            <th className="px-4 py-2 border">Duration</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Start Time</th>
            <th className="px-4 py-2 border">End Time</th>
            <th className="px-4 py-2 border">Total Marks</th>
            <th className="px-4 py-2 border">Level</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((a, idx) => (
            <tr key={a.id}>
              <td className="px-4 py-2 border">{idx + 1}</td>
              <td className="px-4 py-2 border">{a.course}</td>
              <td className="px-4 py-2 border">{a.duration}</td>
              <td className="px-4 py-2 border">{a.date}</td>
              <td className="px-4 py-2 border">{a.startTime}</td>
              <td className="px-4 py-2 border">{a.endTime}</td>
              <td className="px-4 py-2 border">{a.totalMarks}</td>
              <td className="px-4 py-2 border">{a.level}</td>
              <td className="px-4 py-2 border space-x-2">
                <button onClick={() => handleEditClick(a)}
                  className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(a.id)}
                  className="bg-red-600 text-black px-3 py-1 rounded hover:bg-red-700 transition">
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
