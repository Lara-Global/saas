/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

import { useRouter } from "next/navigation";
import { LogoutConfirmation } from "./LogoutConfirmation";
type Props = {};

import {
  Newspaper,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  LogOut
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
 
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

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
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Users",
            href: "/admin/users",
            icon: UsersRound,
            variant: "ghost"
          },
         
        
          {
            title: "Invoices",
            href: "/admin/invoice",
            icon: Newspaper,
            variant: "ghost"
          }
          ,
          {
            title: "Settings",
            href: "/admin/settings",
            icon: Settings,
            variant: "ghost"
          },
          {
            title: "Logout",
            onClick: handleLogout, // Call handleLogout on click
            icon: LogOut,
            variant: "ghost"
          }
        ]}
      />
      <LogoutConfirmation open={isDialogOpen} onClose={handleCloseDialog} /> 
    </div>
  );
}
