import React, { useState } from 'react';
import axios from 'axios';

function CreatePickupForm() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://miniature-zebra-x5w7xvqw9wqj2v44j-8080.app.github.dev/requests/', {
      description,
      location,
    });
    alert('Pickup Request Created!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Request Pickup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="border p-2 w-full"
          placeholder="Describe the garbage spot..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          className="border p-2 w-full"
          placeholder="Your Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default CreatePickupForm;
