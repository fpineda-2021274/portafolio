import ProtectedRoute from '../features/access/ProtectedRoute.jsx'
import DemoAccessPage from '../pages/DemoAccessPage.jsx'
import DeveloperLabPage from '../pages/DeveloperLabPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import PortfolioPage from '../pages/PortfolioPage.jsx'

export const navigationItems = [
  {
    label: 'Portafolio',
    to: '/',
    end: true,
  },
  {
    label: 'Acceso demo',
    to: '/demo-access',
  },
  {
    label: 'Developer Lab',
    to: '/developer-lab',
  },
]

export const routeConfig = [
  {
    index: true,
    element: <PortfolioPage />,
  },
  {
    path: 'demo-access',
    element: <DemoAccessPage />,
  },
  {
    path: 'developer-lab',
    element: (
      <ProtectedRoute>
        <DeveloperLabPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]