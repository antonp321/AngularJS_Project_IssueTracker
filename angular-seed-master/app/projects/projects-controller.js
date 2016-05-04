angular.module('issueTracker.projects', ['issueTracker.user.authentication'])

    .controller('ProjectsController', ['$scope', '$location', '$rootScope', 'authentication', function($scope, $location, $rootScope, authentication){
            $scope.addProjectURL = function(){
                $location.path('projects/addProject');
            }
    }]);