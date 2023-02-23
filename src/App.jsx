import Home from "./app/views/home/Home";
import PageNotFound from "./app/views/pageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./app/shared/sharedLayout/SharedLayout";
import Login from "./app/views/account/Login";
import { SignUp } from "./app/views/account/Signup";
import Page2 from "./app/views/page2/Page2";
import Page3 from "./app/views/page3/Page3";
import Page1 from "./app/views/page1/Page1";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="page1" element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="page3" element={<Page3 />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
