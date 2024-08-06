import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { Parser } from "json2csv";

const schema = process.env.POSTGRESQL_SCHEMA;
const tableName = process.env.POSTGRESQL_TABLE_NAME;

export async function GET() {
  try {
    const client = await pool.connect();

    const result = await client.query(`SELECT * FROM ${schema}.${tableName}`);
    const data = result.rows;

    client.release();

    // Convert JSON data to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    // Set CSV file response
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=${tableName}_data.csv`,
      },
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    return new NextResponse("Error exporting CSV", { status: 500 });
  }
}
