'use strict';
angular.module('VicinityManagerApp.controllers')
.controller('sPdescriptionController',
function ($scope, $window, $stateParams, itemsAPIService, Notification) {

  $scope.loaded = false;
  $scope.isMyItem = false;
  $scope.item = {};
  $scope.devInfo = {};
  $scope.devEnabled = '';


  initData();

  function initData(){
    itemsAPIService.getItemWithAdd($stateParams.serviceId)
      .then(
        function successCallback(response){
          updateScopeAttributes(response);
          $scope.loaded = true;
        },
        function errorCallback(response){
        }
      );
    }

    function updateScopeAttributes(response){
        $scope.item = response.data.message[0];
        $scope.devInfo = $scope.item.info;
        $scope.devEnabled = ($scope.item.status === 'enabled');
        $scope.isMyItem = ($window.sessionStorage.companyAccountId.toString() === $scope.item.hasAdministrator[0]._id.toString());
        loopObj($scope.devInfo);
    }

    function loopObj(arr){
      var cont = 0;
      var ind = 10;
      var ans = {};
      var txt = '<div class="panel panel-primary">';
      for (var i in arr) {
        cont += 1;
        var keyword = new RegExp('Object');
        if (!keyword.test(arr[i])){
          txt += '<p class="panel-heading" style="margin: ' + ind + 'px"><b>' + i + ':   </b>' + arr[i] + '</p>';
        }
        else{
          txt += '<p class="panel-heading" style="margin: ' + ind + 'px"><b>' + i + ':  </b>';
          txt += '<a data-toggle="collapse" data-target="#lvl' + cont + '"><i style="color: white" class="fa fa-plus-square pull-right"></i></a></p>';
          txt += '<div id="lvl' + cont + '" class="collapse">';
          ans = innerObj(arr[i],txt,ind,cont);
          txt = ans.key1;
          cont = ans.key2;
          txt += '</div>';
          if(ind>10){ind -= 10;}
        }
      }
      txt += '</div>';
      $(".rootElem").append(txt);
    }

    function innerObj(arr,txt,ind,cont){
      var ans = {};
      ind += 10;
      for (var i in arr) {
        cont += 1;
        var keyword = new RegExp('Object');
        if (!keyword.test(arr[i])){
          txt += '<p class="panel-body" style="margin: ' + ind + 'px"><b>' + i + ':   </b>' + arr[i] + '</p>';
        }
        else{
          txt += '<div class="panel panel-info" style="margin: ' + ind + 'px"><p class="panel-heading" style="margin: 10px"><b>' + i + '</b>';
          txt += '<a data-toggle="collapse" data-target="#lvl' + cont + '"><i style="color: white" class="fa fa-plus-square pull-right"></i></a></p>';
          txt += '<div id="lvl' + cont + '" class="collapse">';
          ans = innerObj(arr[i],txt,ind,cont);
          txt = ans.key1;
          cont = ans.key2;
          txt += '</div>';
          txt += '</div>';
        }
      }
      if(ind>0){ind -= 10;}
      return {key1: txt, key2: cont};
    }

});
