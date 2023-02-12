
export const formataMoeda = function (v) {
    if (!v) { return }
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{1,2})$/, '.$1');
    v = Number(v)
    v = v.toFixed(2)
    v = v.replace(".", ",");
    return v
}