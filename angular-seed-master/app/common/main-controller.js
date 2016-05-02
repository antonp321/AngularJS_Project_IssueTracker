angular.module('issueTracker.main', ['issueTracker.user.authentication'])

        .controller('MainController', ['$scope', '$rootScope', 'identity','authentication', function($scope, $rootScope, identity, authentication){

            //В ВСЕКИ ЕДИН КОНТРОЛЕР, В КОЙТО ИСКАМЕ ДА ГО ИЗПОЛЗВАМЕ ТОЗИ USER, ТРЯБВА ДА ГО ЗАКА4АМЕ КЪМ SCOPE-A ПО ТОЗИ НА4ИН.
            // СЛЕДОВАТЕЛНО 4РЕЗ ТОЗИ КОНТРОЛЕР И В TEMPLATE-А ЩЕ ГО ИЗПОЛЗВАМЕ.

            identity.getCurrentUser()
                .then(function(user){
                    $scope.currentUser = user;

            });

            //$scope.mainControllerAuthentication = authentication.isAuthenticated();

    }]);