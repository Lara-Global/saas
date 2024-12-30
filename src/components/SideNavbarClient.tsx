/** @format */
"use client";
import { useState } from "react";
import { Nav } from "./ui/nav";
import { useRouter } from "next/navigation";
import { ShoppingBasket, Settings, ChevronRight, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { LogoutConfirmation } from "./LogoutConfirmation"; 

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const router = useRouter();

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  function handleLogout() {
    setIsDialogOpen(true); // Show the confirmation dialog
  }

  function handleCloseDialog() {
    setIsDialogOpen(false); // Hide the confirmation dialog
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Shop",
            href: "/employee",
            icon: ShoppingBasket,
            variant: "default"
          },
          {
            title: "Settings",
            href: "/employee/settings",
            icon: Settings,
            variant: "ghost"
          },
          {
            title: "Logout",
            onClick: handleLogout, // Show confirmation dialog on click
            icon: LogOut,
            variant: "ghost"
          }
        ]}
      />
      <LogoutConfirmation open={isDialogOpen} onClose={handleCloseDialog} /> 
     
    </div>
  );
}
