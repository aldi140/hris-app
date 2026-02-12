import { useState } from "react";
import { Eye, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const ImagePreview = ({ src, alt, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`relative group cursor-pointer overflow-hidden rounded-md ${className}`}
        onClick={() => setOpen(true)}
      >
        {/* IMAGE */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover
            transition-transform duration-300
            group-hover:scale-105"
        />

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-black/50
            opacity-0
            group-hover:opacity-100
            transition-opacity
            flex items-center justify-center
          "
        >
          <Eye className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-[80vw] lg:max-w-4xl p-0 overflow-hidden bg-white/50 backdrop-blur ">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-6 w-6 bg-black rounded-md text-white drop-shadow-lg" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-h-[90vh] object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImagePreview;