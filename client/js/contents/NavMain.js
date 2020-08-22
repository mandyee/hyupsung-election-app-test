import React from 'react'
import { Link } from 'react-router-dom'

function NavMain() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/admin'>선거관리위원회 페이지</Link>
        </li>
        <li>
          <Link to='/voter'>유권자 페이지</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavMain
