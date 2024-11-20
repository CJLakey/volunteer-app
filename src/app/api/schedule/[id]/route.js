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

// Handle GET request to fetch a single volunteer schedule by ID
export async function GET(request, { params }) {
    const { id } = params; // Retrieve the id from the dynamic route

    try {
        const connection = await connectToDatabase();
        const [volunteer_schedule] = await connection.execute(
          "SELECT * FROM volunteer_schedule WHERE id = ?", 
          [id]
        );
        await connection.end();

        if (volunteer_schedule.length === 0) {
            return NextResponse.json({ error: "Volunteer schedule not found" }, { status: 404 });
        }

        return NextResponse.json(volunteer_schedule[0], { status: 200 });
    } catch (error) {
        console.error("Error fetching volunteer_schedule:", error);
        return NextResponse.json(
            { error: "Error fetching volunteer schedule" },
            { status: 500 }
        );
    }
}

// Handle PUT request to update a volunteer schedule by ID
export async function PUT(request, { params }) {
    const { id } = params;
    const { volunteer_id, volunteer_date, volunteer_type, reminder_sent } = await request.json();

    try {
        const connection = await connectToDatabase();
        await connection.execute(
            'UPDATE volunteer_schedule SET volunteer_id=?, volunteer_date=?, volunteer_type=?, reminder_sent=? WHERE id=?',
            [volunteer_id, volunteer_date, volunteer_type, reminder_sent, id]
        );
        await connection.end();

        return NextResponse.json({ message: 'Volunteer schedule updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating volunteer schedule:', error);
        return NextResponse.json({ error: 'Error updating volunteer schedule' }, { status: 500 });
    }
}
