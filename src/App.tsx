import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider  client={queryClient}>
      <Header />
      <MovieList />
      </QueryClientProvider>
    </>
  );
}

export default App;
