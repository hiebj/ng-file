(function() {
    angular
        .module('file')
        .directive('fileModel', fileModel);

    function fileModel() {
        function link($scope, $element, $attrs, $ngModel) {
            var model = $parse($attrs.ngModel),
                multiple = typeof $attrs.multiple !== 'undefined';
            $element.on('change', updateModel);

            function updateModel() {
                var value;
                if (multiple) {
                    value = [];
                    angular.forEach($element[0].files, function(file) {
                        value.push(file.name);
                    });
                } else {
                    value = $element[0].files[0].name;
                }
                model.assign($scope, value);
                $ngModel.$setViewValue($ngModel.$modelValue);
            }
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }
})();
