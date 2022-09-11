window.onload = localStorageInit;

function localStorageInit() {
    // 회원 정보를 저장하는 배열

    if (localStorage.getItem("userInfos") == null || localStorage.getItem("userInfos").length < 1) {
        localStorage.setItem("userInfos", JSON.stringify([{ id: "admin", password: "admin", name: "admin", type: "root" },
        { id: "admin1", password: "admin1", name: "김태훈", type: "root" }]));
    }
    else {

        const userInfos = JSON.parse(localStorage.getItem("userInfos")); console.log(localStorage.getItem("userInfos"));

        if (!userInfos.find(userInfo => { return userInfo.id === "admin"; })) {
            const user = {
                id: "admin",
                password: "admin",
                name: "admin",
                type: "root"
            };
            userInfos.push(user);
            localStorage.setItem("userInfos", JSON.stringify(userInfos));
        }
        if (!userInfos.find(userInfo => { return userInfo.id === "admin1"; })) {
            const user = {
                id: "admin1",
                password: "admin1",
                name: "김태훈",
                type: "root"
            };
            userInfos.push(user);
            localStorage.setItem("userInfos", JSON.stringify(userInfos));
        }
    }

}

function regist() {
    const userInfos = JSON.parse(localStorage.getItem("userInfos"));

    const id = document.querySelector("#ID_BOX2").value;
    const password = document.querySelector("#PASSWD_BOX2").value;
    const name = document.querySelector("#NAME_BOX2").value;

    if (!id || !password || !name) {
        alert("빈 칸이 없도록 입력해주세요.");
        return;
    } else {
        const user = {
            id: id,
            password: password,
            name: name,
            type: "user"
        };

        const foundUser = userInfos.find(userInfo => {
            return userInfo.id === id;
        });

        // 같은 아이디의 회원이 존재하는 경우
        if (foundUser) {
            alert("이미 가입된 아이디입니다.");
            return;
        } else {
            // 회원 정보 삽입
            userInfos.push(user);
            localStorage.setItem("userInfos", JSON.stringify(userInfos));
            alert("회원가입 성공");
            //로그인으로 flip
            document.querySelector("#flip").checked = false;
        }
    }
}

function login() {
    const userInfos = JSON.parse(localStorage.getItem("userInfos"));

    let id = document.querySelector("#ID_BOX1").value;
    let password = document.querySelector("#PASSWD_BOX1").value;
console.log(userInfos)
    const foundUser_id = userInfos.find(userInfo => {
        return userInfo.id === id
    });
    const foundUser_pw = userInfos.find(userInfo => {
        return userInfo.password === password;
    });

    if (!foundUser_id) {
        alert("등록되지 않은 회원입니다. 회원가입을 진행 해 주세요");
        sessionStorage.setItem("isLogIn", "");
    }
    else if (!foundUser_pw) {
        alert("비밀번호가 틀렸습니다.");
        sessionStorage.setItem("isLogIn", "");
        sessionStorage.setItem("loginId", "");
    }
    else {
        alert("로그인 성공");

        const userInfos = JSON.parse(localStorage.getItem("userInfos"));
        for (const a of userInfos) {
            if (a.id == id){
                sessionStorage.setItem("isLogIn", JSON.stringify(a));
                if (window.location.hostname == "127.0.0.1")
                    window.location.replace(window.location.protocol + "//" + "localhost:" + window.location.port + "/index.html");
                else
                     window.location.replace("./index.html");
            }
        }
    }

}
