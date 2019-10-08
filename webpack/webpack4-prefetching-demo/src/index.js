import './index.css';
document.addEventListener('click', () => {
    import('./click.js').then(({default: _}) => {
        _();
    })
    // return import(/*webpackPrefetching:true*/'lodash').then((_) => {
    //     console.log(_.join(['dd', 'nb']));
    // })
});