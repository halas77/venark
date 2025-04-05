import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File, Loader2 } from "lucide-react";
import axios from "axios";

const ViewSummaryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await axios.get("http://localhost:5000/api/analyze-content");

      console.log("data", data.data.message);

      setSummary(data.data.message);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !summary) {
      fetchData();
    }
  }, [isOpen, summary]);

  return (
    <Dialog onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100"
        >
          <File className="w-4 h-4" />
          View Summary
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-gray-900 rounded-lg border border-gray-700">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold text-gray-100">
              Campaign Summary
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="relative">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
          ) : summary ? (
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap font-mono text-gray-200 text-sm leading-6">
                {summary}
              </pre>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No summary available
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSummaryModal;
