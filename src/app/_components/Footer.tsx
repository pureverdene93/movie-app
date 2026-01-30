import { LogoIcon } from "../_icons/LogoIcon";
import { EmailIcon } from "../_icons/EmailIcon";
import { PhoneIcon } from "../_icons/PhoneIcon";

export const Footer = () => {
  return (
    <div className="w-full bg-primary dark:bg-card flex flex-col md:flex-row items-center justify-center md:justify-around gap-6 md:gap-8 py-8 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center md:items-start gap-2">
        <LogoIcon />
        <p className="text-primary-foreground dark:text-foreground text-xs sm:text-sm text-center md:text-left">
          © 2024 Movie Z. All Rights Reserved.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-16 lg:gap-24">
        <div className="flex flex-col gap-4 items-center sm:items-start">
          <p className="text-primary-foreground dark:text-foreground font-semibold text-sm sm:text-base">
            Contact Information
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <EmailIcon />
              <p className="text-primary-foreground dark:text-muted-foreground text-xs sm:text-sm">
                Email: support@movieZ.com
              </p>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon />
              <p className="text-primary-foreground dark:text-muted-foreground text-xs sm:text-sm">
                Phone: +976 (11) 123-4567
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center sm:items-start">
          <p className="text-primary-foreground dark:text-foreground font-semibold text-sm sm:text-base">
            Follow Us
          </p>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button className="font-medium text-xs sm:text-sm cursor-pointer text-primary-foreground dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">
              Facebook
            </button>
            <button className="font-medium text-xs sm:text-sm cursor-pointer text-primary-foreground dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">
              Instagram
            </button>
            <button className="font-medium text-xs sm:text-sm cursor-pointer text-primary-foreground dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">
              Twitter
            </button>
            <button className="font-medium text-xs sm:text-sm cursor-pointer text-primary-foreground dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">
              Youtube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
