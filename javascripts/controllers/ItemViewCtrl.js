app.controller("ItemViewCtrl", function($routeParams, $scope, itemFactory, ToolFactory){
	$scope.selectedItem = {};
	$scope.tools = [];

	// console.log("routeParams", $routeParams);

	itemFactory.getSingleItem($routeParams.id).then((results)=>{
		$scope.selectedItem = results.data;
	}).catch((error) => {
		console.log("getSingleItemerror", error);
	});

	ToolFactory.getToolList($routeParams.id).then((results)=>{
		$scope.tools =results;
	}).catch((error)=>{
		console.log("error in getToolList", error);
	});

});