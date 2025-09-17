'use client';

import { useState } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, regNo: "2025000001", name: "John Doe", dob: "2005-03-15", email: "john@example.com", phone: "9876543210", place: "Chennai", classType: "Individual" },
    { id: 2, regNo: "2025000002", name: "Jane Smith", dob: "2006-07-20", email: "jane@example.com", phone: "9123456789", place: "Bangalore", classType: "Group", groupName: "Alpha" },
    { id: 3, regNo: "2025000003", name: "Michael Johnson", dob: "2004-11-02", email: "michael@example.com", phone: "9988776655", place: "Mumbai", classType: "Individual" },
    { id: 4, regNo: "2025000004", name: "Sara Khan", dob: "2006-08-12", email: "sara@example.com", phone: "9786543210", place: "Delhi", classType: "Group", groupName: "Alpha" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    regNo: '', name: '', dob: '', email: '', phone: '', place: '', classType: 'Individual'
  });
  const [groupName, setGroupName] = useState('');
  const [groupStudents, setGroupStudents] = useState([{ regNo: '', name: '', dob: '', email: '', phone: '', place: '', classType: 'Group' }]);

  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('All');

  const handleAddClick = () => {
    setEditingStudent(null);
    setFormData({ regNo: '', name: '', dob: '', email: '', phone: '', place: '', classType: 'Individual' });
    setGroupName('');
    setGroupStudents([{ regNo: '', name: '', dob: '', email: '', phone: '', place: '', classType: 'Group' }]);
    setShowForm(true);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    if (student.classType === 'Group') {
      const groupMembers = students.filter(s => s.classType === 'Group' && s.groupName === student.groupName);
      setGroupName(student.groupName || '');
      setGroupStudents(groupMembers.map(s => ({
        regNo: s.regNo,
        name: s.name,
        dob: s.dob,
        email: s.email,
        phone: s.phone,
        place: s.place,
        classType: 'Group'
      })));
      setFormData({ classType: 'Group' });
    } else {
      setFormData({
        regNo: student.regNo,
        name: student.name,
        dob: student.dob,
        email: student.email,
        phone: student.phone,
        place: student.place,
        classType: 'Individual'
      });
    }
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGroupInputChange = (index, e) => {
    const { name, value } = e.target;
    const newStudents = [...groupStudents];
    newStudents[index][name] = value;
    setGroupStudents(newStudents);
  };

  const handleAddGroupStudent = () => {
    setGroupStudents(prev => [...prev, { regNo: '', name: '', dob: '', email: '', phone: '', place: '', classType: 'Group' }]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.classType === 'Individual') {
      if (editingStudent !== null) {
        setStudents(prev => prev.map(s => s.id === editingStudent ? { ...formData, id: editingStudent } : s));
      } else {
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        setStudents(prev => [{ ...formData, id: newId }, ...prev]);
      }
    } else {
      if (editingStudent !== null) {
        setStudents(prev =>
          prev.filter(s => !(s.classType === 'Group' && s.groupName === groupName))
              .concat(groupStudents.map((s, idx) => ({
                ...s,
                id: prev.length > 0 ? Math.max(...prev.map(st => st.id)) + idx + 1 : idx + 1,
                groupName
              })))
        );
      } else {
        const newIdStart = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        const studentsWithId = groupStudents.map((s, idx) => ({ ...s, id: newIdStart + idx, groupName }));
        setStudents(prev => [...studentsWithId, ...prev]);
      }
    }
    setShowForm(false);
  };

  const handleDeleteClick = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchText.toLowerCase()) ||
      student.place.toLowerCase().includes(searchText.toLowerCase()) ||
      (student.classType === 'Group' && student.groupName?.toLowerCase().includes(searchText.toLowerCase()));

    const matchesFilter =
      filterType === 'All' || student.classType === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container max-w-6xl bg-white p-4 rounded shadow my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-semibold">Student List</h2>
        <button onClick={handleAddClick} className="btn btn-success px-4 py-2 rounded shadow-sm">
          + Add Student
        </button>
      </div>

      {/* Search and Filter */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by name, reg no, place, or group"
          className="form-control w-100 w-md-50"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="form-select w-100 w-md-25"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Individual">Individual</option>
          <option value="Group">Group</option>
        </select>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-light p-4 rounded shadow-sm mb-4">
          <div className="mb-3">
            <select name="classType" value={formData.classType} onChange={handleInputChange} className="form-select">
              <option value="Individual">Individual</option>
              <option value="Group">Group</option>
            </select>
          </div>

          {formData.classType === 'Individual' && (
            <div className="row g-3">
              <div className="col-md-6">
                <input required type="text" name="regNo" placeholder="Registration No" className="form-control" value={formData.regNo} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <input required type="text" name="name" placeholder="Name" className="form-control" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <input required type="date" name="dob" className="form-control" value={formData.dob} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <input required type="email" name="email" placeholder="Email" className="form-control" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <input required type="text" name="phone" placeholder="Phone" className="form-control" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <input required type="text" name="place" placeholder="Place" className="form-control" value={formData.place} onChange={handleInputChange} />
              </div>
            </div>
          )}

          {formData.classType === 'Group' && (
            <>
              <input
                type="text"
                placeholder="Group Name"
                className="form-control mb-3"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />

              {groupStudents.map((student, idx) => (
                <div key={idx} className="row g-3 mb-3 border-bottom pb-3 position-relative align-items-center">
                  <div className="col-md-6">
                    <input required type="text" name="regNo" placeholder="Registration No" className="form-control" value={student.regNo} onChange={(e) => handleGroupInputChange(idx, e)} />
                  </div>
                  <div className="col-md-6">
                    <input required type="text" name="name" placeholder="Name" className="form-control" value={student.name} onChange={(e) => handleGroupInputChange(idx, e)} />
                  </div>
                  <div className="col-md-6">
                    <input required type="date" name="dob" className="form-control" value={student.dob} onChange={(e) => handleGroupInputChange(idx, e)} />
                  </div>
                  <div className="col-md-6">
                    <input required type="email" name="email" placeholder="Email" className="form-control" value={student.email} onChange={(e) => handleGroupInputChange(idx, e)} />
                  </div>
                  <div className="col-md-6">
                    <input required type="text" name="phone" placeholder="Phone" className="form-control" value={student.phone} onChange={(e) => handleGroupInputChange(idx, e)} />
                  </div>
                  <div className="col-md-6">
                    <input required type="text" name="place" placeholder="Place" className="form-control" value={student.place} onChange={(e) => handleGroupInputChange(idx, e)} />
                  </div>

                  {groupStudents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setGroupStudents(groupStudents.filter((_, index) => index !== idx));
                      }}
                      className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-2"
                      style={{ width: '30px', height: '30px', lineHeight: '15px', fontWeight: 'bold' }}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}

              <button type="button" onClick={handleAddGroupStudent} className="btn btn-outline-success mb-3 rounded">
                + Add
              </button>
            </>
          )}

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button type="submit" className="btn btn-primary rounded">
              {editingStudent !== null ? 'Update Student' : 'Add Student'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary rounded">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Student Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-secondary">
          <tr>
            <th>S.No</th>
            <th>Reg No</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Place</th>
            <th>Class Type</th>
            <th>Group Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, idx) => (
            <tr key={student.id}>
              <td>{idx + 1}</td>
              <td>{student.regNo}</td>
              <td>{student.name}</td>
              <td>{student.dob}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.place}</td>
              <td>{student.classType}</td>
              <td>{student.classType === 'Group' ? student.groupName : '-'}</td>
              <td>
                <div className="btn-group" role="group">
                  <button onClick={() => handleEditClick(student)} className="btn btn-warning btn-sm me-2 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(student.id)} className="btn btn-danger btn-sm rounded">
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
