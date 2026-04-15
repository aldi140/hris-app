import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

function App() {
  const element = useRoutes(routes);
  const { handleAuthFromUrl } = useAuth();

  useEffect(() => {
    handleAuthFromUrl();
  }, []);

  return element;
}
export default App;
