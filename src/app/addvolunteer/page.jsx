"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Correct import for App Router
import NavBar from "components/components/NavBar";
import Footer from "components/components/Footer";

export default function AddVolunteer() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    contact_phone: "",
    contact_email: "",
    email_consent: false,
    sms_consent: false,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      const response = await fetch("./api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error adding volunteer");
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
        <h1 className="text-2xl font-bold mb-4">Add Volunteer</h1>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone #"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="email_consent"
              checked={formData.email_consent}
              onChange={handleChange}
              className="mr-2"
            />
            <span>I consent to receive emails</span>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="sms_consent"
              checked={formData.sms_consent}
              onChange={handleChange}
              className="mr-2"
            />
            <span>I consent to receive text messages. You may opt out at any time by texting stop to 1 303 218 5441. You will receive no more than 2 text messages a month.</span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Volunteer"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
