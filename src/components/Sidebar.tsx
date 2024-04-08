import { Title, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { atom, useAtom, useAtomValue } from "jotai";
import { About } from "./About";
import { CloudConfig } from "./CloudConfig";

// unresolved problem:
// - icon is not rounded
// - active tab acon is not blue

const mainTabData = [
  { icon: "i-tabler-info-circle", label: 'About' },
  { icon: "i-tabler-cloud-share", label: 'Cloud' },
  { icon: "i-tabler-file-upload", label: 'Upload' },
  { icon: "i-tabler-settings", label: 'Settings' },
];

const activeTabAtom = atom("About")

function switchTab() {
  const activeTab = useAtomValue(activeTabAtom)
  switch (activeTab) {
    case "About": return <About />
    case "Cloud": return <CloudConfig />
    default: return <div>Empty Tab</div>
  }
}

export function Sidebar() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const mainTabs = mainTabData.map((tab) => (
    <Tooltip
      label={tab.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={tab.label}
    >
      <UnstyledButton
        onClick={() => setActiveTab(tab.label)}
        className={"size-7 rounded-5 flex flex-items-center flex-justify-center " + tab.label === activeTab ? " c-blue-5 bg-blue-1" : " hover:bg-gray-2"}
        data-active={tab.label === activeTab || undefined}
      >
        <div className={tab.icon + " m-1 rounded"} style={{ width: rem(22), height: rem(22) }} />
      </UnstyledButton>
    </Tooltip>
  ));


  return (
    <nav className="bg-white h-full flex flex-col border-r-solid border-r-gray border-r-1">
      <div className="flex flex-auto">
        <div className="flex-initial bg-white flex flex-col flex-items-center border-r-solid border-r-gray border-r-1">
          <div className="w-full flex flex-justify-center h-30px border-b-solid border-b-gray-3 border-b-1">
            <div className="i-tabler-arrow-badge-right-filled size-7" />
          </div>
          {mainTabs}
        </div>
        <div className="flex-auto bg-gray-1">
          <Title order={4} className="bg-white h-30px p-s border-b-solid border-b-gray border-b-1">
            {activeTab}
          </Title>

          <div className="p2">
            {switchTab()}
          </div>

        </div>
      </div>
    </nav>
  )
}