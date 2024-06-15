import ExpandableButton, {
  ExpandableButtonContent,
  ExpandableButtonInput,
  ExpandableButtonItem,
  ExpandableButtonTitle,
  ExpandableButtonTrigger,
} from "@/app/components/expandable-button";
import Heading from "@/app/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";

function Settings() {
  return (
    <div className="max-w-prose mx-auto bg-white h-screen px-4 py-2">
      <Heading>Settings</Heading>
      <div className="h-full w-full flex flex-col gap-1 mt-5">
        <ExpandableButton>
          <ExpandableButtonTrigger>Display</ExpandableButtonTrigger>
          <ExpandableButtonContent>
            <ExpandableButtonItem>
              <ExpandableButtonTitle>Primary-Font</ExpandableButtonTitle>
              <ExpandableButtonInput>
                <select defaultValue={0}>
                  <option>Open Sans</option>
                  <option>Lato</option>
                  <option>System Default</option>
                </select>
              </ExpandableButtonInput>
            </ExpandableButtonItem>
            <ExpandableButtonItem>
              <ExpandableButtonTitle>Theme</ExpandableButtonTitle>
              <ExpandableButtonInput>
                <select defaultValue={0}>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </ExpandableButtonInput>
            </ExpandableButtonItem>
          </ExpandableButtonContent>
        </ExpandableButton>
        <ExpandableButton>
          <ExpandableButtonTrigger>Chat</ExpandableButtonTrigger>
          <ExpandableButtonContent>
            <ExpandableButtonItem>
              <ExpandableButtonTitle>Online Indicator</ExpandableButtonTitle>
              <ExpandableButtonInput>
                <select defaultValue={0}>
                  <option>On</option>
                  <option>Off</option>
                </select>
              </ExpandableButtonInput>
            </ExpandableButtonItem>
            <ExpandableButtonItem>
              <ExpandableButtonTitle>Typing Indicator</ExpandableButtonTitle>
              <ExpandableButtonInput>
                <select defaultValue={0}>
                  <option>On</option>
                  <option>Off</option>
                </select>
              </ExpandableButtonInput>
            </ExpandableButtonItem>
          </ExpandableButtonContent>
        </ExpandableButton>
      </div>
    </div>
  );
}

export default Settings;
