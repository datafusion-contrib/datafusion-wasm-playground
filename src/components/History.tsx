import { ActionIcon, Tooltip } from "@mantine/core";
import { atom, useAtomValue } from "jotai";

const initialGreeting = { query: '', result: 'DataFusion Playground is initialized!', isErr: false }

class ExecuteHistory {
  query!: string;
  result!: string;
  isErr!: boolean;
}

export const historyListAtom = atom([initialGreeting])

const actions = [
  // { tip: "Delete", icon: "i-tabler-trash", action: () => { } },
  // { tip: "Collapse", icon: "i-tabler-box-align-top", action: () => { } },
  { tip: "Copy Query", icon: "i-tabler-arrow-left-to-arc", action: (executeHistory: ExecuteHistory) => { navigator.clipboard.writeText(executeHistory.query) } },
  { tip: "Copy Result", icon: "i-tabler-copy", action: (executeHistory: ExecuteHistory) => { navigator.clipboard.writeText(executeHistory.result) } },
]

function ActionPanel(executeHistory: ExecuteHistory) {
  return (
    <div className="hidden group-hover-display-unset">
      {
        actions.map((action, index) => (
          <Tooltip key={index} label={action.tip}>
            <ActionIcon
              className={"m-r-2"}
              variant="outline"
              color="gray"
              onClick={() => { action.action(executeHistory) }}>
              <div className={action.icon} />
            </ActionIcon>
          </Tooltip>)
        )
      }
    </div>
  )
}

function HistoryItem(executeHistory: ExecuteHistory) {
  return (
    <div className={executeHistory.isErr ? "bg-red-200" : ""}>
      <div className="py-1 m1 position-relative group border-solid border-1 border-rd border-transparent hover:border-gray">
        <div className="hidden group-hover-display-unset position-absolute right-0 top-2">
          <ActionPanel {...executeHistory} />
        </div>

        <div className="break-words whitespace-pre-line">
          <pre className={"whitespace-pre-wrap " + (executeHistory.isErr ? "text-red-600" : "text-gray")}>{executeHistory.query}</pre>
          <pre className="whitespace-pre-wrap">{executeHistory.result}</pre>
        </div>
      </div>
    </div>
  )
}

export function History() {
  const results = useAtomValue(historyListAtom)

  return (
    <div className="overflow-auto flex max-h-80svh h-full flex-col-reverse">
      {
        results.map((result, index) => (<HistoryItem query={result.query} result={result.result} isErr={result.isErr} key={index} />))
      }
    </div>
  )
}