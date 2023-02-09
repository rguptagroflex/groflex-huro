import "./assets/scss/main.scss";
import "./App.css";
import Home from "./pages/home/Home";
import SidebarWithPanel from "./components/SidebarWithPanel";
import PageContent from "./components/pageContent/PageContent";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { AppContext } from "./context/appContext";
import { useState } from "react";

function App() {
  const [appContext, setAppContext] = useState({
    isPushedFull: true,
  });

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      <SidebarWithPanel />
      <PageContent title={"My title"}>
        <Home />
      </PageContent>
    </AppContext.Provider>
  );
}

export default App;
