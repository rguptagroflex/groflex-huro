import Home from "./app/views/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SharedLayout from "./app/shared/sharedLayout/SharedLayout";
import Login from "./app/views/account/Login";
import Signup from "./app/views/account/Signup";
import Estimates from "./app/views/estimates/Estimates";
import Articles from "./app/views/articles/Articles";
import Dashboard from "./app/views/dashboard/Dashboard";
import AccountSettings from "./app/views/accountSettings/AccountSettings";
import Preferences from "./app/views/preferences/Preferences";
import Notifications from "./app/views/notifications/Notifications";
import Contacts from "./app/views/contacts/Contacts";
import Expenses from "./app/views/expenses/Expenses";
import CashAndBank from "./app/views/cashAndBank/CashAndBank";
import CreateArticle from "./app/views/articles/CreateArticle";
import CreateContact from "./app/views/contacts/CreateContact";
import EditContact from "./app/views/contacts/EditContact";
import EmailVerification from "./app/views/account/EmailVerification";
import store from "./app/redux/store";
import MobileVerification from "./app/views/account/MobileVerification";
import EditArticle from "./app/views/articles/EditArticle";
import ArticleDetail from "./app/views/articles/ArticleDetail";
import "./assets/scss/main.scss";
import "./styles/app.scss";
import TasksOverview from "./app/views/crm/tasks/TasksOverview";
import DealsOverview from "./app/views/crm/deals/DealsOverview";
import ContactManagement from "./app/views/crm/contactManagement/ContactManagement";
import CrmCreateForm from "./app/views/crm/CrmCreateForm";
import LeadOverview from "./app/views/crm/leads/LeadOverview";
import LeadDetails from "./app/views/crm/leads/LeadDetails";
import ContactManagementDetails from "./app/views/crm/contactManagement/ContactManagementDetails";
import TaskDetails from "./app/views/crm/tasks/TaskDetails";

store.subscribe(() => {
  // console.log(store.getState());
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="estimates" element={<Estimates />} />
          {/* Articles */}
          <Route path="articles" element={<Articles />} />
          <Route path="article/:articleId" element={<ArticleDetail />} />
          <Route path="article/new" element={<CreateArticle />} />
          <Route path="article/edit/:articleId" element={<EditArticle />} />
          {/* Contacts */}
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts-create" element={<CreateContact />} />
          <Route path="contacts-edit/:contactId" element={<EditContact />} />
          {/* Other */}
          <Route path="expenses" element={<Expenses />} />
          <Route path="cash-and-bank" element={<CashAndBank />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="notifications" element={<Notifications />} />
          //CRM route
          <Route
            path="/crm/contact-management"
            element={<ContactManagement />}
          />
          <Route path="/crm/create-form" element={<CrmCreateForm />} />
          <Route path="/crm/leads" element={<LeadOverview />} />
          <Route path="/crm/leads/:leadId" element={<LeadDetails />} />
          <Route
            path="/crm/contact-management/:contactManagementId"
            element={<ContactManagementDetails />}
          />
          <Route path="/crm/deals-overview" element={<DealsOverview />} />
          <Route path="/crm/tasks-overview" element={<TasksOverview />} />
          <Route path="/crm/task-details" element={<TaskDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/mobile-verification" element={<MobileVerification />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
