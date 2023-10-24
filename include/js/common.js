// 페이지 전환
// 초기 세팅
let swiper = null;
let backUrl = [];

loadPage('INTRO');

// 페이지 전환
function loadPage(url) {
    backUrl = Array.from(new Set(backUrl));
    let includeDiv = document.getElementById('div_main_container')
    let link = url + '.html';
    let xhr = new XMLHttpRequest();

    url.includes('GUIDE') ? backUrl.push(url) : backUrl;;

    if(url == 'BACK'){
        let lastUrl = backUrl.slice(-2)[0];
        backUrl.pop();
        loadPage(lastUrl);

        return;
    }

    xhr.open('GET', link, true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            // 로드한 HTML을 현재 페이지에 추가
            includeDiv.innerHTML = xhr.responseText;

            const SignCharacter = document.querySelector('.sign_character');
            const Footer = document.querySelector('footer');

            // // 수어 감추는 페이지
            if (url === 'FLOOR' || url.includes('GUIDE')) {
                SignCharacter.style.visibility = 'hidden';
            } else {
                SignCharacter.style.visibility = 'visible';
            }
            // 수어 감추는 페이지

            // 푸터 감추는 페이지
            if (url === 'INTRO' || url === 'USER_CHOICE' || url.includes('GUIDE')) {
                Footer.style.display = 'none';
                includeDiv.style.height = 100 + '%';
            } else {
                Footer.style.display = 'block';
                includeDiv.style.height = 1555 + 'px';
            }
            // // 푸터 감추는 페이지

            swiperContent(url);
        }
    }

    xhr.send();
}
// 페이지 전환

function setUrl(btn) {
    let link = btn.getAttribute('data-link');

    loadPage(link);
}

function swiperContent(url) {
    let target = url.toLocaleLowerCase().replace(/_/g, '') + '_swiper';
    let renderBulletFn;
    let typeFn;

    if (!url) {
        return;
    } else {
        if (url === 'GUIDE_01') {
            let guideArr = ['점자패드 사용 안내', '키패드 사용 안내']
            renderBulletFn = function (index, className) {
                return `
                        <div class="page ${className}">
                            <span class="num">0${index + 1}</span>
                            <span class="txt">${guideArr[index]}</span>
                        </div>`
            }
            document.querySelector('.swiper-pagination').classList.add('guide_pagination')
        } else {
            renderBulletFn = false;
        }

        if (url === 'CULTURE') {
            typeFn = 'fraction'
            document.querySelector('.swiper-pagination').classList.add('culture_pagination')

            onOptions = {
                slideChange: function () {
                    document.querySelector('.culture_container').scrollTo({
                        top: 0,
                    })
                }
            }
        } else {
            typeFn = 'bullets';
            onOptions = false;
        }

        let swiper = new Swiper(`.${target}`, {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: renderBulletFn,
                type: typeFn,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            on: onOptions
        });
    }
}

function gnbActive(btn) {
    btn.parentNode.parentNode.querySelectorAll('li').forEach((list) => {
        list.querySelector('button').classList.remove('active');
    });

    btn.classList.add('active');
    setUrl(btn);
}

const popBox = document.getElementById('div_pop');

function getPopup(btn){
    popBox.style.display = 'block';
    document.querySelector('.pop_table').style.display = 'block';
}

function closePopup(){
    popBox.style.display = 'none';
    document.querySelectorAll('.pop_bg > div').forEach((div) => {
        div.style.display = 'none';
    })
}

// function getPopup() {
//     let popBox = document.getElementById('div_pop');
//     let popBtn = document.querySelectorAll('.btn_pop');

//     popBtn.forEach((item) => {
//         item.addEventListener('click', (e) => {
//             e.preventDefault();
//             popBox.style.display = 'block';
//             document.querySelector('.pop_table').style.display = 'block';

//             popBox.querySelector('.location').addEventListener('click', () => {
//                 document.querySelector('.pop_table').style.display = 'none';
//                 document.querySelector('.pop_location').style.display = 'block';
//             })

//             closePopup();
//         })
//     })
// }
