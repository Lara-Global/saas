import { useState, useEffect } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Define the structure of timeLeft
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Announcement() {
  // Function to calculate time left
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date("2025-01-01T00:00:00");
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime();

    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // Initialize state with default values
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  // Update timeLeft every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Link
      href="/auth/sign-up"
      className="inline-flex items-center rounded-full border border-purple-600 border-opacity-0 bg-muted py-1 pl-1 pr-3 text-sm font-medium outline-none ring-0 ring-purple-600 ring-opacity-0 transition-all duration-500 ease-out hover:border-opacity-100 hover:ring-[3px] hover:ring-opacity-30 focus:ring-[3px] focus:ring-opacity-30 active:border-opacity-100 active:ring-[1px] active:ring-opacity-30"
    >
      <Badge>Free </Badge>{" "}
      <Separator className="mx-1 h-4" orientation="vertical" />{" "}
      <span>
        Lara Now IS Free until <span className="text-purple-600">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>

      </span>
      <ChevronRightIcon className="ml-1 size-4" />
    </Link>
  );
}
