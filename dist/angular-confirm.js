'use strict';

var $main = $('body, html');
var _module = angular.module('ngConfirm', []);

_module.directive('ngConfirm', function ngConfirm() {
  return {
    priority: -1,
    restrict: 'A',
    link: function ngConfirmLink($scope, $container, args) {
      var message = args.ngConfirm;
      var subscribed = false;
      var contentOnStart = $container.html();

      function onConfirm() {
        setTimeout(function onConfirmTimeout() {
          $container.html(contentOnStart);
          subscribed = false;
        }, 1);
      }

      function onBodyClick() {
        subscribed = false;

        $container.off('click.onConfirm');
        $container.html(contentOnStart);
      }

      $container.on('click.triggerConfirm', function clickTriggerConfirm(event) {
        if (subscribed) {
          return false;
        }

        $main.off('click.onBodyClick');

        event.stopImmediatePropagation();
        event.preventDefault();

        subscribed = true;

        $container.html(message.substr(0, 1) !== ' ' ? ' ' + message : message);
        $main.one('click.onBodyClick', onBodyClick);
        $container.one('click.onConfirm', onConfirm);
      });
    }
  };
});