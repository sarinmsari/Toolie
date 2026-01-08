export const saveToStorage = (key, value) => {
    if (chrome?.storage?.local) {
        chrome.storage.local.set({ [key]: value });
    } else {
        // Fallback for local browser testing
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getFromStorage = (key, callback) => {
    if (chrome?.storage?.local) {
        chrome.storage.local.get([key], (result) => {
            callback(result[key]);
        });
    } else {
        // Fallback for local browser testing
        const data = localStorage.getItem(key);
        callback(data ? JSON.parse(data) : null);
    }
};