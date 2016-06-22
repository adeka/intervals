'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundApp = function (_React$Component) {
    _inherits(SoundApp, _React$Component);

    function SoundApp() {
        _classCallCheck(this, SoundApp);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SoundApp).call(this));

        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onKeyUp = _this.onKeyUp.bind(_this);
        return _this;
    }

    _createClass(SoundApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $(document.body).on('keypress', this.onKeyDown);
            $(document.body).on('keyup', this.onKeyUp);
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(e) {}
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(e) {}
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Toolbar, null)
            );
        }
    }]);

    return SoundApp;
}(React.Component);

ReactDOM.render(React.createElement(SoundApp, null), document.getElementById('example'));

var xxx = function (_React$Component2) {
    _inherits(xxx, _React$Component2);

    function xxx() {
        _classCallCheck(this, xxx);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(xxx).call(this));

        _this2.state = {};
        return _this2;
    }

    _createClass(xxx, [{
        key: 'render',
        value: function render() {}
    }]);

    return xxx;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNGLHdCQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBSyxTQUFMLEdBQWlCLE1BQUssU0FBTCxDQUFlLElBQWYsT0FBakI7QUFDQSxjQUFLLE9BQUwsR0FBZSxNQUFLLE9BQUwsQ0FBYSxJQUFiLE9BQWY7QUFIVTtBQUliOzs7OzRDQUNtQjtBQUNqQixjQUFFLFNBQVMsSUFBWCxFQUFpQixFQUFqQixDQUFvQixVQUFwQixFQUFnQyxLQUFLLFNBQXJDO0FBQ0EsY0FBRSxTQUFTLElBQVgsRUFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsS0FBSyxPQUFsQztBQUNGOzs7Z0NBQ08sQyxFQUFFLENBQ1Q7OztrQ0FDUyxDLEVBQUUsQ0FDWDs7O2lDQUNRO0FBQ1AsbUJBQ0k7QUFBQTtBQUFBO0FBQ0Usb0NBQUMsT0FBRDtBQURGLGFBREo7QUFLRDs7OztFQXBCa0IsTUFBTSxTOztBQXVCN0IsU0FBUyxNQUFULENBQ0ksb0JBQUMsUUFBRCxPQURKLEVBRUksU0FBUyxjQUFULENBQXdCLFNBQXhCLENBRko7O0lBS00sRzs7O0FBQ0YsbUJBQWM7QUFBQTs7QUFBQTs7QUFFVixlQUFLLEtBQUwsR0FBYSxFQUFiO0FBRlU7QUFJYjs7OztpQ0FDUSxDQUNSOzs7O0VBUGEsTUFBTSxTIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNvdW5kQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5vbktleURvd24gPSB0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25LZXlVcCA9IHRoaXMub25LZXlVcC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAkKGRvY3VtZW50LmJvZHkpLm9uKCdrZXlwcmVzcycsIHRoaXMub25LZXlEb3duKTtcclxuICAgICAgICQoZG9jdW1lbnQuYm9keSkub24oJ2tleXVwJywgdGhpcy5vbktleVVwKTtcclxuICAgIH1cclxuICAgIG9uS2V5VXAoZSl7XHJcbiAgICB9XHJcbiAgICBvbktleURvd24oZSl7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8VG9vbGJhciAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxTb3VuZEFwcCAvPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcclxuKTtcclxuXHJcbmNsYXNzIHh4eCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
