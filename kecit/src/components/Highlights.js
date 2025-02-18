import React, { useState, useEffect } from 'react';

const HighlightsManagement = () => {
  const [highlights, setHighlights] = useState([]);
  const [newHighlight, setNewHighlight] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [highlightToDelete, setHighlightToDelete] = useState(null);

  // Fetch highlights from the API
  const fetchHighlights = async () => {
    try {
      const response = await fetch('https://server-o4m9.onrender.com/api/highlights');
      const data = await response.json();
      if (data.highlights) {
        setHighlights(data.highlights);
      }
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  };

  // Handle form submission to create a new highlight
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://server-o4m9.onrender.com/api/highlights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ highlights: newHighlight }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Highlights saved successfully!');
        setNewHighlight('');
        fetchHighlights(); // Refresh highlights
      } else {
        alert('Failed to save highlights.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error saving the highlights.');
    }
  };

  // Edit a highlight
  const editHighlight = async (id, currentText) => {
    const newText = prompt('Edit your highlight:', currentText);
    if (newText) {
      try {
        const response = await fetch(`https://server-o4m9.onrender.com/api/highlights/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newText }),
        });
        const data = await response.json();
        if (data.success) {
          alert('Highlight updated!');
          fetchHighlights(); // Refresh the list
        } else {
          alert('Failed to update highlight.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error updating the highlight.');
      }
    }
  };

  // Show confirmation dialog for deletion
  const confirmDelete = (id) => {
    setHighlightToDelete(id);
    setShowConfirmation(true);
  };

  // Handle deletion after confirmation
  const handleDelete = async () => {
    if (highlightToDelete) {
      try {
        const response = await fetch(`https://server-o4m9.onrender.com/api/highlights/${highlightToDelete}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          alert('Highlight deleted!');
          fetchHighlights(); // Refresh the list
        } else {
          alert('Failed to delete highlight.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error deleting the highlight.');
      }
    }
    setShowConfirmation(false);
    setHighlightToDelete(null);
  };

  // Fetch highlights on component mount
  useEffect(() => {
    fetchHighlights();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* Form Container */}
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">New Highlight</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows="4"
              placeholder="Enter your highlights..."
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Highlights Container */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto mt-8">
          <h2 className="text-xl font-semibold mb-4">Existing Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {highlights.length > 0 ? (
              highlights.map((highlight) => (
                <div key={highlight._id} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                  <p className="text-gray-700">{highlight.highlights}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => editHighlight(highlight._id, highlight.highlights)}
                      className="bg-[#01013f] text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(highlight._id)}
                      className="bg-red-700 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No highlights available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4">Are you sure you want to delete this highlight?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
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

export default HighlightsManagement;