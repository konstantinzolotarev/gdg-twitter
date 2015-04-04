(function() {
  'use strict';

  angular.module('Twitter', [
    'ngRoute',
    'ngResource'
  ]).config(TwitterConfig);

  TwitterConfig.$inject = ['$routeProvider'];
  function TwitterConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'view/home.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/'
      });
  };

})();
