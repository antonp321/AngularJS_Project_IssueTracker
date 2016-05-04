angular.module('issueTracker.dashboardProjects',[])

    .factory('listProjects', ['$http', '$q', function($http, $q){

        function getLatestProject(){
            var deferred = $q.defer();

            //ТРЯБВА ДА СМЕНЯ URL-А ДА ТЪРСИ "МОЕТО ИД" НЕ ТОВА ХАРДКОДНАТОТО
            $http.get("http://softuni-issue-tracker.azurewebsites.net/projects?filter=Lead.Id=\"8a2c98e0-8e6c-4d00-81b4-36e10dc62966\"&pageSize=20&pageNumber=1")
                .then(function(listProjects){
                    deferred.resolve(listProjects);
                });

            return deferred.promise;
        }

        function getIssuesForProjectName(){
            var deferred = $q.defer();

            //ТРЯБВА ДА ИЗПОЛЗВАМ ISSUE/ME ЗА ДА ВЗЕМА САМО ISSUE-ТАТА АСАЙННАТИ КЪМ МЕН
            $http.get("http://softuni-issue-tracker.azurewebsites.net/issues/3")
                .then(function(listProjects){
                    deferred.resolve(listProjects);
                });

            return deferred.promise;
        }

        return {
            latestProject : getLatestProject,
            latestIssues : getIssuesForProjectName
        }

    }]);