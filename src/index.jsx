import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from 'App'
import { LoaderAnimation } from 'components/shared'
import initSentry from 'config/sentry'
import * as serviceWorkerRegistration from 'serviceWorkerRegistration'
import { store, persistor } from 'store'
import 'styles/styles.css'

const rootElement = document.getElementById('root')

initSentry()

const StrictApp = () => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoaderAnimation />} persistor={persistor}>
        <Router>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<StrictApp />, rootElement)
} else {
  ReactDOM.render(<StrictApp />, rootElement)
}

serviceWorkerRegistration.register()
