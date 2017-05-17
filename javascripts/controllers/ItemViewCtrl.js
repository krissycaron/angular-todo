app.controller("ItemViewCtrl", function($routeParams, $scope, itemFactory){
	$scope.selectedItem = {};

	// console.log("routeParams", $routeParams);

	itemFactory.getSingleItem($routeParams.id).then((results)=>{
		$scope.selectedItem = results.data;
	}).catch((error) => {
		console.log("getSingleItemerror", error);
	});
});