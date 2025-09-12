'use client';
import { useState } from 'react';

export default function ClassList() {
  const [classes, setClasses] = useState([
    { id: 1, className: "Java", coach: "Anita Sharma", status: "Scheduled", time: "07:00 AM", level: "Low", date: "2025-09-10" },
    { id: 2, className: "Python", coach: "Ravi Kumar", status: "Live", time: "06:00 PM", level: "High", date: "2025-09-11" },
    { id: 3, className: "C++", coach: "Priya Nair", status: "Scheduled", time: "05:30 PM", level: "Medium", date: "2025-09-12" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    className: '', coach: '', status: '', time: '', level: '', date: ''
  });

  const handleAddClick = () => {
    setEditingClass(null);
    setFormData({ className: '', coach: '', status: '', time: '', level: '', date: '' });
    setShowForm(true);
  };

  const handleEditClick = (cls) => {
    setEditingClass(cls.id);
    setFormData({ ...cls });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingClass !== null) {
      setClasses(prev => prev.map(c => c.id === editingClass ? { ...formData, id: editingClass } : c));
    } else {
      const newId = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1;
      setClasses(prev => [...prev, { ...formData, id: newId }]);
    }
    setShowForm(false);
  };

  const handleDeleteClick = (id) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Class List</h2>
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-black px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Class
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input required type="text" name="className" placeholder="Class Name" className="border p-2 rounded" value={formData.className} onChange={handleInputChange}/>
            <input required type="text" name="coach" placeholder="Coach Name" className="border p-2 rounded" value={formData.coach} onChange={handleInputChange}/>
            <select required name="status" className="border p-2 rounded" value={formData.status} onChange={handleInputChange}>
              <option value="">Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Live">Live</option>
            </select>
            <input required type="time" name="time" className="border p-2 rounded" value={formData.time} onChange={handleInputChange}/>
            <select required name="level" className="border p-2 rounded" value={formData.level} onChange={handleInputChange}>
              <option value="">Select Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input required type="date" name="date" className="border p-2 rounded" value={formData.date} onChange={handleInputChange}/>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 transition">
              {editingClass !== null ? 'Update Class' : 'Add Class'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Class Table */}
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">S.No</th>
            <th className="px-4 py-2 border">Class</th>
            <th className="px-4 py-2 border">Coach</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Level</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, idx) => (
            <tr key={cls.id}>
              <td className="px-4 py-2 border">{idx + 1}</td>
              <td className="px-4 py-2 border">{cls.className}</td>
              <td className="px-4 py-2 border">{cls.coach}</td>
              <td className="px-4 py-2 border">{cls.status}</td>
              <td className="px-4 py-2 border">{cls.time}</td>
              <td className="px-4 py-2 border">{cls.level}</td>
              <td className="px-4 py-2 border">{cls.date}</td>
              <td className="px-4 py-2 border space-x-2">
                <button onClick={() => handleEditClick(cls)} className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(cls.id)} className="bg-red-600 text-black px-3 py-1 rounded hover:bg-red-700 transition">
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
