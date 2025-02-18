import React, { useEffect, useState } from "react";

const HODDetails = () => {
  const [hod, setHod] = useState(null);
  const [programmes, setProgrammes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProgrammeModal, setShowProgrammeModal] = useState(false);
  const [showEditProgrammeModal, setShowEditProgrammeModal] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [programmeToDelete, setProgrammeToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch HOD details
  useEffect(() => {
    const fetchHOD = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://server-o4m9.onrender.com/api/hod");
        if (response.ok) {
          const data = await response.json();
          setHod(data);
        } else {
          console.error("Failed to fetch HOD details");
        }
      } catch (error) {
        console.error("Error fetching HOD details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHOD();
  }, []);

  // Fetch Programmes
  useEffect(() => {
    const fetchProgrammes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://server-o4m9.onrender.com/api/programmes"
        );
        if (response.ok) {
          const data = await response.json();
          setProgrammes(data);
        } else {
          console.error("Failed to fetch programmes");
        }
      } catch (error) {
        console.error("Error fetching programmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  // Handle HOD form submission
  const handleHODSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);
    try {
      const response = await fetch("https://server-o4m9.onrender.com/api/hod", {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        alert("HOD details updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update HOD details.");
      }
    } catch (error) {
      alert("Error updating HOD details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Programme form submission
  const handleProgrammeSubmit = async (e) => {
    e.preventDefault();
    const newProgramme = {
      name: e.target["programme-name"].value,
      description: e.target["programme-description"].value,
    };
    setLoading(true);
    try {
      const response = await fetch(
        "https://server-o4m9.onrender.com/api/programmes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProgramme),
        }
      );
      if (response.ok) {
        alert("Programme added successfully!");
        window.location.reload();
      } else {
        alert("Failed to add programme.");
      }
    } catch (error) {
      alert("Error adding programme: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Programme Edit
  const handleEditProgrammeSubmit = async (e) => {
    e.preventDefault();
    const updatedProgramme = {
      name: e.target["edit-programme-name"].value,
      description: e.target["edit-programme-description"].value,
    };
    setLoading(true);
    try {
      const response = await fetch(
        `https://server-o4m9.onrender.com/api/programmes/${selectedProgramme._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProgramme),
        }
      );
      if (response.ok) {
        alert("Programme updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update programme.");
      }
    } catch (error) {
      alert("Error updating programme: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Programme Delete Confirmation
  const confirmDelete = (programmeId) => {
    setProgrammeToDelete(programmeId);
    setShowDeleteConfirmation(true);
  };

  // Handle Programme Delete
  const handleDeleteProgramme = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://server-o4m9.onrender.com/api/programmes/${programmeToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Programme deleted successfully.");
        setProgrammes(programmes.filter((p) => p._id !== programmeToDelete));
      } else {
        alert("Failed to delete programme.");
      }
    } catch (error) {
      alert("Error deleting programme: " + error.message);
    } finally {
      setLoading(false);
      setShowDeleteConfirmation(false);
      setProgrammeToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-6">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* HOD Details */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">HOD Details</h2>
        {loading && <p className="text-gray-600">Loading...</p>}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-3">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Position</th>
                <th className="p-3">Phone Number</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hod ? (
                <tr className="border-b text-center hover:bg-gray-100">
                  <td className="p-3">
                    <img
                      src={`data:image/jpeg;base64,${hod.image}`}
                      alt="HOD"
                      className="w-20 h-24 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{hod.name}</td>
                  <td className="p-3">{hod.email}</td>
                  <td className="p-3">{hod.position}</td>
                  <td className="p-3">{hod.phone}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Change
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    No HOD details found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Programmes Offered */}
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
          Programmes Offered
        </h2>
        <button
          onClick={() => setShowProgrammeModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          Add New Programme
        </button>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-3">Programme Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((programme) => (
                <tr key={programme._id} className="border-b text-center hover:bg-gray-100">
                  <td className="p-3">{programme.name}</td>
                  <td className="p-3">{programme.description}</td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedProgramme(programme);
                        setShowEditProgrammeModal(true);
                      }}
                      className="bg-[#01013f] text-white w-[80px] px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(programme._id)}
                      className="bg-red-700 text-white w-[80px] px-4 py-2 rounded hover:bg-red-600 mr-2 mt-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Edit HOD Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <span
              onClick={() => setShowEditModal(false)}
              className="float-right text-2xl cursor-pointer"
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4">Edit HOD Details</h2>
            <form onSubmit={handleHODSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={hod?.name}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={hod?.email}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                defaultValue={hod?.position}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                defaultValue={hod?.phone}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full p-2 border rounded mb-3"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Programme Modal */}
      {showProgrammeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <span
              onClick={() => setShowProgrammeModal(false)}
              className="float-right text-2xl cursor-pointer"
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4">Add New Programme</h2>
            <form onSubmit={handleProgrammeSubmit}>
              <input
                type="text"
                name="programme-name"
                placeholder="Programme Name"
                className="w-full p-2 border rounded mb-3"
                required
              />
              <textarea
                name="programme-description"
                placeholder="Description"
                rows="4"
                className="w-full p-2 border rounded mb-3"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Programme
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Programme Modal */}
      {showEditProgrammeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <span
              onClick={() => setShowEditProgrammeModal(false)}
              className="float-right text-2xl cursor-pointer"
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4">Edit Programme</h2>
            <form onSubmit={handleEditProgrammeSubmit}>
              <input
                type="hidden"
                name="edit-programme-id"
                value={selectedProgramme?._id}
              />
              <input
                type="text"
                name="edit-programme-name"
                placeholder="Programme Name"
                defaultValue={selectedProgramme?.name}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <textarea
                name="edit-programme-description"
                placeholder="Description"
                rows="4"
                defaultValue={selectedProgramme?.description}
                className="w-full p-2 border rounded mb-3"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this programme?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProgramme}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HODDetails;