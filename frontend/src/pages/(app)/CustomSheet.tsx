import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomSheet() {
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="gap-2">
          New Service
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 text-white border-l border-gray-800 w-full max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            Custom Service Agreement
          </SheetTitle>
          <SheetDescription className="text-gray-300">
            Configure your custom service agreement parameters
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 px-4">
          {/* Agreement Basics */}
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="agreementTitle">Agreement Title</Label>
                <Input
                  id="agreementTitle"
                  {...register("agreementTitle", { required: true })}
                  className="border border-white/20"
                  placeholder="e.g., Social Media Management Contract"
                />
              </div>

              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select
                  onValueChange={(value) => setValue("serviceType", value)}
                  required
                >
                  <SelectTrigger className="border border-white/20 w-full">
                    <SelectValue placeholder="Select service category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="marketing">Digital Marketing</SelectItem>
                    <SelectItem value="content">Content Creation</SelectItem>
                    <SelectItem value="seo">SEO Services</SelectItem>
                    <SelectItem value="social">
                      Social Media Management
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register("startDate", { required: true })}
                  className="border border-white/20"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  {...register("endDate", { required: true })}
                  className="border border-white/20"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          {/* Financial Terms */}
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Total Budget (USD)</Label>
                <Input
                  id="budget"
                  type="number"
                  {...register("budget", { required: true, min: 0 })}
                  className="border border-white/20"
                  placeholder="Enter total budget"
                />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scope">Scope of Work</Label>
              <Textarea
                id="scope"
                {...register("scope", { required: true })}
                className="border border-white/20"
                placeholder="Describe the scope of work in detail..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliverables">Key Deliverables</Label>
              <Textarea
                id="deliverables"
                {...register("deliverables", { required: true })}
                className="border border-white/20"
                placeholder="List expected deliverables..."
                rows={3}
              />
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" variant={"secondary"}>
                Generate Agreement
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
