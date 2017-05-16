
app.controller("ItemNewCtrl", function($http, $q, $scope, FIREBASE_CONFIG){
  $scope.addNewItem=() =>{
    $scope.newTask.isCompleted  = false;
    // console.log("clicked add", $scope.newTask);
    postNewItem($scope.newTask)
    .then((response)=>{
      $scope.newTask = {}; //clear the inputs
      getItems();
      console.log("response", response);

      ///switch views
    }).catch((error)=>{
      console.log("Add Error", error);
    });
  };
});