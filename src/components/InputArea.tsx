import { Textarea } from "@mantine/core"
import { atom, useAtom, useSetAtom } from "jotai"
import { historyListAtom, } from "./History"
import { dfCtx } from "../App"

export const sqlAtom = atom('')

export function InputArea() {
  const [sql, setSql] = useAtom(sqlAtom)
  const setHistoryList = useSetAtom(historyListAtom)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSql(e.currentTarget.value)
  }

  const handleCtrlEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      doQuery();

      e.currentTarget.value = ''
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

  return (
    < Textarea
      className="m-4"
      size="md"
      radius="m"
      minRows={4}
      maxRows={7}
      autosize={true}
      description="Ctrl + Enter to execute"
      placeholder="SQL here"
      onChange={handleChange}
      onKeyDown={handleCtrlEnter}
    />)
}