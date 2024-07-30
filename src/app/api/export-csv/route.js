import { NextResponse } from "next/server";
import { Pool } from "pg";
import { Parser } from "json2csv";

// Database connection parameters
const pool = new Pool({
  user: "your_db_user",
  host: "your_db_host",
  database: "your_db_name",
  password: "your_db_password",
  port: 5432, // Default PostgreSQL port
});

export async function GET() {
  try {
    const client = await pool.connect();

    const result = await client.query("SELECT * FROM your_table_name");
    const data = result.rows;

    client.release();

    // Convert JSON data to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    // Set CSV file response
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=table_data.csv",
      },
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    return new NextResponse("Error exporting CSV", { status: 500 });
  }
}
