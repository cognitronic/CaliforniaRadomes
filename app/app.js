/**
 * Created by Danny Schreiber on 6/15/14.
 */
var app = angular.module('cr', ['ui.router'])
.config(function($httpProvider, $stateProvider, $urlRouterProvider){

        $httpProvider.defaults.transformRequest = function(data){
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };

        //sets the content type header globally for $http calls
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers['delete'] = {'Content-Type': 'application/json; charset=UTF-8'};

    $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: 'partials/home.html'
                    },
                    'slider@home' : {
                        templateUrl: 'partials/slider.html'
                    },
                    'about@home' : {
                        templateUrl: 'partials/aboutus.html'
                    },
                    'services@home' : {
                        templateUrl: 'partials/services.html'
                    },
                    'contact@home' : {
                        templateUrl: 'partials/contact.html'
                    }
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'partials/aboutus.html',
                controller: function($state){
                    console.log($state.is('about'));
                }
            })
            .state('team', {
                url: '/team',
                templateUrl: 'partials/team.html'
            })
            .state('services', {
                url: '/services',
                templateUrl: 'partials/services.html'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'partials/product-list.html'
            })
            .state('certifications', {
                url: '/certifications',
                templateUrl: 'partials/certifications.html'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'partials/contact.html',
                controller: 'MainController'
            })
    });