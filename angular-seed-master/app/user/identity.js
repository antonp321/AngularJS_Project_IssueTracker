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
                },

                getAllUsers: function(){

                    var allUsersDeferred = $q.defer();

                    $http.get('http://softuni-issue-tracker.azurewebsites.net/users?filter=isAdmin=true')
                        .then(function(response){
                            allUsersDeferred.resolve(response.data);
                        });

                    return allUsersDeferred.promise;
                },

                getAllNonAdminUsers: function(){

                    var allNonUsersDeferred = $q.defer();

                    $http.get('http://softuni-issue-tracker.azurewebsites.net/users?filter=isAdmin=false', {
                        headers: {'Authorization': 'Bearer MMHdeaZWX1PX9dUOyGDij72BWHk9ItPYFq-0RrToew2N65tqtc5SkQSiOlc0AFY1se9KOJdzD5Rqh_ODcryOXntiP7MHRdFiL6lIijJu5BBYyTvid_BvS3VkBM5TdwyRVmfsZ9YwgmTPsqih3_TLrk0hcyuoy9-CNLqFTw1h1i6-FuZJujytihAHfW-vY017Pu5k0uy22bhGu2DR8jPmChgEOhr-vax3pirRWy2GD5nvRjKdptSDLmkOm29S3MMk-9OCtM4gq9Qw5QEApHDX8qBOsvJlwzjW1HTxumKMUnB5qicEVHLVDqweHZMYSGd-4vMigHmHL1fglkRN9run5AjkelKL_y_okfyc1rW_rZBtI4Sgi2Ks0wNXpMw6WwM76Et0S-nlAklaxiHPXRQjjDMxrv0gNCPh9uDEtuSbabqyHhOCC-wYC-zaw8CROn6gmPVtLKMbBFbCCleTmlcjqR18X7I-O-gGoHShtKuJoRA'}
                    })
                        .then(function(response){
                            allNonUsersDeferred.resolve(response.data);
                        });

                    return allNonUsersDeferred.promise;
                },

                makeAdmin: function(theUserId){

                    var admin = $q.defer();

                    $http.put('http://softuni-issue-tracker.azurewebsites.net/users/makeadmin', {UserId:theUserId}, {
                            headers: { 'Content-Type': 'application/json; charset=utf-8' }
                        })
                        .then(function(response){
                            admin.resolve(response.data);
                        });

                    return admin.promise;
                }
            };
        }]);