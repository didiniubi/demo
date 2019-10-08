function counter() {
    var div = document.createElement('div');
    div.setAttribute('id', 'counter')
    document.body.appendChild(div);
    div.innerHTML = '点击 + 25';
    div.onclick = function() {
        div.innerHTML = div.innerHTML + 1
    }
}

export default counter;