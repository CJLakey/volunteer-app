"use client";
import { useRouter } from "next/navigation";  // Correctly importing the hook

export default function Schedule({ schedule, fetchSchedules }) {
    const router = useRouter();  // Call the useRouter hook to initialize router

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete this schedule?`
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch("./asor-scheduling/api/schedule", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: schedule.id }),  // Pass only the id
            });

            if (!response.ok) {
                throw new Error("Error deleting volunteer");
            }

            await fetchSchedules();
            alert("Volunteer schedule deleted successfully");
        } catch (error) {
            console.error("Error deleting volunteer schedule:", error);
            alert("Failed to delete volunteer schedule");
        }
    };

    // Navigate to edit page
    const handleEdit = () => {
        router.push(`./asor-scheduling/editschedule/${schedule.id}`);  // Correct URL with dynamic id
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2">
            <div className="bg-gray-800 text-white p-4"><h2 className="text-xl font-bold text-center">
            {new Date(schedule.volunteer_date).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            })}
            </h2></div>
            <div className="p-4 flex flex-col flex-wrap text-gray-900">
                <div>{schedule.first_name + ' ' + schedule.last_name}</div>
                <div>{schedule.contact_phone}</div>
                <div>{schedule.contact_email}</div>
                <div>{schedule.volunteer_type}</div>
                <div>Reminder Sent: {schedule.reminder_sent ? 'True' : 'False'}</div>

            </div>
            <div className="px-4 py-2 bg-gray-100 flex flex-row justify-evenly">
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
                <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            </div>
        </div>
    );
}