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
    <div className="container max-w-6xl bg-white p-5 rounded shadow my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-semibold">Coach List</h2>
        <button onClick={handleAddClick} className="btn btn-success px-4 py-2 rounded shadow-sm">
          + Add Coach
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-light p-4 rounded shadow-sm mb-5">
          <div className="row g-3">
            <div className="col-md-6">
              <input required type="text" name="coachId" placeholder="Coach ID" className="form-control" value={formData.coachId} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <input required type="text" name="name" placeholder="Name" className="form-control" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <input required type="text" name="specialty" placeholder="Specialty" className="form-control" value={formData.specialty} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <input required type="email" name="email" placeholder="Email" className="form-control" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <input required type="text" name="phone" placeholder="Phone" className="form-control" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <input required type="text" name="location" placeholder="Location" className="form-control" value={formData.location} onChange={handleInputChange} />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button type="submit" className="btn btn-primary rounded px-4 py-2">
              {editingCoach !== null ? 'Update Coach' : 'Add Coach'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary rounded px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-secondary">
          <tr>
            <th>S.No</th>
            <th>Coach ID</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach, idx) => (
            <tr key={coach.id}>
              <td>{idx + 1}</td>
              <td>{coach.coachId}</td>
              <td>{coach.name}</td>
              <td>{coach.specialty}</td>
              <td>{coach.email}</td>
              <td>{coach.phone}</td>
              <td>{coach.location}</td>
              <td>
                <div className="btn-group" role="group">
                  <button onClick={() => handleEditClick(coach)} className="btn btn-warning btn-sm me-2 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(coach.id)} className="btn btn-danger btn-sm rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
