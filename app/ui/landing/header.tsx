import Image from "next/image";

export default function Header() {
    return (
      <header className="fixed top-0 left-0 w-full bg-[#FFFFFF] border-b text-[#080D18] py-4 z-50">
        <div className="flex justify-between items-center px-6">
            <div className="flex items-center gap-10">
                <div>
                    <Image
                        src="/pb-logo.png"
                        width={65.95}
                        height={32.36}
                        alt="Partybank Logo"
                    />
                </div>
            </div>
        </div>
      </header>
    );
}
  