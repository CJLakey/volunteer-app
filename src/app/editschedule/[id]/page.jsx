"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Use useParams for dynamic routes
import NavBar from "components/components/NavBar";  // Assuming there's a NavBar component
import Footer from "components/components/Footer";  // Assuming there's a Footer component

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function EditSchedule() {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic 'id' from the URL

  const [formData, setFormData] = useState({
    volunteer_id: "",
    volunteer_date: "",
    volunteer_type: "",
    reminder_sent: false,
  });

  const [volunteers, setVolunteers] = useState([]); // To store volunteer data for the selection dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all volunteers for the dropdown
    const fetchVolunteers = async () => {
      try {
        const response = await fetch(`${basePath}/api/volunteers`);
        if (!response.ok) {
          throw new Error("Failed to fetch volunteers");
        }
        const data = await response.json();
        setVolunteers(data.volunteers);
      } catch (err) {
        setError("Error fetching volunteers");
      }
    };

    // Fetch the specific schedule by ID
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${basePath}/api/schedule/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch schedule data");
        }
        const data = await response.json();
        const formattedDate = new Date(data.volunteer_date).toISOString().split("T")[0]; // Format date for input
        setFormData({
          ...data,
          volunteer_date: formattedDate,
        });
        setLoading(false);
      } catch (error) {
        setError("Error fetching schedule data");
        setLoading(false);
      }
    };

    fetchVolunteers();
    fetchSchedule();
  }, [id]);

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
      const response = await fetch(`${basePath}/api/schedule/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send updated form data
      });

      if (!response.ok) {
        throw new Error("Failed to update schedule");
      }

      router.push("/"); // Redirect after successful update
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (!id) {
    return <p>Schedule ID is missing in the query parameters.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Volunteer Schedule</h1>
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

          {/* Reminder Sent Checkbox */}
          <div className="mb-4">
            <label className="block text-gray-700">Reminder Sent</label>
            <input
              type="checkbox"
              name="reminder_sent"
              checked={formData.reminder_sent}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Reminder Sent</span>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Schedule"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
