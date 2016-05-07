angular.module('issueTracker.addProjects', ['issueTracker.user.authentication'])

    .controller('AddProjectsController', ['$scope', '$location', '$rootScope', 'authentication', 'projectRequests', 'identity', function($scope, $location, $rootScope, authentication, projectRequests, identity){
            //  Трябва да викам заявката от "addProjectFactory" оба4е първо трябва да обработя инпута, който идва от темплейт формата

            //PROJECT обекта трябва да се обработи преди да се използва тук долу.

        identity.getAllUsers()
            .then(function(allUsers){
                var leadersArray = [];
                for(var i = 0; i < 5; i++){
                    leadersArray.push(allUsers[i]);
                }

                //console.log(leadersArray);

                identity.getCurrentUser()
                    .then(function(user){
                        leadersArray.push(user);
                        console.log(user);
                    });

                $scope.leadersArray = leadersArray;
            });


        $scope.addTheProject = function(){

            //objectForRequest.push({
            //    key: "Name",
            //    value: $scope.project.Name,
            //    type: "text",
            //    enabled: true
            //});
            //
            //objectForRequest.push({
            //    key: "Description",
            //    value: $scope.project.Description,
            //    type: "text",
            //    enabled: true
            //});
            //
            //objectForRequest.push({
            //    key: "ProjectKey",
            //    value: $scope.project.ProjectKey,
            //    type: "text",
            //    enabled: true
            //});
            //
            //var labelsStr = $scope.project.Labels;
            //var labelsArr = labelsStr.split(",");
            //
            //for(var i = 0; i < labelsArr.length; i++){
            //    objectForRequest.push({
            //        key: "labels[" + i + "].Name",
            //        value: labelsArr[i],
            //        type: "text",
            //        enabled: true
            //    });
            //}
            //
            //var prioritiesStr = $scope.project.Priorities;
            //var prioritiesArr = prioritiesStr.split(",");
            //
            //for(var j = 0; j < prioritiesArr.length; j++){
            //    objectForRequest.push({
            //        key: "priorities[" + j + "].Name",
            //        value: prioritiesArr[j],
            //        type: "text",
            //        enabled: true
            //    });
            //}
            //
            //objectForRequest.push({
            //    key: "LeadId",
            //    value: $scope.project.LeadId,
            //    type: "text",
            //    enabled: true
            //});

            var objectForRequest = {
                "Name": $scope.project.Name,
                "ProjectKey": $scope.project.ProjectKey,
                "Description": $scope.project.Description
            };

            var labelsStr = $scope.project.Labels;
            var labelsArr = labelsStr.split(",");

            var labelsObjArr = [];

            for(var i = 0; i < labelsArr.length; i++){
                labelsObjArr.push({
                    "Name": labelsArr[i]
                });
            }

            objectForRequest.Labels = labelsObjArr;

            var propertiesStr = $scope.project.Labels;
            var propertiesArr = propertiesStr.split(",");

            var proeprtiesObjArr = [];

            for(var i = 0; i < propertiesArr.length; i++){
                proeprtiesObjArr.push({
                    "Name": propertiesArr[i]
                });
            }

            objectForRequest.Priorities = proeprtiesObjArr;
            objectForRequest.LeadId = $scope.project.LeadId;


            console.log(objectForRequest);


            projectRequests.addProject(objectForRequest)
                .then(function(){
                   console.log('success');
                });
    };
}]);