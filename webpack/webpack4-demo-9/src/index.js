console.log('hello world!');
import _ from 'lodash';
import $ from 'jquery';
import func from './math';
func();
let dom = $('<div>');
dom.text('hello World');
$('#root').append(dom);