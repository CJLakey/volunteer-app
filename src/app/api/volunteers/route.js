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

// Handle GET request to fetch volunteers
export async function GET(request) {
  try {
    const connection = await connectToDatabase();
    const [volunteers] = await connection.execute("SELECT * FROM volunteers");
    await connection.end();

    return NextResponse.json({ volunteers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json(
      { error: "Error fetching volunteers" },
      { status: 500 }
    );
  }
}

// Handle POST request to add a new volunteer
export async function POST(request) {
  try {
    const { first_name, last_name, contact_phone, contact_email, email_consent, sms_consent } = await request.json();

    const connection = await connectToDatabase();
    await connection.execute(
      "INSERT INTO volunteers (first_name, last_name, contact_phone, contact_email, email_consent, sms_consent) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, contact_phone, contact_email, email_consent, sms_consent]
    );
    await connection.end();

    return NextResponse.json({ message: "Volunteer added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding volunteer:", error);
    return NextResponse.json(
      { error: "Error adding volunteer" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
    try {
      const { id } = await request.json();
      const connection = await connectToDatabase();
      await connection.execute("DELETE FROM volunteers WHERE id = ?", [id]);
      connection.end();
      return NextResponse.json({ message: "Volunteer deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error deleting volunteer" }, { status: 500 });
    }
  }