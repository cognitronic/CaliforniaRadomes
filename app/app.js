/**
 * Created by Danny Schreiber on 6/15/14.
 */
var app = angular.module('cr', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
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
                templateUrl: 'partials/contact.html'
            })
    });