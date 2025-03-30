import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

export function CustomModal({ campaign }: { campaign: any }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    console.log("Campaign data:", campaign);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="group">
          <span>Use template</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl font-semibold text-white">
              Create Agreement
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Based on "{campaign?.name}" template
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div className="space-y-3">
            <div>
              <Label
                htmlFor="companyName"
                className="text-sm font-medium text-gray-300"
              >
                Company Name
              </Label>
              <Input
                id="companyName"
                {...register("companyName", { required: true })}
                placeholder="Acme Inc."
                className="mt-1 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:ring-1 focus:ring-blue-500/30 text-white transition-colors"
              />
            </div>

            <div>
              <Label
                htmlFor="companyDesc"
                className="text-sm font-medium text-gray-300"
              >
                Description
              </Label>
              <Textarea
                id="companyDesc"
                {...register("companyDesc")}
                placeholder="Brief description of your company"
                className="mt-1 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:ring-1 focus:ring-blue-500/30 text-white transition-colors min-h-[100px]"
              />
            </div>

            <div>
              <Label
                htmlFor="companyURL"
                className="text-sm font-medium text-gray-300"
              >
                Website URL
              </Label>
              <div className="flex mt-1">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-700/50 text-gray-400 text-sm">
                  https://
                </span>
                <Input
                  id="companyURL"
                  {...register("companyURL")}
                  placeholder="yourcompany.com"
                  className="rounded-l-none border-l-0 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:ring-1 focus:ring-blue-500/30 text-white transition-colors"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
            variant={"outline"}
              type="submit"
              className="w-full py-5"
            >
              Generate Agreement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
