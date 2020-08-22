import React from 'react'
import CollegeList from '../../json/CollegeList'
import DeptList from '../../json/DeptList'

class AddElection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      electionName: '',
      collegeId: '0',
      deptId: '0',
    }
  }

  handleField = e => { // 선거 이름 및 선거 가능 학과 입력 필드 관리
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCollegeField = e => { // 선거 가능 단과대 입력 필드 관리
    this.setState({
      deptId: '0', // 단과대를 다시 선택할 때, 학과 필드를 "전체"로 초기화
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => { // 선거 등록 버튼 클릭 이벤트
    e.preventDefault()

    this.props.addElection(this.state.electionName,
      this.state.collegeId, this.state.deptId)

    this.setState({ // 상태 초기화
      electionName: '',
      collegeId: '0',
      deptId: '0'
    })
  }

  render() {
    // json 파일에서 단과대 정보를 가져옴
    var colleges = [];
    colleges.push({collegeId: "0", collegeName: "전체"})
    _.each(CollegeList, (value, index) => {
      colleges.push(value)
    });

    // json 파일에서 학과 정보를 가져옴
    var depts = [];
    depts.push({deptId: "0", deptName: "전체"})
    _.each(DeptList, (value, index) => {
      if(this.state.collegeId == value.collegeId) {
        depts.push(value)
      }
    });

    return (
      <div>
        <h3> 선거 등록하기 </h3>
        <hr/>
        { this.props.changing ?
          <div> Loading... </div>
          :
          <form onSubmit={this.handleSubmit}>
            <div class='form-group'>
              <div class="input-group input-group-newsletter">
                <span> 선거 이름 </span> &nbsp;
                <input
                  class="form-control"
                  value={this.state.electionName}
                  onChange={this.handleField}
                  name="electionName"
                />
              </div> <br/>

              <div class="input-group input-group-newsletter">
                <span> 선거 대상 </span> &nbsp;
                <select ref={(input) => this.collegeId = input} class='form-control'
                onChange={this.handleCollegeField} value={this.state.collegeId} name="collegeId">
                  {colleges.map((college) => {
                    return <option value={college.collegeId}>
                    {college.collegeName}
                    </option>
                  })}
                </select>
                <select ref={(input) => this.deptId = input} class='form-control'
                onChange={this.handleField} value={this.state.deptId} name="deptId">
                  {depts.map((dept) => {
                    return <option value={dept.deptId}>
                    {dept.deptName}
                    </option>
                  })}
                </select>
              </div> <br/>

              <button type='submit' class='btn btn-secondary'>Add</button>
              <hr/>
            </div>
          </form>
        }
      </div>
    )
  }
}

export default AddElection
