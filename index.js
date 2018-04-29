'use strict'

const XRegExp = require('xregexp')

/**
 * Unicode transliteration utilities
 */
const SMTransliterator = {
    /**
     * Remove diacritics from strings.
     * In full mode, remove punctuation characters and characters in the "Other" Unicode plane (control characters, unassigned ones, etc).
     * 
     * @param {string} str - Source string
     * @param {boolean} [full=false] - Enable full mode
     * @returns {string} The translitereated string
     */
    Transliterate: (str, full) => {
        // 1. Decompose Unicode sequences
        str = str.normalize('NFD')
        
        if(full) {
            // 2a. Remove all sequences that are part of the "Nonspacing", "Punctuation" and "Other" planes 
            str = str.replace(XRegExp('\\p{M}|\\p{P}|\\p{C}', 'g'), '')
        }
        else {
            // 2b. Remove all sequences that are part of the "Nonspacing" plane 
            str = str.replace(XRegExp('\\p{M}', 'g'), '')
        }
        
        // 3. Compose the Unicode sequences again
        str = str.normalize('NFC')
        return str
    },
    
    /**
     * Short-hand method to perform transliteration and lowercasing of the string.
     * In full mode, remove punctuation characters and characters in the "Other" Unicode plane (control characters, unassigned ones, etc).
     * 
     * @param {string} str - Source string
     * @param {boolean} [full=false] - Enable full mode
     * @returns {string} The normalized string
     */
    Normalize: (str, full) => {
        str = SMTransliterator.Transliterate(str, full)
        str = str.toLowerCase()
        return str
    }
}

module.exports = SMTransliterator
