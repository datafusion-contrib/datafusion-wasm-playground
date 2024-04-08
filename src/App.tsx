import './App.css'
import * as datafusion_wasm from 'datafusion-wasm'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { History } from './components/History.tsx';
import { InputArea } from './components/InputArea.tsx';
import { Sidebar } from './components/Sidebar.tsx';

console.log(datafusion_wasm.DataFusionContext.greet())
export const dfCtx = datafusion_wasm.DataFusionContext.new()

function App() {
  return (
    <MantineProvider>
      <main className="h-svh w-screen">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="history">
          <History />
        </div>

        <div className="input-area">
          <InputArea />
        </div>
      </main>
    </MantineProvider>
  )
}

export default App
