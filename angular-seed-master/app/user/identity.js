angular.module('issueTracker.user.identity', [])

        .factory('identity',['$http', '$q', function($http, $q){

            var currentUser = undefined;

            var deferred = $q.defer();

            return {
                getCurrentUser: function(){
                    if(currentUser){
                        return $q.when(currentUser);
                    }
                    else{
                        return deferred.promise;
                    }
                },

                removeUserProfile: function(){
                    currentUser = undefined;
                },

                getUserProfile: function(){

                    var userProfileDeferred = $q.defer();

                    $http.get('http://softuni-issue-tracker.azurewebsites.net/users/me')
                        .then(function(response){
                            currentUser = response.data;
                            deferred.resolve(response.data);
                            userProfileDeferred.resolve();
                        });

                    return userProfileDeferred.promise;
                }
            };
        }]);