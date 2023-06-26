import React, { useContext, useState } from "react";
import { userContext } from "../context/UserContext";
import CreateTicket from "./CreateTicket";
import { node_url } from "../Helper/Helper";

function Navbar() {
   const { setUser, user } = useContext(userContext);
   const [modalShow, setModalShow] = useState(false);

   return (
      <>
         <CreateTicket show={modalShow} onHide={() => setModalShow(false)} />

         <nav
            class="navbar-div navbar navbar-expand-xl navbar-light bg-light shadow"
            aria-label="Fifth navbar example"
         >
            <div class="container-fluid">
               {/* <a class="navbar-brand" href="#">ADMERK</a> */}
               <a class="navbar-brand" href="/">
                  <img src="/assets/images/newLogo.png" alt="" />
               </a>
               <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarsExample05"
                  aria-controls="navbarsExample05"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span class="navbar-toggler-icon"></span>
               </button>

               <div class="collapse navbar-collapse" id="navbarsExample05">
                  <ul class="navbar-nav ms-auto mb-2 mb-xl-0">
                     <li class="nav-item pe-4">
                        <div className="nav-link align-items-center google-language-div">
                           <i class="fa fa-language me-2"></i>
                           <div id="google_element"></div>
                        </div>
                     </li>
                     {user?.role < 3 ? (
                        <>
                           <li class="nav-item pe-4">
                              <a class="nav-link" href="/tickets">
                                 View Tickets
                              </a>
                           </li>
                           <li class="nav-item pe-4">
                              <a class="nav-link" href="/all-user">
                                 All Users
                              </a>
                           </li>
                           <li class="nav-item pe-4">
                              <a class="nav-link" href="/all-companies">
                                 All Companies
                              </a>
                           </li>
                           <li class="nav-item pe-4">
                              <a class="nav-link" href="/skills">
                                 Skills
                              </a>
                           </li>
                           <li class="nav-item pe-4">
                              <a class="nav-link" href="/hobby">
                                 Hobbies
                              </a>
                           </li>
                           <li class="nav-item pe-4">
                              <a class="nav-link" href="/all-jobs">
                                 All Jobs
                              </a>
                           </li>
                        </>
                     ) : (
                        <>
                           <li class="nav-item align-self-center">
                              <button
                                 style={{ backgroundColor: "#2948ff" }}
                                 type="button"
                                 class="btn btn-primary btn-sm"
                                 onClick={() => setModalShow(!modalShow)}
                              >
                                 Create A Ticket
                              </button>
                           </li>
                           <li class="nav-item px-4">
                              <a class="nav-link" href="/tickets">
                                 My Tickets
                              </a>
                           </li>
                           {user?.role == 3 && (
                              <>
                                 <li class="nav-item pe-4">
                                    <a class="nav-link" href="/all-jobs">
                                       My Jobs
                                    </a>
                                 </li>
                                 <li class="nav-item pe-4">
                                    <a class="nav-link" href="/my-boots">
                                       My Bootcamps
                                    </a>
                                 </li>
                              </>
                           )}
                           {user?.role == 4 && (
                              <>
                                 <li class="nav-item pe-4">
                                    <a
                                       class="nav-link"
                                       href="/refugee-dashboard"
                                    >
                                       Jobs
                                    </a>
                                 </li>
                                 <li class="nav-item pe-4">
                                    <a class="nav-link" href="/boots-refugee">
                                       Bootcamps
                                    </a>
                                 </li>
                              </>
                           )}
                           {user?.role == 6 && (
                              <>
                                 <li class="nav-item pe-4">
                                    <a class="nav-link" href="/my-jobs">
                                       My Jobs
                                    </a>
                                 </li>
                                 <li class="nav-item pe-4">
                                    <a class="nav-link" href="/my-boots">
                                       My Bootcamps
                                    </a>
                                 </li>
                              </>
                           )}
                        </>
                     )}
                  </ul>

                  <div className="dropdown user-photo">
                     <a
                        class="nav-link dropdown-toggle d-flex align-items-center"
                        href="#"
                        id="dropdown1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                     >
                        {/* {user?.role === 6 ? (
                           user.logo ? (
                              <img
                                 className="me-2"
                                 src={node_url + user.logo}
                                 alt=""
                              />
                           ) : ( */}
                        <img
                           className="me-2"
                           src="/assets/images/no-user.png"
                           alt=""
                        />
                        {/* )
                        ) : (
                           <img
                              className="me-2"
                              src="/assets/images/no-user.png"
                              alt=""
                           />
                        )} */}
                        <p className="mb-0">My Profile</p>
                     </a>
                     <ul class="dropdown-menu" aria-labelledby="dropdown1">
                        <li>
                           <a class="dropdown-item" href="/profile">
                              My Account
                           </a>
                        </li>
                        <li>
                           <a class="dropdown-item" href="/change-password">
                              Change Password
                           </a>
                        </li>
                        <li className="mt-1">
                           <a
                              class="dropdown-item"
                              href="javascript:void(0)"
                              onClick={() => {
                                 setUser(null);
                              }}
                           >
                              Logout
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
}

export default Navbar;
