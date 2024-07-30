import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full text-center">
      <div className="flex flex-col gap-3">
        <h1>Export Table Data as CSV</h1>
        <div className="mx-auto">
          <Link href="/api/export-csv">
            <div className="bg-slate-500 w-fit py-2 px-4 rounded-md">
              Download CSV
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
