(function() {
    angular
        .module('file')
        .directive('fileData', fileData);

    function fileData($parse, $window) {
        function link($scope, $element, $attrs) {
            var model = $parse($attrs.fileData),
                multiple = typeof $attrs.multiple !== 'undefined',
                FileReader = $window.FileReader;

            // Not all browsers support FileReader (notably, IE 9)
            if (FileReader) {
                $element.bind('change', updateModel);
            }

            function updateModel() {
                var value = [],
                    reader,
                    i;
                for (i = 0; i < $element[0].files.length; i++) {
                    reader = new FileReader();
                    reader.onload = function(e) {
                        $scope.$apply(function() {
                            value[i] = e.target.result;
                        });
                    };
                    reader.readAsDataURL($element[0].files[i]);
                }
                if (!multiple) {
                    value = value[0];
                }
                model.assign($scope, value);
            }
        }

        return {
            restrict: 'A',
            link: link
        };
    }]);
})();
