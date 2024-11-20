import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

async function connectToDatabase() {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      return connection;
    } catch (error) {
      throw error;
    }
  }

  // Handle GET request to fetch schedules
export async function GET(request) {
    try {
      const connection = await connectToDatabase();
      const [schedules] = await connection.execute("SELECT s.id, s.volunteer_id, s.volunteer_date, s.volunteer_type, s.reminder_sent, v.first_name, v.last_name, v.contact_phone, v.contact_email FROM volunteer_schedule s LEFT JOIN volunteers v ON s.volunteer_id = v.id");
      await connection.end();
  
      return NextResponse.json({ schedules }, { status: 200 });
    } catch (error) {
      console.error("Error fetching schedules:", error);
      return NextResponse.json(
        { error: "Error fetching schedules" },
        { status: 500 }
      );
    }
  }

// Handle POST request to add a new schedule
export async function POST(request) {
  try {
    const { volunteer_id, volunteer_date, volunteer_type } = await request.json();

    // Set reminder_sent to 0 by default
    const reminder_sent = 0;

    const connection = await connectToDatabase();
    await connection.execute(
      "INSERT INTO volunteer_schedule (volunteer_id, volunteer_date, volunteer_type, reminder_sent) VALUES (?, ?, ?, ?)",
      [volunteer_id, volunteer_date, volunteer_type, reminder_sent]
    );
    await connection.end();

    return NextResponse.json({ message: "Volunteer Schedule added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding volunteer schedule:", error);
    return NextResponse.json(
      { error: "Error adding volunteer schedule" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const connection = await connectToDatabase();
    await connection.execute("DELETE FROM volunteer_schedule WHERE id = ?", [id]);
    connection.end();
    return NextResponse.json({ message: "Volunteer schedule deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting volunteer schedule" }, { status: 500 });
  }
}