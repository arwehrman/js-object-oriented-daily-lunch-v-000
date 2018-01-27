let store = {customers: [], meals: [], deliveries: [], employers: []};

let customerId = 0;
  class Customer {
    constructor(name,employer) {
      this.id = ++customerId;
      if (name) this.name = name;
      if (employer) this.employerId = employer.id;
      store.customers.push(this);
    }

    meals() {
      return this.deliveries().map(d => {
        return store.meals.find(m => {
          return m.id === d.mealId
        })
      })
    }

    deliveries() {
      return store.deliveries.filter(d => {
        return d.customerId === this.id
      })
    }

    totalSpent() {
    return this.meals().reduce((a,b) => a + b.price, 0)
    }
  }

let mealId = 0;

class Meal {
  constructor(title,price) {
    this.id = ++mealId;
    if (title) {
        this.title = title;
      }
    if (price) {
        this.price = price;
      }
      store.meals.push(this);
  }

  deliveries() {
  return store.deliveries.filter(delivery => {
    return delivery.mealId === this.id
    })
  }

  customers() {
  return this.deliveries().map(delivery => {
    return store.customers.find(customer => {
      return customer.id === delivery.customerId
      })
    })
  }

  static byPrice() {
    return store.meals.sort( (meal1,meal2) => {
      return meal2.price - meal1.price;
    })
  }
}

let deliveryId = 0;

  class Delivery {
    constructor(meal,customer) {
    this.id = ++deliveryId;
    if (meal) {
        this.mealId = meal.id;
    }
    if (customer) {
        this.customerId = customer.id;
    }
    store.deliveries.push(this);
    }

    meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
      })
    }
    customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
      })
    }
  }

let employerId = 0;

  class Employer {
    constructor(name) {
    this.id = ++employerId;
    this.name = name;
    store.employers.push(this);
    }
    employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
      })
    }

  deliveries() {
    let employerDeliveries =  [];
      store.deliveries.forEach(delivery => {
        let c = store.customers.find(customer => {
          return customer.id === delivery.customerId});
          if (c.employerId === this.id) {
            employerDeliveries.push(delivery);
          }
        })
        return employerDeliveries;
    }

  meals() {
    const employerMeals =  [];
    this.deliveries().forEach(delivery => {
    let m = store.meals.find(meal => {
      return meal.id === delivery.mealId}
      );
    if (employerMeals.find(employee => {
      return employee.id === m.id}) === undefined) {
        employerMeals.push(m);
      }
    })
    return employerMeals;
  }

  mealTotals() {
    const employerMealsCount =  {};
      this.deliveries().forEach(d => {
        if (Object.keys( employerMealsCount).indexOf( d.mealId.toString()) === -1) {
          employerMealsCount[d.mealId] = 1;
        }
        else {
          ++employerMealsCount[d.mealId];
        }
      })
    console.log(employerMealsCount);
    return employerMealsCount;
  }
}
