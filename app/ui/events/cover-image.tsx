import { useDrag } from "@/app/lib/actions";
import React from "react";
import { IoImageOutline } from "react-icons/io5";

interface CoverImageUploadProps {
  selectedImage: string | null;
  backgroundPosition: { x: number; y: number };
  onImageChange: (image: string) => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

export default function EventCoverImage({
  selectedImage,
  backgroundPosition,
  onImageChange,
  onPositionChange,
}: CoverImageUploadProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageChange(imageUrl);
    }
  };

  const handleDrag = useDrag((x, y) => {
    onPositionChange({ x, y });
  });

  return (
    <div className="w-full flex lex-col md:flex-row py-6 border-b border-partybank-border p-4 xl:p-6">
      <div className="w-full flex flex-col items-center md:flex-row md:w-11/12 gap-y-4 md:gap-y-0 m-auto py-4">
        <div className="w-full md:w-1/2">
          <div className="flex gap-x-4 w-full items-center">
            <h3 className="font-[700] text-[20px]">Add Media</h3>
            <span className="bg-partybank-red h-6 flex items-center px-3 rounded border border-[#4E0916] text-white text-sm font-bold">
              Image
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-y-1">
            <p className="text-base">
              Upload a high-quality image/video to represent your event
              creationt
            </p>
          </div>
        </div>
        <div
          className="w-full md:w-1/2 border border-partybank-border flex justify-center items-center rounded-md min-h-28 cursor-pointer overflow-hidden relative"
          style={{
            backgroundImage: `url("${selectedImage}")`,
            backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
          }}
          onMouseDown={handleDrag}
        >
          <div>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <IoImageOutline size={26} />
          </div>
        </div>
      </div>
    </div>
  );
}