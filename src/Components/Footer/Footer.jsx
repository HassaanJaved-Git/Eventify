import React from 'react'
import logo from '../../assets/vite.svg'

const Footer = () => {
  return (
   <>
   <div className='container-fluid bg-dark'>
   <div className="container">
  <footer className="bg-dark text-center text-white">
    <div className="container p-4 pb-0">
      <section className="mb-4">

        <a className="btn text-light btn-floating m-1" href="#!" role="button">
          <img src={logo} alt={'web-logo'}></img>
        </a>

        <a className="btn text-light btn-floating m-1" href="#!" role="button">
          What's New
        </a>

        <a className="btn text-light btn-floating m-1" href="#!" role="button">
          Discover
        </a>

        <a className="btn text-light btn-floating m-1" href="#!" role="button">
          Pricing
        </a>

        <a className="btn text-light btn-floating m-1" href="#!" role="button">
          Help
        </a>

      </section>
    </div>

    <div className="text-center p-3">
      © (2025) Thanks For Visiting Our Store
    </div>
  </footer>
</div>
</div>
   </>
  )
}
export default Footer
