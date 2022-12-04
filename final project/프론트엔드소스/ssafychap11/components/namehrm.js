export default {
  template: `
  <div>
    <div class='search_box'>
        이름으로  찾기 : <input type="text" name='name' v-model="cname" @keyup='searchname' v-cloak/>
    </div>
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
        <tr v-for="emp in cemps">
            <td v-html="emp.id"></td>
            <td v-html="emp.name"></td>
            <td v-html="emp.dept_id"></td>
            <td v-html="emp.title"></td>
            <td>{{ emp.salary | salarydecimal }}</td>
        </tr>
    </table>
  </div>
`,
  data() {
    return {
      info: [],
      loading: true,
      errored: false,
      cname: "",
      cemps: [],
    };
  },
  filters: {
    salarydecimal(value) {
      return value.toFixed(2);
    },
  },
  mounted() {
    axios
      .get("http://localhost:8197/ssafyvue/api/findAllEmployees")
      //.get('./emp.json')
      .then((response) => (this.info = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    searchname() {
      axios
        .get(
          "http://localhost:8197/ssafyvue/api/findLikeEmployees/" + this.cname
        )
        //.get('./emp.json')
        .then((response) => (this.cemps = response.data))
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    currentEmp() {
      console.log();
    },
  },
};
