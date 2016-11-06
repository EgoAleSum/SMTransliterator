# SMTransliterator

Unicode transliteration utilities for Node.js: remove diacritics, normalize, etc.

This code is licensed under the terms of the MIT license (see LICENSE.md).

## Add to your project

Install from NPM:

````sh
npm install --save smtransliterator
````

## API Guide

Include the module with:

````js
const SMTransliterator = require('smtransliterator')
````

The module exports the following methods:

### SMTransliterator.Transliterate

````js
SMTransliterator.Transliterate(str, full)
````

This method removes all diacritics from latin characters in the `str` parameter. For example, the string *papà* (Italian for "dad") is converted to *papa*, or the famous DJ Tiësto has the umlaut removed from his name (to "Tiesto"). Case is always preserved, and the method is safe to use with strings containing non-latin characters too. 

Additionally, the resulting Unicode string is canonicalized in the NFC form.

When `full` is true (default is false), it also removes punctuation characters and those in the "Other" Unicode plane (which includes control characters, unassigned ones, etc) .

### SMTransliterator.Normalize

````js
SMTransliterator.Normalize(str, full)
````

Short-hand method that calls the `SMTransliterator.Transliterate` method, and additionally lowercases the resulting string. Parameters are the same as in the `Transliterate` method.
