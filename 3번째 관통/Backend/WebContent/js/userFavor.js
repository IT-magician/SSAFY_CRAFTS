window.addEventListener('load',function (e) {
	  //  console.log(getSido());
	  //  console.log(getGugun("11").regcodes);
	  //  console.log(getDong("11", "110"));
	    setFavorBox(0, getSido().regcodes); // checkbox 동기화
	  
	    
	    loadMap()
	    updateUserFavor()
	    
	    console.log(document.querySelector("#opener3"))
	    document.querySelector("#opener3").addEventListener('change', function() {
	    	  if (!this.checked) {
	    		  window.location.reload()
	    		  } 
	    });
	  }
	)

const colorPalette = [
  "#1877f2",
  "#25d366",
  "#1da1f2",
  "#c32aa3",
  "#c32aa3",
  "#c32aa3",
  "#7c73e6",
  "#ffe9e3",
];

function setFavorBox(boxIdx, data) {
  let xhr = new XMLHttpRequest();

  xhr.open("get", `./include/userFavor-selectBox.html`, false);
  xhr.send(null);

  document.querySelectorAll(".district")[boxIdx].innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let option = document
      .createRange()
      .createContextualFragment(xhr.responseText);

    let nextColor = i % 8;

    option
      .querySelector("li")
      .setAttribute(
        "style",
        `--i:${data.length - i};--clr:${colorPalette[nextColor]};`
      );
    option.querySelector("input").setAttribute("id", `list-${data[i].code}`);
    option.querySelector("label").setAttribute("for", `list-${data[i].code}`);

    switch (boxIdx) {
      case 0:

        option.querySelector("li").setAttribute("code", data[i].code.substr(0, 2));
        option.querySelector("label").querySelector(".label").innerHTML = data[i].name;
        break;
      case 1:

        option.querySelector("li").setAttribute("code", data[i].code.substr(0, 5));
        option.querySelector("label").querySelector(".label").innerHTML = data[i].name.split(" ").slice(1).join(" ");
        break;
      case 2:

        option.querySelector("li").setAttribute("code", data[i].code);
        option.querySelector("label").querySelector(".label").innerHTML = data[i].name.split(" ").slice(2).join(" ");
        break;
    }

    document.querySelectorAll(".district")[boxIdx].appendChild(option);
    
  }
  if (boxIdx == 0)
      syncCheckbox(document.querySelectorAll(".district")[0].querySelectorAll("li"), "00")
  else if (boxIdx == 1)
      syncCheckbox(document.querySelectorAll(".district")[1].querySelectorAll("li"), "00000")
  else if (boxIdx == 2)
      syncCheckbox(document.querySelectorAll(".district")[2].querySelectorAll("li"), "0000000000")

  // 이벤트 리스너 등록 

  let sel1 = document.querySelectorAll(".district")[0].querySelectorAll("li");
  let sel2 = document.querySelectorAll(".district")[1].querySelectorAll("li");
  let sel3 = document.querySelectorAll(".district")[2].querySelectorAll("li");



  if (boxIdx == 0) {

    sel1.forEach(function (name) {
      name.addEventListener("click", function (event) {
    	  if (event.target.getAttribute("type")=="checkbox"){
    		  this.querySelector("input").checked = !this.querySelector("input").checked // read only
              return
          }
    	  
    	  
        document.querySelectorAll(".district")[1].innerHTML = "";
        document.querySelectorAll(".district")[2].innerHTML = "";

        sel1.forEach((name1) => {
          name1.classList.remove("active");
        });
        name.classList.add("active");
        setFavorBox(1, getGugun(this.getAttribute("code")).regcodes);
       

      });
    });
  }
  else if (boxIdx == 1) {
    sel2.forEach(function (name) {
      name.addEventListener("click", function (event) {
    	  if (event.target.getAttribute("type")=="checkbox"){
    		  this.querySelector("input").checked = !this.querySelector("input").checked // read only
              return
          }

        sel2.forEach((name1) => {
          name1.classList.remove("active");
        });
        name.classList.add("active");
        setFavorBox(2, getDong(this.getAttribute("code").substr(0, 2), this.getAttribute("code").substr(2, 3)).regcodes);



      });
    });

  }
  else if (boxIdx == 2) {
    sel3.forEach(function (name) {
    	
      name.addEventListener("click", function (event) {

    	  if (event.target.getAttribute("type")!="checkbox") return
    	  
        sel3.forEach((name1) => {
          name1.classList.remove("active");
        });
        name.classList.add("active");
//        this.querySelector("input").checked = false

        // 기능 처리
        callbackFunc(3, this)
        // 서버와 checkbox 동기화
        syncCheckbox(document.querySelectorAll(".district")[0].querySelectorAll("li"), "00")
        syncCheckbox(document.querySelectorAll(".district")[1].querySelectorAll("li"), "00000")
        syncCheckbox(document.querySelectorAll(".district")[2].querySelectorAll("li"), "0000000000")


      });
    });

  }
}

function getSido() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "get",
    `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000&is_ignore_zero=true`,
    false
  );
  xhr.send(null);
  let sido = xhr.responseText;

  return JSON.parse(sido);
}

function getGugun(sido) {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "get",
    `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${sido}*00000&is_ignore_zero=true`,
    false
  );
  xhr.send(null);
  let gugun = xhr.responseText;

  return JSON.parse(gugun);
}

function getDong(sido, gugun) {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "get",
    
    `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${sido}${gugun}*&is_ignore_zero=true`,
    false
  );
  xhr.send(null);
  let dong = xhr.responseText;

  return JSON.parse(dong);
}

function syncCheckbox(node, code){
  let xhr = new XMLHttpRequest();

  xhr.open("get", `http://localhost:8080/Web_DB_Project/syncCheckbox.apartmentServlet?id=${document.querySelector(".header_nav .header_nav_right form").querySelector("label").innerHTML}&code=${code}`, false);
  xhr.send(null);
  result = xhr.responseText

  const checkedInfos = result.split(", ");

  node.forEach(function (name){
    if (checkedInfos.indexOf(name.getAttribute("code")) != -1)
      name.querySelector("input").checked = true
      else
    	  name.querySelector("input").checked = false
  })

}

// ---------------------------------------------------- server collaboration -----------------------------------------------------------------

function callbackFunc(boxType, node){

//	console.log(node.getAttribute("code"), node.querySelector("input").checked)
	let xhr = new XMLHttpRequest();


	xhr.open("get", `./deleteApartment.apartmentServlet?code=${node.getAttribute("code")}`, false);


	if (node.querySelector("input").checked)
		xhr.open("get", `./insertApartment.apartmentServlet?code=${node.getAttribute("code")}&dong=${node.querySelector("label").querySelector(".label").innerHTML}&id=${document.querySelector(".header_nav .header_nav_right form").querySelector("label").innerHTML}`, false);
	else
		xhr.open("get", `./deleteApartment.apartmentServlet?code=${node.getAttribute("code")}&dong=${node.querySelector("label").querySelector(".label").innerHTML}&id=${document.querySelector(".header_nav .header_nav_right form").querySelector("label").innerHTML}`, false);
//		
//
//
  xhr.send(null);


}