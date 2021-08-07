// ------------------------------- json 아이템 가져오기-------------------------------

// career List 가져오기 
function getCareerList(){
    // 함수의 return 값을 fetch로 얻은 값으로 해준다.
    return fetch('./data/portfolio.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        return myJson.careers // 최종 return 값 
    });
}
getCareerList().then((careers)=>{
    console.log(careers)
    let about__career = document.querySelector('.about__careers')
    careers.forEach((career,index)=>{
        let about__career__wrap = document.createElement('div')
        about__career__wrap.classList.add('about__career__wrap')
        about__career__wrap.innerHTML = `
            <div class="about__career__img">
                <a href="${career.href}"><img width="150px" src="${career.logo}"/></a>
            </div>
            <div class="about__career__infoWrap">
                <div class="about__career__info">${career.info}</div>
                <div class="about__career__term">${career.term}</div>
            </div>
        `
        about__career.appendChild(about__career__wrap)
    })
})

// Skills List 가져오기 
function getSkillsList(){
    // 함수의 return 값을 fetch로 얻은 값으로 해준다.
    return fetch('./data/portfolio.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        return myJson.skills // 최종 return 값 
    });
}
getSkillsList().then((result)=>{
    // Skills 목록 
    let skills = result.filter((skill)=>{
        return skill.type == 'skill'
    })
    let skills__skills = document.querySelector('.skills__skills')
    
    skills.forEach((skill) => {
        let skills__itemsWrap = document.createElement('div')
        skills__itemsWrap.classList.add('skills__itemsWrap')    
        skills__itemsWrap.innerHTML=`
            <div class="skills__label">
                <div class="skills__name">${skill.name}</div>
                <div class="skills__percent">${skill.percent}%</div>
            </div>
            <div class="skills__border--white">
                <div class="skills__border--yellow" style="width: ${skill.percent}%;"></div>
            </div>`
        skills__skills.appendChild(skills__itemsWrap)
    });
    
    // Tools 목록
    let tools = result.filter((tool)=>{
        return tool.type == 'tool'
    })
    let skills__tools__tool = document.querySelector('.skills__tools--tool')
    
    tools.forEach((tool)=>{
        let skills__name = document.createElement('div')
        skills__name.classList.add('skills__name')
        skills__name.innerHTML = `<div class="skills__name">${tool.name}</div>`
        skills__tools__tool.appendChild(skills__name)
    })

    // Etc 목록
    let etc = result.filter((e)=>{
        return e.type == 'etc'
    })
    let skills__tools__etc = document.querySelector('.skills__tools--etc')

    etc.forEach((e)=>{
        let skills__name = document.createElement('div')
        skills__name.classList.add('skills__name')
        skills__name.innerHTML = `<div class="skills__name">${e.name}</div>`
        skills__tools__etc.appendChild(skills__name)
    })

})

// ------------------------------- 버튼클릭 이벤트 -------------------------------

// 메뉴 토글 버튼 
function getMenuListToggle(){
    const navbar = document.querySelector('.navbar')
    const navbar__rigth = document.querySelector('.navbar__rigth')
    navbar.classList.toggle('navbar--toggle')
    navbar__rigth.classList.toggle('navbar__rigth--toggle')
}

// nav bar 버튼 클릭
const navbar__container = document.querySelector('.navbar__container')
navbar__container.addEventListener('click',(e)=>{
    if(!e.target.dataset.id) return
    goToId(e.target.dataset.id)
})

// ↑ 버튼 클릭
const arrow__up__button = document.querySelector('.arrow-up__button')
arrow__up__button.addEventListener('click',(e)=>{
    goToId('home')
})

// CONTACT ME! 버튼 클릭
const home__btn = document.querySelector('.home__btn')
home__btn.addEventListener('click',(e)=>{
    if(!e.target.dataset.id) return
    goToId(e.target.dataset.id)
})

// 버튼 클릭시 해당 id로 이동하기
function goToId(id){
    const elementId = document.getElementById(id)
    elementId.scrollIntoView()
    // html 맨 위에서 id까지의 거리
    // const distanceFromHtml = elementId.getBoundingClientRect().top + window.pageYOffset
    // window.scrollTo(0, distanceFromHtml);
}   

// ↑ 버튼 보이기 (Y축 500 이상일 때)
document.addEventListener('scroll',(e)=>{
    console.log(window.pageYOffset)
    console.log(e)
    if(window.pageYOffset>500){
        // 위에 만들어진 arrow__up__button을 사용
        arrow__up__button.classList.add('opacity__1')
    } else{
        arrow__up__button.classList.remove('opacity__1')
    }
})


