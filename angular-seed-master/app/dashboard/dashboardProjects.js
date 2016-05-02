angular.module('issueTracker.dashboardProjects',[])

    .factory('listProjects', ['$http', '$q', function($http, $q){

        function getLatestProject(){
            var deferred = $q.defer();

            $http.get('http://softuni-issue-tracker.azurewebsites.net/Projects/')
                .then(function(listProjects){
                    deferred.resolve(listProjects);
                });

            return deferred.promise;
        }

        return {
            latestProject : getLatestProject
        }

    }]);