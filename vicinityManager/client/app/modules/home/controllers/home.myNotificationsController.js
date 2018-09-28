'use strict';
angular.module('VicinityManagerApp.controllers').
  controller('myNotificationsController',
  function ($scope,
            $window,
            commonHelpers,
            notificationsAPIService,
            tokenDecoder,
            registrationsHelpers,
            userAccountsHelpers,
            Notification) {

// ====== Triggers window resize to avoid bug =======
  commonHelpers.triggerResize();

// Ensure scroll on top onLoad
  $window.scrollTo(0, 0);

// ======= Set initial variables ==========
  $scope.loadedPage = false;
  $scope.rev = true;
  $scope.myOrderBy = 'date';
  $scope.notifs = [];
  $scope.notifsWithDate = [];
  $scope.userId = $window.sessionStorage.userAccountId;
  $scope.orgId = $window.sessionStorage.companyAccountId;

// ====== Checking if user is devOps =============
$scope.isDev = false;
var payload = tokenDecoder.deToken();
var keyword = new RegExp('devOps');
$scope.isDev = keyword.test(payload.roles);

// ====== Sets from which date we retrieve notifications at init =====

$scope.dateFrom =  moment().subtract(7, 'days'); // Initialized to one week ago
$scope.period = 'week';

// ====== Getting notifications ======

  init();

  function init(){
    $scope.loadedPage = false;
    $scope.dates = [];
    $scope.notifsWithDate = [];
    notificationsAPIService.getNotifications(1, $scope.dateFrom)
    .then(getNotifs)
    .catch(function(err){
      console.log(err);
      Notification.error("Server error");
    });
  }

  function getNotifs(response){
    $scope.notifs = response.data.message;
    commonHelpers.addTimestamp($scope.notifs, function(array, dates){
      $scope.dates = dates;
      $scope.notifsWithDate = array;
      $scope.loadedPage = true;
    });
  }

// --------------------------------------------------

    $scope.notificationsDays = function(period){
      $scope.period = period;
      switch(period){
        case 'today':
          $scope.dateFrom =  moment().endOf('day').subtract(1, 'days');
          break;
        case 'week':
          $scope.dateFrom =  moment().endOf('day').subtract(7, 'days');
          break;
        case 'month':
          $scope.dateFrom =  moment().endOf('day').subtract(1, 'months');
          break;
        case 'year':
          $scope.dateFrom =  moment().endOf('day').subtract(1, 'years');
          break;
      }
      init();
    };

// ========= Accept / Reject requests ==========

  $scope.acceptNeighbourRequest = function (notifId, friendId){
    userAccountsHelpers.acceptNeighbourRequest(friendId)
    .then(init)
    .catch(function(err){
      console.log(err);
      Notification.error("Error accepting neighbourhood request");
    });
  };

  $scope.rejectNeighbourRequest = function(notifId, friendId) {
    userAccountsHelpers.rejectNeighbourRequest(friendId)
    .then(init)
    .catch(function(err){
      console.log(err);
      Notification.error("Error rejecting neighbourhood request");
    });
  };

  $scope.acceptRegistration = function (notifId, reg_id) {
   registrationsHelpers.acceptRegistration(reg_id, notifId)
    .then(init)
    .catch(function(err){
      console.log(err);
      Notification.error("Error accepting registration");
    });
  };

  $scope.rejectRegistration = function (notifId, reg_id) {
    registrationsHelpers.rejectRegistration(reg_id, notifId)
      .then(init)
      .catch(function(err){
        console.log(err);
        Notification.error("Error rejecting registration");
      });
  };

  // ==== Sorting ====

  $scope.orderByMe = function(x) {
    if($scope.myOrderBy === x){
      $scope.rev=!($scope.rev);
    }
      $scope.myOrderBy = x;
  };

  $scope.onSort = function(order){
    $scope.rev = order;
  };

});
