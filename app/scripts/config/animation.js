import $ from 'jquery';

let animate = () => {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      element.fadeIn(100, done);
      return function() {
        element.stop();
      };
    },
    leave: function(element, done) {
      element.fadeOut(100, done);
      return function() {
        element.stop();
      };
    }
  };
}

export { animate }