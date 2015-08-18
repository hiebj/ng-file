(function() {
    angular
        .module('file')
        .directive('fileChange', fileChange);

    function fileChange() {
        function link($scope, $element, $attrs) {
            $element.bind('change', function() {
                $scope.$eval($attrs.fileChange);
            });
        }
        
        return {
            restrict: 'A',
            link: link
        };
    }
})();
