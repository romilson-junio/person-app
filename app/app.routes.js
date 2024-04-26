(function () {
    "use strict";

    angular.module('app')
        .config(routes)
        .run(configDefaults);

    routes.$inject = ['$routeProvider'];
    configDefaults.$inject = ['$rootScope'];

    function routes($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'pages/person/person.list.tpl.html',
            })
            .when('/person', {
                templateUrl: 'pages/person/person.register.tpl.html',
            })
            .when('/person/edit', {
                templateUrl: 'pages/person/person.register.tpl.html',
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    function configDefaults($rootScope) {
        $rootScope.listaMensagens = [];
    }

})();