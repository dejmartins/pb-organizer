'use client'

import { events } from "@/app/lib/placeholder-data";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const getCurrentDate = () => new Date();

export default function MyEvents() {
    const [statusFilter, setStatusFilter] = useState("active");

    const currentDate = getCurrentDate();

    const filterEvents = (filter: string) => {
        setStatusFilter(filter);
    };

    const filteredEvents = events
        .filter(event => 
            (statusFilter === "active" && event.status === "active") || 
            (statusFilter === "upcoming" && new Date(event.date) > currentDate)
        )
        .slice(0, 5);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-7">
                    <h3 className="text-2xl font-bold">My Events</h3>
                    <div className="flex items-center gap-4 my-4">
                        <button
                            className={`px-4 rounded-md border border-[#DDE0E3] 
                                ${statusFilter === 'active' 
                                    ? 'bg-[var(--pb-c-light-red)] text-[var(--pb-c-red)] font-[600]' 
                                    : ''}`}
                            onClick={() => filterEvents('active')}
                        >
                            Active
                        </button>
                        <button
                            className={`px-4 rounded-md border border-[#DDE0E3]
                                ${statusFilter === 'upcoming' 
                                    ? 'bg-[var(--pb-c-light-red)] text-[var(--pb-c-red)] font-[600]' 
                                    : ''}`}
                            onClick={() => filterEvents('upcoming')}
                        >
                            Upcoming
                        </button>
                    </div>
                </div>

                <Link href={'/dashboard/events'} className="flex items-center gap-2 px-5 rounded-md bg-[var(--pb-c-light-red)] text-[var(--pb-c-red)] font-[600]">
                    See all events
                    <ChevronDoubleRightIcon className="w-4 stroke-2" />
                </Link>
            </div>
            
            {filteredEvents.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredEvents.map((event, index) => (
                        <div key={index} className="border flex items-center gap-3 p-3 rounded-[10px]">
                            <div className="min-w-[60px] min-h-[60px] border bg-cover bg-center rounded-[10px] overflow-hidden"
                                    style={{
                                        backgroundImage: `url("${event.image || '/defaultImage.png'}")`,
                                    }}
                                >
                            </div>
                            <div>
                                <p className="inline-block max-w-max border rounded-[5px] px-2 font-[500]">{event.series}</p>
                                <h4 className="font-[600] text-[20px] line-clamp-1">{event.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No {statusFilter} events available.</p>
            )}
        </div>
    );
}