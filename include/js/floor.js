
let subBtn = document.querySelectorAll('#lnb ul li');
let mapBtn = document.querySelectorAll('#location button');

subBtn.forEach((list, idx) => {
    list.addEventListener('click', (e) => {
        e.preventDefault();

        for (let i = 0; i < subBtn.length; i++) {
            subBtn[i].querySelector('button').classList.remove('active');
        }

        list.querySelector('button').classList.add('active');

        let location = list.querySelector('button').getAttribute('data-location');

        if (location === 'all') {
            document.querySelector('.tab_all_result').style.display = 'flex';
            document.querySelector('.tab_detail_result').style.display = 'none';

            setTimeout(() => {
                document.querySelector('.touch_guide').style.opacity = 0;
            }, 5000)

        } else {
            document.querySelector('.tab_all_result').style.display = 'none';
            document.querySelector('.tab_detail_result').style.display = 'flex';
            document.querySelector('.touch_guide').style.opacity = 1;

            document.getElementById('location').querySelectorAll('button').forEach((mapBtn) => {
                mapBtn.classList.remove('active');

                if (location === mapBtn.getAttribute('data-location')) {
                    mapBtn.classList.add('active');


                    // 데이터 교체 자리
                    // 데이터 교체 자리
                }
            })
        }
    })
})