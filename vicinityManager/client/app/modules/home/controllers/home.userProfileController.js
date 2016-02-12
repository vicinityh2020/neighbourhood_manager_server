angular.module('VicinityManagerApp.controllers').
controller('userProfileController', function($scope, $window, $stateParams, $location, userAccountAPIService, AuthenticationService) {
  
  $scope.locationPrefix = $location.path();
  console.log("location:" + $location.path());
  $scope.name = {};
  $scope.avatar = {};
  $scope.occupation = {};
  $scope.organisation = {};
  $scope.userAccountId = {};
  $scope.isMyProfile = true;
  
  $scope.location = {};
  $scope.badges = {};
  $scope.notes = {};
  $scope.friends = [];
  $scope.following = [];
  $scope.followers = [];
  $scope.gateways = [];
  
  
  
  
  if ($window.sessionStorage.userAccountId === $stateParams.userAccountId){
    $scope.isMyProfile = true;
  } else {
    $scope.isMyProfile = false;
  }
  
  userAccountAPIService.getUserAccountProfile($stateParams.userAccountId).success(function (response) {
    $scope.name = response.message.accountOf.name;
    $scope.avatar = response.message.avatar;
    $scope.occupation = response.message.accountOf.occupation;
    $scope.organisation = response.message.accountOf.organisation;
    $scope.userAccountId = response.message._id;
    $scope.location = response.message.accountOf.location;
    $scope.badges = response.message.badges;
    $scope.notes = response.message.notes;
  });
});