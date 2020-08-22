import React from 'react'
import { Link } from 'react-router-dom'

function NavVoter() {
  return (
    <div class="input-group input-group-newsletter">
      <Link to='/turnout'>
        <button class='btn btn-custom'> 투표율 보기 </button>
      </Link>
      &nbsp;
      <Link to='/result'>
        <button class='btn btn-custom'> 투표 결과 보기 </button>
      </Link>
    </div>
  );
}

export default NavVoter
