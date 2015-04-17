(function () {
  'use strict';

  var $main = $('body, html'),
      module;

  module = angular.module('ngConfirm', []);

  module.directive('ngConfirm', [function () {
    return {
      priority: -1,
      restrict: 'A',
      link: function ($scope, $container, args) {
        var message        = args['ngConfirm'],
            subscribed     = false,
            contentOnStart = $container.html();

        function onConfirm() {
          setTimeout(function () {
            $container.html(contentOnStart);
            subscribed = false;
          }, 1);
        }

        function onBodyClick() {
          subscribed = false;

          $container.off('click.onConfirm');
          $container.html(contentOnStart);
        }

        $container.on('click.triggerConfirm', function (event) {
          if (subscribed) {
            return false;
          }

          $main.off('click.onBodyClick');

          event.stopImmediatePropagation();
          event.preventDefault();

          subscribed = true;

          $container.html((message.substr(0, 1) !== ' ') ? ' ' + message : message);
          $main.one('click.onBodyClick', onBodyClick);
          $container.one('click.onConfirm', onConfirm);
        });
      }
    };
  }]);
})();