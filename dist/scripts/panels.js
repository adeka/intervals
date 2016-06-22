"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayButton = function (_React$Component) {
    _inherits(PlayButton, _React$Component);

    function PlayButton() {
        _classCallCheck(this, PlayButton);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayButton).call(this));

        _this.state = {
            playing: false
        };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(PlayButton, [{
        key: "handleClick",
        value: function handleClick() {
            this.setState({ playing: !this.state.playing });
            this.props.playTimeline(this.state.playing);
        }
    }, {
        key: "render",
        value: function render() {
            var icon = this.state.playing ? "fa fa-pause" : "fa fa-play";
            return React.createElement("div", { className: "playButton " + icon, onClick: this.handleClick });
        }
    }]);

    return PlayButton;
}(React.Component);

var TimeDisplay = function (_React$Component2) {
    _inherits(TimeDisplay, _React$Component2);

    function TimeDisplay() {
        _classCallCheck(this, TimeDisplay);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeDisplay).call(this));
    }

    _createClass(TimeDisplay, [{
        key: "render",
        value: function render() {
            var ms = (Math.floor(this.props.elapsed) % 10 + "0").substring(0, 2);
            var s = Math.floor(this.props.elapsed / 10) % 60;
            if (s < 10) {
                s = "0" + s;
            }
            var m = Math.floor(this.props.elapsed / 10 / 60);
            if (m < 10) {
                m = "0" + m;
            }
            return React.createElement(
                "div",
                { className: "time" },
                m + " : " + s + " : " + ms,
                React.createElement(
                    "div",
                    { className: "tinyTime" },
                    this.props.elapsed
                )
            );
        }
    }]);

    return TimeDisplay;
}(React.Component);

