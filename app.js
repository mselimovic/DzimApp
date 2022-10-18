// storage controller 

// item controller
const ItemCtrl = (function(){
//  item constructor 
const Item = function(id, name, calories){
  this.id = id;
  this.name = name;
  this.calories = calories;
}

// data structure / state
const data = {
  items: [
  // {id: 0, name: 'Steak dinner', calories: 1200},
  // {id: 1, name: 'Cookie', calories: 400},
  // {id: 2, name: 'Eggs', calories: 300}
    ],
  currentItem: null,
  totalCalories: 0
}
// public methods
return {
  getItems: function(){
    return data.items;
  },
  addItem: function(name, calories){
  //  create ID
  let ID;
  if(data.items.length > 0){
    ID = data.items[data.items.length - 1].id + 1;
  } else {
    ID = 0;
  }
  // calories to number
  calories = parseInt(calories);
  // create new item 
  newItem = new Item(ID, name, calories);

  // Add to items array
  data.items.push(newItem);
  
  return newItem;
  },
  getTotalCalories: function(){
   let total = 0;
  //  loop through items and add cals
   data.items.forEach(function(item){
    total += item.calories;
   });
  //  set total calories in data structure 
  data.totalCalories = total;
  // return total 
  return data.totalCalories;
  },
  logData: function(){
    return data;
  }
}
})();

// UI controller
const UICtrl = (function(){
 const UISelectors = {
  itemList: '#item-list',
  addBtn: '.add-btn',
  itemNameInput: '#item-name',
  itemCalorieInput: '#item-calories',
  totalCalories: '.total-calories'
 }
  // public methods
 return{
  populateItemList: function(items){
    let html = '';

    items.forEach(function(item){
      html += ` <li id="item-${item.id}" class="list-group-item ">
      <strong>${item.name}</strong> <em>${item.calories} Calories</em>
      <a href="" class=""><i class="fa fa-pencil"></i></a>
    </li>`;
    });
    // insert list items
    document.querySelector(UISelectors.itemList).innerHTML = html;
  },
  getItemInput: function(){
    return {
      name: document.querySelector(UISelectors.itemNameInput).value,
      calories: document.querySelector(UISelectors.itemCalorieInput).value
    }
  },
  addListItem: function(item){
     // show the list 
    document.querySelector(UISelectors.itemList).style.display = 'block';

    // create li element 
    const li = document.createElement('li');
    // add class
    li.className = 'list-group-item';
    // add ID
    li.id = `item-${item.id}`;
    // add html
    li.innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
    <a href="" class=""><i class="fa fa-pencil"></i></a>`;
    // insert item
    document.querySelector(UISelectors.itemList).insertAdjacentElement('afterbegin', li)
  },
  clearInput: function (){
    document.querySelector(UISelectors.itemNameInput).value = '';
    document.querySelector(UISelectors.itemCalorieInput).value = '';
  },
  hideList: function (){
    document.querySelector(UISelectors.itemList).style.display = 'none';
  },
  showTotalCalories: function (totalCalories){
   document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
  },
  getSelectors: function(){
    return UISelectors;
  }
  

}

})();



// app controller

const AppCtrl = (function(ItemCtrl, UICtrl){
  // load event listeners
  const loadEventListeners = function(){
    // get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // add item event 
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  // add item submit 
  const itemAddSubmit = function(e){
    // get form input from UI controler
    const input = UICtrl.getItemInput();

    // check for name and calorie input
    if(input.name !== '' && input.calories !== '') {
      // add item
     const newItem = ItemCtrl.addItem(input.name, input.calories);
     // add item to UI list 
     UICtrl.addListItem(newItem);

    //  get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);
    //  clear fields
    UICtrl.clearInput()
    }
    
    e.preventDefault();
  }

  // public methods
  return {
    init: function (){
    // fetch items from data structure 
    const items = ItemCtrl.getItems();
    // check if any items are on list
    if(items.length === 0){
      UICtrl.hideList();
     }
      else {
    // populate list with items
      UICtrl.populateItemList(items);
      }
    //  get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to the UI
    UICtrl.showTotalCalories(totalCalories);
  

    // load event listeners
    loadEventListeners();
  }
}

})(ItemCtrl, UICtrl);

// Initialize App

AppCtrl.init();