import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { userContext } from "../../context/UserContext";
import { url } from "../../Helper/Helper";
import TextEditor from "../../component/TextEditor";

function SignupCompany() {
   const { setLoad } = useContext(userContext);
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [logo, setLogo] = useState();
   const [country, setCountry] = useState("");
   const [state, setState] = useState("");
   const [city, setCity] = useState("");
   const [countrylist, setCountryList] = useState([]);
   const [statelist, setStateList] = useState([]);
   const [citylist, setCityList] = useState([]);
   const [number, setNumber] = useState("");
   const [officeLoc, setOfficeLoc] = useState("");
   const [since, setSince] = useState("");
   const [adult, setAdult] = useState(false);
   const [citizen, setCitizen] = useState(false);
   const [sponsorGroup, setSponsorGroup] = useState("individual");
   const [sponsorCategory] = useState([]);
   const [zipcode, setZipcode] = useState("");

   function useQuery() {
      const { search } = useLocation();

      return React.useMemo(() => new URLSearchParams(search), [search]);
   }

   const type = useQuery().get("type");

   async function fetchCountry() {
      setLoad(true);
      var requestOptions = {
         redirect: "follow",
      };

      const response = await fetch(url + "country-list", requestOptions);
      if (response.ok === true) {
         setLoad(false);
         const data = await response.json();
         console.log(data);
         if (data.list.length > 0) {
            let arr = [];
            for (var i = 0; i < data.list.length; i++) {
               arr.push({
                  value: data.list[i].id,
                  label: data.list[i].name,
                  phoneCode: data.list[i].phoneCode,
               });
            }
            setCountryList(arr);
         } else {
            toast.error("");
         }
      } else {
         setLoad(false);
         toast.error("Internal Server Error");
      }
   }

   useEffect(() => {
      fetchCountry().catch((err) => {
         setLoad(false);
         toast.error(err.message);
      });
   }, []);

   async function handleSubmit(e) {
      setLoad(true);
      e.preventDefault();
      let error = 0;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("description", description);
      formData.append("role", 6); // for company

      // formData.append("whatsapp_number", whatsappnum);

      if (country?.value) {
         formData.append("country_id", country?.value);
         formData.append("country_name", country?.label);
         formData.append("country_code", country?.phoneCode);
      } else {
         error = error + 1;
      }

      if (state?.value) {
         formData.append("state_id", state?.value);
         formData.append("state_name", state?.label);
      } else {
         error = error + 1;
      }

      if (city?.value) {
         formData.append("city_id", city?.value);
         formData.append("city_name", city?.label);
      } else {
         error = error + 1;
      }

      formData.append("logo", logo);
      formData.append("zip_code", zipcode);
      formData.append("since", since);
      formData.append("number", number);
      formData.append("office_location", officeLoc);

      // if (type === "2") {
      //    // formData.append("user_type", "2");
      //    formData.append("18+", adult);
      //    formData.append("citizenship", citizen);
      //    formData.append("sponsor_group", sponsorGroup);
      //    formData.append("sponsor_cartegory", sponsorCategory.toString());
      // } else {
      //    formData.append("user_type", "1");
      // }

      if (error === 0) {
         const response = await fetch(url + "register-company", {
            method: "POST",
            body: formData,
         });

         if (response.ok === true) {
            setLoad(false);
            const data = await response.json();
            console.log(data);
            if (data.status === 200) {
               toast.success(data.message);
               setTimeout(() => {
                  window.location.reload();
               }, 2500);
            } else {
               toast.error(data?.message);
            }
         }
      } else {
         setLoad(false);
         toast.error("Please fill Data");
      }
   }

   async function fetchStateCountryList() {
      setLoad(true);

      const response = await fetch(
         url + "get-state-by-country/" + country?.value
      );
      if (response.ok === true) {
         setLoad(false);
         const data = await response.json();
         console.log(data);
         if (data.list.length > 0) {
            let arr = [];
            for (var i = 0; i < data.list.length; i++) {
               arr.push({
                  value: data.list[i].id,
                  label: data.list[i].name,
                  country_id: data.list[i].country_id,
               });
            }
            setStateList(arr);
         } else {
            toast.error("");
         }
      } else {
         setLoad(false);
         toast.error("Internal Server Error");
      }
   }
   async function fetchCityStateList() {
      setLoad(true);

      const response = await fetch(url + "get-city-by-state/" + state?.value);
      if (response.ok === true) {
         setLoad(false);
         const data = await response.json();
         console.log(data);
         if (data.list.length > 0) {
            let arr = [];
            for (var i = 0; i < data.list.length; i++) {
               arr.push({
                  value: data.list[i].id,
                  label: data.list[i].name,
                  country_id: data.list[i].country_id,
                  state_id: data.list[i].state_id,
               });
            }
            setCityList(arr);
         } else {
            toast.error("");
         }
      } else {
         setLoad(false);
         toast.error("Internal Server Error");
      }
   }

   useEffect(() => {
      if (country?.value) {
         setState("");
         setCity("");
         fetchStateCountryList().catch((err) => {
            setLoad(false);
            toast.error(err.message);
         });
      }
   }, [country]);
   useEffect(() => {
      if (state?.value) {
         setCity("");
         fetchCityStateList().catch((err) => {
            setLoad(false);
            toast.error(err.message);
         });
      }
   }, [state]);

   return (
      <div className="signup-both-div">
         <section className="h-custom" style={{ backgroundColor: "#0061df08" }}>
            <div className="container py-5 h-100">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-lg-8">
                     <div className="card rounded-3">
                        <div className="d-flex align-items-center justify-content-center mt-1">
                           <img
                              src="/assets/images/newLogo.png"
                              style={{ width: "19rem" }}
                           />
                        </div>
                        <div className="card-body p-4 p-md-5">
                           <h3 className="mb-4">
                              Sign Up
                              {type == "2" ? "As Sponsor" : " as a Company"}
                           </h3>

                           <form onSubmit={(e) => handleSubmit(e)}>
                              <div className="row">
                                 <div className="filter-form-MUI-input-text col-md-6">
                                    <main class="input-div">
                                       <input
                                          class="inner-input"
                                          type="file"
                                          placeholder=" "
                                          id="name"
                                          autoComplete="off"
                                          onChange={(e) =>
                                             setLogo(e.target.files[0])
                                          }
                                       />
                                       <label for="name" class="inner-label">
                                          Upload Company Logo
                                       </label>
                                    </main>
                                 </div>
                                 <div className="filter-form-MUI-input-text col-md-6">
                                    <main className="input-div">
                                       <input
                                          className="inner-input"
                                          type="text"
                                          id="name"
                                          autoComplete="off"
                                          required
                                          value={name}
                                          onChange={(e) =>
                                             setName(e.target.value)
                                          }
                                       />
                                       <label
                                          for="name"
                                          className="inner-label"
                                       >
                                          Name
                                       </label>
                                       {/* <span className='required'>*Required</span> */}
                                    </main>

                                    {/* <span className='error'>it is span tag</span> */}
                                 </div>
                                 <div className="filter-form-MUI-input-text col-md-6">
                                    <main className="input-div">
                                       <input
                                          className="inner-input"
                                          type="password"
                                          placeholder=" "
                                          id="password"
                                          autoComplete="off"
                                          required
                                          value={password}
                                          onChange={(e) =>
                                             setPassword(e.target.value)
                                          }
                                       />
                                       <label
                                          for="name"
                                          className="inner-label"
                                       >
                                          Password
                                       </label>
                                       {/* <span className='required'>*Required</span> */}
                                    </main>

                                    {/* <span className='error'>it is span tag</span> */}
                                 </div>

                                 <div className="filter-form-MUI-input-text col-md-6">
                                    <main className="input-div">
                                       <input
                                          className="inner-input"
                                          type="email"
                                          placeholder=" "
                                          id="name"
                                          autoComplete="off"
                                          required
                                          value={email}
                                          onChange={(e) =>
                                             setEmail(e.target.value)
                                          }
                                       />
                                       <label
                                          for="name"
                                          className="inner-label"
                                       >
                                          Email
                                       </label>
                                       {/* <span className='required'>*Required</span> */}
                                    </main>

                                    {/* <span className='error'>it is span tag</span> */}
                                 </div>

                                 <div className="filter-form-MUI-input-text col-md-6">
                                    <main className="input-div">
                                       <input
                                          className="inner-input"
                                          type="number"
                                          placeholder=" "
                                          id="number"
                                          autoComplete="off"
                                          required
                                          value={number}
                                          onChange={(e) =>
                                             setNumber(e.target.value)
                                          }
                                       />
                                       <label
                                          for="name"
                                          className="inner-label"
                                       >
                                          Contact Number
                                       </label>
                                       {/* <span className='required'>*Required</span> */}
                                    </main>

                                    {/* <span className='error'>it is span tag</span> */}
                                 </div>

                                 <div className="filter-form-MUI-input-text col-md-6">
                                    <main className="input-div">
                                       <input
                                          className="inner-input"
                                          type="text"
                                          placeholder=" "
                                          id="office location"
                                          autoComplete="off"
                                          required
                                          value={officeLoc}
                                          onChange={(e) =>
                                             setOfficeLoc(e.target.value)
                                          }
                                       />
                                       <label
                                          for="name"
                                          className="inner-label"
                                       >
                                          Office Location
                                       </label>
                                       {/* <span className='required'>*Required</span> */}
                                    </main>

                                    {/* <span className='error'>it is span tag</span> */}
                                 </div>

                                 <div className="filter-form-MUI-input-text col-md-6">
                                    <main className="input-div">
                                       <input
                                          className="inner-input"
                                          type="number"
                                          placeholder=" "
                                          id="since"
                                          autoComplete="off"
                                          value={since}
                                          onChange={(e) =>
                                             setSince(e.target.value)
                                          }
                                       />
                                       <label
                                          for="name"
                                          className="inner-label"
                                       >
                                          Since
                                       </label>
                                       {/* <span className='required'>*Required</span> */}
                                    </main>

                                    {/* <span className='error'>it is span tag</span> */}
                                 </div>

                                 {/* <div className="filter-form-MUI-input-text col-md-6">
                                    <main className="input-div">
                                       <input
                                          class="inner-input"
                                          type="text"
                                          placeholder=" "
                                          id="name"
                                          autoComplete="off"
                                          required
                                          value={whatsappnum}
                                          onChange={(e) =>
                                             setWhatsappNum(e.target.value)
                                          }
                                       />
                                       <label
                                          for="name"
                                          className="inner-label"
                                       >
                                          WhatsApp Number
                                       </label>
                                       {/* <span className='required'>*Required</span> */}
                                 {/* </main> */}

                                 {/* <span className='error'>it is span tag</span> */}
                                 {/* </div> */}

                                 <Select
                                    className="col-md-6 mb-3"
                                    options={countrylist}
                                    placeholder="Select Country"
                                    required
                                    value={country}
                                    onChange={setCountry}
                                 />
                                 <Select
                                    className="col-md-6 mb-3"
                                    options={statelist}
                                    placeholder="Select State"
                                    value={state}
                                    required
                                    onChange={setState}
                                 />

                                 <Select
                                    className="col-md-6 mb-3"
                                    options={citylist}
                                    placeholder="Select City"
                                    value={city}
                                    required
                                    onChange={setCity}
                                 />
                                 <div className="filter-form-MUI-input-text col-md-6">
                                    <main className="input-div">
                                       <input
                                          class="inner-input"
                                          type="text"
                                          placeholder=" "
                                          id="zip_code"
                                          autoComplete="off"
                                          required
                                          value={zipcode}
                                          onChange={(e) =>
                                             setZipcode(e.target.value)
                                          }
                                       />
                                       <label for="name" class="inner-label">
                                          ZIP Code
                                       </label>
                                       {/* <span className='required'>*Required</span> */}
                                    </main>

                                    {/* <span className='error'>it is span tag</span> */}
                                 </div>

                                 <div className="filter-form-MUI-input-text mt-3">
                                    <main class="input-div h-100">
                                       <textarea
                                          class="inner-input position-relative pt-3"
                                          type="text"
                                          placeholder=" "
                                          id="name"
                                          autoComplete="off"
                                          rows="8"
                                          value={description}
                                          onChange={(e) =>
                                             setDescription(e.target.value)
                                          }
                                       />
                                       <label for="name" class="inner-label">
                                          Description
                                       </label>
                                       {/* <TextEditor
                                          content={description}
                                          setContent={setDescription}
                                       /> */}
                                    </main>
                                 </div>

                                 {type == "2" && (
                                    <>
                                       <div className="filter-form-MUI-input-text col-md-6">
                                          <p className="mb-1 font-weight-bold">
                                             I am 18 years of age or older
                                          </p>
                                          <div className="d-flex align-items-center">
                                             <div className="me-4">
                                                <input
                                                   type="radio"
                                                   name="input-18"
                                                   className="me-2"
                                                   id="18-yes"
                                                   onChange={() =>
                                                      setAdult(true)
                                                   }
                                                />
                                                <label htmlFor="18-yes">
                                                   Yes
                                                </label>
                                             </div>
                                             <div className="">
                                                <input
                                                   type="radio"
                                                   name="input-18"
                                                   className="me-2"
                                                   id="18-no"
                                                   onChange={() =>
                                                      setAdult(false)
                                                   }
                                                />
                                                <label htmlFor="18-no">
                                                   No
                                                </label>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="filter-form-MUI-input-text col-md-6">
                                          <p className="mb-1 font-weight-bold">
                                             I am a citizen, permanent resident,
                                             or have other lawful status in my
                                             country
                                          </p>
                                          <div className="d-flex align-items-center">
                                             <div className="me-4">
                                                <input
                                                   type="radio"
                                                   name="input-citizen"
                                                   className="me-2"
                                                   id="citizen-yes"
                                                   onChange={() =>
                                                      setCitizen(true)
                                                   }
                                                />
                                                <label htmlFor="citizen-yes">
                                                   Yes
                                                </label>
                                             </div>
                                             <div className="">
                                                <input
                                                   type="radio"
                                                   name="input-citizen"
                                                   className="me-2"
                                                   id="citizen-no"
                                                   onChange={() =>
                                                      setCitizen(false)
                                                   }
                                                />
                                                <label htmlFor="citizen-no">
                                                   No
                                                </label>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="filter-form-MUI-input-text col-md-6">
                                          <p className="mb-1 font-weight-bold">
                                             Do you prefer to sponsor an
                                             individual or family group?
                                          </p>
                                          <div className="d-flex align-items-center">
                                             <div className="me-4">
                                                <input
                                                   type="radio"
                                                   name="input-family-group"
                                                   className="me-2"
                                                   id="family-group-indi"
                                                   checked={
                                                      sponsorGroup ==
                                                      "individual"
                                                         ? true
                                                         : false
                                                   }
                                                   onChange={() =>
                                                      setCitizen("individual")
                                                   }
                                                />
                                                <label htmlFor="family-group-indi">
                                                   Individual
                                                </label>
                                             </div>
                                             <div className="">
                                                <input
                                                   type="radio"
                                                   name="input-family-group"
                                                   className="me-2"
                                                   id="family-group-whole"
                                                   onChange={() =>
                                                      setCitizen("family")
                                                   }
                                                />
                                                <label htmlFor="family-group-whole">
                                                   Family Group
                                                </label>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="filter-form-MUI-input-text col-12 mt-2">
                                          <p className="font-weight-bold">
                                             Which Category of Sponsor do you
                                             want to provide? (Can Select
                                             Multiple Options)
                                          </p>
                                          <div className="d-flex align-items-start">
                                             <input
                                                type="checkbox"
                                                name=""
                                                className="me-2"
                                                id="form-checkbox-1"
                                                style={{
                                                   width: "80px",
                                                   height: "23px",
                                                }}
                                                onChange={() => {
                                                   let args = 1;
                                                   let result =
                                                      sponsorCategory.filter(
                                                         (item) => item == args
                                                      );

                                                   if (result.length > 0) {
                                                      setSponsorGroup(
                                                         sponsorCategory.filter(
                                                            (item) =>
                                                               item != args
                                                         )
                                                      );
                                                   } else {
                                                      let prev_arr =
                                                         sponsorCategory;
                                                      prev_arr.push(args);
                                                   }
                                                }}
                                             />
                                             <label htmlFor="form-checkbox-1">
                                                1. Passive Sponsor: "0"
                                                Financial Commitment on Sponsor.
                                                For example in USA, the "refugee
                                                family" lack the income to be
                                                the primary sponsor. A sponsor
                                                will fill out I-134A application
                                                as a humanitarian act in
                                                offering a helping hand & the
                                                family may be listed or not as a
                                                co-sponsor in the I-134A
                                                application. If immigration
                                                services (USCIS) approved, the
                                                refugee family will assume full
                                                responsibilities for the
                                                beneficiary/refugee. The Sponsor
                                                has "0" financial commitment and
                                                obligation toward
                                                beneficiary/refugee except the
                                                time to fill out the USCIS Form
                                                I-134A.
                                             </label>
                                          </div>
                                          <div className="d-flex align-items-start mt-2">
                                             <input
                                                type="checkbox"
                                                name=""
                                                className="me-2"
                                                id="form-checkbox-2"
                                                style={{
                                                   width: "80px",
                                                   height: "23px",
                                                }}
                                                onChange={() => {
                                                   let args = 2;
                                                   let result =
                                                      sponsorCategory.filter(
                                                         (item) => item == args
                                                      );

                                                   if (result.length > 0) {
                                                      setSponsorGroup(
                                                         sponsorCategory.filter(
                                                            (item) =>
                                                               item != args
                                                         )
                                                      );
                                                   } else {
                                                      let prev_arr =
                                                         sponsorCategory;
                                                      prev_arr.push(args);
                                                   }
                                                }}
                                             />
                                             <label htmlFor="form-checkbox-2">
                                                2. Passive Sponsor: "0"
                                                Financial Commitment on Sponsor.
                                                The beneficiary/refugee has no
                                                family in Sponsor’s country but
                                                has friend who can offer them
                                                temporary shelter until they
                                                find a job to become self
                                                sufficient. For example in USA,
                                                the sponsor will fill out I-134A
                                                application as a humanitarian
                                                act in offering a helping hand &
                                                the Refugee's Friend may be
                                                listed or not as a co-sponsor in
                                                the I-134A application. If
                                                immigration services (USCIS)
                                                approved, the refugee's friend
                                                will assume full
                                                responsibilities for the
                                                beneficiary/refugee. The Sponsor
                                                has "0" financial commitment and
                                                obligation toward
                                                beneficiary/refugee except the
                                                time to fill out the USCIS Form
                                                I-134A.T
                                             </label>
                                          </div>
                                          {/* <div className="d-flex align-items-start mt-2">
                                                            <input type="checkbox" name="" className='me-2' id="form-checkbox-3" style={{ width: "80px", height: "23px" }}
                                                                onChange={() => {
                                                                    let args = 3
                                                                    let result = sponsorCategory.filter(item => item == args)

                                                                    if (result.length > 0) {
                                                                        setSponsorGroup(sponsorCategory.filter(item => item != args))
                                                                    } else {
                                                                        let prev_arr = sponsorCategory
                                                                        prev_arr.push(args)
                                                                    }
                                                                }}
                                                            />
                                                            <label htmlFor="form-checkbox-3">3. Active Sponsor: Sponsor that can offer room and board (Volontary Choice: Due Diligence Should Be Conducted). Strongly recommend that the Sponsor conduct interview potential beneficiary/refugee before making a decision. The Sponsor must be willing to help the beneficiary/refugee integrate in local community and find a job to achieve self-sufficiency within 2 to 3 months.</label>
                                                        </div> */}
                                       </div>
                                    </>
                                 )}
                              </div>

                              <p className="mt-5 text-muted">
                                 By adding phone number you are agree to recieve
                                 periodic updates and communications from our
                                 strategic partner
                              </p>

                              {type == 2 && (
                                 <>
                                    {" "}
                                    <p className="text-muted">
                                       Note: Admerk Corp. Inc. provide this
                                       platform to connect sponsor with refugees
                                       worldwide and do not conduct background
                                       check on the users of the platform. It is
                                       the responsibilities of participants to
                                       conduct their due diligence before making
                                       any final decision or commitment.
                                    </p>
                                    <p className="text-muted">
                                       <strong>Terms and Conditions</strong>
                                       <br />
                                       Disclaimer: In filling out this form, we
                                       are not providing any guaranteed results,
                                       offering any promise or timeline. We are
                                       doing our best to reach out to
                                       compassionate or humanitarian individuals
                                       worldwide willing to offer a helping hand
                                       to a person in need. When you click on
                                       "Submit" below, you give us permission to
                                       share your information to work with
                                       individuals, organizations or businesses
                                       in our effort to connect you with a
                                       potential sponsor in USA. Admerk Corp Inc
                                       reserves the right to update and expand
                                       their terms and conditions.
                                    </p>
                                 </>
                              )}

                              <button
                                 type="submit"
                                 className="btn custom-sm-btn btn-lg mb-1"
                              >
                                 Create my account
                              </button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

export default SignupCompany;