var Toolbar = function (_React$Component3) {
    _inherits(Toolbar, _React$Component3);

    function Toolbar() {
        _classCallCheck(this, Toolbar);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Toolbar).call(this));

        _this3.state = {
            elapsed: 0,
            oldElapsed: 0,
            stopped: true,
            playing: false
        };
        _this3.tick = _this3.tick.bind(_this3);
        _this3.scrub = _this3.scrub.bind(_this3);
        _this3.playTimeline = _this3.playTimeline.bind(_this3);
        _this3.w = $(_this3.refs.panel).width();

        return _this3;
    }

    _createClass(Toolbar, [{
        key: "playTimeline",
        value: function playTimeline(playing) {
            //console.log("playing: " + playing);
            if (!playing) {
                this.start = new Date().getTime();
                this.interval = setInterval(this.tick, 100);
                this.setState({ stopped: false });
                this.setState({ playing: true });
            } else {
                clearInterval(this.interval);
                this.setState({ oldElapsed: this.state.elapsed });
                //this.setState({elapsed: 0});
                this.setState({ playing: false });
            }
        }
    }, {
        key: "tick",
        value: function tick() {
            var time = new Date().getTime() - this.start;
            if (this.state.stopped) {
                var elapsed = Math.floor(time / 100);
            } else {
                var elapsed = this.state.oldElapsed + Math.floor(time / 100);
            }
            this.setState({ elapsed: elapsed });
        }
    }, {
        key: "scrub",
        value: function scrub(p) {
            this.setState({ elapsed: p });
            this.setState({ oldElapsed: p });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "topToolbar" },
                React.createElement(
                    "div",
                    { ref: "panel", className: "info" },
                    React.createElement(TimeDisplay, { elapsed: this.state.elapsed }),
                    React.createElement(
                        "div",
                        { className: "controls" },
                        React.createElement(PlayButton, { playTimeline: this.playTimeline })
                    )
                ),
                React.createElement(Sequencer, { scrub: this.scrub, w: 2000, playing: this.state.playing, elapsed: this.state.elapsed })
            );
        }
    }]);

    return Toolbar;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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OytCQUNNO0FBQ0wsZ0JBQUksT0FBTyxJQUFJLElBQUosR0FBVyxPQUFYLEtBQXVCLEtBQUssS0FBdkM7QUFDQSxnQkFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFkLEVBQXNCO0FBQ3BCLG9CQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsT0FBTyxHQUFsQixDQUFkO0FBQ0QsYUFGRCxNQUdJO0FBQ0Ysb0JBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXdCLEtBQUssS0FBTCxDQUFXLE9BQU8sR0FBbEIsQ0FBdEM7QUFDRDtBQUNELGlCQUFLLFFBQUwsQ0FBYyxFQUFDLFNBQVMsT0FBVixFQUFkO0FBQ0Q7Ozs4QkFDSyxDLEVBQUU7QUFDTixpQkFBSyxRQUFMLENBQWMsRUFBQyxTQUFTLENBQVYsRUFBZDtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVksQ0FBYixFQUFkO0FBQ0Q7OztpQ0FDUTtBQUNQLG1CQUNLO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFlBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssS0FBSSxPQUFULEVBQWlCLFdBQVUsTUFBM0I7QUFDSSx3Q0FBQyxXQUFELElBQWEsU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUFqQyxHQURKO0FBRUk7QUFBQTtBQUFBLDBCQUFLLFdBQVUsVUFBZjtBQUNLLDRDQUFDLFVBQUQsSUFBWSxjQUFjLEtBQUssWUFBL0I7QUFETDtBQUZKLGlCQURKO0FBT0ssb0NBQUMsU0FBRCxJQUFXLE9BQU8sS0FBSyxLQUF2QixFQUE4QixHQUFHLElBQWpDLEVBQXVDLFNBQVMsS0FBSyxLQUFMLENBQVcsT0FBM0QsRUFBb0UsU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUF4RjtBQVBMLGFBREw7QUFXRDs7OztFQXhEaUIsTUFBTSxTIiwiZmlsZSI6InBhbmVscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBsYXlCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwbGF5aW5nIDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVDbGljaygpe1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3BsYXlpbmcgOiAhdGhpcy5zdGF0ZS5wbGF5aW5nfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5wbGF5VGltZWxpbmUodGhpcy5zdGF0ZS5wbGF5aW5nKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdmFyIGljb24gPSB0aGlzLnN0YXRlLnBsYXlpbmcgPyBcImZhIGZhLXBhdXNlXCIgOiBcImZhIGZhLXBsYXlcIjtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInBsYXlCdXR0b24gXCIgKyBpY29ufSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRpbWVEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdmFyIG1zID0gKE1hdGguZmxvb3IodGhpcy5wcm9wcy5lbGFwc2VkKSAlIDEwICsgXCIwXCIpLnN1YnN0cmluZygwLDIpO1xyXG4gICAgICAgIHZhciBzID0gTWF0aC5mbG9vcih0aGlzLnByb3BzLmVsYXBzZWQgLyAxMCkgJSA2MDtcclxuICAgICAgICBpZihzIDwgMTApe1xyXG4gICAgICAgICAgICBzID0gXCIwXCIgKyBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbSA9IE1hdGguZmxvb3IodGhpcy5wcm9wcy5lbGFwc2VkIC8gMTAgLyA2MCk7XHJcbiAgICAgICAgaWYobSA8IDEwKXtcclxuICAgICAgICAgICAgbSA9IFwiMFwiICsgbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cclxuICAgICAgICAgICAgICAgICB7bSArIFwiIDogXCIgKyBzICsgXCIgOiBcIiArIG1zfVxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGlueVRpbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lbGFwc2VkfVxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUb29sYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZWxhcHNlZCA6IDAsXHJcbiAgICAgICAgICAgIG9sZEVsYXBzZWQgOiAwLFxyXG4gICAgICAgICAgICBzdG9wcGVkIDogdHJ1ZSxcclxuICAgICAgICAgICAgcGxheWluZyA6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRpY2sgPSB0aGlzLnRpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNjcnViID0gdGhpcy5zY3J1Yi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucGxheVRpbWVsaW5lID0gdGhpcy5wbGF5VGltZWxpbmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLncgPSAkKHRoaXMucmVmcy5wYW5lbCkud2lkdGgoKTtcclxuXHJcbiAgICB9XHJcbiAgICBwbGF5VGltZWxpbmUocGxheWluZykge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5aW5nOiBcIiArIHBsYXlpbmcpO1xyXG4gICAgICAgIGlmKCFwbGF5aW5nKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2ssIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzdG9wcGVkIDogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3BsYXlpbmcgOiB0cnVlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29sZEVsYXBzZWQgOiB0aGlzLnN0YXRlLmVsYXBzZWR9KTtcclxuICAgICAgICAgICAgLy90aGlzLnNldFN0YXRlKHtlbGFwc2VkOiAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3BsYXlpbmcgOiBmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRpY2soKSB7XHJcbiAgICAgIHZhciB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnN0YXJ0O1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnN0b3BwZWQpe1xyXG4gICAgICAgIHZhciBlbGFwc2VkID0gTWF0aC5mbG9vcih0aW1lIC8gMTAwKSA7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICB2YXIgZWxhcHNlZCA9IHRoaXMuc3RhdGUub2xkRWxhcHNlZCArIE1hdGguZmxvb3IodGltZSAvIDEwMCkgO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2VsYXBzZWQ6IGVsYXBzZWR9KTtcclxuICAgIH1cclxuICAgIHNjcnViKHApe1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtlbGFwc2VkOiBwfSk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe29sZEVsYXBzZWQ6IHB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcFRvb2xiYXJcIj5cclxuICAgICAgICAgICAgICAgPGRpdiByZWY9XCJwYW5lbFwiIGNsYXNzTmFtZT1cImluZm9cIj5cclxuICAgICAgICAgICAgICAgICAgIDxUaW1lRGlzcGxheSBlbGFwc2VkPXt0aGlzLnN0YXRlLmVsYXBzZWR9Lz5cclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udHJvbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFBsYXlCdXR0b24gcGxheVRpbWVsaW5lPXt0aGlzLnBsYXlUaW1lbGluZX0gLz5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8U2VxdWVuY2VyIHNjcnViPXt0aGlzLnNjcnVifSB3PXsyMDAwfSBwbGF5aW5nPXt0aGlzLnN0YXRlLnBsYXlpbmd9IGVsYXBzZWQ9e3RoaXMuc3RhdGUuZWxhcHNlZH0vPlxyXG4gICAgICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
