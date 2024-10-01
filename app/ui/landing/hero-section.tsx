import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex flex-col text-white rounded-b-[20px]"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/drddoxnsi/image/upload/v1724406331/PARTYBANK/ORGANIZER/hero-image_xqdvny.png")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-90 rounded-b-[30px]"></div>

      <div className="z-10 text-center flex flex-col px-5 items-center mt-56 md:mt-44">
        <p className="mb-5 max-w-lg mx-auto font-[300] text-[28px] md:text-[32px] leading-10">
          <span className="font-[700] italic">Plan, manage, and elevate</span> your events with Partybank.
        </p>

        <h1 className="text-4xl text-[40px] md:text-[62px] font-[700] mb-10 md:mb-20">Coming Soon!</h1>

        <div className="flex gap-4 w-full max-w-[1000px] mx-auto xl:absolute -bottom-10">
          <Image
            src="/hero-image.png"
            layout="responsive"
            width={1200}
            height={350}
            alt="Partybank Logo"
            className="w-[80vw] md:w-full"
          />
        </div>
      </div>
    </section>
  );
}
