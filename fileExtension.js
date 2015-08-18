(function() {
    angular
        .module('file')
        .directive('fileExtension', fileExtension)

    function fileExtension() {
        function link($scope, $element, $attrs, $ngModel) {
            var extension = $attrs.fileExtension,
                extensionRe = new RegExp('\\.(' + extension + ')$', 'i');
            $element.bind('change', validateExtension);

            function validateExtension() {
                $ngModel.$setValidity('extension', true);
                angular.forEach($element[0].files, function(file) {    
                    if (!$element[0].files[0].name.match(extensionRe)) {
                        $ngModel.$setValidity('extension', false);
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
