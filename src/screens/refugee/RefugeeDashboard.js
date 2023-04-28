import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { toast } from 'react-toastify';
import Pagination from '../../component/Pagination';
import { node_url, url } from '../../Helper/Helper';
import { userContext } from '../../context/UserContext'
import { Link } from 'react-router-dom';
import InviteContactsModal from '../../component/InviteContactsModal';

function RefugeeDashboard() {
  const { user, setLoad } = useContext(userContext)
  const [skillslist, setSkillsList] = useState([])
  const [hobby, setHobby] = useState('')
  const [hobbyslist, setHobbyList] = useState([])
  const [country, setCountry] = useState('')
  const [countrylist, setCountryList] = useState([])
  const [feeds, setFeeds] = useState([])

  const [page, setPage] = useState(1)
  const [cskill, setCSkill] = useState("")
  const [chobby, setCHobby] = useState("")
  const [cCountry, setCCountry] = useState("")
  const [search, setSearch] = useState("")
  const [gender, setGender] = useState("Both")
  const [showInviteModal, setShowInviteModal] = useState(false);

  async function fetchSkill() {
    setLoad(true)
    var requestOptions = {
      redirect: 'follow'
    };

    const response = await fetch(url + "skills-list", requestOptions)
    if (response.ok === true) {
      setLoad(false)
      const data = await response.json()
      console.log(data);
      if (data.list.length > 0) {
        let arr = []
        for (var i = 0; i < data.list.length; i++) {
          arr.push({
            'value': data.list[i].id,
            'label': data.list[i].name
          })
        }
        setSkillsList(arr)
      } else {
        toast.error("Please Create Skills First")
      }
    } else {
      setLoad(false)
      toast.error("Internal Server Error")
    }
  }

  async function fetchHobby() {
    setLoad(true)
    var requestOptions = {
      redirect: 'follow'
    };

    const response = await fetch(url + "hobby-list", requestOptions)
    if (response.ok === true) {
      setLoad(false)
      const data = await response.json()
      console.log(data);
      if (data.list.length > 0) {
        let arr = []
        for (var i = 0; i < data.list.length; i++) {
          arr.push({
            'value': data.list[i].id,
            'label': data.list[i].name
          })
        }
        setHobbyList(arr)
      } else {
        toast.error("Please Create Hobby First")
      }
    } else {
      setLoad(false)
      toast.error("Internal Server Error")
    }
  }

  async function fetchCountry() {
    setLoad(true)
    const response = await fetch(url + "country-list")
    if (response.ok === true) {
      setLoad(false)
      const data = await response.json()
      console.log(data);
      if (data.list.length > 0) {
        let arr = []
        for (var i = 0; i < data.list.length; i++) {
          arr.push({
            'value': data.list[i].id,
            'label': data.list[i].name,
            "phoneCode": data.list[i].phoneCode
          })
        }
        setCountryList(arr)
      } else {
        toast.error("")
      }
    } else {
      setLoad(false)
      toast.error("Internal Server Error")
    }
  }

  useEffect(() => {
    fetchCountry().catch(err => {
      setLoad(false)
      toast.error(err.message)
    })
    fetchHobby().catch(err => {
      setLoad(false)
      toast.error(err.message)
    })
    fetchSkill().catch(err => {
      setLoad(false)
      toast.error(err.message)
    })

    setShowInviteModal(!user?.has_invited);
  }, [])

  async function fetchFeeds() {
    setLoad(true)
    const formData = new FormData()
    formData.append("skill", cskill?.label ? cskill?.label : '')
    formData.append("hobby", chobby?.label ? chobby?.label : '')
    formData.append("country_id", cCountry?.value ? cCountry?.value : '')
    formData.append("page", page)
    formData.append("search", search)
    if (gender != "Both"){
      formData.append("work_type", gender)
    }else{
      formData.append("work_type", "")
    }

    const response = await fetch(url + 'fetch-home-jobs', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${user?.token}`
      },
      body: formData
    });

    if (response.ok == true) {
      setLoad(false)
      const data = await response.json();
      console.log(data)
      if (data.status == 200) {
        setFeeds(data?.list)
      } else {
        toast.error(data?.message)
      }
    } else {
      setLoad(false)
      toast.error("Internal server error!")
    }
  }



  useEffect(() => {
    fetchFeeds()
    setLoad(false)
  }, [page, gender, search, cskill, chobby, cCountry])

  console.log("[RefugeeDashboard] User: ", user);

  return (
    <div className='sponsor-dashboard-div container-lg px-3 my-5'>
      <InviteContactsModal show={showInviteModal} handleClose={() => setShowInviteModal(false)} />
      <div className='row'>
        <div className='col-md-3 d-none d-md-block'>
          <h5>Filter By</h5>

          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Skills
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                  <Select
                    options={skillslist}
                    placeholder='Select Skills'
                    value={cskill} onChange={setCSkill}
                    isClearable
                  />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  Hobby
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body">
                  <Select
                    options={hobbyslist}
                    placeholder='Select Hobby'
                    value={chobby} onChange={setCHobby}
                    isClearable
                  />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                  Work Type
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                <div class="accordion-body">
                  <div class="form-check">
                    <input checked={gender == 'Both' && true} onChange={() => setGender("Both")} type="checkbox" class="form-check-input" id='all' />
                    <label class="form-check-label" for="all">Both</label>
                  </div>

                  <div class="form-check">
                    <input checked={gender == 'Remote' && true} onChange={() => setGender("Remote")} type="checkbox" class="form-check-input" id="male" />
                    <label class="form-check-label" for="male">Remote</label>
                  </div>

                  <div class="form-check">
                    <input checked={gender == 'On Site' && true} onChange={() => setGender("On Site")} type="checkbox" class="form-check-input" id="female" />
                    <label class="form-check-label" for="female">On Site</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                  Location
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                <div class="accordion-body">
                  <Select
                    options={countrylist}
                    placeholder='Select Country'
                    value={cCountry} onChange={setCCountry}
                    isClearable
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-9'>
          <div className='dashboard-heading-div position-relative mb-4'>
            <div>
              <h2>Hello, {user?.name}</h2>
              <h3>Discover the jobs you love to do</h3>
            </div>
            <img src="/assets/images/plane.svg" alt="" />
          </div>

          <div className='refugee-cards'>
            <div class="input-group px-4 py-3 border-bottom search-div">
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" class="form-control shadow-none" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
              {/* <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span> */}
              <a className='filter-btn d-block d-md-none' href="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="fa fa-filter" aria-hidden="true"></i>
              </a>

              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                  <div class="modal-content">
                    <div class="modal-header border-0">
                      <h5 class="modal-title" id="exampleModalLabel">Filters</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="accordion" id="accordionPanelsStayOpenExample">
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                              Skills
                            </button>
                          </h2>
                          <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                              <Select
                                options={skillslist}
                                placeholder='Select Skills'
                                value={cskill} onChange={setCSkill}
                                isClearable
                              />
                            </div>
                          </div>
                        </div>

                        <div class="accordion-item">
                          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                              Hobby
                            </button>
                          </h2>
                          <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                              <Select
                                options={hobbyslist}
                                placeholder='Select Hobby'
                                value={chobby} onChange={setCHobby}
                                isClearable
                              />
                            </div>
                          </div>
                        </div>

                        <div class="accordion-item">
                          <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                              Work Type
                            </button>
                          </h2>
                          <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                              <div class="form-check">
                                <input checked={gender == 'Both' && true} onChange={() => setGender("Both")} type="checkbox" class="form-check-input" id='all' />
                                <label class="form-check-label" for="all">Both</label>
                              </div>

                              <div class="form-check">
                                <input checked={gender == 'Remote' && true} onChange={() => setGender("Remote")} type="checkbox" class="form-check-input" id="male" />
                                <label class="form-check-label" for="male">Remote</label>
                              </div>

                              <div class="form-check">
                                <input checked={gender == 'On Site' && true} onChange={() => setGender("On Site")} type="checkbox" class="form-check-input" id="female" />
                                <label class="form-check-label" for="female">On Site</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="accordion-item">
                          <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                              Location
                            </button>
                          </h2>
                          <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                            <div class="accordion-body">
                              <Select
                                options={countrylist}
                                placeholder='Select Country'
                                value={cCountry} onChange={setCCountry}
                                isClearable
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {feeds?.length > 0 ? feeds.map((item, index) => (
              <Link key={index} className='refugee-single-card px-4 py-4 text-decoration-none d-block' to={`/apply-job?id=${item?.id}`}>
                <div className='d-flex align-items-center avatar-div'>
                  <div>
                    <h5>{item?.title}</h5>
                    <span>{item?.country_name} {item?.state_name} {item?.city_name}</span>
                  </div>
                </div>
                {/* <div dangerouslySetInnerHTML={{ __html: feeds?.description }} /> */}
                <p className='mb-0 mt-4' dangerouslySetInnerHTML={{ __html: item?.description }}>
                  {/* {item?.description} */}
                </p>

                <div className='d-flex flex-column mt-4 skill-hobby'>
                  <div className='d-flex'>
                    {item?.skills?.split(',')?.map((item, index) => <span key={index}>{item}</span>)}
                  </div>
                </div>
              </Link>
            )) : <div className='not-found'>No Record Found</div>}
          </div>

          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  )
}

export default RefugeeDashboard;