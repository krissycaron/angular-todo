app.run((FIREBASE_CONFIG) => {
   firebase.initializeApp(FIREBASE_CONFIG);
});


/////// Setting Up Partials //////////
//use app.config .. only runs once on page load
app.config(($routeProvider)=>{
  // $routeProvider you link the pages you want to load. 
  $routeProvider
  // oject and then properties
  .when('/items/list', {
    templateUrl: 'partials/item-list.html',
    controller: 'ItemListCtrl'
  })
  .when('/items/new', {
    templateUrl: 'partials/item-new.html',
    controller: 'ItemNewCtrl'
  })
  .when('/item/view/:id', {
    templateURL: 'partials/item-view.html',
    controller: 'ItemViewCtrl'
  })
  .when('/item/edit/:id', {
    //re-useing the html in the form for new and edit .. but it does need a new controller
    templateURL: 'partials/item-new.html',
    controller: 'ItemEditCtrl'
  })
  .otherwise('/item/list');
});




app.controller("NavCtrl", ($scope)=> {
	$scope.cat = "Meow";
	$scope.navItems=[{name: "Logout"}, {name: "All Items"}, {name: "New Item"}];
});

app.controller("ItemListCtrl", ()=>{
  console.log("ItemListCtrl");
});


app.controller("ItemNewCtrl", ()=>{
  console.log("ItemNewCtrl");
});

app.controller("ItemViewCtrl", ()=>{
  console.log("ItemViewCtrl");
});

app.controller("ItemEditCtrl", ()=>{
  console.log("ItemEditCtrl");
});


//second controller - 
//must pass in the scope to the variable 
app.controller("ItemCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
	$scope.dog="Woof!";
	$scope.showListView = true;
	  $scope.items = [];
	
	$scope.newItem = () => {
		$scope.showListView = false;
		// console.log("new item");
	};

	$scope.allItems = () => {
		$scope.showListView = true;
		// console.log("all item");
	};

    let getItemList = () => {
      // this is different from the scope items. 
      let itemz = [];
      // return new Promise ... would go here, instead you use $q
      return $q((resolve, reject) => {
        // $.ajax().done().fail ... this is what we were using. nad becasue there is another lib you need to put in the argument. 
        $http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
        .then((fbItems)=> {
            var itemCollection = fbItems.data;
            Object.keys(itemCollection).forEach((key) => {
              itemCollection[key].id=key;
              itemz.push(itemCollection[key]);
            });
            resolve(itemz);
          resolve(fbItems);
        })
        .catch((error) => {
          reject(error);
        });
      }); 
    };


    let getItems = () => {
      getItemList().then((itemz)=>{
        $scope.items = itemz;
        // console.log("itemz", itemz);
      }).catch((error)=>{
        console.log("got and error", error);
      });
    };

  getItems();
  

  let postNewItem = (newItem) =>{
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`, JSON.stringify(newItem))
      .then((resultz)=>{
        resolve(resultz);
      }).catch((error)=>{
        reject(error);
      });
    });
  };

  $scope.addNewItem=() =>{
    $scope.newTask.isCompleted  = false;
    // console.log("clicked add", $scope.newTask);
    postNewItem($scope.newTask)
    .then((response)=>{
      $scope.newTask = {}; //clear the inputs
      $scope.showListView = true; //add the item the list and changes it from true to false 
      getItems();
      console.log("response", response);
    }).catch((error)=>{
      console.log("Add Error", error);
    });
  };

});










