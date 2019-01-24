export const Box = () => {
    return {
        label: {
            type: 'application/vnd.lime.document-select+json',
            value: {
                header: {
                    type: 'text/plain',
                    value: '',
                },
                options: [],
            },
        },
    };
};

export const Destiny = () => {
    return {
        label: {
            type: 'text/plain',
            value: '',
        },
    };
};

export const Link = () => {
    return {
        label: {
            type: 'application/vnd.lime.web-link+json',
            value: {
                text: '',
                uri: '',
            },
        },
    };
};
