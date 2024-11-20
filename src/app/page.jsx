import Header from "../components/Header";
import Footer from "../components/Footer";
import VolunteerList from "../components/VolunteerList";
import ScheduleList from "../components/ScheduleList";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main content */}
      <div className="flex-grow flex flex-row justify-evenly w-full p-4">
        <VolunteerList />
        <ScheduleList />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
