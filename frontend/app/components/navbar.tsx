"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Bell,
  CircleHelp,
  Contrast,
  Divide,
  Home,
  HomeIcon,
  Lock,
  LogOut,
  LucideHome,
  MessageCircle,
  Mic2Icon,
  Settings,
  Tv,
  User,
  UserRound,
  UsersRound,
} from "lucide-react";
import NavItem from "./navitem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUser } from "@/lib/redux/slices/user/userThunks";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { openChatSideBar } from "@/lib/redux/slices/chat/chatSideBarSlice";
import { closeChatArea } from "@/lib/redux/slices/chat/chatAreaSlice";
import { useNotification } from "../hooks/useNotification";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { createUrl } from "@/util/file";
import { FaHouse } from "react-icons/fa6";
import { BsHouseDoor, BsHouseDoorFill } from "react-icons/bs";
import { RiChat1Fill, RiChat1Line } from "react-icons/ri";
import { GoBell, GoBellFill } from "react-icons/go";

export default function Navbar() {
  const { firstName, lastName, profilePicture } = useSelector(
    (state: RootState) => state.User
  );
  const { new_notifications_count } = useSelector(
    (state: RootState) => state.Notification
  );

  useNotification(); // Listens to new notifications

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const pathname = usePathname();

  const dialogTriggerRef = React.useRef<HTMLButtonElement>(null);

  function handleChatClick() {
    dispatch(openChatSideBar());
    if (window.innerWidth <= 950) {
      dispatch(closeChatArea());
    }
  }

  React.useLayoutEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dialogTriggerRef.current?.click();
  };

  const user: {
    title: string;
    href: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }[] = [
    {
      title: "Settings",
      href: "/site/settings",
      icon: <Settings />,
    },
    {
      title: "Help & Support",
      href: "/site/help",
      icon: <CircleHelp />,
    },
    {
      title: "Privacy & Policy",
      href: "/site/privacy",
      icon: <Lock />,
    },
    {
      title: "Logout",
      href: "#",
      onClick: handleLogout,
      icon: <LogOut />,
    },
  ];

  return (
    <div
      className={cn(
        "w-full",
        pathname.includes("chat") ? "fixed" : "sticky top-0"
      )}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button className="sr-only" ref={dialogTriggerRef}>
            Dialog Trigger
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to logout?</p>
          <DialogFooter>
            <DialogClose>
              <Button
                variant={"ghost"}
                onClick={() => router.push("/site/logout")}
              >
                Yes
              </Button>
            </DialogClose>
            <DialogClose>
              <Button variant={"secondary"}>No</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex w-full justify-center  bg-neutral-200 bg-opacity-50 backdrop-blur-md  !z-[100000] ">
        <div className="grid grid-cols-3 gap-10 items-center p-2 w-full justify-between  top-0 ">
          <div className="w-full absolute left-0 h-full flex justify-between  px-4">
            <span
              className="self-center  font-bold font-lemonMilk tracking-[5pt]  flex items-center gap-2 cursor-pointer hover:opacity-100 duration-100 ease-in"
              onClick={() => router.push("/site/feed")}
            >
              <Image src={"/logo/logo.ico"} alt="" width={25} height={25} />
              <div>
                <span className="hidden md:block opacity-60">Orbitum</span>
                <span className="hidden md:flex text-[5pt] self-center  font-bold font-lemonMilk tracking-[5pt] opacity-60 items-center gap-2 duration-100 ease-in">
                  Alpha
                </span>
              </div>
            </span>
          </div>

          <div></div>
          <NavigationMenu className="!relative">
            <NavigationMenuList className=" relative flex gap-3">
              <Link
                href={"/site/feed"}
                className=" rounded-full p-2  hover:rounded-none active:rounded-full  ring-0  border-b-4  border-transparent hover:border-b-4 hover:border-neutral-200 active:border-4 "
                title={"Feed"}
              >
                {pathname.includes("feed") ? (
                  <BsHouseDoorFill size={20} />
                ) : (
                  <BsHouseDoor size={20} />
                )}
              </Link>
              <Link
                href={"/site/chat"}
                className=" rounded-full p-2  hover:rounded-none active:rounded-full  ring-0  border-b-4  border-transparent hover:border-b-4 hover:border-neutral-200 active:border-4 "
                title={"Chat"}
                onClick={handleChatClick}
              >
                {pathname.includes("chat") ? (
                  <RiChat1Fill size={21} />
                ) : (
                  <RiChat1Line size={21} />
                )}
              </Link>
              <Link
                href={"/site/notifications"}
                className=" rounded-full p-2  relative hover:rounded-none active:rounded-full  ring-0  border-b-4  border-transparent hover:border-b-4 hover:border-neutral-200 active:border-4 "
                title={"Notifications"}
              >
                <div className="relative ">
                  {pathname.includes("notifications") ? (
                    <GoBellFill size={20} />
                  ) : (
                    <GoBell size={20} />
                  )}
                  {new_notifications_count > 0 && (
                    <div className="bg-red-500 max-w-fit h-[15px] p-[2px] w-fit max-h-[15px] min-w-[15px] min-h-[15px] font-opensans font-semibold border-[2px] flex items-center justify-center border-neutral-100 rounded-md text-[7pt]  text-white absolute top-[-3px] right-0">
                      {new_notifications_count}
                    </div>
                  )}
                </div>
              </Link>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu className="flex justify-end">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  title={firstName + " " + lastName}
                  className="bg-transparent"
                >
                  {profilePicture ? (
                    <Avatar>
                      <AvatarImage
                        src={createUrl(
                          profilePicture.base64,
                          profilePicture.type
                        )}
                      ></AvatarImage>
                      <AvatarFallback className="flex items-center justify-center">
                        {(firstName[0] + lastName[0] || "").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User />
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] !z-[1000] relative">
                    {user.map((usr, key) => (
                      <NavItem key={usr.title}>
                        {usr.icon}
                        <ListItem
                          key={usr.title}
                          title={usr.title}
                          href={usr.href}
                          onClick={usr.onClick}
                        ></ListItem>
                      </NavItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// <NavigationMenu className="w-fit mx-auto p-2 sticky top-0 bg-white !z-[100]">
//   <NavigationMenuList>
//     <NavigationMenuItem>
//       <Link href="/site/feed" legacyBehavior passHref>
//         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//           <Home />
//         </NavigationMenuLink>
//       </Link>
//     </NavigationMenuItem>
//     <NavigationMenuItem onClick={handleChatClick}>
//       <Link href="/site/chat" legacyBehavior passHref>
//         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//           <MessageCircle />
//         </NavigationMenuLink>
//       </Link>
//     </NavigationMenuItem>
//     <Link href="/site/notifications" legacyBehavior passHref>
//       <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//         <Bell />
//       </NavigationMenuLink>
//     </Link>
//     <NavigationMenuItem>
//       <NavigationMenuTrigger>
//         <User />
//       </NavigationMenuTrigger>
//       <NavigationMenuContent>
//         <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] !z-[1000] relative">
//           {user.map((items) => (
//             <NavItem key={items.title}>
//               {items.icon}
//               <ListItem
//                 key={items.title}
//                 title={items.title}
//                 href={items.href}
//               ></ListItem>
//             </NavItem>
//           ))}
//         </ul>
//       </NavigationMenuContent>
//     </NavigationMenuItem>
//     <p>Logged in as {firstName + " " + lastName}</p>
//   </NavigationMenuList>
// </NavigationMenu>
