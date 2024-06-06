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

const user: { title: string; href: string; icon: React.ReactNode }[] = [
  {
    title: "Settings & Privacy",
    href: "/site/settings",
    icon: <Settings />,
  },
  {
    title: "Help & Support",
    href: "/site/help",
    icon: <CircleHelp />,
  },
  {
    title: "Display & Accessibility",
    href: "/site/accessibility",
    icon: <Contrast />,
  },
  {
    title: "Logout",
    href: "/site/logout",
    icon: <LogOut />,
  },
];

export default function Navbar() {
  const { firstName, lastName } = useSelector((state: RootState) => state.User);

  const dispatch = useDispatch<AppDispatch>();

  function handleChatClick() {
    dispatch(openChatSideBar());
    if (window.innerWidth <= 950) {
      dispatch(closeChatArea());
    }
  }

  React.useLayoutEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <NavigationMenu className="w-fit mx-auto p-2 sticky top-0 ">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/site/feed" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem onClick={handleChatClick}>
          <Link href="/site/chat" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <MessageCircle />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <Link href="/site/notifications" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Bell />
          </NavigationMenuLink>
        </Link>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <User />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {user.map((items) => (
                <NavItem key={items.title}>
                  {items.icon}
                  <ListItem
                    key={items.title}
                    title={items.title}
                    href={items.href}
                  ></ListItem>
                </NavItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <p>Logged in as {firstName + " " + lastName}</p>
      </NavigationMenuList>
    </NavigationMenu>
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
