import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import chakraBaseTheme from "./styles/chakraBaseTheme.ts";
import mockWorker from "./api/mock.ts";

mockWorker.start({
    onUnhandledRequest: 'bypass',
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ChakraProvider theme={chakraBaseTheme}>
          <App/>
      </ChakraProvider>
  </React.StrictMode>,
)
