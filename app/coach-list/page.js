'use client';

import { useState } from 'react';

export default function CoachList() {
  const [coaches, setCoaches] = useState([
    {
      id: 1,
      coachId: "COACH001",
      name: "David Miller",
      specialty: "Fitness",
      email: "david@example.com",
      phone: "9786453210",
      location: "Chennai",
    },
    {
      id: 2,
      coachId: "COACH002",
      name: "Priya Sharma",
      specialty: "Nutrition",
      email: "priya@example.com",
      phone: "9123432198",
      location: "Bangalore",
    },
    {
      id: 3,
      coachId: "COACH003",
      name: "Ravi Kumar",
      specialty: "Swimming",
      email: "ravi@example.com",
      phone: "9887766554",
      location: "Mumbai",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCoach, setEditingCoach] = useState(null);
  const [formData, setFormData] = useState({
    coachId: '',
    name: '',
    specialty: '',
    email: '',
    phone: '',
    location: '',
  });

  const handleAddClick = () => {
    setEditingCoach(null);
    setFormData({ coachId: '', name: '', specialty: '', email: '', phone: '', location: '' });
    setShowForm(true);
  };

  const handleEditClick = (coach) => {
    setEditingCoach(coach.id);
    setFormData({ ...coach });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingCoach !== null) {
      setCoaches(prev => prev.map(c => c.id === editingCoach ? { ...formData, id: editingCoach } : c));
    } else {
      const newId = coaches.length > 0 ? Math.max(...coaches.map(c => c.id)) + 1 : 1;
      setCoaches(prev => [...prev, { ...formData, id: newId }]);
    }
    setShowForm(false);
  };

  const handleDeleteClick = (id) => {
    setCoaches(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Coach List</h2>
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Coach
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input required type="text" name="coachId" placeholder="Coach ID" className="border p-2 rounded" value={formData.coachId} onChange={handleInputChange} />
            <input required type="text" name="name" placeholder="Name" className="border p-2 rounded" value={formData.name} onChange={handleInputChange} />
            <input required type="text" name="specialty" placeholder="Specialty" className="border p-2 rounded" value={formData.specialty} onChange={handleInputChange} />
            <input required type="email" name="email" placeholder="Email" className="border p-2 rounded" value={formData.email} onChange={handleInputChange} />
            <input required type="text" name="phone" placeholder="Phone" className="border p-2 rounded" value={formData.phone} onChange={handleInputChange} />
            <input required type="text" name="location" placeholder="Location" className="border p-2 rounded" value={formData.location} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              {editingCoach !== null ? 'Update Coach' : 'Add Coach'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      <table className="w-full border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">S.No</th>
            <th className="px-4 py-2 border">Coach ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Specialty</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach, idx) => (
            <tr key={coach.id}>
              <td className="px-4 py-2 border">{idx + 1}</td>
              <td className="px-4 py-2 border">{coach.coachId}</td>
              <td className="px-4 py-2 border">{coach.name}</td>
              <td className="px-4 py-2 border">{coach.specialty}</td>
              <td className="px-4 py-2 border">{coach.email}</td>
              <td className="px-4 py-2 border">{coach.phone}</td>
              <td className="px-4 py-2 border">{coach.location}</td>
              <td className="px-4 py-2 border space-x-2">
                <button onClick={() => handleEditClick(coach)} className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(coach.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
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
