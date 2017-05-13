//controller 
//dynamically creating a nav bar (NEW iife!!!)
//what goes in the (and the angular bits you want to use)
app.controller("NavCtrl", ($scope)=> {
	$scope.cat = "Meow";
	$scope.navItems=[{name: "Logout"}, {name: "All Items"}, {name: "New Item"}];
});


//second controller - 
//must pass in the scope to the variable 
app.controller("ItemCtrl", ($scope) => {
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



});










