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
  {id: 0, name: 'Steak dinner', calories: 1200},
  {id: 1, name: 'Cookie', calories: 400},
  {id: 2, name: 'Eggs', calories: 300}
    ],
  currentItem: null,
  totalCalories: 0
}
// public methods
return {
  getItems: function(){
    return data.items;
  },
  logData: function(){
    return data;
  }
}
})();

// UI controller
const UICtrl = (function(){
 const UISelectors = {
  itemList: '#item-list'
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
  }

}

})();



// app controller

const AppCtrl = (function(ItemCtrl, UICtrl){

  // public methods
  return {
    init: function (){
    // fetch items from data structure 
    const items = ItemCtrl.getItems();

    // populate list with items
    UICtrl.populateItemList(items);
  }
}

})(ItemCtrl, UICtrl);

// Initialize App

AppCtrl.init();