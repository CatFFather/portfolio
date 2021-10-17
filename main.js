// ------------------------------- json 아이템 가져오기-------------------------------

// career List 가져오기
function getCareerList() {
  // 함수의 return 값을 fetch로 얻은 값으로 해준다.
  return fetch("./data/portfolio.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      return myJson.careers; // 최종 return 값
    });
}
getCareerList().then((careers) => {
  // console.log(careers)
  let about__career = document.querySelector(".about__careers");
  careers.forEach((career, index) => {
    let about__career__wrap = document.createElement("div");
    about__career__wrap.classList.add("about__career__wrap");
    about__career__wrap.innerHTML = `
            <div class="about__career__img">
                <a href="${career.href}"><img width="150px" src="${career.logo}"/></a>
            </div>
            <div class="about__career__infoWrap">
                <div class="about__career__info">${career.info}</div>
                <div class="about__career__term">${career.term}</div>
            </div>
        `;
    about__career.appendChild(about__career__wrap);
  });
});

// Skills List 가져오기
function getSkillsList() {
  // 함수의 return 값을 fetch로 얻은 값으로 해준다.
  return fetch("./data/portfolio.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      return myJson.skills; // 최종 return 값
    });
}
getSkillsList().then((result) => {
  // Skills 목록
  let skills = result.filter((skill) => {
    return skill.type == "skill";
  });
  let skills__skills = document.querySelector(".skills__skills");

  skills.forEach((skill) => {
    let skills__itemsWrap = document.createElement("div");
    skills__itemsWrap.classList.add("skills__itemsWrap");
    skills__itemsWrap.innerHTML = `
            <div class="skills__label">
                <div class="skills__name">${skill.name}</div>
                <div class="skills__percent">${skill.percent}%</div>
            </div>
            <div class="skills__border--white">
                <div class="skills__border--yellow" style="width: ${skill.percent}%;"></div>
            </div>`;
    skills__skills.appendChild(skills__itemsWrap);
  });

  // Tools 목록
  let tools = result.filter((tool) => {
    return tool.type == "tool";
  });
  let skills__tools__tool = document.querySelector(".skills__tools--tool");

  tools.forEach((tool) => {
    let skills__name = document.createElement("div");
    skills__name.classList.add("skills__name");
    skills__name.innerHTML = `<div class="skills__name">${tool.name}</div>`;
    skills__tools__tool.appendChild(skills__name);
  });

  // Etc 목록
  let etc = result.filter((e) => {
    return e.type == "etc";
  });
  let skills__tools__etc = document.querySelector(".skills__tools--etc");

  etc.forEach((e) => {
    let skills__name = document.createElement("div");
    skills__name.classList.add("skills__name");
    skills__name.innerHTML = `<div class="skills__name">${e.name}</div>`;
    skills__tools__etc.appendChild(skills__name);
  });
});

// Project List 가져오기 (필터링 기능도 있음)
function getProjectList(type, initOption) {
  return fetch("./data/portfolio.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      if (type) {
        const newProjectList = myJson.project.filter((project) => {
          return project.type == type;
        });
        return newProjectList;
      } else {
        return myJson.project;
      }
    })
    .then((projects) => {
      const project__list = document.querySelector(".project__list");
      project__list.innerHTML = ""; // <-- 여기서 초기화 한번 해줘야함(초기화 안하면 계속 더해짐)
      projects.forEach((project) => {
        const project_item = document.createElement("li");
        project_item.classList.add("project_item");
        project_item.innerHTML = `
                <a href="${project.href}" target='blank'>
                    <img src="${project.img}"/>
                    <div class="project_item_info">
                        <h3>${project.name}</h3>
                        <p>${project.info}</p>
                    </div>
                </a>
            `;
        project__list.appendChild(project_item);
      });
      // badgeCount 받아오기 위함(첫 랜더링때만 실행)
      if (initOption) {
        const allCount = projects.length;
        const studyCount = projects.filter((project) => {
          return project.type == "Study";
        }).length;
        const businessCount = projects.filter((project) => {
          return project.type == "Business";
        }).length;

        const project__btn_badge = document.querySelectorAll(
          ".project__btn_badge"
        );
        project__btn_badge.forEach((badge) => {
          if (badge.dataset.param == "") {
            badge.innerHTML = allCount;
          } else if (badge.dataset.param == "Study") {
            badge.innerHTML = studyCount;
          } else if (badge.dataset.param == "Business") {
            badge.innerHTML = businessCount;
          }
        });
      }
    });
}
// 페이지 첫 랜더링 시 기본값(All)
getProjectList("", "init");

