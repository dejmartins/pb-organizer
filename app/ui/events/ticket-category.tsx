import { useDrag } from "@/app/lib/actions";
import { ticketCategoryData } from "@/app/lib/placeholder-data";
import SelectedCard from "@/shared/components/selected-card/selected-card";
import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";

export default function TicketCategory() {
  const [selectedCategory, setselectedCategory] = useState(
    ticketCategoryData[0]
  );
  return (
    <div className="w-full flex lex-col md:flex-row py-6 border-b border-partybank-border p-4 xl:p-6">
      <div className="w-full flex flex-col items-center md:flex-row md:w-11/12 gap-y-4 md:gap-y-0 m-auto py-4">
        <div className="w-full">
          <div className="flex gap-x-4 w-full items-center">
            <h3 className="font-[700] text-[20px]">Ticket Category</h3>
          </div>
          <p className="text-base">
            Select one of the options to pick ticket category
          </p>
          <div className="w-full flex flex-col md:flex-row mt-6 gap-4">
            {ticketCategoryData.map((obj, index: number) => (
              <SelectedCard
                data={obj}
                value={selectedCategory}
                setvalue={setselectedCategory}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}