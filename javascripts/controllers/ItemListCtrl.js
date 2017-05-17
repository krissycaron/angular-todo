app.controller("ItemListCtrl", function($scope, itemFactory){
  $scope.items = [];
      
    let getItems = () =>{
      itemFactory.getItemList().then((itemz)=>{
        console.log("items", itemz);
        $scope.items = itemz;
        }).catch((error)=>{
        console.log("got and error", error);
        });
      };


    getItems();

    //46.37 get note ... 
    $scope.deleteItem = (id) =>{
      console.log("deleteItem");
      itemFactory.deletez(id).then(()=>{
console.log("deleteItem");
        getItems();
      }).catch((error)=>{
        console.log("delete item error", error);
      });
    };

});


