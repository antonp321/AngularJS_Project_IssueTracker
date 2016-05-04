angular.module('issueTracker.user.authentication', [])

    .factory('projectRequests', ['$http', '$q', function($http, $q){

        function addProject(project){

            var deferred = $q.defer();

            $http.post('http://softuni-issue-tracker.azurewebsites.net/projects', project)
                .then(function(response) {

                    deferred.resolve(response);

                }, function(error){

                });

            return deferred.promise;
        }


        return {
            addProject : addProject
        }

    }]);
