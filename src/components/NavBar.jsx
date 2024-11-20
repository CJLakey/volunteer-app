import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">ASOR Scheduling</h1>
                <div className="flex space-x-4">
                    <Link href="/" className="text-white hover:bg-green-800 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                        Manage Schedules
                    </Link>
                    <Link href="/addschedule" className="text-white hover:bg-green-800 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                        Add Schedule
                    </Link>
                    <Link href="/addvolunteer" className="text-white hover:bg-green-800 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                        Add Volunteer
                    </Link>
                    <Link href="/calendar" className="text-white hover:bg-green-800 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                        View Calendar
                    </Link>
                </div>
            </div>
        </nav>
    );
}
