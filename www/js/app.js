
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app= angular.module('starter', ['ionic','ngCordova','ngStorage']);
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
//System de root; pour chaque vue on va lui associer l'url et le cotroler  utiliser 
app.config(function($stateProvider,$urlRouterProvider) {


$stateProvider.state("meteo",{
url:"/meteo",
templateUrl : "templates/meteo.html",
controller: "MeteoCtrl"
});

$stateProvider.state("infoMeteo",{
url:"/infoMeteo/:city", // pas de parrain
templateUrl : "templates/infoMeteo.html", 
controller: "InfoMeteoCtrl"
});

$stateProvider.state("contact",{
url:"/contact",
templateUrl : "templates/contact.html"
});

$stateProvider.state("geo",{
url:"/geo",
templateUrl: "templates/geo.html", 
controller: "GeoCtrl"
});

$stateProvider.state("config",{
url:"/config",
templateUrl : "templates/config.html",
controller : "todoCtrl"
});
//root par défaut 
$urlRouterProvider.otherwise("meteo"); 
});  


app.factory("StorageService",function($localStorage){
$localStorage=$localStorage.$default({

trajet:[]
});
return{
savePosition:function(pos){
  $localStorage.trajet.push(pos);
},
getAllPositions:function(){
  return $localStorage.trajet;
}
}
});

app.controller("MeteoCtrl", function($scope,$state){
$scope.getMeteo=function(ville) {
  $state.go("infoMeteo",{ city : ville })
                                }
                                                  });

app.controller("InfoMeteoCtrl", function($scope,$stateParams,$http,$ionicLoading){
url="http://api.openweathermap.org/data/2.5/forecast/daily?q="+$stateParams.city+"&appid=1cb9b979bc5b8774c1b01becd3f6f573"
$ionicLoading.show({
template: "Chargement en cours..."
})
$http.get(url)
.success(function(data){
$scope.meteo=data
$ionicLoading.hide();

})
.error(function(err){
$ionicLoading.hide();
       })

});


app.controller("GeoCtrl", function($scope,$cordovaGeolocation,StorageService) {
var counter;
var options={
  timeout:10000, 
  enableHighAccuracy:true
            };
$cordovaGeolocation.getCurrentPosition(options)
.then(function(position)                                              {
$scope.position=position;

var latLng= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

var mapOptions=                                              {
center : latLng,
zoom:16,
mapTypeId:google.maps.MapTypeId.ROADMAP                      };
TheMap= new google.maps.Map(document.getElementById('map'), mapOptions); 
marker= new google.maps.Marker                          ({
position : latLng,
map: TheMap, 
title : "je suis ici",
label: "S"
                                                              });    

 
app.controller('todoCtrl', function($scope) {
    $scope.todoList = [{todoText:'Clean House', done:false}];

    $scope.todoAdd = function() {
        $scope.todoList.push({todoText:$scope.todoInput, done:false});
        $scope.todoInput = "";
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
        });
    };
});
                                                                     
var watchOptions={
timeout:2000,
enableHighAccuracy:true
};
watch=$cordovaGeolocation.watchPosition(watchOptions)
watch.then(
null, 
function(err){
console.log(err);},

function(position){
  console.log(position)
$scope.position=position;
latLng=new google.maps.LatLng(
position.coords.latitude,
position.coords.longitude);
marker=new google.maps.Marker({
position: latLng,
titre: "Position"+(++counter), // qd la position change on incrémente 
label: "H"
                              });
marker.setMap(TheMap);
                  }
           );


                                                                       },
function(err){
console.log(err); 
             })
    
                                                                    });

