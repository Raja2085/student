'use client';
import { useState } from 'react';

export default function DemoClasses() {
  const [classes, setClasses] = useState([
    { id: 1, title: "Java Programming", coach: "Anita Sharma", time: "10:00 AM", duration: "1 hr", level: "Beginner", description: "Introduction to Java programming covering basic syntax, variables, loops, and OOP concepts." },
    { id: 2, title: "Python Programming", coach: "Ravi Kumar", time: "01:00 PM", duration: "1.5 hrs", level: "Intermediate", description: "Learn Python programming including data structures, functions, file handling, and libraries." },
    { id: 3, title: "C++ Programming", coach: "Priya Nair", time: "03:30 PM", duration: "1 hr", level: "Advanced", description: "Master C++ programming with classes, pointers, memory management, and STL." },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    title: '', coach: '', time: '', duration: '', level: '', description: ''
  });

  const handleAddClick = () => {
    setEditingClass(null);
    setFormData({ title: '', coach: '', time: '', duration: '', level: '', description: '' });
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
    <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Demo Classes</h2>
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-black px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Demo Class
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input required type="text" name="title" placeholder="Class Title" className="border p-2 rounded" value={formData.title} onChange={handleInputChange}/>
            <input required type="text" name="coach" placeholder="Coach Name" className="border p-2 rounded" value={formData.coach} onChange={handleInputChange}/>
            <input required type="text" name="time" placeholder="Time (e.g. 10:00 AM)" className="border p-2 rounded" value={formData.time} onChange={handleInputChange}/>
            <input required type="text" name="duration" placeholder="Duration (e.g. 1 hr)" className="border p-2 rounded" value={formData.duration} onChange={handleInputChange}/>
            <select required name="level" className="border p-2 rounded" value={formData.level} onChange={handleInputChange}>
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <input required type="text" name="description" placeholder="Short Description" className="border p-2 rounded col-span-2" value={formData.description} onChange={handleInputChange}/>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 transition">
              {editingClass !== null ? 'Update Demo Class' : 'Add Demo Class'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
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
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Coach</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Duration</th>
            <th className="px-4 py-2 border">Level</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, idx) => (
            <tr key={cls.id}>
              <td className="px-4 py-2 border">{idx + 1}</td>
              <td className="px-4 py-2 border">{cls.title}</td>
              <td className="px-4 py-2 border">{cls.coach}</td>
              <td className="px-4 py-2 border">{cls.time}</td>
              <td className="px-4 py-2 border">{cls.duration}</td>
              <td className="px-4 py-2 border">{cls.level}</td>
              <td className="px-4 py-2 border">{cls.description}</td>
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
