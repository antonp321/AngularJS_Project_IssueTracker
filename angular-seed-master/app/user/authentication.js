angular.module('issueTracker.user.authentication', [])

    .factory('authentication', ['$http', '$q', '$cookies', '$location', '$rootScope', 'identity', 'main_URL', function($http, $q, $cookies, $location, $rootScope, identity, main_URL){


            var authentication_COOKIE_KEY = '%%_Authentication_Cookie_Token_%%';

            function preserveUserData(data){
                var accessToken = data.access_token;
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $cookies.put(authentication_COOKIE_KEY, accessToken);

            }

            function registerUser(user){
                var deferred = $q.defer();

                $http.post(main_URL + 'Account/Register', user)
                    .then(function(response) {
                        preserveUserData(response.data);

                        identity.getUserProfile()
                            .then(function(){
                               deferred.resolve(response.data);
                            });
                        deferred.resolve(response);
                    }, function(error){

                    });

                return deferred.promise;
            }

            function loginUser(user){
                var userData = "grant_type=password&username=" + user.email + "&password=" + user.password;
                var deferred = $q.defer();

                $http.post(main_URL + 'Token', userData, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response) {
                        preserveUserData(response.data);
                        identity.getUserProfile()
                            .then(function(){
                                deferred.resolve(response.data);
                            });
                    }, function(error){

                    });

                return deferred.promise;
            }

            function refreshCookie(){
                if(isAuthenticated()){
                    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(authentication_COOKIE_KEY);
                    identity.getUserProfile();
                }
            }

            function logout(){
                $cookies.remove(authentication_COOKIE_KEY);
                $http.defaults.headers.common.Authorization = undefined;
                identity.removeUserProfile();
                $location.path('/fakePath2');
            }

            function isAuthenticated(){
                return !!$cookies.get(authentication_COOKIE_KEY);
            }

        return {
            registerUser : registerUser,
            isAuthenticated: isAuthenticated,
            refreshCookie: refreshCookie,
            loginUser: loginUser,
            logout: logout
        }

    }]);