import { QueryClient, QueryClientProvider } from 'react-query';
import RegisterForm from './Components/RegisterForm';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <RegisterForm />
      </QueryClientProvider>
    </main>
  );
}

export default App;
