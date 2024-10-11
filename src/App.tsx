import { useState, ChangeEvent } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/Weather";

function App() {
  const [searchTerm, setsearchTerm] = useState<string>("london");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchTerm(e.target.value);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <MovieList searchTerm={searchTerm}/>
    </>
  );
}

export default App;
