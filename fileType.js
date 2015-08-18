(function() {
    angular
        .module('file')
        .directive('fileType', fileType);

    function fileType() {
        function link($scope, $element, $attrs, $ngModel) {
            var type = $attrs.fileType;
            $element.bind('change', validateType);

            function validateType() {
                $ngModel.$setValidity('filetype', true);
                angular.forEach($element[0].files, function(file) {
                    if (typeof file.type === 'undefined' || file.type !== type) {
                        $ngModel.$setValidity('filetype', false);
                    }
                });
            }
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }
})();
