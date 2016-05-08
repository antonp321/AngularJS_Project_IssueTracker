angular.module('issueTracker.dashboard', ['issueTracker.user.authentication'])


    .controller('dashboardController', ['$scope','listProjects', 'authentication', 'identity', function($scope, listProjects, authentication, identity){

        //$scope.authenticationCheckerDashCtrl = authentication.isAuthenticated();

        listProjects.latestProject()
                .then(function(latestProj){

                    $scope.latestProj = latestProj.data;
                });

        listProjects.latestIssues()
            .then(function(latestIssue){
               $scope.latestIssue = latestIssue.data;
            });

        $scope.clickForAllProjects = function(){
            listProjects.getAllProjects()
                .then(function(allProjects){
                    console.log(allProjects.data);
                    $scope.allProjects15 = allProjects.data;
                })
        };

    }]);