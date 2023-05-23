import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import chakraBaseTheme from "./styles/chakraBaseTheme"
import mockWorker from "./api/mock"
import { Provider } from 'react-redux'
import store from './store/store'

mockWorker.start({
    onUnhandledRequest: 'bypass',
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <ChakraProvider theme={chakraBaseTheme}>
              <App/>
          </ChakraProvider>
      </Provider>
  </React.StrictMode>,
)
