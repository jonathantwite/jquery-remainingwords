/*
 * Version 1.0.0
 * Adds a word countdown to an element.
 * JT - 2017-11-07
 * Options: 
 *      maxWords: int - Maximum number of words allowed in the element.
 *      warningLevel1: int - Number of words after which the first (lowest-level) warning is shown.
 *      warningLevel2: int - Number of words after which the second (mid-level) warning is shown.
 *      overMaxClass: string - Class(es) added to the words remaining text element when the number of words is greater than maxWords.
 *      warning1Class: string - Class(es) added to the words remaining text element when the number of words is greater than warningLevel1.
 *      warning2Class: string - Class(es) added to the words remaining text element when the number of words is greater than warningLevel2.
 *      template: string - Html added to hold the remaining words text.
 *      valueSelector: string - CSS/jQuery selector to select the words remaining value element from within the element defined by the option 'template'.
 *      complete: function - Callback to run after setup is complete.
 * Usage:
 *      $('#input').remainingwords(options);
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    /* --- Start plugin --- */
    var $self;

    $.fn.remainingwords = function (options) {

        var settings = $.extend({
            maxWords: 30,
            warningLevel1: 20,
            warningLevel2: 25,
            overMaxClass: 'over-max',
            warning1Class: 'warning-1',
            warning2Class: 'warning-2',
            template: '<p class="words-remaining-text">Words Remaining: <span class="words-remaining-value"></span></p>',
            valueSelector: 'span.words-remaining-value',
            complete: null
        }, options);

        $self = this;

        $self.addClass('remaining-words');

        $template = $(settings.template)
        var $value = $template.children(settings.valueSelector);
        $self.after($template);
        $value.text(settings.maxWords);

        $self.keyup(function () {
            var words = $(this).val()
                               .split(" ")
                               .filter(function (s) { return s.length > 0; })
                               .length;
            $value.text(settings.maxWords - words);

            if (words > settings.maxWords) {
                $template.removeClass(settings.warning1Class);
                $template.removeClass(settings.warning2Class);
                $template.addClass(settings.overMaxClass);
            }
            else if (words > settings.warningLevel2) {
                $template.removeClass(settings.warning1Class);
                $template.removeClass(settings.overMaxClass);
                $template.addClass(settings.warning2Class);
            }
            else if (words > settings.warningLevel1) {
                $template.removeClass(settings.warning2Class);
                $template.removeClass(settings.overMaxClass);
                $template.addClass(settings.warning1Class);
            }
            else {
                $template.removeClass(settings.warning1Class);
                $template.removeClass(settings.warning2Class);
                $template.removeClass(settings.overMaxClass);
            }

        });


        if ($.isFunction(settings.complete)) {
            settings.complete.call(this);
        }

        return this;
    }
}));

