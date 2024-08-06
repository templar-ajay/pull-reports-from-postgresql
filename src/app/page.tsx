import { DownloadXLSX } from "@/components/downloadXLSX";
import { DownloadCSV } from "@/components/downloadCSV";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full text-center">
      <div className="flex flex-col gap-3">
        <h1>
          Export data of table:{" "}
          <span className="">{process.env.POSTGRESQL_TABLE_NAME}</span>
        </h1>
        <div className="mx-auto flex gap-2">
          <DownloadXLSX />
          <DownloadCSV />
        </div>
      </div>
    </main>
  );
}
