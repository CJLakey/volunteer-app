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

// Handle GET request to fetch a single volunteer by ID
export async function GET(request, { params }) {
  const { id } = params; // Retrieve the id from the dynamic route
  
  try {
    const connection = await connectToDatabase();
    const [volunteer] = await connection.execute("SELECT * FROM volunteers WHERE id = ?", [id]);
    await connection.end();

    if (volunteer.length === 0) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    return NextResponse.json(volunteer[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    return NextResponse.json(
      { error: "Error fetching volunteer" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { first_name, last_name, contact_phone, contact_email, email_consent, sms_consent } = await request.json();

  try {
    const connection = await connectToDatabase();
    await connection.execute(
      'UPDATE volunteers SET first_name=?, last_name=?, contact_phone=?, contact_email=?, email_consent=?, sms_consent=? WHERE id=?',
      [first_name, last_name, contact_phone, contact_email, email_consent, sms_consent, id]
    );
    await connection.end();

    return NextResponse.json({ message: 'Volunteer updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating volunteer:', error);
    return NextResponse.json({ error: 'Error updating volunteer' }, { status: 500 });
  }
}
