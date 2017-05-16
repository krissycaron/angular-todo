
app.controller("ItemNewCtrl", function($http, $location, $q, $scope, FIREBASE_CONFIG, itemFactory){
  $scope.addNewItem = () =>{
    $scope.newTask.isCompleted  = false;
    // console.log("clicked add", $scope.newTask);
    itemFactory.postNewItem($scope.newTask)
    .then((response)=>{
      $scope.newTask = {}; //clear the inputs
       $location.url("/items/list");
      console.log("response", response);

      ///switch views
    }).catch((error)=>{
      console.log("Add Error", error);
    });
  };
});