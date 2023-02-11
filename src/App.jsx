import "./assets/scss/main.scss";
import "./App.css";
import Home from "./app/views/home/Home";
import Sidebar from "./app/shared/components/Sidebar";
import PageContent from "./app/shared/components/pageContent/PageContent";
import PageNotFound from "./app/views/pageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./app/shared/sharedLayout/SharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
