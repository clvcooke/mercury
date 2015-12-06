app.directive('mapsAutocomplete', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            index = scope.gPlace.push(new google.maps.places.Autocomplete(element[0], options)) - 1;

            google.maps.event.addListener(scope.gPlace[index], 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});