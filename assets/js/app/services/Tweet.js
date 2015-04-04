(function() {
  'use strict';

  angular.module('Twitter').factory('Tweet', Tweet);

  Tweet.$inject = ['$resource'];
  function Tweet($resource) {

    return $resource('/api/tweet/:id', {id: '@id', sort: "id DESC"});
  };
})();
