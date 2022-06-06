/* define loading */

export const showLoading = function showLoading () {
    document.body.classList.add("sonphat-loading")
};

export const hideLoading = function hideLoading () {
    document.body.classList.remove("sonphat-loading")
};

export default {
    show: showLoading,
    hide: hideLoading,
};