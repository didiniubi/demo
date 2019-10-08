const click = () => {
    console.log(111)
    let ele = document.createElement('div');
    ele.innerHTML= 'dd';
    document.body.appendChild(ele);
}

export default click;