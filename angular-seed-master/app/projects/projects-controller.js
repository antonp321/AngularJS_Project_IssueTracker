angular.module('issueTracker.projects', ['issueTracker.user.authentication'])

    .controller('ProjectsController', ['$scope', '$location', '$rootScope', 'authentication', 'listProjects', function($scope, $location, $rootScope, authentication, listProjects){
            $scope.addProjectURL = function(){
                $location.path('projects/addProject');
            };

        listProjects.latestProject()
            .then(function(latestProj){
                $scope.latestProj1 = latestProj.data;
            });

    }]);