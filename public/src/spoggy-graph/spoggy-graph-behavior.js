<!-- voir aussi http://www.ericfeminella.com/blog/2016/03/25/polymer-behaviors-in-es6/ -->

'use strict';

(() => {
  // define the behavior
  const SomeBehavior = {
    base:{
      init(te , callback){
        console.log(te);
        let result = "macin";
        Spoggy.Graph.base.init("touch" , () => console.log("bop "+result));
       callback();
      }
    }
  };
  // add the behavior to a specific namespace ...
  const ns = (window.SomeNamespace = window.SomeNamespace || {});
  ns.SomeBehavior = SomeBehavior;
})();
