import { LogoIcon } from "../_icons/LogoIcon";
import { EmailIcon } from "../_icons/EmailIcon";
import { PhoneIcon } from "../_icons/PhoneIcon";

export const Footer = () => {
  return (
    <div
      className="w-full h-[280px] bg-indigo-700 flex items-center justify-around max-sm:w-[375px]
    max-sm:flex-col max-sm:justify-evenly"
    >
      <div
        className="w-[247px] h-[130px] flex justify-start items-start flex-col gap-[8px] max-sm:h-[52px]
      max-sm:w-[337px]"
      >
        <LogoIcon />
        <p
          className="text-white text-[14px] 
        max-sm:text-[13px]"
        >
          {"© 2024 Movie Z. All Rights Reserved."}
        </p>
      </div>
      <div className="flex flex-row gap-[96px]">
        <div className="flex flex-col gap-[24px]">
          <div className="max-sm:flex max-sm:flex-col max-sm:gap-[12px]">
            <p className="text-white max-sm:text-[15px]">Contact Information</p>
            <div className="flex items-center gap-[12px]">
              <EmailIcon />
              <p className="w-[20px] text-white max-sm:text-[13px]">
                Email: support@movieZ.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <PhoneIcon />
            <p className="text-white max-sm:text-[13px]">
              Phone:
              <br /> +976 (11) 123-4567
            </p>
          </div>
        </div>
        <div className="flex gap-[12px] flex-col">
          <p className="text-white max-sm:text-[15px]">Follow Us</p>
          <div className="flex gap-[12px] max-sm:flex-col">
            <button className="font-medium text-[15px] cursor-pointer text-white max-sm:text-[13px]">
              Facebook
            </button>
            <button className="font-medium text-[15px] cursor-pointer text-white max-sm:text-[13px]">
              Instagram
            </button>
            <button className="font-medium text-[15px] cursor-pointer text-white max-sm:text-[13px]">
              Twitter
            </button>
            <button className="font-medium text-[15px] cursor-pointer text-white max-sm:text-[13px]">
              Youtube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
