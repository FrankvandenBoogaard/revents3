import { Route, useLocation } from "react-router-dom";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/events/nav/NavBar";
import "./App.css";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "../common/errors/ErrorComponent";
import AccountPage from "../../features/auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "../../features/profiles/profilepage/ProfilePage";
import Test from "../../features/sandbox/Test";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content='Loading app...' />;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6'>
      <>
        <ModalManager />
        <ToastContainer position='bottom-right' hideProgressBar />
        <Route exact path='/' component={HomePage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <>
              <NavBar />
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <PrivateRoute
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
              <PrivateRoute path='/account' component={AccountPage} />
              <PrivateRoute path='/profile/:id' component={ProfilePage} />
              <Route path='/error' component={ErrorComponent} />
              <Route path='/test' component={Test} />
            </>
          )}
        />
      </>
    </div>
  );
}
