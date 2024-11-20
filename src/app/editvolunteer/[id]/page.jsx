"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Use useParams for dynamic routes
import NavBar from "components/components/NavBar";
import Footer from "components/components/Footer";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function EditVolunteer() {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic 'id' from the URL

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    contact_phone: "",
    contact_email: "",
    email_consent: false,
    sms_consent: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchVolunteer = async () => {
        try {
          const response = await fetch(`${basePath}/api/volunteers/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch volunteer data");
          }
          const data = await response.json();
          setFormData(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchVolunteer();
    }
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
      const response = await fetch(`${basePath}/api/volunteers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update volunteer");
      }

      router.push("/"); // Redirect after successful update
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (!id) {
    return <p>Volunteer ID is missing in the query parameters.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Volunteer</h1>
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
            <span>Message Reminder Sent</span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Volunteer"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
