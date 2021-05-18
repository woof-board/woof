export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const appendZero = input => {
	const inputStr = input.toString();
  	return inputStr.length < 2 ? `0${inputStr}` : inputStr;
};

export const formatDate = dateObj => {
  	return `${dateObj.getFullYear()}-${appendZero(dateObj.getMonth() + 1)}-${appendZero(dateObj.getDate())}`;
}

export const addDays = (oldDate, nDays) => {
    return new Date(oldDate.setDate(oldDate.getDate() + nDays));
};


export const createInitialState = () => {
    const arrLen = 14; // two weeks
    const tempArr = Array.from(Array(arrLen).keys());
  
    return tempArr.map((item, index)=>{
        const date = new Date();
        return {
            date: formatDate(addDays(date, index)),
            slot9am: false,
            slot11am: false,
            slot1pm: false,
            slot3pm: false,
            slot5pm: false,
            slot7pm: false,
            slot9pm: false,
          }
    }
        
    );
};

export const RatingIconSVG = {
  box: "0 0 133 135",
  coords: `M49.32,124a24.69,24.69,0,0,1-1.45-16c.78-3.43,1.93-6.79,3-10.14a127.59,127.59,0,0,0,4.67-17c.36-2,.59-4,.8-6,.69-6.79,3.58-12.38,9.41-16,6.84-4.3,14-4.75,21.18-.75,3.75,2.09,7.37,4.42,11.08,6.59,2,1.19,4.1,2.35,6.23,3.38a59.49,59.49,0,0,0,5.89,2.46,51.28,51.28,0,0,1,16.19,9c6.83,5.78,8,13.18,5.54,20.89a20.91,20.91,0,0,1-4.64,7.89c-1.91,2.06-4.39,2.86-7,3.45-5.67,1.29-11.36,2.51-17,3.82-2,.46-4,1.06-5.93,1.69a22.8,22.8,0,0,0-7.43,4.56c-3.52,2.91-7,5.9-10.52,8.79a37.85,37.85,0,0,1-4.13,2.85,13.6,13.6,0,0,1-8.32,2c-6.92-.52-12.51-3.44-16.44-9.27C50,125.44,49.71,124.72,49.32,124Z

  M92.26,15.79c3.1,7.05,4.16,14,2.27,21.21a17.22,17.22,0,0,1-6,9.74c-4.2,3.23-8.8,3.54-13.59,1.49a20.92,20.92,0,0,1-9.12-7.86,31.21,31.21,0,0,1-5.17-23A19.27,19.27,0,0,1,65.77,6.6,13,13,0,0,1,81.09,4.05a22.64,22.64,0,0,1,9.4,8.66C91.18,13.81,91.78,15,92.26,15.79Z
       
  M56.23,39.34a25.74,25.74,0,0,1,2.58,13.53c-.43,4.19-2,7.82-5.42,10.45a13.2,13.2,0,0,1-8.73,2.61,18.07,18.07,0,0,1-7.91-2c-9.94-5.24-15.7-13.42-17-24.6a17.36,17.36,0,0,1,1-8,13,13,0,0,1,12.91-8.82,22.19,22.19,0,0,1,13.1,5A32.27,32.27,0,0,1,56.23,39.34Z
  
  M129.69,30.72c3,7.4,3.19,15.75-1.61,23.81a14.71,14.71,0,0,1-9.92,7.37c-5,1-9.24-.67-12.86-4a23.56,23.56,0,0,1-7.09-14A25.67,25.67,0,0,1,101,26.79a16.42,16.42,0,0,1,6.54-6.65,13.19,13.19,0,0,1,13.33.15C124.73,22.43,127.31,25.74,129.69,30.72Z
  
  M43.75,76.77a22.42,22.42,0,0,1,2.5,10.49c-.24,8-5.89,13.7-13.91,14a22.44,22.44,0,0,1-14.27-4.73A25.93,25.93,0,0,1,7.37,80.12a16.74,16.74,0,0,1,.45-8.37C9.69,66,14.67,62.4,21.06,62.21a22.38,22.38,0,0,1,13.07,3.94A27,27,0,0,1,43.75,76.77Z`
}

export const cities = [
      { 
        name: "Toronto", 
        group: false
      },
      { 
        name: "Dufferin County", 
        group: true
      },
      { 
        name: "Mono", 
        group: false
      },
      { 
        name: "Orangeville", 
        group: false
      },
      { 
        name: "Durham", 
        group: true
      },
      { 
        name: "Ajax", 
        group: false
      },
      { 
        name: "Brock", 
        group: false
      },
      { 
        name: "Clarington", 
        group: false
      },
      { 
        name: "Pickering", 
        group: false
      },
      { 
        name: "Scugog", 
        group: false
      },
      { 
        name: "Whitby", 
        group: false
      },
      { 
        name: "Halton", 
        group: true
      },
      { 
        name: "Burlington", 
        group: false
      },
      { 
        name: "Halton Hills", 
        group: false
      },
      { 
        name: "Milton", 
        group: false
      },
      { 
        name: "Oakville", 
        group: false
      },
      { 
        name: "Peel", 
        group: true
      },
      { 
        name: "Brampton", 
        group: false
      },
      { 
        name: "Caledon", 
        group: false
      },
      { 
        name: "Mississauga", 
        group: false
      },
      { 
        name: "Simcoe County", 
        group: true
      },
      { 
        name: "Bradford West Gwillimbury", 
        group: false
      },
      { 
        name: "New Tecumseth", 
        group: false
      },
      { 
        name: "York", 
        group: true
      },
      { 
        name: "Aurora", 
        group: false
      },
      { 
        name: "Halton Hills", 
        group: false
      },
      { 
        name: "East Gwillimbury", 
        group: false
      },
      { 
        name: "Georgina", 
        group: false
      },
      { 
        name: "King", 
        group: false
      },
      { 
        name: "Markham", 
        group: false
      },
      { 
        name: "Newmarket", 
        group: false
      },
      { 
        name: "Richmond Hill", 
        group: false
      },
      { 
        name: "Vaughan", 
        group: false
      },
      { 
        name: "Whitchurch-Stouffville", 
        group: false
      }
]
export const neighbourhoods = [
  "Downtown",
  "East York",
  "Etobicoke",
  "North York",
  "Scarborough",
  "York"
]

export function objectToArray(coordsObject) {
  return Object.values(coordsObject);
}

export function middleValueOfArray(arr) {
  if (arr!==0){
    const middleIndex = Math.floor(arr.length / 2);
    return arr[middleIndex];
  }
  else {
    return []; // Tracking not started
  }
}

