import { useState } from "react";
import CreateArea from "./components/CreateArea/CreateArea";
import Header from "./components/Header/Header";
import LadingPage from "./Pages/LadingPage";
import LoginPage from "./Pages/LoginPage";
import PageNotFound from "./Pages/PageNotFound";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Sidebar from "./components/Sidebar/Sidebar";
import RegisterPage from "./Pages/RegisterPage";
import EmailVerification from "./Pages/EmailVerification";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordVerification from "./Pages/PasswordVerification";
import UpdatePassword from "./Pages/UpdatePassword";
import NoNetwork from "./Pages/NoNetwork";
import OwnedNotes from "./components/OwnedNotes/OwnedNotes";
import OtherNotes from "./components/OtherNotes/OtherNotes";
import NotesByLink from "./Pages/NotesByLink/NotesByLink";
import HiddenNotes from "./components/HiddenNotes/HiddenNotes";



function App() {
  const [mainTheme,setMainTheme]=useState("")
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard">
            <>
            <Header mainTheme={mainTheme} setMainTheme={setMainTheme}/>
            <Sidebar />
            <Switch>
            <Route path="/dashboard/ownedNotes">
              <OwnedNotes />
            </Route>
            <Route path="/dashboard/otherNotes">
              <OtherNotes />
            </Route>
            <Route path="/dashboard/hiddenNotes">
                <HiddenNotes />
              </Route>
            <Route  path="/">
             <CreateArea />
            </Route>
            </Switch>
           
            </>
          </Route>
          <Route exact path="/">
            <LadingPage />
          </Route>
          <Route path="/notesbylink/:token">
              <NotesByLink />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/forgotPassword">
              <ForgotPassword />
            </Route>
            <Route path="/updatePassword/:token">
                <UpdatePassword />
              </Route>
          <Route path="/verification">
              <EmailVerification />
            </Route>
            <Route path="/passwordVerification">
              <PasswordVerification  />
            </Route>
            <Route path="/noNetwork">
                <NoNetwork />
              </Route>
          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
   
    </div>
  );
}

export default App;
