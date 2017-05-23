app.run(function(FIREBASE_CONFIG) {
   firebase.initializeApp(FIREBASE_CONFIG);
});


/////// Setting Up Partials //////////
//use app.config .. only runs once on page load
app.config(function($routeProvider){
  //// theses are your routes.. to navigate the page. 

  // $routeProvider you link the pages you want to load. 
  $routeProvider
  .when('/auth', {
    templateUrl: 'partials/auth.html',
    controller: 'AuthCtrl'
  })
  // oject and then properties
  .when('/items/list', {
    templateUrl: 'partials/item-list.html',
    controller: 'ItemListCtrl'
  })
  .when('/items/new', {
    templateUrl: 'partials/item-new.html',
    controller: 'ItemNewCtrl'
  })
  .when('/item/view/:id', {
    templateUrl: 'partials/item-view.html',
    controller: 'ItemViewCtrl'
  })
  .when('/item/edit/:id', {
    templateUrl: 'partials/item-new.html',
    controller: 'ItemEditCtrl'
  })
  .when('/logout', {
    templateUrl: 'partials/auth.html',
    controller: 'AuthCtrl'
  })
  .otherwise('/auth');
});