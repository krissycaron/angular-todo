app.controller("ItemListCtrl", function($scope, itemFactory){
  $scope.items = [];

    let getItems = () => {
      
      itemFactory.getItemList().then((itemz)=>{
        $scope.items = itemz;
        // console.log("itemz", itemz);
      }).catch((error)=>{
        console.log("got and error", error);
      });
    };

  getItems();


});


