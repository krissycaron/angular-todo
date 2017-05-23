app.controller("AuthCtrl", function($scope, AuthFactory, UserFactory){
	$scope.auth = {}; 


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
			console.log("registerComplete", registerComplete);
		}).catch((error)=>{
			console.log("adduser error", error);
		});
		
	};

	$scope.loginUser = () =>{
		
	};

});