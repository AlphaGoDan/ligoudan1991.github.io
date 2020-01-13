//
function currt(fun) {
  return function (arg1) {
    return function (arg2) {
      return fun(arg1, arg2);
    };
  };
}

function div(n, d) {
  return n / d;
}

let main = () => {
  console.log('main');
  let div10 = currt(div)(10)(2);
  let result = div10;
  console.log('result', result);
};

(function (global, $) {
  class Page {
    constructor() {
      main();
    }

  }

  global.Page = Page;
  $(() => {
    let ajax = window.ajax;
    ajax.init({
      baseUrl: 'http://localhost:3002'
    });
    let Page = window.Page;
    new Page();
  });
})(window, jQuery, ajax);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuZXM2Il0sIm5hbWVzIjpbImN1cnJ0IiwiZnVuIiwiYXJnMSIsImFyZzIiLCJkaXYiLCJuIiwiZCIsIm1haW4iLCJjb25zb2xlIiwibG9nIiwiZGl2MTAiLCJyZXN1bHQiLCJnbG9iYWwiLCIkIiwiUGFnZSIsImNvbnN0cnVjdG9yIiwiYWpheCIsIndpbmRvdyIsImluaXQiLCJiYXNlVXJsIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBLFNBQVNBLEtBQVQsQ0FBZUMsR0FBZixFQUFvQjtBQUNoQixTQUFPLFVBQVNDLElBQVQsRUFBZTtBQUNsQixXQUFPLFVBQVNDLElBQVQsRUFBZTtBQUNsQixhQUFPRixHQUFHLENBQUNDLElBQUQsRUFBT0MsSUFBUCxDQUFWO0FBQ0gsS0FGRDtBQUdILEdBSkQ7QUFLSDs7QUFFRCxTQUFTQyxHQUFULENBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CO0FBQ2YsU0FBT0QsQ0FBQyxHQUFHQyxDQUFYO0FBQ0g7O0FBRUQsSUFBSUMsSUFBSSxHQUFHLE1BQU07QUFDYkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBLE1BQUlDLEtBQUssR0FBR1YsS0FBSyxDQUFDSSxHQUFELENBQUwsQ0FBVyxFQUFYLEVBQWUsQ0FBZixDQUFaO0FBQ0EsTUFBSU8sTUFBTSxHQUFHRCxLQUFiO0FBQ0FGLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBc0JFLE1BQXRCO0FBQ0gsQ0FMRDs7QUFPQSxDQUFDLFVBQVNDLE1BQVQsRUFBaUJDLENBQWpCLEVBQW9CO0FBQ2pCLFFBQU1DLElBQU4sQ0FBVztBQUNQQyxJQUFBQSxXQUFXLEdBQUc7QUFDVlIsTUFBQUEsSUFBSTtBQUNQOztBQUhNOztBQUtYSyxFQUFBQSxNQUFNLENBQUNFLElBQVAsR0FBY0EsSUFBZDtBQUVBRCxFQUFBQSxDQUFDLENBQUMsTUFBTTtBQUNKLFFBQUlHLElBQUksR0FBR0MsTUFBTSxDQUFDRCxJQUFsQjtBQUNBQSxJQUFBQSxJQUFJLENBQUNFLElBQUwsQ0FBVTtBQUFFQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFWO0FBQ0EsUUFBSUwsSUFBSSxHQUFHRyxNQUFNLENBQUNILElBQWxCO0FBQ0EsUUFBSUEsSUFBSjtBQUNILEdBTEEsQ0FBRDtBQU1ILENBZEQsRUFjR0csTUFkSCxFQWNXRyxNQWRYLEVBY21CSixJQWRuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vXG5cbmZ1bmN0aW9uIGN1cnJ0KGZ1bikge1xuICAgIHJldHVybiBmdW5jdGlvbihhcmcxKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhcmcyKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuKGFyZzEsIGFyZzIpO1xuICAgICAgICB9O1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRpdihuLCBkKSB7XG4gICAgcmV0dXJuIG4gLyBkO1xufVxuXG5sZXQgbWFpbiA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnbWFpbicpO1xuICAgIGxldCBkaXYxMCA9IGN1cnJ0KGRpdikoMTApKDIpO1xuICAgIGxldCByZXN1bHQgPSBkaXYxMDtcbiAgICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KTtcbn07XG5cbihmdW5jdGlvbihnbG9iYWwsICQpIHtcbiAgICBjbGFzcyBQYWdlIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBtYWluKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsLlBhZ2UgPSBQYWdlO1xuXG4gICAgJCgoKSA9PiB7XG4gICAgICAgIGxldCBhamF4ID0gd2luZG93LmFqYXg7XG4gICAgICAgIGFqYXguaW5pdCh7IGJhc2VVcmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDInIH0pO1xuICAgICAgICBsZXQgUGFnZSA9IHdpbmRvdy5QYWdlO1xuICAgICAgICBuZXcgUGFnZSgpO1xuICAgIH0pO1xufSkod2luZG93LCBqUXVlcnksIGFqYXgpO1xuIl0sImZpbGUiOiJ0ZXN0LmpzIn0=