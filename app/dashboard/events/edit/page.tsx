"use client";
import { useEffect, useState } from "react";
import { BackButton } from "@/app/ui/series/buttons";

import EventPreview from "@/app/ui/events/event-preview";
import ProceedButton from "@/shared/components/buttons/proceed-button";
import EventCoverImage from "@/app/ui/events/cover-image";
import EventDateLocation from "@/app/ui/events/date-location";
import EventDetails from "@/app/ui/events/event-details";
import { getTimeWithAmPm } from "@/shared/utils/helper";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "@/store/store";
import { saveEvent } from "@/store/create-event/create-event-slice";
import { IEventForm } from "@/services/models/event-model";
import useAuth from "@/shared/hooks/useAuth";
import { toast } from "react-toastify";
import { createEvent } from "@/services/event-services/event-service";

export default function Page() {
  const { USER } = useAuth();
  const event = useSelector((state) => state.event);
  const tempEventObj: IEventForm = event.data.tempEvent;

  const [isFormValid, setisFormValid] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    tempEventObj.selectedImage ?? ""
  );
  const [selectedFile, setselectedFile] = useState<any>(null);
  const [backgroundPosition, setBackgroundPosition] = useState({
    x: 50,
    y: 50,
  });
  const [eventDateObj, seteventDateObj] = useState({
    eventDate: tempEventObj.eventDate,
    startTime: tempEventObj.startTime,
    endTime: tempEventObj.endTime,
    eventLocation: {
      address: tempEventObj.eventLocation.address ?? "",
      lat: tempEventObj.eventLocation.lat,
      city: tempEventObj.eventLocation.city,
      state: tempEventObj.eventLocation.state,
      country: tempEventObj.eventLocation.country,
      lng: tempEventObj.eventLocation.lng,
      geo: tempEventObj.eventLocation.geo,
      venue: tempEventObj.eventLocation.venue,
      venueGeo: tempEventObj.eventLocation.geo,
    },
  });
  const [eventDetailsObj, seteventDetailsObj] = useState({
    eventName: tempEventObj.eventName ?? "",
    eventDescription: tempEventObj.eventDescription,
    eventContact: tempEventObj.eventContact,
    eventVisibility: {
      label: tempEventObj.eventVisibility.label,
      title: tempEventObj.eventVisibility.label,
      id: tempEventObj.eventVisibility.id,
    },
    selectedSeries: {
      label: tempEventObj.selectedSeries.label,
      id: tempEventObj.selectedSeries.id,
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  //@desc: dispatch event to store and navigate to ticket creation page
  const handleProceed = () => {
    localStorage.setItem("eventSelected", selectedImage!);
    const eventObj = {
      ...eventDateObj,
      ...eventDetailsObj,
      selectedImage,
      selectedFile,
      backgroundPosition,
      tickets: tempEventObj.tickets,
    };
    dispatch(saveEvent(eventObj));
    router.push("./edit/tickets");
  };

  const handleValidation = () => {
    const {
      eventName,
      eventContact,
      eventDescription,
      eventVisibility,
      selectedSeries,
    } = eventDetailsObj;
    const { eventLocation } = eventDateObj;
    const isValid =
      eventName.length > 1 &&
      selectedImage !== null &&
      eventContact.length > 5 &&
      eventDescription.length > 10 &&
      eventLocation.address.length > 5 &&
      selectedSeries.label.length > 0 &&
      eventVisibility.label.length > 0;
    setisFormValid(isValid);
  };

  useEffect(() => {
    handleValidation();
  }, [eventDetailsObj, eventDateObj, selectedImage]);

  // useEffect(() => {
  //   console.log("event obj==>", eventDateObj);
  // }, [eventDateObj, selectedFile]);

  // useEffect(() => {
  //   console.log("temp event==>", tempEventObj);
  // }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-170px)] border-[var(--pb-c-soft-grey)]">
      <div className="sticky top-0 z-10 w-full">
        <div className="inline-block md:hidden bg-[var(--pb-c-soft-grey)] w-full px-6 py-3">
          <h3 className="font-[700] text-[25px]">Events</h3>
        </div>

        <div className="flex items-center py-3 px-6 justify-between border-0 border-b-[3px] border-[var(--pb-c-soft-grey)]">
          <div className="flex items-center gap-7">
            <BackButton href="/dashboard/events" />
            <p className="text-[23px] md:text-[30px] md:font-[700]">
              Edit Event
            </p>
          </div>
          <div className="hidden md:block">
            <ProceedButton
              label="Proceed to ticket"
              onClick={handleProceed}
              isDisabled={!isFormValid}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden">
        <EventPreview
          selectedImage={selectedImage ?? tempEventObj.selectedImage}
          backgroundPosition={backgroundPosition}
          eventName={eventDetailsObj.eventName}
          eventDescription={eventDetailsObj.eventDescription}
        />

        <div className="border-0 md:border-l border-partybank-soft-grey flex-grow overflow-y-auto  max-h-[calc(100vh-170px)] md:basis-[60%] lg:basis-[70%]">
          <EventCoverImage
            setselectedFile={setselectedFile}
            selectedImage={selectedImage}
            backgroundPosition={backgroundPosition}
            onImageChange={setSelectedImage}
            onPositionChange={setBackgroundPosition}
          />

          <EventDateLocation
            eventDateObj={eventDateObj}
            setEventDateObj={seteventDateObj}
          />

          <EventDetails
            eventDetailsObj={eventDetailsObj}
            seteventDetailsObj={seteventDetailsObj}
          />
        </div>
      </div>
    </div>
  );
}