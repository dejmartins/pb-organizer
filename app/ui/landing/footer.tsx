import { BuildingOffice2Icon, CircleStackIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Footer() {
    return (
      <>
        <footer className="bg-[#1D0509] text-[#FBD1D9]">
          <div className="p-12 container mx-auto flex flex-col md:flex-row justify-between gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex flex-col items-center md:items-start mb-2">
                <BuildingOffice2Icon className="text-[var(--pb-c-red)] w-7 mb-2" />
                <h4 className="text-xl font-bold">Company</h4>
              </div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="flex flex-col items-center md:items-start mb-2">
                <CircleStackIcon className="text-[var(--pb-c-red)] w-7 mb-2" />
                <h4 className="text-xl font-bold">Products</h4>
              </div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Create Event</a></li>
                <li><a href="#" className="hover:text-white">Attend Event</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="flex flex-col items-center md:items-start mb-2">
                <QuestionMarkCircleIcon className="text-[var(--pb-c-red)] w-7 mb-2" />
                <h4 className="text-xl font-bold">Support</h4>
              </div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
                <li><a href="#" className="hover:text-white">Email Us</a></li>
              </ul>
            </div>
          </div>

          <div>
            <div className="w-full">
              <div
                className="h-[100px] w-full"
                style={{
                  background: "linear-gradient(to top, #830F2500, #E91B411A)"
                }}
              ></div>
              <div
                className="h-[100px] w-full"
                style={{
                  background: "linear-gradient(to top, #6D0F8300, #910FEA1A)"
                }}
              ></div>
              <div
                className="h-[100px] w-full"
                style={{
                  background: "linear-gradient(to top, #835E0F00, #EA7E0F1A)"
                }}
              ></div>
            </div>

            <div className="flex justify-center -mt-56">
              <Image 
                src="/logo-remix.png" 
                alt="PartyBank Logo" 
                width={700.95} 
                height={300.36} 
                className="w-[300px] md:w-[600px]"
              />
            </div>
          </div>

          <div className="mt-16 text-center text-sm pb-12">
            © 2024 PartyBank. All rights reserved.
          </div>
        </footer>
      </>
    );
}