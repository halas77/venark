import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight } from "lucide-react";

export function CustomModal({ campaign }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          View Detail <ArrowUpRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-gray-900/70 backdrop-blur-md text-white border border-gray-800 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Launch your campaign
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-300">
            Complete the details below to start your campaign
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-medium">
              Scope
            </Label>
            <Textarea
              id="name"
              placeholder="Describe the scope of the work in detail"
              className="col-span-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Title</Label>
            <p className="col-span-3 text-gray-200 text-sm font-normal">
              {campaign.name}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Milestone</Label>
            <div className="col-span-3 space-y-2">
              <p className="text-gray-200 text-sm font-normal">
                - {campaign.desc}
              </p>
              <p className="text-gray-200 text-sm font-normal">
                - {campaign.desc}
              </p>
              <p className="text-gray-200 text-sm font-normal">
                - {campaign.desc}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Budget</Label>
            <p className="col-span-3 text-gray-200 text-sm font-normal">
              {campaign.budget}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Platform</Label>
            <p className="col-span-3 text-gray-200 text-sm font-normal">
              {campaign.platform}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={"outline"}
            type="submit"
            className="w-full  transition-all text-gray-900"
          >
            Start Campaign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
