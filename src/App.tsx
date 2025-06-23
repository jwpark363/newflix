import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./routes/Home"
import Tv from "./routes/Tv"
import Search from "./routes/Search"
import Header from "./components/Header"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/newflix" element={<Home />}>
          <Route path=":id" element={<Home />} />
        </Route>
        <Route path="/newflix/tv" element={<Tv />}>
          <Route path=":id" element={<Tv />} />
        </Route>
        <Route path="/newflix/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
