import React, { useState } from "react";
import PBInput from "@/shared/components/pbInput/pb-input";
import { MdEventNote } from "react-icons/md";
import PBAutoSelect from "@/shared/components/pb-auto-select/pb-auth-select";
import RandomIcon from "@/shared/components/icons/random-icon";
import PBTextArea from "@/shared/components/pb-text-area/pb-text-area";
import { FiEye } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

type PropT = {
  eventDetailsObj: {
    eventName: string;
    eventDescription: string;
    eventContact: string;
    eventVisibility: string;
    selectedSeries: {
      name: string;
      id: string;
    };
  };
  seteventDetailsObj: Function;
};

export default function EventDetails({
  eventDetailsObj,
  seteventDetailsObj,
}: PropT) {
  return (
    <div>
      <div className="w-full flex lex-col md:flex-row pb-6 border-b border-partybank-border p-4 xl:pb-6">
        <div className="w-full flex flex-col md:w-11/12 m-auto py-4 gap-y-2">
          {/* --- datails ---- */}
          <div className="w-full pb-4">
            <div className="w-full">
              <h3 className="font-[700] text-[20px]">Event Details</h3>
            </div>
            <div className="w-full flex flex-col md:flex-row mt-4 py-2 gap-x-4">
              <div className="w-1/2 bg-[#F8F9F9] rounded-md border border-partybank-border p-3 flex flex-col gap-y-4">
                <PBInput
                  value={eventDetailsObj.eventName}
                  setvalue={(val: string) => {
                    seteventDetailsObj((prev: any) => {
                      return { ...prev, eventName: val };
                    });
                  }}
                  placeHolder="Event Name"
                  icon={<MdEventNote size={20} />}
                />

                <PBTextArea
                  value={eventDetailsObj.eventDescription}
                  setvalue={(val: string) => {
                    seteventDetailsObj((prev: any) => {
                      return { ...prev, eventDescription: val };
                    });
                  }}
                  placeHolder="Add a description"
                  icon={<RandomIcon />}
                />
              </div>
              <div className="w-1/2 bg-[#F8F9F9] rounded-md border border-partybank-border p-3 flex flex-col gap-y-4">
                <PBAutoSelect
                  value={eventDetailsObj.selectedSeries.name}
                  setvalue={() => ""}
                  placeHolder="Series"
                  icon={<RandomIcon />}
                />

                <PBInput
                  value={eventDetailsObj.eventContact}
                  setvalue={(val: string) => {
                    seteventDetailsObj((prev: any) => {
                      return { ...prev, eventContact: val };
                    });
                  }}
                  placeHolder="Event contact"
                  icon={<FaRegUser size={16} />}
                />
              </div>
            </div>
          </div>

          {/* ---visibility----- */}
          <div className="w-full">
            <div className="flex gap-x-4 w-full items-center">
              <h3 className="font-[700] text-[20px]">Event Visibility</h3>
            </div>

            <div className="w-full flex flex-col md:flex-row mt-4  gap-x-4">
              <div className="w-1/2 bg-[#F8F9F9] rounded-md border border-partybank-border p-3">
                <PBAutoSelect
                  value={""}
                  setvalue={() => ""}
                  placeHolder="Visibility"
                  icon={<FiEye size={20} />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}