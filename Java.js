
// Class representing a car with name, model, year, and price properties

class Car {
    constructor(name, model, year, price) 
    {
        this.name = name;
        this.model = model;
        this.year = year;
        this.price = price;
    }

    calculatePrice(currentYear) 
    {
        const age = currentYear - this.year;
        const depreciation = age * 500;
        this.price = Math.max(0, this.price - depreciation); //Math.max grabs the larger value of the two numbers
        return this.price;
    }
}
class CarManager 
{
    constructor() 
    {
        this.cars = []; //create an empty array
    }

    addCar(car) 
    {
        this.cars.push(car); //push car data into the last spot in the array
    }

    displayCars() 
    {
        return this.cars.map(car => `Brand: ${car.name}, Model: ${car.model}, Year: ${car.year}, Price: $${car.price.toFixed(2)}`).join('\n');
    }

    showTotalPrice(currentYear) {
        let totalPrice = 0;
        this.cars.forEach(car => {totalPrice += car.calculatePrice(currentYear); //same thing as saying totalPrice = totalPrice + car.calulatePrice / totals the price of the cars
        });
        return `Total Price of all cars: $${totalPrice.toFixed(2)}`; //return the total price within a rounded decimal digit of 2
    }
}

document.addEventListener('DOMContentLoaded', () => 
    {
    const carManager = new CarManager(); 
    const carForm = document.getElementById('carForm'); //grab data from the input
    const carList = document.getElementById('carList');
    const totalPriceElement = document.getElementById('totalPrice');
    const currentYear = new Date().getFullYear(); //grab the latest year

    carForm.addEventListener('submit', (event) => //create an event for the html button 'submit'
        {
        event.preventDefault();
        const name = event.target.name.value;
        const model = event.target.model.value;
        const year = parseInt(event.target.year.value); //parseInt grabs the first number in the string (doesnt grab the decimal)
        const price = parseFloat(event.target.price.value); //parsefloat does the same as parse int but grabs the decimal to

        const car = new Car(name, model, year, price);
        carManager.addCar(car); //push the addCar function in class carManager

        displayCars(); //calls displayCars function
        carForm.reset(); //clears out the form 
    });

    document.getElementById('calculateTotal').addEventListener('click', () => {totalPriceElement.textContent = carManager.showTotalPrice(currentYear); //triggers an event by the click of the calc total price button
    });

    function displayCars() 
    {
        carList.innerHTML = ''; //returns the HTML context
        carManager.cars.forEach(car => 
        {
            const carInfo = document.createElement('div');
            carInfo.textContent = `Brand:  ${car.name}, Model:  ${car.model}, Year:  ${car.year}, Price: ($): ${car.price.toFixed(2)}`; 
            carList.appendChild(carInfo);
        });
    }
});
