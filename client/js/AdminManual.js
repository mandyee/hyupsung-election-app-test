import React from 'react'

import ShowAdminManual from './contents/ShowAdminManual'

class AdminManual extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
            <a class="navbar-brand" style={{color:"white"}}>Hyupsung Election App</a>
          </div>
        </nav>

        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h1 class="my-4"> 선거관리위원회 매뉴얼 <small>Admin's Manual</small> </h1>
              <br/>
              <ShowAdminManual
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminManual
