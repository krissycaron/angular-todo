app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG) {

  let addUser = (authData) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, 
        JSON.stringify({ 
          uid: authData.uid,
          username: authData.username
        })
      )
      .then((storeUserSuccess) => {
        resolve(storeUserSuccess);
      })
      .catch((storeUserError) => {
        reject(storeUserError);
      });
    });
  };

  let getUser = (userId) =>{
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
        .then((userObject) => {
          let users = [];
          Object.keys(userObject.data).forEach((key) => { //taking the object of objects and creating an array or (users) for the json.
            users.push(userObject.data[key]);
          });
          resolve(users[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {addUser:addUser, getUser:getUser};
});