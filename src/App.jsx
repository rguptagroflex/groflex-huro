import Home from "./app/views/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./app/shared/sharedLayout/SharedLayout";
import Login from "./app/views/account/Login";
import { SignUp } from "./app/views/account/Signup";
import Estimates from "./app/views/estimates/Estimates";
import Articles from "./app/views/articles/Articles";
import Dashboard from "./app/views/dashboard/Dashboard";
import AccountSettings from "./app/views/accountSettings/AccountSettings";
import Preferences from "./app/views/preferences/Preferences";
import Notifications from "./app/views/notifications/Notifications";
import Contacts from "./app/views/contacts/Contacts";
import Expenses from "./app/views/expenses/Expenses";
import CashAndBank from "./app/views/cashAndBank/CashAndBank";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="estimates" element={<Estimates />} />
          <Route path="articles" element={<Articles />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="cash-and-bank" element={<CashAndBank />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
