# jquery-remainingwords
Add a word countdown to an element

# Usage
```javascript
$('#input').remainingwords(options);
```

# Options
Option|Type|Description|Default
--|--|--|--
maxWords|int|Maximum number of words allowed in the element|30
warningLevel1|int|Number of words after which the first (lowest-level) warning is shown|20
warningLevel2|int|Number of words after which the second (mid-level) warning is shown|25
overMaxClass|string|Class(es) added to the words remaining text element when the number of words is greater than maxWords|`over-max`
warning1Class|string|Class(es) added to the words remaining text element when the number of words is greater than warningLevel1|`warning-1`
warning2Class|string|Class(es) added to the words remaining text element when the number of words is greater than warningLevel2|`warning-2`
template|string|Html added to hold the remaining words text|`<p class="words-remaining-text">Words Remaining: <span class="words-remaining-value"></span></p>`
valueSelector|string|CSS/jQuery selector to select the words remaining value element from within the element defined by the option 'template'|`span.words-remaining-value`
complete|function|Callback to run after setup is complete|`null`

# Dependencies
jQuery.
