angular.module('issueTracker.main', ['issueTracker.user.authentication'])

        .controller('MainController', ['$scope', '$rootScope', '$location', 'identity','authentication', function($scope, $rootScope, $location, identity, authentication){

            //В ВСЕКИ ЕДИН КОНТРОЛЕР, В КОЙТО ИСКАМЕ ДА ГО ИЗПОЛЗВАМЕ ТОЗИ USER, ТРЯБВА ДА ГО ЗАКА4АМЕ КЪМ SCOPE-A ПО ТОЗИ НА4ИН.
            // СЛЕДОВАТЕЛНО 4РЕЗ ТОЗИ КОНТРОЛЕР И В TEMPLATE-А ЩЕ ГО ИЗПОЛЗВАМЕ.

                identity.getAllNonAdminUsers()
                    .then(function(allUsers){
                        var nonAdminArray = [];
                        for(var i = 0; i < 5; i++){
                            nonAdminArray.push(allUsers[i]);
                        }
                        $scope.nonAdminArray = nonAdminArray;
                    });

            $scope.makeAdmin1 = function(userId){
                identity.makeAdmin(userId)
                    .then(function(){
                        $rootScope.itsAdmin = "The user is promoted to admin!";
                    })
            };

            identity.getCurrentUser()
                .then(function(user){
                    $scope.currentUser = user;
            });

            $scope.projectPath = function(){
                $location.path('/projects');

            };

            $scope.dashboardPath = function(){
                $location.path('/');
            };

            //$scope.mainControllerAuthentication = authentication.isAuthenticated();

    }]);