// ------------------------------- 버튼클릭 이벤트 -------------------------------

// 메뉴 토글 버튼
function getMenuListToggle() {
  const navbar = document.querySelector(".navbar");
  const navbar__rigth = document.querySelector(".navbar__rigth");
  navbar.classList.toggle("navbar--toggle");
  navbar__rigth.classList.toggle("navbar__rigth--toggle");
}

// nav bar 버튼 클릭
const navbar__container = document.querySelector(".navbar__container");
navbar__container.addEventListener("click", (e) => {
  if (!e.target.dataset.id) return;
  goToId(e.target.dataset.id);
});

// ↑ 버튼 클릭
const arrow__up__button = document.querySelector(".arrow-up__button");
arrow__up__button.addEventListener("click", (e) => {
  goToId("home");
});

// CONTACT ME! 버튼 클릭
const home__btn = document.querySelector(".home__btn");
home__btn.addEventListener("click", (e) => {
  if (!e.target.dataset.id) return;
  goToId(e.target.dataset.id);
});

// 버튼 클릭시 해당 id로 이동하기
function goToId(id) {
  const elementId = document.getElementById(id);
  elementId.scrollIntoView();
  // html 맨 위에서 id까지의 거리
  // const distanceFromHtml = elementId.getBoundingClientRect().top + window.pageYOffset
  // window.scrollTo(0, distanceFromHtml);
}

// project List 필터링 (버튼클릭)
const project__btn_list = document.querySelector(".project__btn_list");
const project__btn_item = document.querySelectorAll(".project__btn_item ");
project__btn_list.addEventListener("click", (e) => {
  if (e.target.dataset.param == undefined) return;
  project__btn_item.forEach((item) => {
    item.classList.remove("selected");
    item.dataset.param == e.target.dataset.param &&
      item.classList.add("selected");
  });
  getProjectList(e.target.dataset.param);
});

// ------------------------------- js를 이용하여 css 추가 -------------------------------
// TODO nav bar 내려올때 색 변화

const home = document.querySelector("#home");
const homeOffsetHeight = home.offsetHeight;

// home 서서히 사라지기 ★★★★★★★ 이런식으로도 가능함 ★★★★★★★
document.addEventListener("scroll", (e) => {
  if (window.pageYOffset < homeOffsetHeight) {
    home.style.opacity = 1 - window.pageYOffset / homeOffsetHeight;
  }
});

// ↑ 버튼 보이기 (Y축 500 이상일 때)
document.addEventListener("scroll", (e) => {
  if (window.pageYOffset > homeOffsetHeight / 2) {
    // 위에 만들어진 arrow__up__button을 사용
    arrow__up__button.classList.add("opacity__1");
  } else {
    arrow__up__button.classList.remove("opacity__1");
  }
});
// const main = document.querySelector('main')
// console.log(main)
// const allSection = document.querySelectorAll('section')
// const navbar__btn = document.querySelectorAll('.navbar__btn')
// const io = new IntersectionObserver((entries, observer)=>{
//     console.log(entries)
//         entries.forEach(entry => {
//             navbar__btn.forEach((btn,index)=>{
//                 if(entry.isIntersecting && btn.dataset.id == entry.target.id){
//                     console.log('조건에 맞는곳',btn)
//                     btn.classList.add('btn__border')
//                 }else{
//                     console.log('조건에 안맞는곳',btn)
//                     btn.classList.remove('btn__border')
//                 }
//             })

//         })

// },{threshold:0.3})
// allSection.forEach((section) => {
//     io.observe(section)
//   })
