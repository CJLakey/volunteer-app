"use client";
import AddButton from "./AddButton"
import Schedule from "./Schedule"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ScheduleList() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSchedules = async () => {
        try {
            const response = await fetch("./asor-scheduling/api/schedule");
            if (!response.ok) {
                throw new Error('failed to fetch schedules')
            }
            const data = await response.json();
            setSchedules(data.schedules);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    if (loading) {
        return <p>Loading schedules...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="flex flex-col m-3 flex-1">
            <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Schedules</h1>
                </div>
                <div className="flex flex-row flex-wrap m-3 justify-center">
                    {schedules.map((schedule) => (
                        <Schedule
                            key={schedule.id}
                            schedule={schedule}
                            fetchSchedules={fetchSchedules} // Passing fetchSchedules to refresh list after deletion
                        />
                    ))}
                </div>
        </div>
    );
} 