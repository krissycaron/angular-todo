app.controller("ItemEditCtrl", function($location, $routeParams, $scope, itemFactory) {
    // console.log("ItemEditCtrl");
    $scope.newTask = {};


    itemFactory.getSingleItem($routeParams.id).then((results) => {
    	console.log("results", results);
        $scope.newTask = results.data;
    }).catch((error) => {
        console.log("getSingleItemerror", error);
    });


    $scope.addNewItem = () => {
        itemFactory.editItem($scope.newTask).then(() => {
            $location.url(`./items/list`);
        }).catch((error) => {
            console.log("edititem error", error);
        });
    };
});