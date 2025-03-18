import { Button } from "@/components/ui/button";
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
import { FileText } from "lucide-react";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="gap-2">
          <FileText className="h-4 w-4" />
          Custom Service
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 text-white border border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-white">Edit profile</SheetTitle>
          <SheetDescription className="text-gray-300">
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"secondary"} type="submit">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
