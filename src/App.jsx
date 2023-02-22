import Home from "./app/views/home/Home";
import PageNotFound from "./app/views/pageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./app/shared/sharedLayout/SharedLayout";
import Login from "./app/views/account/Login";
import { SignUp } from "./app/views/account/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
