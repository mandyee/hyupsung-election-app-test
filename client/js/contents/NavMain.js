import React from 'react'
import { Link } from 'react-router-dom'

function NavMain() {
  return (
    <div>
      <Link to='/admin'>
        <button class='btn btn-light'> 선거관리위원회 페이지 </button>
      </Link>
      &nbsp;
      <Link to='/voter'>
        <button class='btn btn-light'> 유권자 페이지 </button>
      </Link>
    </div>
  );
}

export default NavMain
