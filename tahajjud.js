function computeTahajjudTimes() {
 
  const maghribHour = parseInt(document.getElementById('maghribHour').value);
  const maghribMinute = parseInt(document.getElementById('maghribMinute').value);
  const maghribPeriod = document.getElementById('maghribPeriod').value;
  const fajrHour = parseInt(document.getElementById('fajrHour').value);
  const fajrMinute = parseInt(document.getElementById('fajrMinute').value);
  const fajrPeriod = document.getElementById('fajrPeriod').value;

  
  const midnightDisplay = document.getElementById('midnightTime');
  const lastThirdDisplay = document.getElementById('lastThirdTime');
  const disclaimer = document.getElementById('disclaimer');

 
  if (isNaN(maghribHour) || isNaN(maghribMinute) || isNaN(fajrHour) || isNaN(fajrMinute)) {
      alert('Please enter valid Maghrib and Fajr times to proceed.');
      return;
  }


  const maghribTimeInMinutes = convertTo24Hour(maghribHour, maghribMinute, maghribPeriod);
  const fajrTimeInMinutes = convertTo24Hour(fajrHour, fajrMinute, fajrPeriod);

 
  const timeDifference = (fajrTimeInMinutes + (24 * 60) - maghribTimeInMinutes) % (24 * 60);
  const thirdOfNight = timeDifference / 3;
  const halfOfNight = timeDifference / 2;


  const middleOfNightMinutes = (maghribTimeInMinutes + halfOfNight) % (24 * 60);
  const lastThirdStartMinutes = (fajrTimeInMinutes - thirdOfNight + (24 * 60)) % (24 * 60);


  midnightDisplay.textContent = `Middle of the Night: ${formatTime(middleOfNightMinutes)} AM`;
  lastThirdDisplay.textContent = `Last Third of the Night Starts: ${formatTime(lastThirdStartMinutes)} AM`;
  disclaimer.textContent = 'Times are approximate. Please consult local mosque or a Prayer Time app for precise times.';

  midnightDisplay.style.visibility = 'visible';
  lastThirdDisplay.style.visibility = 'visible';
  disclaimer.style.visibility = 'visible';
}

function convertTo24Hour(hours, minutes, period) {

  if (hours === 12) {
      hours = 0; 
  }
  if (period === 'PM') {
      hours += 12;
  }
  return (hours * 60) + minutes; 
}

function formatTime(minutes) {

  minutes = Math.round(minutes);


  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}



window.onload = function() 
{

  localStorage.clear();
  sessionStorage.clear();

  //test times
  //document.getElementById('maghribHour').value = 6;
  //document.getElementById('maghribMinute').value = 0;
  //document.getElementById('maghribPeriod').value = 'PM';
  //document.getElementById('fajrHour').value = 5; 
  //document.getElementById('fajrMinute').value = 0;
  //document.getElementById('fajrPeriod').value = 'AM';
};




document.getElementById('helpButton').addEventListener('click', function() {
    const prompt = document.createElement('div');
    prompt.classList.add('help-prompt');
    prompt.innerHTML = `
      <h3>Tahajuud Prayer Calculator</h3>
      <p>- Welcome to Tahajuud Prayer Calculator! This application helps you calculate the tahajuud prayer time.</p>
      <p>- The user interface is straightforward, requiring users to input Maghrib and Fajr times to proceed.</p>
      <p>- The time type is automatically set to PM for Maghreb and AM for Fajr.</p>
      <p>- Upon triggering the calculation, the application validates inputs, computes the middle of the night and the last third start times based on Tahajjud principles, and displays these times. </p>
      <p>- This application works both on mobile devices and computers but for usability a Computer is recommended.</p>
      <p>- Thanks for using Tahajjud Prayer Calculator!</p>
      <button onclick="document.body.removeChild(this.parentNode); removeBlur()">Close</button>
    `;
    document.body.appendChild(prompt);
    addBlur();
  
    this.classList.add('clicked'); 
  });


  function addBlur() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }
  
  
  function removeBlur() {
    const overlay = document.querySelector('.overlay');
    document.body.removeChild(overlay);
    document.getElementById('helpButton').classList.remove('clicked'); 
  }