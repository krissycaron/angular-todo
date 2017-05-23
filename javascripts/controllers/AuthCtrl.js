app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory){
	$scope.auth = {
		email: "a@a.com",
		password: "123456"
	}; 

	if($location.path() === '/logout'){
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url('/auth');
	}


//helper function will call the authenticate function from authFact. 
	let logMeIn = () =>{
		AuthFactory.authenticate($scope.auth).then((userCreds)=>{
			console.log("userCreds", userCreds);
			return UserFactory.getUser(userCreds.uid);
		}, (error)=> {
			console.log("authenticate error", error);
		}).then((user)=>{
			$rootScope.user = user;
			//global scope (rootScoop) can be accessed from everywhere
			$location.url('/items/list');
 			console.log("user", user);  
		}).catch((error)=> {
			console.log("getUser error", error);
		});
	};

	$scope.registerUser = () =>{
		//new auth of a user 
		//adding a user name to database 
		//the we neet to log in the user
		AuthFactory.registerWithEmail($scope.auth).then((didRegister)=>{
			console.log("didRegister", didRegister);
			$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
		}, (error)=> {
			console.log("registerWithEmail error", error);
		}).then((registerComplete)=>{
			logMeIn();
			console.log("registerComplete", registerComplete);
		}).catch((error)=>{
			console.log("adduser error", error);
		});
		
	};

	$scope.loginUser = () =>{
		logMeIn();	
	};

});