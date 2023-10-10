// 날씨 연동
function nowWeather() {
    const apiKey = 'f4cc891603e0f9fd6101ae14e3ba42f9';  // 발급받은 API 키
    const city = 'Seoul';  // 날씨 정보를 가져올 도시 이름
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    // API 호출
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('날씨 데이터:', data);
        let Weather = data.weather[0].main;

        switch(Weather) {
            case 'Clear' : 
            Weather = `<span>맑음</span><img src="./images/weather/sunny.svg">`
            break;

            case 'Clouds' : 
            Weather = `<span>구름</span><img src="./images/weather/cloudy.svg">`
            break;

            case 'Mist' : 
            Weather = `<span>구름</span><img src="./images/weather/cloudy.svg">`
            break;
            // 날씨케이스 추가 부분
        }

        document.getElementById('nowWeather').innerHTML = Weather;
    })
    .catch(error => console.error('API 호출 오류:', error));
}

// 날씨 연동

// 현재 시간
function nowDate() {

    const date = new Date();
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    console.log(`${year} ${month} ${day}`)
    
    document.getElementById('nowDate').innerHTML = `<p>${year}년 ${month}월 ${day}일</p>`
}

window.onload = () => {
    nowDate();
    nowWeather();
}

// 현재 시간