// 페이지 전환
// 초기 세팅
setUrl('INTRO')

async function setUrl(getUrl) {
    const target = getUrl + '.html'; // 대상 페이지의 URL을 입력하세요.

    try {
        const response = await fetch(target);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const html = await response.text();

        const divContainer = document.getElementById('div_main_container');
        divContainer.innerHTML = html;

        changeUrl();
        swiperContent(getUrl)

    } catch (error) {
        console.error(error);
    }
}
// 페이지 전환

function changeUrl() {
    let urlBtn = document.querySelectorAll('.btn_url');

    urlBtn.forEach((item) => {
        item.addEventListener('click', () => {
            let getUrl = item.getAttribute('data-link');

            setUrl(getUrl)

        })
    })
}

function swiperContent(id){

    let target = id.toLocaleLowerCase().replace(/_/g, '') + '_swiper';
    console.log(target);

    var swiper = new Swiper(`.${target}`, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
}