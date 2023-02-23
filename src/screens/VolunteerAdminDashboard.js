import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { userContext } from '../context/UserContext'
import { url } from '../Helper/Helper'


function VolunteerAdminDashboard() {


  const[datacounts,setDataCounts] = useState([])
  const { user } = useContext(userContext)

  async function fetchCounts() {
    const response = await fetch(url + "dashboard-count", {
      headers: {
        "Authorization": `Bearer ${user?.token}`
      },

    })
    if (response.ok == true) {
      const data = await response.json()
      console.log(data)
      if (data.status == 200) {
       setDataCounts(data.counts)
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error("Internal Server Error")
    }
  }

  useEffect(() => {
    fetchCounts().catch(err => {
      toast.error(err.message)
    })
  }, [])

  return (

    <section className="my-tickets-div" style={{ backgroundColor: '#0061df08' }}>
      <div className="container py-5 h-100">
        

        <div className='row w-100 p-2'>
          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.refugee}</p>
              <p className='fw-bold'>Total Refugee</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.sponsor}</p>
              <p className='fw-bold'>Total Sponsor</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.volunteer}</p>
              <p className='fw-bold'>Total Volunteer</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>
        </div>

        <div className='row w-100 p-2'>
          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.jobs}</p>
              <p className='fw-bold'>Total Jobs</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.open_jobs}</p>
              <p className='fw-bold'>Total Open Jobs</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.closed_jobs}</p>
              <p className='fw-bold'>Total Close Jobs</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>

        </div>
        <div className='row w-100 p-2'>
          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.tickets}</p>
              <p className='fw-bold'>Total Tickets</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.open_tickets}</p>
              <p className='fw-bold'>Total Open Tickets</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='count-card'>
              <p>{datacounts.close_tickets}</p>
              <p className='fw-bold'>Total Close Tickets</p>
              <i className='fa fa-map-o dashboard__cardIcon'></i>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default VolunteerAdminDashboard;