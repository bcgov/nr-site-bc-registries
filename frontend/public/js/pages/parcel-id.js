// only allow numbers in the parcel id input
const ele = document.getElementById('parcelId');
const state = {
    value: ele.value,
};

ele.addEventListener('keydown', function (e) {
    const target = e.target;
    state.selectionStart = target.selectionStart;
    state.selectionEnd = target.selectionEnd;
});

ele.addEventListener('input', function (e) {
    const target = e.target;

    if (/^[0-9]*$/.test(target.value)) {
        state.value = target.value;
    } else {
        target.value = state.value;
        target.setSelectionRange(state.selectionStart, state.selectionEnd);
    }
});

document.getElementById('searchButton').addEventListener('click', searchPid);
