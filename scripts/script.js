const dailyBtn = document.getElementById('daily-btn');
const weeklyBtn = document.getElementById('weekly-btn');
const monthlyBtn = document.getElementById('monthly-btn');


async function fetchData() {

    try{
        const response = await fetch('data.json');

        if(!response.ok){
            throw new Error('Could not fetch resource');
        }

        const data = await response.json();

       function updateUI(period) {
            data.forEach((activity, index) => {
                const activityCard = document.querySelectorAll('.card-container')[index];
                const hoursElement = activityCard.querySelector('.data h4');
                const periodElement = activityCard.querySelector('.data p');

                hoursElement.textContent = `${activity.timeframes[period].current}hrs`;
                periodElement.textContent = `Previous - ${activity.timeframes[period].previous}hrs`;
            });
        }

        updateUI("daily"); // Set default view to daily
        setActiveButton(dailyBtn);

        function setActiveButton(activeBtn) {
            [dailyBtn, weeklyBtn, monthlyBtn].forEach(btn => {
                btn.classList.remove('active');
            });
            activeBtn.classList.add('active');
        };

        dailyBtn.addEventListener('click', () => {
            updateUI("daily");
            setActiveButton(dailyBtn);
        });
        weeklyBtn.addEventListener('click', () => {
            updateUI("weekly");
            setActiveButton(weeklyBtn);
        });
        monthlyBtn.addEventListener('click', () => {
            updateUI("monthly");
            setActiveButton(monthlyBtn);
        });
    }
    catch(error){
        console.error(error);
    }
}

fetchData();


    




