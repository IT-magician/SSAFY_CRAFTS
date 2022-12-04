export default {
    template:`
    <div>
        <table class='list_table'>
        <col width="10%"><col width="20%">
        <col width="20%"><col width="20%"><col width="10%">
            <tr>
                <th>사원 아이디</th>
                <th>사원명</th>
                <th>부서</th>
                <th>직책</th>
                <th>연봉</th>
            </tr>
                
            <tr v-for="emp in info">
                <td v-html="emp.id" @click="show_detail(emp.id)"></td> 
                <!-- <td><router-link to="/route5/1" v-html="emp.id"></router-link></td> -->
                <td v-html="emp.name"></td>
                <td v-html="emp.dept_id"></td>
                <td v-html="emp.title"></td>
                <td>{{ emp.salary | salarydecimal }}</td>
            </tr>
        </table>
    </div>
            
    `,

    data(){
        return {
          info: [],
          loading: true,
          errored: false 
        }
      },
      methods:{
          show_detail:function(employeeid){
              alert(employeeid);
              
              this.$router.push("/router5/" + employeeid);
              
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
          //.get('./emp.json')
          .then(response => (this.info = response.data))
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
      }

}