//module
var photoApp = angular.module('photoApp',['ngRoute']);

//routing
photoApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'home.html',
        controller:'homeController'
    })
    .when('/photo',{
        templateUrl:'photo.html',
        controller:'photoController'
    })
      .when('/photo-details/:id', {
            templateUrl: 'photo-details.html',
            controller: 'photoDetailsController'
        })
});

//controllers
photoApp.controller('homeController',function(){
    var vm = this ;
});
photoApp.controller('photoController', ['$scope','$http','photoService',function($scope,$http, photoService){
    $http.get('imageDetail.json').then(function(response){
        $scope.photo = response.data;
        
      
        photoService.addphotoList(response.data);
        
    })
}]);

photoApp.controller('photoDetailsController', ['$scope', '$http','$routeParams','photoService', function($scope, $http,$routeParams, photoService) {
    
    var photoIndex = $routeParams.id;
    $scope.photoDetails = photoService.getphotoAtIndex(photoIndex);
    
}]);

//custom service

photoApp.service('photoService', function() {
  var photolList = [];

  var addphotoList = function(photoList1) {
      photoList = photoList1;
  };

  var getphotoList = function(){
      return photoList;
  };

  var getphotoAtIndex = function(index) {
    return photoList[index];
  }

  return {
    addphotoList: addphotoList,
    getphotoList: getphotoList,
    getphotoAtIndex: getphotoAtIndex
  };

});
