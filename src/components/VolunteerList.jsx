"use client";
import Link from "next/link";
import AddButton from "./AddButton";
import Volunteer from "./Volunteer";
import { useEffect, useState } from "react";

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch volunteers from the API
  const fetchVolunteers = async () => {
    try {
      const response = await fetch("./asor-scheduling/api/volunteers");
      if (!response.ok) {
        throw new Error("Failed to fetch volunteers");
      }
      const data = await response.json();
      setVolunteers(data.volunteers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  if (loading) {
    return <p>Loading volunteers...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col m-3 flex-1">
      <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Volunteers
          </h1>
        </div>
        <div className="flex flex-row flex-wrap m-3 justify-center">
          {volunteers.map((volunteer) => (
            <Volunteer
              key={volunteer.id}
              volunteer={volunteer}
              fetchVolunteers={fetchVolunteers}  // Passing fetchVolunteers to refresh list after deletion
            />
          ))}
        </div>
    </div>
  );
}
