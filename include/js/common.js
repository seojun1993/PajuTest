// 페이지 전환
// 초기 세팅
let swiper = null;

fetchAndInjectHTML('ORGANIZATION');

function fetchAndInjectPop(){

}

function fetchAndInjectHTML(url) {
        link = url + '.html';
        fetch(link)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(htmlContent => {
                const container = document.getElementById('div_main_container');
                container.innerHTML = htmlContent;

                // 수어 감추는 페이지
                if (url === 'GUIDE_01' || url === 'FLOOR') {
                    document.querySelector('.sign_character').style.visibility = 'hidden';
                } else {
                    document.querySelector('.sign_character').style.visibility = 'visible';
                }
                // 수어 감추는 페이지

                // 푸터 감추는 페이지
                if (url === 'INTRO' || url === 'USER_CHOICE' || url === 'GUIDE_01') {
                    document.querySelector('footer').style.display = 'none';
                } else {
                    document.querySelector('footer').style.display = 'block';
                }
                // 푸터 감추는 페이지

                // HTML 파일에 포함된 스크립트 실행
                const scripts = container.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.type = 'text/javascript';
                    newScript.innerHTML = script.innerHTML;
                    document.body.appendChild(newScript);
                });

                getUrl();
                getPopup();

                if (swiper != null) swiper.destroy();
                swiperContent(url);

            })
            .catch(error => console.error('Error fetching or injecting HTML:', error));
}

function getUrl() {
    let urlBtn = document.querySelectorAll('.btn_url');

    urlBtn.forEach((item) => {
        item.addEventListener('click', () => {
            let getUrl = item.getAttribute('data-link');
            fetchAndInjectHTML(getUrl);
        })
    })
}
// 페이지 전환

function swiperContent(id) {
    let target = id.toLocaleLowerCase().replace(/_/g, '') + '_swiper';
    let renderBulletFn;

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

            document.querySelector('.swiper-pagination').classList.add('custom_pagination')
        } else {
            renderBulletFn = false;
        }

        let swiper = new Swiper(`.${target}`, {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: renderBulletFn,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
}

function getPopup() {
    let popBox = document.getElementById('div_pop');
    let popBtn = document.querySelectorAll('.btn_pop');

    popBtn.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            popBox.style.display = 'block';

            popBox.querySelector('.location').addEventListener('click', () => {
                document.querySelector('.pop_table').style.display = 'none';
                document.querySelector('.pop_location').style.display = 'block';
            })

            closePopup();
        })
    })
}

function closePopup(){
    document.querySelectorAll('.pop_action .close').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.getElementById('div_pop').style.display = 'none';
        })
    })
}