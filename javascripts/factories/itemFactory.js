app.factory("itemFactory", function($q, $http, FIREBASE_CONFIG){

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


    let deletez = (itemId) => {
      console.log("itemId", itemId);
      return $q((resolve, reject) => {
        $http.delete(`${FIREBASE_CONFIG.databaseURL}/items/${itemId}.json`)
        .then((resultz)=>{
        console.log("delete click");
        resolve(resultz);
      }).catch((error)=>{
        reject(error);
      });
    });
  };


    return {getItemList:getItemList, postNewItem:postNewItem, deletez:deletez};

});