angular.module('issueTracker.dashboardProjects',[])

    .factory('listProjects', ['$http', '$q', 'identity', function($http, $q, identity){
        function getLatestProject(){
            var deferred = $q.defer();

            identity.getCurrentUser()
                .then(function(user){
                    $http.get('http://softuni-issue-tracker.azurewebsites.net/projects?filter=Lead.Id="' + user.Id + '"&pageSize=20&pageNumber=1')
                        .then(function(listProjects){
                            deferred.resolve(listProjects);
                        });
                });

            return deferred.promise;
        }

        function getAllProjects(){
            var deferred = $q.defer();

                    $http.get('http://softuni-issue-tracker.azurewebsites.net/projects')
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
            latestIssues : getIssuesForProjectName,
            getAllProjects : getAllProjects
        }

    }]);