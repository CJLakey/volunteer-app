"use client";
import { useRouter } from "next/navigation";  // Correctly importing the hook

export default function Volunteer({ volunteer, fetchVolunteers }) {
	const router = useRouter();  // Call the useRouter hook to initialize router

	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			`Are you sure you want to delete ${volunteer.first_name} ${volunteer.last_name}?`
		);

		if (!confirmDelete) {
			return;
		}

		try {
			const response = await fetch("./asor-scheduling/api/volunteers", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: volunteer.id }),  // Pass only the id
			});

			if (!response.ok) {
				throw new Error("Error deleting volunteer");
			}

			await fetchVolunteers();
			alert("Volunteer deleted successfully");
		} catch (error) {
			console.error("Error deleting volunteer:", error);
			alert("Failed to delete volunteer");
		}
	};

	// Navigate to edit page
	const handleEdit = () => {
		router.push(`./asor-scheduling/editvolunteer/${volunteer.id}`);  // Correct URL with dynamic id
	};


	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2">
			<div className="bg-gray-800 text-white p-4">
				<h2 className="text-xl font-bold text-center">
					{volunteer.first_name} {volunteer.last_name}
				</h2>
			</div>
			<div className="p-4 flex flex-col flex-wrap text-gray-900">
				<div>Phone #: {volunteer.contact_phone}</div>
				<div>Email: {volunteer.contact_email}</div>
				<div>Email Consent: {volunteer.email_consent ? 'True' : 'False'}</div>
				<div>Text Consent: {volunteer.sms_consent ? 'True' : 'False'}</div>
			</div>
			<div className="px-4 py-2 bg-gray-100 flex flex-row justify-evenly">
				<button
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					onClick={handleDelete}
				>
					Remove
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={handleEdit}  // Use handleEdit on the button click
				>
					Edit
				</button>
			</div>
		</div>
	);
}
