import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Style.css";
import "./index.css";
import "./App.css";
import AccountProfile from "./screens/AccountProfile";
import CommonSignup from "./screens/auth/CommonSignup";
import SignupCustomer from "./screens/auth/SignupCustomer";
import SignupSponser from "./screens/auth/SignupSponser";
import Layout from "./screens/Layout";
import SponsorDashboard from "./screens/sponser/SponsorDashboard";
import RaiseTicket from "./screens/refugee/RaiseTicket";
import RefugeeDashboard from "./screens/refugee/RefugeeDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { userContext } from "./context/UserContext";
import Login from "./screens/auth/Login";
import Terms from "./screens/Terms";
import Privacy from "./screens/Privacy";
import Skills from "./screens/Skills";
import Hobby from "./screens/Hobby";
import AllUser from "./screens/AllUser";
import Volunteer from "./screens/Volunteer";
import EditAccountProfile from "./screens/EditAccountProfile";
import VolunteerAdminDashboard from "./screens/VolunteerAdminDashboard";
import ChangePassword from "./screens/auth/ChangePassword";
import AllJobs from "./screens/AllJobs";
import ForgotPassword from "./screens/auth/ForgotPassword";
import CreateJob from "./screens/CreateJob";
import EditJOb from "./screens/EditJob";
import JobDetailPage from "./screens/JobDetailPage";
import JobApplicantList from "./screens/JobApplicantList";
import VerifyEmail from "./screens/auth/VerifyEmail";
import Loader from "./component/Loader";
import NonAuthLayout from "./screens/NonAuthLayout";
import SignupCompany from "./screens/auth/SignUpCompany";
import LoginCompany from "./screens/auth/LoginCompany";
import CompanyDashboard from "./screens/company/DashboardCompany";
import AllCompanies from "./screens/company/AllCompanies";
import MyJobs from "./screens/company/MyJobs";
import MyBootcamps from "./screens/company/Bootcamps";
import CreateBootcamp from "./screens/company/CreateBootcamp";
import EditBootcamp from "./screens/company/EditBootcamp";
import BootcampsMain from "./screens/refugee/BootcampsMain";

function App() {
   const { load } = useContext(userContext);

   return (
      <>
         <ToastContainer />
         {load && <Loader />}
         <BrowserRouter>
            <Routes>
               <Route
                  path="/"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <CommonSignup />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/login"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <Login />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/forgot-password"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <ForgotPassword />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/signup"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <CommonSignup />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/signup-sponser"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <SignupSponser />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/signup-company"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <SignupCompany />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/login-company"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <LoginCompany />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/company-dashboard"
                  exact={true}
                  element={
                     <Layout>
                        <CompanyDashboard />
                     </Layout>
                  }
               />
               <Route
                  path="/all-companies"
                  exact={true}
                  element={
                     <Layout>
                        <AllCompanies />
                     </Layout>
                  }
               />
               <Route
                  path="/my-jobs"
                  exact={true}
                  element={
                     <Layout>
                        <MyJobs />
                     </Layout>
                  }
               />
               <Route
                  path="/my-boots"
                  exact={true}
                  element={
                     <Layout>
                        <MyBootcamps />
                     </Layout>
                  }
               />
               <Route
                  path="/create-boot"
                  exact={true}
                  element={
                     <Layout>
                        <CreateBootcamp />
                     </Layout>
                  }
               />
               <Route
                  path="/edit-boot"
                  exact={true}
                  element={
                     <Layout>
                        <EditBootcamp />
                     </Layout>
                  }
               />
               <Route
                  path="/boots-refugee"
                  exact={true}
                  element={
                     <Layout>
                        <BootcampsMain />
                     </Layout>
                  }
               />
               <Route
                  path="/signup-refugee"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <SignupCustomer />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/verifyemail"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <VerifyEmail />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/terms-and-conditions"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <Terms />
                     </NonAuthLayout>
                  }
               />
               <Route
                  path="/privacy-policy"
                  exact={true}
                  element={
                     <NonAuthLayout>
                        <Privacy />
                     </NonAuthLayout>
                  }
               />

               <Route
                  path="/change-password"
                  exact={true}
                  element={
                     <Layout>
                        <ChangePassword />
                     </Layout>
                  }
               />
               <Route
                  path="/create-volunteer"
                  exact={true}
                  element={
                     <Layout>
                        <Volunteer />
                     </Layout>
                  }
               />

               <Route
                  path="/sponsor-dashboard"
                  exact={true}
                  element={
                     <Layout>
                        <SponsorDashboard />
                     </Layout>
                  }
               />

               <Route
                  path="/refugee-dashboard"
                  exact={true}
                  element={
                     <Layout>
                        <RefugeeDashboard />
                     </Layout>
                  }
               />

               <Route
                  path="/admin-dashboard"
                  exact={true}
                  element={
                     <Layout>
                        <VolunteerAdminDashboard />
                     </Layout>
                  }
               />

               <Route
                  path="/profile"
                  exact={true}
                  element={
                     <Layout>
                        <AccountProfile />
                     </Layout>
                  }
               />

               <Route
                  path="/refugee-profile"
                  exact={true}
                  element={
                     <Layout>
                        <AccountProfile />
                     </Layout>
                  }
               />

               <Route
                  path="/edit-profile"
                  exact={true}
                  element={
                     <Layout>
                        <EditAccountProfile />
                     </Layout>
                  }
               />

               <Route
                  path="/tickets"
                  exact={true}
                  element={
                     <Layout>
                        <RaiseTicket />
                     </Layout>
                  }
               />

               <Route
                  path="/skills"
                  exact={true}
                  element={
                     <Layout>
                        <Skills />
                     </Layout>
                  }
               />

               <Route
                  path="/hobby"
                  exact={true}
                  element={
                     <Layout>
                        <Hobby />
                     </Layout>
                  }
               />

               <Route
                  path="/all-user"
                  exact={true}
                  element={
                     <Layout>
                        <AllUser />
                     </Layout>
                  }
               />

               <Route
                  path="/all-jobs"
                  exact={true}
                  element={
                     <Layout>
                        <AllJobs />
                     </Layout>
                  }
               />

               <Route
                  path="/create-job"
                  exact={true}
                  element={
                     <Layout>
                        <CreateJob />
                     </Layout>
                  }
               />
               <Route
                  path="/edit-job"
                  exact={true}
                  element={
                     <Layout>
                        <EditJOb />
                     </Layout>
                  }
               />
               <Route
                  path="/apply-job"
                  exact={true}
                  element={
                     <Layout>
                        <JobDetailPage />
                     </Layout>
                  }
               />
               <Route
                  path="/job-applicant-list"
                  exact={true}
                  element={
                     <Layout>
                        <JobApplicantList />
                     </Layout>
                  }
               />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
