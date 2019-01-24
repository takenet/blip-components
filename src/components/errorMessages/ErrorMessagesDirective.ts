import ErrorMessagesView from './ErrorMessagesView.html';

/**
 * This directive works as an extension for the `ngMessages` directive as it
 * adds support for errors from an HTTP request to an external API via a
 * Promise object.
 *
 * The directive must be linked to a specific form and a field from such form.
 *
 * If the response of the HTTP request (contained in the Promise object)
 * contains a `properties` dictionary, the message shown will be that string
 * `properties[field]`, where `field` is the value passed in the `field`
 * parameter of the directive.
 *
 * If no `properties` dictionary is found or no such field is found in
 * `properties` and if the element has `data-[status]` elements, where `[status]`
 * is any HTTP status code, then the message displayed will be that of
 * `data-[status]`.
 * Eg.:
 * ```html
 * <errorMessages form="$ctrl.form" data-404="Sorry, we couldn't find it."></errorMessages>
 * ```
 *
 * If the `field` parameter is empty, and if the promise returns an error,
 * then the error shown will be the `message` field from the response object.
 *
 * Usage:
 * ```html
 * <errorMessages form="$ctrl.form" field="fieldName" promise="$ctrl.promiseToWatch"></errorMessages>
 * ```
 *
 * @param {NgFormController} form form
 * @param {String} field the name of the field (used as in `form[field]`)
 * @param {Promise<HttpResponse>} promise the promise t
 *
 * @ngdoc directive
 */
export default class ErrorMessagesDirective {
    restrict = 'E';
    template = ErrorMessagesView;

    get scope() {
        return {
            field: '@',
            form: '=',
            promise: '=',
            error: '=',
            ignore: '=',
        };
    }

    compile() {
        return this.link.bind(this);
    }

    link(scope, element, attrs) {
        // form message
        if (!scope.field || scope.ignore) {
            this._watchForm(scope);
        } else {
            // field message
            scope.$watch('form', form => {
                if (!form || !form[scope.field]) {
                    return;
                }
                form[scope.field].$validators.api = () => true;
            });
        }

        const errorHandler = this._onError.bind(this, scope, element, attrs);

        scope.$watch('error', (err) => {
            errorHandler(err);
        });
        scope.$watch('promise', (promise) => {
            if (promise) {
                promise.catch(errorHandler);
            }
        });
    }

    _onError(scope, element, attrs, err) {
        if (!err) {
            return;
        }

        const field = scope.field || '';
        const ngModelController = scope.form[scope.field] || scope.form;

        const properties = err.data ? err.data.properties || err.data.modelState : undefined;

        // field related error
        if (err.data && properties && properties[field]) {
            ngModelController.$setValidity('api', false);
            scope.apiError = properties[field].join('\n');
        } else if (attrs[err.status || (err.reason || {}).code]) {
            // http status error
            ngModelController.$setValidity('api', false);
            scope.apiError = attrs[err.status || (err.reason || {}).code];
        } else if ((err.data && err.data.message || err.message) && !field) {
            // message error
            ngModelController.$setValidity('api', false);
            scope.apiError = (err.data || {}).message || err.message;
        }

        scope.form.$setPristine();
        scope.form.$setSubmitted();
    }

    _watchForm(scope) {
        scope.$watch('form.$dirty', (dirty) => {
            if (scope.form) {
                scope.form.$setValidity('api', dirty);
                if (scope.form[scope.field]) {
                    scope.form[scope.field].$setValidity('api', dirty);
                }
            }
        });
    }

    static factory() {
        return new ErrorMessagesDirective();
    }
}
