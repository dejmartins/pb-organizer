import { useDrag } from "@/app/lib/actions";
import { ticketCategoryData } from "@/app/lib/placeholder-data";
import PBDatePicker from "@/shared/components/date-picker/date-picker";
import SelectedCard from "@/shared/components/selected-card/selected-card";
import PBTimePicker from "@/shared/components/time-picker/time-picker";
import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";

type PropT = {
  ticketDateObj: {
    startDate: any;
    endDate: any;
    startTime: any;
    endTime: any;
  };
  setticketDateObj: Function;
};
export default function TicketSales({
  ticketDateObj,
  setticketDateObj,
}: PropT) {
  const { startDate, endDate, startTime, endTime } = ticketDateObj;

  return (
    <div className="w-full flex lex-col md:flex-row py-6 border-b border-partybank-border p-4 xl:p-6">
      <div className="w-full flex flex-col items-center md:flex-row md:w-11/12 gap-y-4 md:gap-y-0 m-auto py-4">
        <div className="w-full">
          <div className="flex gap-x-4 w-full items-center">
            <h3 className="font-[700] text-[20px]">Ticket Sales Time & Date</h3>
          </div>
          <p className="text-base">
            Enter specified period for ticket avalaibility
          </p>
          <div className="w-full flex flex-col  mt-6 gap-4">
            <div className="w-full  flex flex-col md:flex-row gap-4">
              <PBDatePicker
                setDateValue={(val: any) => {
                  setticketDateObj((prev: any) => {
                    return { ...prev, startDate: new Date(val).toISOString() };
                  });
                }}
                value={startDate}
                label="Sales Start"
              />

              <PBTimePicker
                label="Starts"
                setTimeValue={(val: any) => {
                  setticketDateObj((prev: any) => {
                    return { ...prev, startTime: new Date(val).toISOString() };
                  });
                }}
                value={startTime}
                title="Start Time"
              />
            </div>

            <div className="w-full  flex flex-col md:flex-row gap-4">
              <PBDatePicker
                setDateValue={(val: any) => {
                  setticketDateObj((prev: any) => {
                    return { ...prev, startDate: new Date(val).toISOString() };
                  });
                }}
                label="Sales End"
                value={startDate}
              />

              <PBTimePicker
                label="Starts"
                setTimeValue={(val: any) => {
                  setticketDateObj((prev: any) => {
                    return { ...prev, startTime: new Date(val).toISOString() };
                  });
                }}
                value={startTime}
                title="End Time"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}