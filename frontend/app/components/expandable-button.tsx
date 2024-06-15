import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

function ExpandableButton({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full" title={title}>
      {children}
    </div>
  );
}

export function ExpandableButtonItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-between">{children}</div>;
}

export function ExpandableButtonTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={"secondary"}
      className="flex justify-start gap-3 w-full !rounded-b-none"
    >
      {/* <ChevronRight size={15} /> */}
      <ExpandableButtonTitle>{children}</ExpandableButtonTitle>
    </Button>
  );
}

export function ExpandableButtonContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 px-4 py-2 text-[9pt]  font-semibold font-openSans flex flex-col gap-2">
      {children}
    </div>
  );
}

export function ExpandableButtonTitle({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="opacity-70">
      {children}
    </label>
  );
}

export function ExpandableButtonInput({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export default ExpandableButton;
