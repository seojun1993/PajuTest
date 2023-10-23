// 페이지 전환
// 초기 세팅
let pageStack = [];
let swiper = null;
let includeDiv = document.getElementById("div_main_container");

// fetchAndInjectHTML('FLOOR');

// function fetchAndInjectHTML(url) {

//     link = url + '.html';

//     fetch(link)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.text();
//         })
//         .then(htmlContent => {
//             const container = document.getElementById('div_main_container');
//             container.innerHTML = '';
//             container.innerHTML = htmlContent;

//             pageStack.push(link);

//             // 수어 감추는 페이지
//             if (url === 'FLOOR' || url.includes('GUIDE')) {
//                 document.querySelector('.sign_character').style.visibility = 'hidden';
//             } else {
//                 document.querySelector('.sign_character').style.visibility = 'visible';
//             }
//             // 수어 감추는 페이지

//             // 푸터 감추는 페이지
//             if (url === 'INTRO' || url === 'USER_CHOICE' || url.includes('GUIDE')) {
//                 document.querySelector('footer').style.display = 'none';
//                 document.getElementById('div_main_container').style.height = 100 + '%';
//             } else {
//                 document.querySelector('footer').style.display = 'block';
//                 document.getElementById('div_main_container').style.height = 1555 + 'px';
//             }
//             // 푸터 감추는 페이지

//             // HTML 파일에 포함된 스크립트 실행

//                 scripts = container.querySelectorAll('script');
//                 scripts.forEach(script => {
//                     const newScript = document.createElement('script');
//                     newScript.type = 'text/javascript';
//                     newScript.innerHTML = script.innerHTML;
//                     container.appendChild(newScript);
//                 })


//             getPopup();

//             if (swiper != null) swiper.destroy();
//             swiperContent(url);

//         })
//         .catch(error => console.error('Error fetching or injecting HTML:', error));
// }

loadIncludeHTML('GUIDE_01')

function loadIncludeHTML(url) {

    link = url + '.html';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            includeDiv = document.getElementById("div_main_container");
            
            includeDiv.innerHTML = this.responseText;
            // HTML 파일이 로드되면 스크립트를 호출

            // 수어 감추는 페이지
            if (url === 'FLOOR' || url.includes('GUIDE')) {
                document.querySelector('.sign_character').style.visibility = 'hidden';
            } else {
                document.querySelector('.sign_character').style.visibility = 'visible';
            }
            // 수어 감추는 페이지

            // 푸터 감추는 페이지
            if (url === 'INTRO' || url === 'USER_CHOICE' || url.includes('GUIDE')) {
                document.querySelector('footer').style.display = 'none';
                includeDiv.style.height = 100 + '%';
            } else {
                document.querySelector('footer').style.display = 'block';
                includeDiv.style.height = 1555 + 'px';
            }
            // 푸터 감추는 페이지
            loadIncludedScript(url);

            for(let i = 0; i < document.querySelectorAll('.btn_url').length; i++){
                document.querySelectorAll('.btn_url')[i].addEventListener('click', () => {
                    alert(1);

                    let getUrl = document.querySelectorAll('.btn_url')[i].getAttribute('data-link');

                    loadIncludeHTML(getUrl);
                })
            }

        }
    };
    xhttp.open("GET", link, true);
    xhttp.send();
}

// included.html의 JavaScript 부분
function loadIncludedScript(url) {
    link = url.toLocaleLowerCase();

    console.log(link);
    var script = document.createElement("script");
    script.src = 'include/js/' + link + '.js';
    includeDiv.appendChild(script);
}
// 페이지 전환

function swiperContent(id) {
    let target = id.toLocaleLowerCase().replace(/_/g, '') + '_swiper';
    let renderBulletFn;
    let typeFn;

    if (!id) {
        return;
    } else {
        if (id === 'GUIDE_01') {
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

        if (id === 'CULTURE') {
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
}

function getPopup() {
    let popBox = document.getElementById('div_pop');
    let popBtn = document.querySelectorAll('.btn_pop');

    popBtn.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            popBox.style.display = 'block';
            document.querySelector('.pop_table').style.display = 'block';

            popBox.querySelector('.location').addEventListener('click', () => {
                document.querySelector('.pop_table').style.display = 'none';
                document.querySelector('.pop_location').style.display = 'block';
            })

            closePopup();
        })
    })
}

function closePopup() {
    document.querySelectorAll('.pop_action .close').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.getElementById('div_pop').style.display = 'none';

            document.querySelectorAll('.pop_bg > div').forEach((div) => {
                div.style.display = 'none';
            })

        })
    })
}