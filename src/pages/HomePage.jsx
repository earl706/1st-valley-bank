import React from "react";
import gcash from "/src/assets/gcash-logo-png_seeklogo-522261-removebg-preview.png";
import bsp from "/src/assets/image-removebg-preview (1).png";
import ctb from "/src/assets/image-removebg-preview (2).png";
import pdic from "/src/assets/image-removebg-preview.png";
import usaid from "/src/assets/Seal_of_the_United_States_Agency_for_International_Development.svg.png";

export default function HomePage() {
  return (
    <>
      <div className="px-[50px] py-[65px] mx-[15px] drop-shadow-lg rounded-sm bg-white mb-[25px] font-poppins">
        <div className="flex mb-[25px]">
          <div className="flex flex-col w-1/2">
            <button className="text-center px-[20px] rounded-[5px] w-[100px] py-[5px] bg-[#396131] text-[9px] font-bold text-white mb-[20px]">
              Read More
            </button>
            <span className="font-extrabold text-[62px]">
              Your Satisfaction
            </span>
            <span className="font-extrabold text-[62px] mb-[20px]">
              is Our Mission
            </span>
            <span className=" text-[#727272] text-[11px] w-[365px] mb-[20px]">
              1st Valley Bank is committed to provide you with innovative and
              responsive solutions to your banking needs and requirements. From
              a multi-awarded rural bank to a development bank in Mindanao and
              Visayas, our 82 branches and branch lite units shall deliver you
              only the best services that you truly deserve. We will work with
              you all the way. As your success is our business, you can count on
              us to be your lifetime friend
            </span>
            <div className="flex gap-[20px]">
              <button className="bg-[#396131] rounded-[10px] text-white px-[16px] py-[8px] font-bold">
                Our Services
              </button>
              <button className="bg-white rounded-[10px] text-[#396131] px-[16px] py-[8px] font-bold drop-shadow-lg">
                About Us
              </button>
            </div>
          </div>
          <div className="w-1/2 bg-gray-600"></div>
        </div>
      </div>
      <div className="flex justify-center gap-[115px] py-[25px] bg-[#396131] mb-[60px]">
        <img src={usaid} width={42} height={42} alt="" />
        <img src={gcash} width={42} height={42} alt="" />
        <img src={bsp} width={42} height={42} alt="" />
        <img src={ctb} width={42} height={42} alt="" />
        <img src={pdic} width={42} height={42} alt="" />
      </div>
      <span className="flex font-bold text-[40px] ml-[25px] mb-[40px]">
        Be our Lifetime Friend
      </span>
      <div className="flex justify-center gap-[40px] px-[20px] mb-[90px]">
        <div className="flex flex-col p-[35px] w-1/3 rounded-lg drop-shadow-lg bg-white">
          <div className="rounded-lg w-full aspect-square bg-[#B1B1B1] mb-[20px] drop-shadow-lg"></div>
          <span className="flex font-semibold mb-[20px] text-[32px]">
            Deposit
          </span>
          <span className="text-[24px] font-thin text-[#727272] mb-[20px]">
            Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum
          </span>
          <button className="rounded-[10px] bg-[#396131] w-[120px] h-[40px]"></button>
        </div>
        <div className="flex flex-col p-[35px] w-1/3 rounded-lg drop-shadow-lg bg-white">
          <div className="rounded-lg w-full aspect-square bg-[#B1B1B1] mb-[20px] drop-shadow-lg"></div>
          <span className="flex font-semibold mb-[20px] text-[32px]">
            Loans
          </span>
          <span className="text-[24px] font-thin text-[#727272] mb-[20px]">
            Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum
          </span>
          <button className="rounded-[10px] bg-[#396131] w-[120px] h-[40px]"></button>
        </div>
        <div className="flex flex-col p-[35px] w-1/3 rounded-lg drop-shadow-lg bg-white">
          <div className="rounded-lg w-full aspect-square bg-[#B1B1B1] mb-[20px] drop-shadow-lg"></div>
          <span className="flex font-semibold mb-[20px] text-[32px]">
            Properties for Sale
          </span>
          <span className="text-[24px] font-thin text-[#727272] mb-[20px]">
            Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum
          </span>
          <button className="rounded-[10px] bg-[#396131] w-[120px] h-[40px]"></button>
        </div>
      </div>
      <span className="flex justify-center text-[40px] font-bold w-full mb-[80px]">
        Why Choose Us
      </span>
      <div className="flex gap-[110px] justify-center px-[55px] mb-[180px]">
        <div className="flex flex-col gap-[40px] items-center w-1/2">
          <div className="bg-[#B1B1B1] drop-shadow-lg w-[75px] h-[75px] rounded-lg"></div>
          <span className="text-[32px] font-extrabold">Lorem</span>
          <span className="text-[24px] text-[#727272] font-regular">
            Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum
          </span>
        </div>
        <div className="flex flex-col gap-[40px] items-center w-1/2">
          <div className="bg-[#B1B1B1] drop-shadow-lg w-[75px] h-[75px] rounded-lg"></div>
          <span className="text-[32px] font-extrabold">Lorem</span>
          <span className="text-[24px] text-[#727272] font-regular">
            Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum
          </span>
        </div>
        <div className="flex flex-col gap-[40px] items-center w-1/2">
          <div className="bg-[#B1B1B1] drop-shadow-lg w-[75px] h-[75px] rounded-lg"></div>
          <span className="text-[32px] font-extrabold">Lorem</span>
          <span className="text-[24px] text-[#727272] font-regular">
            Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum
          </span>
        </div>
      </div>

      <div className="px-[50px] py-[65px] mx-[15px] drop-shadow-lg rounded-sm bg-white mb-[90px]">
        <div className="flex mb-[25px]">
          <div className="flex flex-col w-1/2">
            <button className="text-center px-[20px] rounded-[5px] w-[100px] py-[5px] bg-[#396131] text-[9px] font-bold text-white mb-[20px]">
              Read More
            </button>
            <span className="font-extrabold text-[62px] mb-[30px]">
              News Header
            </span>
            <span className=" text-[#727272] text-[11px] w-[365px] mb-[20px]">
              1st Valley Bank is committed to provide you with innovative and
              responsive solutions to your banking needs and requirements. From
              a multi-awarded rural bank to a development bank in Mindanao and
              Visayas, our 82 branches and branch lite units shall deliver you
              only the best services that you truly deserve. We will work with
              you all the way. As your success is our business, you can count on
              us to be your lifetime friend
            </span>
            <div className="flex gap-[20px]">
              <button className="bg-[#396131] rounded-[10px] text-white px-[16px] py-[8px] font-bold">
                Our Services
              </button>
              <button className="bg-white rounded-[10px] text-[#396131] px-[16px] py-[8px] font-bold drop-shadow-lg">
                About Us
              </button>
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
      <span className="flex justify-center text-[40px] font-bold w-full mb-[80px]">
        What Our Clients Say
      </span>
      <div className="flex justify-center gap-[40px] px-[50px] mb-[90px]">
        <div className="flex flex-col p-[35px] w-1/4 rounded-lg drop-shadow-lg bg-white">
          <div className="rounded-lg w-full aspect-square bg-[#B1B1B1] mb-[20px] drop-shadow-lg"></div>
          <span className="flex font-extrabold mb-[20px] justify-center w-full text-[32px]">
            Lorem
          </span>
          <span className="text-[24px] font-regular text-[#727272] mb-[20px]">
            Lorem Ipsum lorem ipsum lorem ipsum
          </span>
        </div>
        <div className="flex flex-col p-[35px] w-1/4 rounded-lg drop-shadow-lg bg-white">
          <div className="rounded-lg w-full aspect-square bg-[#B1B1B1] mb-[20px] drop-shadow-lg"></div>
          <span className="flex font-extrabold mb-[20px] justify-center w-full text-[32px]">
            Lorem
          </span>
          <span className="text-[24px] font-regular text-[#727272] mb-[20px]">
            Lorem Ipsum lorem ipsum lorem ipsum
          </span>
        </div>
        <div className="flex flex-col p-[35px] w-1/4 rounded-lg drop-shadow-lg bg-white">
          <div className="rounded-lg w-full aspect-square bg-[#B1B1B1] mb-[20px] drop-shadow-lg"></div>
          <span className="flex font-extrabold mb-[20px] justify-center w-full text-[32px]">
            Lorem
          </span>
          <span className="text-[24px] font-regular text-[#727272] mb-[20px]">
            Lorem Ipsum lorem ipsum lorem ipsum
          </span>
        </div>
        <div className="flex flex-col p-[35px] w-1/4 rounded-lg drop-shadow-lg bg-white">
          <div className="rounded-lg w-full aspect-square bg-[#B1B1B1] mb-[20px] drop-shadow-lg"></div>
          <span className="flex font-extrabold mb-[20px] justify-center w-full text-[32px]">
            Lorem
          </span>
          <span className="text-[24px] font-regular text-[#727272] mb-[20px]">
            Lorem Ipsum lorem ipsum lorem ipsum
          </span>
        </div>
      </div>
      <div className="px-[50px] py-[65px] mx-[15px] drop-shadow-lg rounded-sm bg-white mb-[140px] ">
        <div className="flex mb-[25px]">
          <div className="flex flex-col w-1/2">
            <button className="text-center px-[20px] rounded-[5px] w-[100px] py-[5px] bg-[#396131] text-[9px] font-bold text-white mb-[20px]">
              Read More
            </button>
            <span className="font-extrabold text-[62px] mb-[30px]">
              Be Our Lifetime Friend
            </span>
            <span className=" text-[#727272] text-[11px] w-[365px] mb-[30px]">
              1st Valley Bank is committed to provide you with innovative and
              responsive solutions to your banking needs and requirements.
            </span>
            <div className="flex gap-[20px]">
              <button className="bg-[#396131] rounded-[10px] text-white px-[40px] py-[8px] font-bold">
                Inquire Now
              </button>
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>

      <div className="pl-[75px] pr-[50px] py-[75px] ml-[15px] drop-shadow-lg rounded-l-sm bg-[#70A765] ">
        <div className="flex gap-[50px]">
          <div className="w-1/2">
            <div className="bg-[#B1B1B1] aspect-square rounded-lg drop-shadow-lg"></div>
          </div>
          <div className="flex flex-col w-1/2">
            <span className="font-extrabold text-[62px] text-center mb-[30px]">
              Who are we?
            </span>
            <span className="text-[24px] text-white leading-15 mb-[30px] w-full">
              1st Valley Bank is committed to provide you with innovative and
              responsive solutions to your banking needs and requirements. From
              a multi-awarded rural bank to a development bank in Mindanao and
              Visayas, our 82 branches and branch lite units shall deliver you
              only the best services that you truly deserve. We will work with
              you all the way. As your success is our business, you can count on
              us to be your lifetime friend
            </span>
            <div className="flex gap-[20px]">
              <button className="bg-[#396131] rounded-[10px] text-white px-[40px] py-[8px] font-bold">
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
