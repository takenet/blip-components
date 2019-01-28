String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

/**
 * Capitalize a string
 * @param {string} s - string to be capitalized
 */
export const capitalizeF = s => s.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

export const getHashCode = (s) => {
    let hash = 0;
    if (s.length == 0) return hash;
    for (let i = 0; i < s.length; i++) {
        let character = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

