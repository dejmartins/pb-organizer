import { useState } from "react";
import {
  ArrowLongLeftIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Modal from "./base-modal";
import EventAnalytics from "./event-analytics";
import AnalyticsModal from "./base-analytics-modal";
import { HiDotsVertical } from "react-icons/hi";
import { IEventResponse } from "@/services/models/event-response";
import { FaShareAlt } from "react-icons/fa";
import { RiLinkM } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { SiInstagram } from "react-icons/si";
import { IoLogoFacebook } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { BsWhatsapp } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Loader from "../loaders/loader";
import { toast } from "react-toastify";
import {
  deleteEvent,
  publishEvents,
} from "@/services/event-services/event-service";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  convertTimeToISO,
  dateToISOFormat,
  splitTimeRange,
} from "@/shared/utils/helper";
import { useDispatch } from "@/store/store";
import { saveEvent } from "@/store/create-event/create-event-slice";
import { ticketCategoryData } from "@/app/lib/placeholder-data";
import { ticketTypeData } from "@/shared/utils/data";

export default function EventDetailsModal({
  event,
  onClose,
  apiCall,
}: {
  event: IEventResponse;
  onClose: () => void;
  apiCall: () => void;
}) {
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [isLoaderModalOpen, setIsLoaderModalOpen] = useState(false);
  const [actionText, setactionText] = useState("");
  const [isAnalytics, setisAnalytics] = useState(false);

  const toggleAnalyticsView = () => {
    setViewAnalytics((prev) => !prev);
  };

  const handlePublish = () => {
    setIsLoaderModalOpen(true);
    setactionText("Publishing your event");
    return publishEvents({ id: event.id }).subscribe({
      next: (res) => {
        if (res) {
          setIsLoaderModalOpen(false);
          setactionText("");
          apiCall();
          // onClose();
        } else {
          toast.info(res.error);
          setIsLoaderModalOpen(false);
        }
      },
      error: (msg) => {
        toast.error(msg.message);
        setIsLoaderModalOpen(false);
      },
      complete: () => {
        setIsLoaderModalOpen(false);
        setactionText("");
      },
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.info("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      {isAnalytics ? (
        <AnalyticsModal isOpen={true} onClose={onClose}>
          <div>
            <div className="flex justify-between px-6 py-4 border-b items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="border cursor-pointer bg-[#F3F5F5] px-[10px] py-[5px] rounded-[15px]"
                >
                  <ArrowLongLeftIcon className="w-[20px] h-[30px] stroke stroke-[3px]" />
                </button>
                <h3 className="text-xl font-bold line-clamp-1">
                  Event Analytics
                </h3>
              </div>
              <div className="flex items-center gap-x-4">
                {event.publication_state !== "DRAFT" && (
                  <TicketersButton
                    eventObj={event}
                    copyToClipboard={copyToClipboard}
                  />
                )}
                <ModalAction
                  event={event}
                  apiCall={apiCall}
                  onClose={onClose}
                  setIsLoaderModalOpen={setIsLoaderModalOpen}
                  setactionText={setactionText}
                />
              </div>
            </div>

            <EventAnalytics
              event={event}
              toggleAnalyticsView={toggleAnalyticsView}
            />
          </div>
        </AnalyticsModal>
      ) : (
        <Modal isOpen={true} onClose={onClose}>
          <div>
            <div className="flex justify-between px-4 md:px-6 py-4 border-0 border-b">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="border cursor-pointer bg-[#F3F5F5] px-[10px] py-[5px] rounded-[15px]"
                >
                  <ArrowLongLeftIcon className="w-[20px] h-[30px] stroke stroke-[3px]" />
                </button>
                <h3 className="text-xl font-bold line-clamp-1">
                  Event Details
                </h3>
              </div>
              <div className="flex items-center gap-x-4">
                {event.publication_state === "DRAFT" && (
                  <PublishButton onClick={handlePublish} />
                )}
                {event.publication_state !== "DRAFT" && (
                  <TicketersButton
                    eventObj={event}
                    copyToClipboard={copyToClipboard}
                  />
                )}
                <ModalAction
                  event={event}
                  apiCall={apiCall}
                  onClose={onClose}
                  setIsLoaderModalOpen={setIsLoaderModalOpen}
                  setactionText={setactionText}
                />
              </div>
            </div>

            <EventDetails
              event={event}
              toggleAnalyticsView={toggleAnalyticsView}
              setisAnalytics={setisAnalytics}
            />
          </div>
        </Modal>
      )}

      <Loader isOpen={isLoaderModalOpen} message={actionText} />
    </>
  );
}

export function EventDetails({
  event,
  toggleAnalyticsView,
  setisAnalytics,
}: {
  event: IEventResponse;
  toggleAnalyticsView: () => void;
  setisAnalytics: Function;
}) {
  return (
    <div className="p-4 md:p-6 flex gap-3">
      <div className="hidden md:block">
        <div className="w-40 h-40">
          <Image
            src={event.image_url || "/defaultImage.png"}
            width={400}
            height={400}
            alt=""
            className=" aspect-square rounded-md"
            // className="min-w-[230px] min-h-auto border bg-cover bg-center rounded-[10px] overflow-hidden"
          />
        </div>
      </div>

      <div>
        <p className="inline-block rounded-[4px] font-[400] px-2 py-[2px] text-sm bg-[#F7F6F7]">
          {event.series_name}
        </p>
        <h3 className="text-2xl font-bold">{event.event_name}</h3>
        <p className="pb-2">{event.description}</p>
        {/* <p>Created By: {event.series}</p> */}

        <div>
          <div className="mr-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-0 border-b border-t w-full py-2">
            <div className="flex items-center gap-2 w-full md:w-1/3">
              <MapPinIcon className="w-6" />
              <div>
                <p className="text-[17px] font-[500]">
                  {event.location.city}, {event.location.state}
                </p>
                <p className="text-[15px] line-clamp-1">{event.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-6" />
              <p className="text-[15px] line-clamp-2">
                {/* {moment(event.date).format("MMMM Do, YYYY")} */}
                {event.date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-6" />
              <p className="text-[15px] line-clamp-2">{event.time}</p>
            </div>
          </div>
        </div>

        <div className="py-2 border-0 border-b">
          <p className="font-[500]">
            Visibility:{" "}
            <span className="rounded-[4px] font-[400] px-2 text-sm bg-[#F7F6F7]">
              Available to public
            </span>
          </p>
        </div>

        {event.publication_state !== "DRAFT" && (
          <div className="py-2 flex justify-between mt-2">
            {/* if already published show this */}
            <div className="flex items-center gap-x-2">
              <div className="w-8 h-8 bg-[#F7F6F7] flex justify-center items-center rounded-full">
                <RiTwitterXFill />
              </div>
              <div className="w-8 h-8 bg-[#F7F6F7] flex justify-center items-center rounded-full">
                <SiInstagram />
              </div>

              <div className="w-8 h-8 bg-[#F7F6F7] flex justify-center items-center rounded-full">
                <IoLogoFacebook size={20} />
              </div>
              <div className="w-8 h-8 bg-[#F7F6F7] flex justify-center items-center rounded-full">
                <LuMail />
              </div>
              <div className="w-8 h-8 bg-[#F7F6F7] flex justify-center items-center rounded-full">
                <BsWhatsapp />
              </div>
            </div>
            <div
              className="flex items-center gap-x-1 cursor-pointer"
              onClick={() => setisAnalytics(true)}
            >
              <span className="text-partybank-red text-sm font-bold">
                Preview Analytics
              </span>
              <MdKeyboardDoubleArrowRight color="#E91B41" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const PublishButton = ({ onClick }: any) => {
  return (
    <div>
      <button
        className="py-2 font-bold text-[0.7rem] px-2 bg-partybank-red text-white rounded-md border border-partybank-text-black"
        onClick={onClick}
      >
        Publish Event
      </button>
    </div>
  );
};

type PropT = {
  eventObj: IEventResponse;
  copyToClipboard: (x: string) => void;
};
const TicketersButton = ({ eventObj, copyToClipboard }: PropT) => {
  return (
    <div className="py-2 px-4 border border-[#FEE0E6] bg-[#FEEFF2] rounded-md flex items-center min-w-20 gap-x-3">
      <div
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={() => {
          window.open(
            `https://thepartybank.com/${eventObj.event_reference}/admin`,
            "_blank"
          );
        }}
      >
        <FaShareAlt />
        <span className="text-sm font-bold">Ticketers Link</span>
      </div>
      <div className="w-[1px] h-5 bg-[#FAABC4]"></div>
      <div
        className=" cursor-pointer"
        onClick={() => {
          copyToClipboard(
            `https://thepartybank.com/${eventObj.event_reference}/admin`
          );
        }}
      >
        <RiLinkM size={20} />
      </div>
    </div>
  );
};

type ModalActionPropT = {
  event: IEventResponse;
  apiCall: () => void;
  onClose: () => void;
  setIsLoaderModalOpen: (e: boolean) => void;
  setactionText: (e: string) => void;
};

const ModalAction = ({
  event,
  apiCall,
  onClose,
  setIsLoaderModalOpen,
  setactionText,
}: ModalActionPropT) => {
  const [openActionPane, setopenActionPane] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEdit = () => {
    const { lat, lng, city, address, state, country } = event.location;
    const eventObj = {
      id: event.id,
      eventName: event.event_name,
      eventDescription: event.description,
      eventContact: event.contact_information,
      eventVisibility: {
        label: "Public",
        title: "Public",
        id: 1,
      },
      selectedSeries: {
        label: event.series_name,
        id: event.series_id,
      },
      eventDate: dateToISOFormat(event.date),
      startTime: convertTimeToISO(splitTimeRange(event.time)[0]),
      endTime: convertTimeToISO(splitTimeRange(event.time)[1]),
      tickets: event.tickets.map((ticket, index: number) => {
        return {
          ticketDateObj: {
            salesStartDate: dateToISOFormat(ticket.ticket_sale_start_date),
            salesEndDate: dateToISOFormat(ticket.ticket_sale_end_date),
            salesStartTime: convertTimeToISO(ticket.ticket_sale_start_time),
            salesEndTime: convertTimeToISO(ticket.ticket_sales_end_time),
          },
          ticketDetailsObj: {
            ticketName: ticket.name,
            ticketDescription: "",
            ticketCapacity: ticket.capacity,
            group_ticket_capacity: ticket.group_ticket_capacity,
            ticketStock: { id: index, label: ticket.stock },
            ticketPrice: ticket.price,
            ticketPurchaseLimit: { id: 1, label: "5" }, //chnage to obj
          },
          ticketCategory:
            ticket.category === "Single"
              ? ticketCategoryData[0]
              : ticketCategoryData[1],
          ticketType:
            ticket.price && ticket.price > 0
              ? ticketTypeData[1]
              : ticketTypeData[0],
          perks: ticket.ticket_perks,
          id: ticket.id,
          fid: index + 1,
        };
      }),
      eventLocation: {
        address: event.location.address ?? event.venue,
        lat: event.location.lat,
        city: event.location.city,
        state: event.location.state,
        country: event.location.country,
        lng: event.location.lng,
        geo: JSON.stringify({
          value: { lat, lng, address, city, state, country },
        }),
        venue: event.venue,
        venueGeo: "",
      },
      backgroundPosition: {
        x: 50,
        y: 50,
      },
      selectedImage: event.image_url,
      selectedFile: {},
      is_notification_enabled: event.is_notification_enabled,
    };

    dispatch(saveEvent(eventObj));
    router.push("/dashboard/events/edit");
  };

  const handleDelete = () => {
    setIsLoaderModalOpen(true);
    setactionText("Deleting your event");
    deleteEvent({ id: event.id }).subscribe({
      next: (res) => {
        if (res) {
          setIsLoaderModalOpen(false);
          setactionText("");
          apiCall();
          onClose();
        } else {
          toast.info(res.error);
          setIsLoaderModalOpen(false);
        }
      },
      error: (msg) => {
        toast.error(msg.message);
        setIsLoaderModalOpen(false);
      },
      complete: () => {
        setIsLoaderModalOpen(false);
        setactionText("");
      },
    });
  };

  return (
    <div className="p-1 cursor-pointer relative">
      <div
        className="bg-[##F7F6F7] w-8 h-8 flex justify-center items-center rounded-full"
        onClick={() => setopenActionPane(!openActionPane)}
      >
        <HiDotsVertical size={22} />
      </div>

      {openActionPane && (
        <div className="min-w-40 absolute min-h-10 rounded-lg px-4 -left-28 mt-2 bg-white p-2 border border-[#F6F5F5] shadow-sm">
          <div className="flex items-center gap-x-2 py-2" onClick={handleEdit}>
            <div className="w-6 h-6 rounded-full flex justify-center items-center">
              <FaRegEdit />
            </div>

            <span className="font-bold text-xs">Edit Event</span>
          </div>

          <div className="flex items-center gap-x-2 py-2">
            <div className="w-6 h-6 bg-partybank-red rounded-full flex justify-center items-center">
              <RiDeleteBin6Line color="#fff" size={10} />
            </div>
            <span
              className="font-bold text-xs text-partybank-red"
              onClick={handleDelete}
            >
              Delete Event
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
