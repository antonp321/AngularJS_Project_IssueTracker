angular.module('issueTracker.home', ['issueTracker.user.authentication'])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeController'
            })
            .when('/projects', {
                templateUrl: 'app/projects/projects-home.html'
            })
            .when('/projects/addProject', {
                templateUrl: 'app/projects/add-project.html'
            })
            .otherwise({
                redirectTo: "/"
            });

        }])
        .controller('HomeController', ['$scope', '$location', '$rootScope', 'authentication', function($scope, $location, $rootScope, authentication){

            $scope.authenticationCheckerHomeCtrl = authentication.isAuthenticated();

            $scope.login = function(user){
                authentication.loginUser(user)
                    .then(function(loggedUser){
                        $rootScope.mainControllerAuthentication = true;
                        $location.path('/fakePath');
                    });

                console.log(authentication.isAuthenticated());
            };

            //ДА НАВЪРЖА И ПРИ РЕГИСТЪР ДА МЕ ПРАЩА В ХОУМА НА ДАШБОАРД-А. В МОМЕНТА САМО ПРИ ЛОГИН РАБОТИ !
            $scope.register = function(user){
                authentication.registerUser(user);
            };

            $scope.logoutt = function(){
                console.log(authentication.isAuthenticated());

                authentication.logout();

                $rootScope.mainControllerAuthentication = false;

            };

        }]);