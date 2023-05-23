import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider} from '@chakra-ui/react'
import chakraBaseTheme from "./styles/chakraBaseTheme"
import mockWorker from "./api/mock"
import {DevTools} from "jotai-devtools";

mockWorker.start({
    onUnhandledRequest: 'bypass',
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={chakraBaseTheme}>
            <DevTools isInitialOpen/>
            <App/>
        </ChakraProvider>
    </React.StrictMode>,
)
