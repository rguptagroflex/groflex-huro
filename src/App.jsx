import Home from "./app/views/home/Home";
import PageNotFound from "./app/views/pageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./app/shared/sharedLayout/SharedLayout";
import Login from "./app/views/account/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index p element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
