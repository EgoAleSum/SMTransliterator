import XRegExp from 'xregexp'

/**
 * Unicode transliteration utilities
 */
export namespace SMTransliterator {
    /**
     * Remove diacritics from strings.
     * In full mode, remove punctuation characters and characters in the "Other" Unicode plane (control characters, unassigned ones, etc).
     * 
     * @param str - Source string
     * @param full - Enable full mode (default: false)
     * @returns The translitereated string
     */
    export function Transliterate(str: string, full?: boolean): string {
        // 1. Decompose Unicode sequences
        str = str.normalize('NFD')

        if (full) {
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
    }

    /**
     * Short-hand method to perform transliteration and lowercasing of the string.
     * In full mode, remove punctuation characters and characters in the "Other" Unicode plane (control characters, unassigned ones, etc).
     * 
     * @param str - Source string
     * @param full - Enable full mode (default: false)
     * @returns The normalized string
     */
    export function Normalize(str: string, full?: boolean): string {
        str = SMTransliterator.Transliterate(str, full)
        str = str.toLowerCase()
        return str
    }
}
module.exports = SMTransliterator
export default SMTransliterator
