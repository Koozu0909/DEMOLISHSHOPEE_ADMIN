import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      {/* <h1>Dang vi khoi side bar</h1> */}
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {/* <h1>Dang vi khoihead</h1> */}

        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
