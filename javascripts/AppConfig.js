let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    // console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    // console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);

  //watch method that fires on change of a route.  3 inputs. LOOK UP ANGULAR WATCHERS
  //event is a change event
  //currRoute is information about your current route
  //prevRoute is information about the route you came from
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    // checks to see if there is a current user
    var logged = AuthFactory.isAuthenticated();

    //temporary variable ... used below in if/else ///
    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });
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
  // object and then properties
  .when('/items/list', {
    templateUrl: 'partials/item-list.html',
    controller: 'ItemListCtrl',
    resolve : {isAuth}
  })
  .when('/items/new', {
    templateUrl: 'partials/item-new.html',
    controller: 'ItemNewCtrl',
    resolve : {isAuth}
  })
  .when('/item/view/:id', {
    templateUrl: 'partials/item-view.html',
    controller: 'ItemViewCtrl',
    resolve : {isAuth}
  })
  .when('/item/edit/:id', {
    templateUrl: 'partials/item-new.html',
    controller: 'ItemEditCtrl',
    resolve : {isAuth}
  })
  .when('/logout', {
    templateUrl: 'partials/auth.html',
    controller: 'AuthCtrl',
    resolve : {isAuth}
  })
  .otherwise('/auth');
});



