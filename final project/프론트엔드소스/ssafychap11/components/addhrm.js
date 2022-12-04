export default {
  template: `
  <div>
    <div>
        <form action="" method="post" id="_frmForm" name="frmForm" @submit.prevent="addEmployee">
            <table class="content_table">
                <colgroup>
                    <col style="width:30%;" />
                    <col style="width:70%;" />
            </colgroup>
                <tr> 
                    <th>이름</th>
                    <td><input data-msg="이름" type="text" name="name" id="_name" size="30" v-model="cname"/></td>            </tr>
                <tr>
                    <th>이메일</th>
                    <td><input data-msg="이메일" type="text" name="mailid"  id="_mailid" size="20" v-model="cmailid" /></td>
                </tr>
            <tr>
            <th>고용일</th>
                <td><input data-msg="고용일" type="date" name="start_date"  id="_start_date" size="30" v-model="cstart_date" /></td>
            </tr>
            <tr>
            <tr>
                <th>관리자</th>
                <td>
                    <select name='manager_id' v-model="cmanager_id">
                        <option v-for='(emp, i) in info' v-bind:value='emp.id' :key='i'>
                        {{ emp.id }}:{{ emp.name }}
                        </option>
                    </select>
                </td>
                </tr>
            <tr>
                <th>직책</th>
                <td>
                    <select name='title' v-model="ctitle">
                        <option v-for='(emp,i) in titls' v-bind:value='emp.title' :key='i'>
                        {{ emp.title }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>부서</th>
                <td>
                    <select name='dept_id' v-model="cdept_id">
                        <option v-for='(dept,i) in deps' v-bind:value='dept.dept_id' :key='i'>
                        {{ dept.dept_id  }}: {{ dept.name }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>월급</th>
                <td><input data-msg="월급" type="number" name="salary"  id="_salary" size="30" min="0" v-model="csalary"/></td>
            </tr>
            <tr>
                <th>커미션</th>
                <td><input data-msg="커미션" type="number" name="commission_pct"  id="_commission_pct" size="30" min="0" v-model="ccommission_pct" /></td>
            </tr>
            <tr>
                <td colspan="2" style="height:50px; text-align:center;">
                <button type="submit" name="button">사원추가</button></td>
            </tr>
            </table>
        </form>
    </div>
  </div>
  `,
  data () {
    return {
      info: null,
      loading: true,
      errored: false,
      deps:null,
      titls:null,
      ccommission_pct:0,
        cdept_id:0,
        cmailid:'',
        cmanager_id:0,
        cname:'',
        csalary:0,
        cstart_date:'',
        ctitle:'' 
    }
  },
   filters: {
       salarydecimal (value) {
      return value.toFixed(2)
    }
  }, 
  mounted () {
    axios
      .get('http://localhost:8197/ssafyvue/api/findAllEmployees')
      .then(response => (this.info = response.data))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);
    axios
      .get('http://localhost:8197/ssafyvue/api/findAllDepartments')
      .then(response => (this.deps = response.data))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);
      axios
      .get('http://localhost:8197/ssafyvue/api/findAllTitles')
      .then(response => (this.titls = response.data))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);
  },
  methods: {
     addEmployee() {
       if(this.cname==''){ alert('아이디를 입력하세요.'); return ;}
       if(this.cdept_id==''){ alert('부서를 선택하세요.'); return ;}
       if(this.cmailid==''){ alert('이메일을 선택하세요.'); return ;}
       if(this.cmanager_id==''){ alert('관리자를 선택하세요.'); return ;}
      if(this.csalary==''){ alert('월급을 입력하세요.'); return ;}
      if(this.cstart_date==''){ alert('입사일을 선택하세요.'); return ;}
      if(this.ctitle==''){ alert('직책을 선택하세요.'); return ;}
      
      axios.post('http://localhost:8197/ssafyvue/api/addEmployee', {
          commission_pct: this.ccommission_pct,
          dept_id: this.cdept_id,
          mailid: this.cmailid,
          manager_id: this.cmanager_id,
          name: this.cname,
          salary: this.csalary,
          start_date:this.cstart_date,
          title: this.ctitle
        } 
      ).then(function(response){
            //.then(response => (this.deps = response.data))
          if(response.data.state=='succ'){
              alert(response.data.name+"이 실행되었습니다.");
              location.href='/ssafychap11/index01.html';
          }else{
              alert(response.data.name+"에 실패하였습니다.");
              location.href='/ssafychap11/index01.html';
          }
      })
    }}
};
