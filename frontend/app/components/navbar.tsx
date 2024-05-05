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

const chats: { title: string; href: string; icon: React.ReactNode }[] = [
  {
    title: "Private",
    href: "/site/chat/private",
    icon: <UserRound />,
  },
  {
    title: "Group",
    href: "/site/chat/group",
    icon: <UsersRound />,
  },
  {
    title: "Channel",
    href: "/site/chat/channel",
    icon: <Tv />,
  },
];

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
  return (
    <NavigationMenu className="w-fit mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/site/feed" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <MessageCircle />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col w-[200px] gap-3 p-4  ">
              {chats.map((chat) => (
                <NavItem key={chat.title}>
                  {chat.icon}
                  <ListItem
                    key={chat.title}
                    title={chat.title}
                    href={chat.href}
                  ></ListItem>
                </NavItem>
              ))}
            </ul>
          </NavigationMenuContent>
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
