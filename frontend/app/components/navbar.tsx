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
  Lock,
  LogOut,
  MessageCircle,
  Settings,
  Tv,
  User,
  UserRound,
  UsersRound,
} from "lucide-react";
import NavItem from "./navitem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  closeChatArea,
  openChatSideBar,
} from "@/lib/redux/slices/chat/chatSlice";
import { fetchUser } from "@/lib/redux/slices/user/userThunks";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

export default function Navbar() {
  const { firstName, lastName } = useSelector((state: RootState) => state.User);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const dialogTriggerRef = React.useRef<HTMLButtonElement>(null);

  function handleChatClick() {
    dispatch(openChatSideBar());
    if (window.innerWidth <= 950) {
      dispatch(closeChatArea());
    }
  }

  React.useLayoutEffect(() => {
    dispatch(fetchUser());
  }, []);

  const links = [
    {
      href: "/site/feed",
      label: "Home",
      icon: <Home />,
    },
    {
      href: "/site/chat",
      label: "Chat",
      onClick: handleChatClick,
      icon: <MessageCircle />,
    },
    {
      href: "/site/notifications",
      label: "Notifications",
      icon: <Bell />,
    },
    {
      href: "#",
      label: "You",
      icon: <User />,
    },
  ];

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
    <div>
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
      <div className="flex w-full justify-center  bg-neutral-200 bg-opacity-50 backdrop-blur-md  !z-[100000]">
        <div className="flex gap-10 items-center p-2   top-0 ">
          <div className="w-full absolute left-0 h-full flex justify-between  px-4">
            <span
              className="self-center  font-bold font-lemonMilk tracking-[5pt]  flex items-center gap-2 cursor-pointer hover:opacity-100 duration-100 ease-in"
              onClick={() => router.push("/site/feed")}
            >
              <Image src={"/logo/logo.ico"} alt="" width={25} height={25} />
              <span className="hidden md:block opacity-60">Orbitum</span>
            </span>
            <span className="hidden md:flex text-[5pt] self-center  font-bold font-lemonMilk tracking-[5pt] opacity-60 items-center gap-2 duration-100 ease-in">
              Alpha Release
            </span>
          </div>
          <NavigationMenu className="!relative">
            <NavigationMenuList className=" relative ">
              {links.map((link, key) => {
                if (link.href === "#") {
                  let node;
                  switch (link.label) {
                    case "You":
                      node = user.map((usr, key) => (
                        <NavItem key={usr.title}>
                          {usr.icon}
                          <ListItem
                            key={usr.title}
                            title={usr.title}
                            href={usr.href}
                            onClick={usr.onClick}
                          ></ListItem>
                        </NavItem>
                        // <Link href={usr.href} className="hover:underline">
                        //   {usr.title}
                        // </Link>
                      ));
                      break;
                    default:
                      break;
                  }
                  return (
                    <NavigationMenuItem>
                      <NavigationMenuTrigger title={link.label}>
                        {link.icon}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] !z-[1000] relative">
                          {node}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
                return (
                  <Link
                    href={link.href}
                    className=" px-4 rounded-md py-2 hover:bg-white duration-100 ease-in-out"
                    onClick={link.onClick}
                    title={link.label}
                  >
                    {link.icon}
                  </Link>
                );
              })}
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
