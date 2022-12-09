<template>
    <div class="userFavor-setting">
        <label for="opener3" class="opener-icon"></label>
        <input type="checkbox" class="userFavor-setting-open" id="opener3">


        <div class="userFavor-selectBox">
            <ul class="district">

                <li :style="styleVariables(sido.length - index)" v-for="item, index in sido" :key="item.code.slice(0, 2)"
                    @click="updateGugun">
                    <input type="checkbox" :id="join('', item.code.slice(0, 2))" :checked="item.checked">
                    <label :for="join('', item.code.slice(0, 2))">
                        <div class="icon"></div>
                        <div class="label">{{ item.name }}</div>
                        <div class="top">{{item.checked}}</div>
                    </label>
                </li>



            </ul>


            <ul class="district">

                <li :style="styleVariables(gugun.length - index)" v-for="item, index in gugun" :key="item.code.slice(0, 5)"
                    @click="updateDong">
                    <input type="checkbox" :id="join('', item.code.slice(0, 5))" :checked="item.checked">
                    <label :for="join('', item.code.slice(0, 5))">
                        <div class="icon"></div>
                        <div class="label">{{ item.name.slice(item.name.indexOf(" ") + 1) }}</div>
                        <div class="top">{{item.checked}}</div>
                    </label>
                </li>



            </ul>


            <ul class="district">

                <li :style="styleVariables(dong.length - index)" :code="join('', item.code)" v-for="item, index in dong" :key="item.code"
                    @click="updateCheckbox">
                    <input type="checkbox" :id="join('', item.code)" checked v-if="item.checked">
                    <input type="checkbox" :id="join('', item.code)" v-else>
                    <label :for="join('', item.code)">
                        <div class="icon"></div>
                        <div class="label">{{
                                item.name.slice(
                                    item.name.indexOf(" ", item.name.indexOf(" ") + 1) + 1
                                )
                        }}</div>
                        <div class="top">{{item.checked}}</div>
                    </label>
                </li>



            </ul>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            colorPalette: [
                "#1877f2",
                "#25d366",
                "#1da1f2",
                "#c32aa3",
                "#c32aa3",
                "#c32aa3",
                "#7c73e6",
                "#ffe9e3",
            ],

            sidoVal: null,
            gugunVal: null,

            sido: [],
            gugun: [],
            dong: [],

            sidoCode: null,
            gugunCode: null,
            dongCode: null,

            resultData: [],

            userID: null,
        };
    },

    methods: {
        getSync() {

            let xhr = new XMLHttpRequest();
            let result = null;

            try {
                xhr.open("get", `http://localhost/users/syncCheckbox?code=00&id=${this.userID}`, false);
                xhr.send(null);
                result = xhr.responseText
                
                result = JSON.parse(result)
                for (let i = 0;i < this.sido.length;i++){
                    this.sido[i].checked = result.indexOf(this.sido[i].code.slice(0,2)) != -1
                }



                xhr.open("get", `http://localhost/users/syncCheckbox?code=00000&id=${this.userID}`, false);
                xhr.send(null);
                result = xhr.responseText
                
                result = JSON.parse(result)
                for (let i = 0;i < this.gugun.length;i++){
                    this.gugun[i].checked = result.indexOf(this.gugun[i].code.slice(0,5)) != -1
                }

                
                xhr.open("get", `http://localhost/users/syncCheckbox?code=0000000000&id=${this.userID}`, false);
                xhr.send(null);
                result = xhr.responseText
                
                result = JSON.parse(result)
console.log("sync dong",result)                
                for (let i = 0;i < this.dong.length;i++){
                    this.dong[i].checked = result.indexOf(this.dong[i].code) != -1

                    // console.log(this.dong[i].code, result, result.indexOf(this.dong[i].code))
                }

                // console.log(this.sido, this.gugun, this.dong)
            } catch (error) {
                
            }

            this.$forceUpdate();
        },

        updateGugun(e) {
            if (e.target.getAttribute("type") == "checkbox") {
                e.target.checked = !e.target.checked
                return
            }

            let xhr = new XMLHttpRequest();
            xhr.open(
                "get",
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${e.target.parentNode.getAttribute("for")}*00000&is_ignore_zero=true`,
                false
            );
            xhr.send(null);
            if (xhr.status != 200) {
                // this.gugun = []
                return;
            }

            let ret = JSON.parse(xhr.responseText);
            this.gugun = ret.regcodes;

            this.getSync()
        },

        updateDong(e) {
            if (e.target.getAttribute("type") == "checkbox") {
                e.target.checked = !e.target.checked
                return
            }
            
            let xhr = new XMLHttpRequest();
            xhr.open(
                "get",
                `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${e.target.parentNode.getAttribute("for")}*&is_ignore_zero=true`,
                false
            );
            xhr.send(null);
            if (xhr.status != 200) {
                // this.dong = []
                return;
            }


            let ret = JSON.parse(xhr.responseText);
            this.dong = ret.regcodes;

            this.getSync()
        },

        updateCheckbox(e) {
            if (e.target.getAttribute("type") == "checkbox") {
                // e.target.checked = !e.target.checked // read only
                return
            }
            let node = e.target.parentNode.parentNode
            let xhr = new XMLHttpRequest();

            
	if (node.querySelector("input").checked){
        xhr.open("get", `http://localhost/users/delete?code=${node.getAttribute("code")}&dong=${node.querySelector("label").querySelector(".label").innerHTML}&id=${this.userID}`, false);
        console.log(`http://localhost/users/delete?code=${node.getAttribute("code")}&dong=${node.querySelector("label").querySelector(".label").innerHTML}`)
    }
	else{
        xhr.open("get", `http://localhost/users/insert?code=${node.getAttribute("code")}&dong=${node.querySelector("label").querySelector(".label").innerHTML}&id=${this.userID}`, false);
    console.log(`http://localhost/users/insert?code=${node.getAttribute("code")}&dong=${node.querySelector("label").querySelector(".label").innerHTML}`)
    }

    xhr.send(null)

    this.getSync()
console.log(xhr.responseText)
console.log(this.sido, this.gugun, this.dong)

    this.$forceUpdate()
        },



        styleVariables(index) {
            return {
                '--i': index,
                '--clr': this.colorPalette[index % this.colorPalette.length],
            };
        },


        join(prefix, index) {
            return prefix + index
        }
    },

    created() {
        try {
            
        let accessToken = sessionStorage.getItem("accessToken")
        accessToken = JSON.parse(accessToken)
        this.userID=accessToken.mem.id
        } catch (error) {
            
        }

        let xhr = new XMLHttpRequest();
        xhr.open(
            "get",
            `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000&is_ignore_zero=true`,
            false
        );
        xhr.send(null);

        let ret = JSON.parse(xhr.responseText);

        this.sido = ret.regcodes;



    },
}
</script>

<style>

</style>