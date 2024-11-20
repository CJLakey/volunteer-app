"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Correct import for App Router
import NavBar from "components/components/NavBar";
import Footer from "components/components/Footer";

export default function AddSchedule() {
  const [formData, setFormData] = useState({
    volunteer_id: "",
    volunteer_date: "",
    volunteer_type: "counter"  // Default type selected
  });

  const [volunteers, setVolunteers] = useState([]);  // State to store the fetched volunteers
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch volunteers on component mount
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("./api/volunteers");
        if (!response.ok) {
          throw new Error("Failed to fetch volunteers");
        }
        const data = await response.json();
        setVolunteers(data.volunteers);  // Save the volunteers to state
      } catch (error) {
        setError(error.message);
      }
    };
    fetchVolunteers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Adding reminder_sent as 0 when submitting
      const scheduleData = { ...formData, reminder_sent: 0 };

      const response = await fetch("./api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),  // Send the form data including reminder_sent
      });

      if (!response.ok) {
        throw new Error("Error adding volunteer schedule");
      }

      // Redirect or provide feedback after successful submission
      router.push("/");  // Redirect to home after successful submission
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Add Volunteer Schedule</h1>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Volunteer Select Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Select Volunteer</label>
            <select
              name="volunteer_id"
              value={formData.volunteer_id}
              onChange={handleChange}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            >
              <option value="" disabled>Select a volunteer</option>
              {volunteers.map((volunteer) => (
                <option key={volunteer.id} value={volunteer.id}>
                  {volunteer.first_name} {volunteer.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Select Date</label>
            <input
              type="date"
              name="volunteer_date"
              value={formData.volunteer_date}
              onChange={handleChange}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>

          {/* Volunteer Type Select */}
          <div className="mb-4">
            <label className="block text-gray-700">Volunteer Type</label>
            <select
              name="volunteer_type"
              value={formData.volunteer_type}
              onChange={handleChange}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            >
              <option value="counter">Counter</option>
              <option value="cleaner">Cleaner</option>
              <option value="meals">Meal Assistant</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Volunteer Schedule"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
