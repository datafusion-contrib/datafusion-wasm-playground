import { Textarea } from "@mantine/core"
import { atom, useAtom } from "jotai"
import { useState } from "react";
import { historyListAtom, } from "./History"
import { dfCtx } from "../App"

export const sqlAtom = atom('')

const COMMAND_KEY = '⌘';
const CTRL_KEY = "Ctrl"

export function InputArea() {
  const [sql, setSql] = useAtom(sqlAtom)
  const [historyList, setHistoryList] = useAtom(historyListAtom);
  const [historyCursor, setHistoryCursor] = useState(-1);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSql(e.currentTarget.value)
  }

  const handleCtrlEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      doQuery();

      setSql("");
      setHistoryCursor(-1);
    }
    if (e.key === "ArrowUp") {
      const newHistoryCursor = Math.min(
        historyCursor + 1,
        historyList.length - 2
      );
      setHistoryCursor(newHistoryCursor);

      setSql(historyList[newHistoryCursor].query);
    }
    if (e.key === "ArrowDown") {
      const newHistoryCursor = Math.max(historyCursor - 1, -1);
      setHistoryCursor(newHistoryCursor);

      if (newHistoryCursor === -1) {
        setSql("");
      } else {
        setSql(historyList[newHistoryCursor].query);
      }
    }
  }

  const doQuery = () => {
    const result = dfCtx.execute_sql(sql)
    result.then((r: string) => {
      setHistoryList((history) => [{ query: sql, result: r, isErr: false }, ...history])
    }).catch((e: string) => {
      setHistoryList((history) => [{ query: sql, result: e, isErr: true }, ...history])
    })
    console.log('doQuery' + sql)
  }

  const isMac = navigator.userAgent.indexOf('Mac OS X') != -1;

  return (
    < Textarea
      className="m-4"
      size="md"
      radius="m"
      minRows={4}
      maxRows={7}
      autosize={true}
      description={`${isMac ? COMMAND_KEY : CTRL_KEY} + Enter to execute`}
      placeholder="SQL here"
      onChange={handleChange}
      value={sql}
      onKeyDown={handleCtrlEnter}
    />)
}