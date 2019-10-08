import pic from './webpack.png';
import './index.css';

console.log('img', pic);

var root = document.getElementById('root');
var img = new Image();
img.classList.add('pic');
img.src = pic;
root.append(img);
