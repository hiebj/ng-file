(function() {
    angular
        .module('file')
        .directive('fileClear', fileClear);

    function fileClear() {
        function link($scope, $element, $attrs) {
            var unwatch = $scope.$watch($attrs.fileClear, clearFile);
            function clearFile(newValue) {
                if (newValue) {
                    // Value setting is not allowed on <input type=file> for security reasons
                    // This directive will clone it and replace to clear it.
                    var clone = $element.clone(true);
                    $element.replaceWith(clone);
                    // We have to link the new fileinput directives to the scope.
                    clone.injector().invoke(function($compile) {
                        $compile(clone)($scope);
                    });
                    // Unwatch since the dom has been thrown out.
                    // The newly linked directive via $compile will now watch for the cloned input.
                    unwatch();
                }
            }
        }

        return {
            restrict: 'A',
            link: link
        };
    }
})();
