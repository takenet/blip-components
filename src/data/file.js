export const isUTF8 = (data) => {
    let i = 0;
    let len = data && data.length;
    let b;

    for (; i < len; i++) {
        b = data[i];
        if (b > 0xff) {
            return false;
        }

        if (
            b === 0x09 ||
            b === 0x0a ||
            b === 0x0d ||
            (b >= 0x20 && b <= 0x7e)
        ) {
            continue;
        }
        if (b >= 0xc2 && b <= 0xdf) {
            if (i + 1 >= len || data[i + 1] < 0x80 || data[i + 1] > 0xbf) {
                return false;
            }
            i++;
        } else if (b === 0xe0) {
            if (
                i + 2 >= len ||
                data[i + 1] < 0xa0 ||
                data[i + 1] > 0xbf ||
                data[i + 2] < 0x80 ||
                data[i + 2] > 0xbf
            ) {
                return false;
            }
            i += 2;
        } else if ((b >= 0xe1 && b <= 0xec) || b === 0xee || b === 0xef) {
            if (
                i + 2 >= len ||
                data[i + 1] < 0x80 ||
                data[i + 1] > 0xbf ||
                data[i + 2] < 0x80 ||
                data[i + 2] > 0xbf
            ) {
                return false;
            }
            i += 2;
        } else if (b === 0xed) {
            if (
                i + 2 >= len ||
                data[i + 1] < 0x80 ||
                data[i + 1] > 0x9f ||
                data[i + 2] < 0x80 ||
                data[i + 2] > 0xbf
            ) {
                return false;
            }
            i += 2;
        } else if (b === 0xf0) {
            if (
                i + 3 >= len ||
                data[i + 1] < 0x90 ||
                data[i + 1] > 0xbf ||
                data[i + 2] < 0x80 ||
                data[i + 2] > 0xbf ||
                data[i + 3] < 0x80 ||
                data[i + 3] > 0xbf
            ) {
                return false;
            }
            i += 3;
        } else if (b >= 0xf1 && b <= 0xf3) {
            if (
                i + 3 >= len ||
                data[i + 1] < 0x80 ||
                data[i + 1] > 0xbf ||
                data[i + 2] < 0x80 ||
                data[i + 2] > 0xbf ||
                data[i + 3] < 0x80 ||
                data[i + 3] > 0xbf
            ) {
                return false;
            }
            i += 3;
        } else if (b === 0xf4) {
            if (
                i + 3 >= len ||
                data[i + 1] < 0x80 ||
                data[i + 1] > 0x8f ||
                data[i + 2] < 0x80 ||
                data[i + 2] > 0xbf ||
                data[i + 3] < 0x80 ||
                data[i + 3] > 0xbf
            ) {
                return false;
            }
            i += 3;
        } else {
            return false;
        }
    }

    return true;
};

export const isFileUTF8 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            let codes = new Uint8Array(e.target.result);
            let encoding = isUTF8(codes);
            resolve(encoding);
        };

        reader.onerror = (e) => {
            reject(e);
        };

        reader.readAsArrayBuffer(file);
    });
};
