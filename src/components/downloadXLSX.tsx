"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function DownloadXLSX({
  children = "Download report as XLSX",
}: {
  children?: any;
}) {
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true);
    try {
      const response = await fetch("/api/export-xlsx");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.xlsx"; // You can set the file name here
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error("Failed to download file:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button variant={"default"} disabled={loading} onClick={handleClick}>
      <Loader2
        className={cn("mr-2 h-4 w-4 animate-spin", !loading && "hidden")}
      />
      {children}
    </Button>
  );
}
