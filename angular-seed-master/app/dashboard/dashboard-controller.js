angular.module('issueTracker.dashboard', ['issueTracker.user.authentication'])


    .controller('dashboardController', ['$scope','listProjects', 'authentication', function($scope, listProjects, authentication){

        //$scope.authenticationCheckerDashCtrl = authentication.isAuthenticated();

        listProjects.latestProject()
                .then(function(latestProj){

                    $scope.latestProj = latestProj;
                });
    }]);