import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppShell from './AppShell.jsx'
import { routeConfig } from './routeConfig.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          {routeConfig.map((route) => (
            <Route
              key={route.index ? 'index' : route.path}
              index={route.index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}