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
import { Home, MessageCircle, Tv, UserRound, UsersRound } from "lucide-react";

const chats: { title: string; href: string; icon: React.ReactNode }[] = [
  {
    title: "Private",
    href: "/chat/private",
    icon: <UserRound />,
  },
  {
    title: "Group",
    href: "/chat/group",
    icon: <UsersRound />,
  },
  {
    title: "Channel",
    href: "/chat/channel",
    icon: <Tv />,
  },
];

export default function Navbar() {
  return (
    <NavigationMenu className="mx-auto bg-red-500 flex justify-between !w-full">
      <h1>Orbit</h1>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
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
                <div
                  key={chat.title}
                  className="flex items-center justify-start gap-3"
                >
                  {chat.icon}
                  <ListItem
                    key={chat.title}
                    title={chat.title}
                    href={chat.href}
                  ></ListItem>
                </div>
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
