'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
    'ngRoute',
    'ngCookies',
    'issueTracker.home',
    'issueTracker.user.authentication',
    'issueTracker.dashboard',
    'issueTracker.main',
    'issueTracker.user.identity',
    'issueTracker.dashboardProjects',
    'issueTracker.projects',
    'issueTracker.addProjects',
    'issueTracker.addProjectFactory'

])
      .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
          $routeProvider.otherwise({redirectTo: '/'});

          $httpProvider.interceptors.push(['$q','toastr', function($q, toastr){
             return {
                 'response': function(response){
                    return response;
                 },
                 'responseError': function(rejection) {

                     if(rejection.data && rejection.data['error_description']) {
                        toastr.error(rejection.data['error_description']);
                     }
                     else if(rejection.data && rejection.data.ModelState && rejection.data.ModelState['']){
                         var errors = rejection.data.ModelState[''];
                         if(errors.length > 0){
                             toastr.error(errors[0]);
                         }
                     }

                     return $q.reject(rejection);
                 }
             }
          }]);
       }])

    .run(['authentication', 'identity', '$rootScope', '$location', function(authentication, identity, $rootScope, $location){
       authentication.refreshCookie();
        if(authentication.isAuthenticated()){
            $rootScope.mainControllerAuthentication = true;


            var currentUser = identity.getCurrentUser();

            currentUser.then(function(user){
                if(user.isAdmin){
                    if(user.Username === 'admin@softuni.bg'){
                        $rootScope.checkForMainAdmin = true;
                    }
                    else{
                        $rootScope.checkForMainAdmin = false;
                    }
                    $rootScope.checkForAddProjectButton = true;
                }
                else{
                    $rootScope.checkForAddProjectButton = false;
                }
            });
        }
        //else{
        //    $rootScope.checkForMainAdmin = false;
        //    $rootScope.checkForAddProjectButton = false;
        //}
    }])

      .constant('main_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/')
       .constant('toastr', toastr);

