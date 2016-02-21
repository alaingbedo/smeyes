/**
 * Created by kevin gosse on 20/02/2016.
 */
'use strict';
angular.module('admin')
    .config(
        [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/connexion');
                $stateProvider
                    .state('connexion', {
                        url: '/connexion',
                        templateUrl: 'views/admin/connexion.html'
                    })
            }
        ]
    );
