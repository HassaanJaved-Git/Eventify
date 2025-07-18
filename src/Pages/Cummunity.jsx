import React from 'react'
import '../Allcss/Cummunity.css'
import img from '../assets/dps/dp.png'
import img1 from '../assets/dps/dp1.png'
import imm2 from '../assets/dps/dp2.png'
import img3 from '../assets/dps/dp3.png'
import img4 from '../assets/dps/dp4.png'
import img5 from '../assets/dps/dp5.png'
import img6 from '../assets/dps/dp6.png'

const Cummunity = () => {
  return (
<section className="gradient-custom">
  <div className="container-fluid py-5">
    <div className="row">
      <div className="col-md-6 col-lg-6 col-xl-6 mb-4 mb-md-0">
        <h5 className="font-weight-bold mb-3 text-center text-white">Member</h5>
        <div className="card mask-custom">
          <div className="card-body">
            <ul className="list-unstyled mb-0">
              {[...Array(6)].map((_, i) => (
                <li
                  key={i}
                  className="p-2 border-bottom"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <a href="#!" className="d-flex justify-content-between link-light">
                    <div className="d-flex flex-row">
                      <img
                        src={img}
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Name {i + 1}</p>
                        <p className="small text-white">Sample message</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-white mb-1">Just now</p>
                      {i === 0 && (
                        <span className="badge bg-danger float-end">1</span>
                      )}
                    </div>
                  </a>
                </li>
              ))}
              <li className="p-2">
                <a href="#!" className="d-flex justify-content-between link-light">
                  <div className="d-flex flex-row">
                    <img
                      src={img6}
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Brad Pitt</p>
                      <p className="small text-white">Lorem ipsum dolor sit.</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-white mb-1">5 mins ago</p>
                    <span className="text-white float-end">
                      <i className="fas fa-check" aria-hidden="true"></i>
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Messages Section */}
      <div className="col-md-6 col-lg-6 col-xl-6">
        <ul className="list-unstyled text-white">
          <li className="d-flex justify-content-between mb-4">
            <img
              src={img3}
              alt="avatar"
              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
            />
            <div className="card mask-custom">
              <div
                className="card-header d-flex justify-content-between p-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
              >
                <p className="fw-bold mb-0">Brad Pitt</p>
                <p className="text-light small mb-0">
                  <i className="far fa-clock"></i> 12 mins ago
                </p>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
              </div>
            </div>
          </li>

          <li className="d-flex justify-content-between mb-4">
            <div className="card mask-custom w-100">
              <div
                className="card-header d-flex justify-content-between p-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
              >
                <p className="fw-bold mb-0">Lara Croft</p>
                <p className="text-light small mb-0">
                  <i className="far fa-clock"></i> 13 mins ago
                </p>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  Sed ut perspiciatis unde omnis iste natus error sit...
                </p>
              </div>
            </div>
            <img
              src={img4}
              alt="avatar"
              className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
              width="60"
            />
          </li>

          <li className="d-flex justify-content-between mb-4">
            <img
              src={img5}
              alt="avatar"
              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
            />
            <div className="card mask-custom">
              <div
                className="card-header d-flex justify-content-between p-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
              >
                <p className="fw-bold mb-0">Brad Pitt</p>
                <p className="text-light small mb-0">
                  <i className="far fa-clock"></i> 10 mins ago
                </p>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
              </div>
            </div>
          </li>

          <li className="mb-3">
            <div className="form-outline form-white">
              <textarea
                className="form-control"
                id="textAreaExample3"
                rows="4"
                placeholder='Enter Your Messege'
              ></textarea>
            </div>
          </li>

          <button
            type="button"
            className="btn btn-light btn-lg btn-rounded float-end"
          >
            Send
          </button>
        </ul>
      </div>
    </div>
  </div>
</section>

  )
}

export default Cummunity
