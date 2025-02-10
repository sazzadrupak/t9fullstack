import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import Home from './pages/Home';

/**
 * React Query Provider component
 * @param {PropsWithChildren} props - containing children to be rendered
 * @returns {JSX.Element} The `QueryClientProvider` component wrapping the children.
 */

const ReactQueryProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

/**
 * Main Component for rendering the app
 * @component
 * @returns {JSX.Element} The rendered Layout component
 */
const App = (): JSX.Element => {
  return (
    <ReactQueryProvider>
      <Home />
    </ReactQueryProvider>
  );
};

export default App;
