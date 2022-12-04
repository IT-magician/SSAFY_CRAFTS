export default {
  template: `
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
    <tr>
    <td v-html="cemp.id"></td>
        <td v-html="cemp.name"></td>
        <td v-html="cemp.dept_id"></td>
        <td v-html="cemp.title"></td>  
        <td>{{ cemp.salary | csalarydecimal }}</td>
    </tr>  
    </table>
  </div>
    `,
  props: ["id"],
  data() {
    return {
      info: [],
      loading: true,
      errored: false,
      cid: "",
      url: "",
      cemp: {},
    };
  },
  filters: {
    salarydecimal(value) {
      return value.toFixed(2);
    },
  },
  mounted() {
    this.cid = this.id;
    
    axios
      .get("http://localhost:8197/ssafyvue/api/findEmployeeById/" + this.id)
      //.get('./emp.json')
      .then((response) => (this.cemp = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
