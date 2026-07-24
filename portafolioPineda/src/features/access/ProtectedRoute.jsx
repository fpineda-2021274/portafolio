import {
  Navigate,
  useLocation,
} from 'react-router-dom'

import useDemoSession from './useDemoSession.jsx'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuthenticated } = useDemoSession()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/demo-access"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
        }}
      />
    )
  }

  return children
}