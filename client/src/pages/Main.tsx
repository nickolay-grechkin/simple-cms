import { Outlet, useLocation } from "react-router-dom";
import { Tabs, Link } from "@chakra-ui/react";
import { PiStackSimpleBold } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";

export const Main: React.FC = () => {
  const pathname = useLocation();

  return (
    <div>
      <Tabs.Root
        defaultValue="content"
        value={pathname.pathname.split("/")[1]}
        backgroundColor="#7e00fc"
        height="42px"
        color="white"
      >
        <Tabs.List borderBottomWidth={0}>
          <Tabs.Trigger
            value="content"
            asChild
            color="white"
            _before={{
              color: "white",
              height: "4px",
              backgroundColor: "white",
            }}
            _hover={{
              backgroundColor: "#7e00fc",
              color: "white",
            }}
            fontWeight="bold"
          >
            <Link unstyled href="/content#content">
              <FiEdit3 />
              Content
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="schema"
            asChild
            color="white"
            _before={{
              color: "white",
              height: "4px",
              backgroundColor: "white",
            }}
            _hover={{
              backgroundColor: "#7e00fc",
              color: "white",
            }}
            fontWeight="bold"
          >
            <Link unstyled href="/schema">
              <PiStackSimpleBold />
              Schema
            </Link>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
