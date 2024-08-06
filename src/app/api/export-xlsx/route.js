// api/export-xlsx.js
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { write, utils } from "xlsx";

const schema = process.env.POSTGRESQL_SCHEMA;
const tableName = process.env.POSTGRESQL_TABLE_NAME;

export async function GET() {
  try {
    const client = await pool.connect();

    const result = await client.query(`SELECT * FROM ${schema}.${tableName}`);
    const data = result.rows;

    client.release();

    // Convert JSON data to XLSX
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, tableName);

    // Write workbook to buffer
    const buffer = write(workbook, { type: "buffer", bookType: "xlsx" });

    // Set XLSX file response
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=${tableName}_data.xlsx`,
      },
    });
  } catch (error) {
    console.error("Error exporting XLSX:", error);
    return new NextResponse("Error exporting XLSX", { status: 500 });
  }
}
