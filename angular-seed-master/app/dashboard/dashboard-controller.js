angular.module('issueTracker.dashboard', ['issueTracker.user.authentication'])


    .controller('dashboardController', ['$scope','listProjects', 'authentication', 'identity', function($scope, listProjects, authentication, identity){

        //$scope.authenticationCheckerDashCtrl = authentication.isAuthenticated();

        listProjects.latestProject()
                .then(function(latestProj){
                    $scope.latestProj = latestProj.data;
                });

        listProjects.latestIssues()
            .then(function(latestProj){
               $scope.latestIssue = latestProj.data;
            });
     }]);