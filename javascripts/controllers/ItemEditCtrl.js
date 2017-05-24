app.controller("ItemEditCtrl", function($location, $routeParams, $scope, itemFactory) {
    // console.log("ItemEditCtrl");
    $scope.newTask = {};


    itemFactory.getSingleItem($routeParams.id).then((results) => {
    	console.log("results", results);
        // re-assigning the date from a string to a date format for javascript to recognize.
        results.data.dueDate =new Date(results.data.dueDate);

        $scope.newTask = results.data;
        console.log($scope.newTask);
    }).catch((error) => {
        console.log("getSingleItemerror", error);
    });


    $scope.addNewItem = () => {
        console.log("scope newTask", $scope.newTask);
        itemFactory.editItem($scope.newTask).then(() => {
            $location.url(`/items/list`);
        }).catch((error) => {
            console.log("edititem error", error);
        });
    };
});