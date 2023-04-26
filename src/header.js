// var _xproproto = Object.create(HTMLElement.prototype)
// _xproproto.createdCallback = function () {
//   this.addEventListener('click',function () {
//     alert(1)
//   })
// }
// window.customElements('z-header',{  //注册标签，通过原型链继承方法和属性
//   prototype:_xproproto
// })
class Learn extends HTMLElement{
  constructor(props) {
    super(props);
    console.log(this.dataset);
    console.log('props', props);
    this.innerHTML = 'aaaaa';
    this.style.border = '1px solid #899';
    this.style.borderRadius = '3px';
    this.style.padding = '4px';
    console.log('this', this);
  }
}
setTimeout(() => {
  window.customElements.define('z-header',Learn);
}, 2000)