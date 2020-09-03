import angular from 'core/angular';
import he from 'he';
import * as sanitizeHtml from 'sanitize-html';

class InputSanitize {
    public restrict: string;
    public require: string;
    private readonly TYPES_TO_SANITIZE = [
        'text',
        'password',
        'email',
        'search',
        'url',
        'textarea'
    ];
    private readonly SSML_TAGS = [
        'speak',
        'break',
        'say-as',
        'audio',
        'p',
        's',
        'sub',
        'mark',
        'prosody',
        'emphasis',
        'par',
        'seq',
        'media',
        'lang',
        'phoneme',
        'w',
        'voice',
        'lexicon',
        'lookup',
        'lexeme',
        'grapheme',
        'amazon:domain',
        'amazon:effect',
        'amazon:emotion'
    ];

    constructor() {
        this.restrict = 'E';
        this.require = '?ngModel';
    }

    link(scope, element, attrs, ngModel) {
        if (ngModel) {
            ngModel.$parsers.push(value => {
                if (this.TYPES_TO_SANITIZE.includes(element[0].type)) {
                    return he.decode(
                        sanitizeHtml(value, {
                            allowedTags: sanitizeHtml.defaults.allowedTags.concat(
                                this.SSML_TAGS
                            ),
                            allowedAttributes: false
                        })
                    );
                }
                return value;
            });
        }
    }

    static factory() {
        return new InputSanitize();
    }
}

export const InputSanitizeDirective = angular
    .module('blipComponents.InputSanitize', [])
    .directive('input', InputSanitize.factory)
    .directive('textarea', InputSanitize.factory).name;
