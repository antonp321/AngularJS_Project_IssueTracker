angular.module('issueTracker.addProjects', ['issueTracker.user.authentication'])

    .controller('AddProjectsController', ['$scope', '$location', '$rootScope', 'authentication', 'projectRequests', function($scope, $location, $rootScope, authentication, projectRequests){
            //  Трябва да викам заявката от "addProjectFactory" оба4е първо трябва да обработя инпута, който идва от темплейт формата

            //PROJECT обекта трябва да се обработи преди да се използва тук долу.

        $scope.projectObjectForRequest = {};

        $scope.addTheProject = function(project){
            projectRequests.addProject(project)
                .then(function(){
                    
                })
        };
    }]);
