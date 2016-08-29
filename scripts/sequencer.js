"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sequencer = function (_React$Component) {
    _inherits(Sequencer, _React$Component);

    function Sequencer() {
        _classCallCheck(this, Sequencer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sequencer).call(this));

        _this.state = {
            start: 0,
            end: 500,
            scrubbing: false
        };
        _this.startDrag = _this.startDrag.bind(_this);
        _this.stopDrag = _this.stopDrag.bind(_this);
        _this.drag = _this.drag.bind(_this);
        return _this;
    }

    _createClass(Sequencer, [{
        key: "startDrag",
        value: function startDrag(e) {
            this.setState({ scrubbing: true });
        }
    }, {
        key: "stopDrag",
        value: function stopDrag(e) {
            this.setState({ scrubbing: false });
        }
    }, {
        key: "drag",
        value: function drag(e) {
            if (this.state.scrubbing) {
                //console.log(e.clientX);
                var pad = $(this.refs.scrubberPad).width();
                if (e.clientX > pad) {
                    var p = this.reverseTimeScale(e.clientX - pad);
                    this.props.scrub(p);
                } else {
                    this.props.scrub(0);
                    e.stopPropagation();
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.timeScale = d3.scale.linear().domain([0, this.state.end]).range([0, this.props.w]);
            this.reverseTimeScale = d3.scale.linear().domain([0, this.props.w]).range([0, this.state.end]);

            $(this.refs.playhead).css("left", this.timeScale(this.props.elapsed));

            return React.createElement(
                "div",
                { className: "timelineContainer", onMouseUp: this.stopDrag, onMouseMove: this.drag, onMouseLeave: this.stopDrag },
                React.createElement(
                    "div",
                    { className: "toolsContainer" },
                    React.createElement("div", { className: "toolsPad" }),
                    React.createElement(
                        "div",
                        { className: "tools" },
                        React.createElement("div", { className: "divider" }),
                        React.createElement("div", { className: "fa fa-pencil" }),
                        React.createElement("div", { className: "fa fa-eraser" }),
                        React.createElement("div", { className: "fa fa-mouse-pointer" }),
                        React.createElement("div", { className: "divider" }),
                        React.createElement(
                            "div",
                            { className: "fraction" },
                            " 1/1 "
                        ),
                        React.createElement(
                            "div",
                            { className: "fraction" },
                            " 1/2 "
                        ),
                        React.createElement(
                            "div",
                            { className: "fraction" },
                            " 1/4 "
                        ),
                        React.createElement(
                            "div",
                            { className: "fraction" },
                            " 1/8 "
                        ),
                        React.createElement(
                            "div",
                            { className: "fraction" },
                            " 1/16 "
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "timeline" },
                    React.createElement("div", { ref: "scrubberPad", className: "scrubberPad" }),
                    React.createElement(
                        "div",
                        { className: "scrubber" },
                        React.createElement(
                            "div",
                            { className: "playheadWrap" },
                            React.createElement(
                                "div",
                                { ref: "playhead",
                                    className: "playhead fa fa-caret-down", onMouseDown: this.startDrag },
                                React.createElement("div", { ref: "playheadHandle", className: "playheadHandle" })
                            )
                        )
                    ),
                    React.createElement(Track, { name: "track_1", w: this.props.w, playing: this.props.playing, elapsed: this.props.elapsed })
                )
            );
        }
    }]);

    return Sequencer;
}(React.Component);

var Track = function (_React$Component2) {
    _inherits(Track, _React$Component2);

    function Track(props) {
        _classCallCheck(this, Track);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Track).call(this));

        _this2.state = {};
        var fundamental = 65.406 * 2;
        _this2.fixedScale = [1 / 1, 33 / 32, 9 / 8, 7 / 6, 5 / 4, 21 / 16, 11 / 8, 3 / 2, 99 / 64, 27 / 16, 7 / 4, 15 / 8, 2 / 1];
        _this2.scale = [];

        // for(var i=0; i<this.fixedScale.length; i++){
        //     this.scale.push(fundamental * this.fixedScale[i]);
        // }

        for (var i = 0; i < 12; i++) {
            _this2.scale.push(fundamental);
            fundamental = fundamental * Math.pow(2, 1 / 12);
        }
        _this2.scale.reverse();
        return _this2;
    }

    _createClass(Track, [{
        key: "render",
        value: function render() {
            var self = this;
            return React.createElement(
                "div",
                { className: "track" },
                React.createElement(
                    "div",
                    { className: "infoBox" },
                    this.props.name
                ),
                React.createElement(
                    "div",
                    { className: "laneWrap" },
                    React.createElement(
                        "div",
                        { className: "lanes" },
                        this.scale.map(function (result) {
                            return React.createElement(Notelane, { pitch: result, w: self.props.w, playing: self.props.playing, elapsed: self.props.elapsed });
                        })
                    )
                )
            );
        }
    }]);

    return Track;
}(React.Component);

var Notelane = function (_React$Component3) {
    _inherits(Notelane, _React$Component3);

    function Notelane(props) {
        _classCallCheck(this, Notelane);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Notelane).call(this));

        _this3.state = {
            start: 0,
            end: 500,
            notes: []
        };
        _this3.addNote = _this3.addNote.bind(_this3);
        _this3.removeNote = _this3.removeNote.bind(_this3);
        _this3.timeScale = d3.scale.linear().domain([0, _this3.state.end]).range([0, props.w]);

        var subs = 4;
        var bpm = 120;
        var meter = { top: 4, bottom: 4 };
        var measureLength = meter.top / (bpm / 60) * 10;
        _this3.barLength = meter.top / (bpm / 60) * 10 / subs;
        _this3.ticks = [];
        var barBuilder = 0;
        for (var i = 0; i < _this3.state.end; i += _this3.barLength) {
            var cName;
            if (Math.floor(i % (measureLength * meter.bottom)) == 0) {
                cName = "bigTick";
            } else if (Math.floor(i % measureLength) == 0) {
                cName = "tick";
            } else {
                cName = "subTick";
            }

            var tick = {
                style: {
                    left: _this3.timeScale(i) + "px",
                    width: _this3.timeScale(_this3.barLength) + "px"
                },
                width: _this3.barLength,
                cName: cName,
                time: i
            };
            _this3.ticks.push(tick);
        }
        return _this3;
    }

    _createClass(Notelane, [{
        key: "addNote",
        value: function addNote(time, duration) {
            var notes = this.state.notes;
            notes.push({
                style: {
                    width: this.timeScale(duration),
                    left: this.timeScale(time)
                },
                time: time,
                duration: duration
            });
            this.setState({
                notes: notes
            });
        }
    }, {
        key: "removeNote",
        value: function removeNote(time) {
            var notes = this.state.notes;
            var self = this;

            notes = _.reject(notes, function (item, index, list) {
                return item.time == time;
            });
            this.setState({
                notes: notes
            });
            //this.forceUpdate();
        }
    }, {
        key: "render",
        value: function render() {
            var self = this;
            $(this.refs.playhead).css("left", this.timeScale(this.props.elapsed));
            return React.createElement(
                "div",
                { ref: "timeline", className: "timescale" },
                React.createElement("div", { className: "playhead", ref: "playhead" }),
                this.state.notes.map(function (result) {
                    var left = self.timeScale(result.time);
                    var width = self.timeScale(result.duration);
                    return React.createElement(Note, { removeNote: self.removeNote, pitch: self.props.pitch, playing: self.props.playing, duration: result.duration, time: result.time, elapsed: self.props.elapsed, left: left, width: width, style: result.style });
                }),
                this.ticks.map(function (result) {
                    return React.createElement(Bar, { className: result.cName, time: result.time, addNote: self.addNote, width: result.width, duration: self.timeScale(self.barLength), style: result.style });
                })
            );
        }
    }]);

    return Notelane;
}(React.Component);

var Bar = function (_React$Component4) {
    _inherits(Bar, _React$Component4);

    function Bar(props) {
        _classCallCheck(this, Bar);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Bar).call(this));

        _this4.state = {
            drawing: false,
            length: props.width
        };
        _this4.mouseUp = _this4.mouseUp.bind(_this4);
        _this4.mouseDrag = _this4.mouseDrag.bind(_this4);
        _this4.mouseDown = _this4.mouseDown.bind(_this4);
        return _this4;
    }

    _createClass(Bar, [{
        key: "mouseDown",
        value: function mouseDown() {
            this.setState({
                drawing: true
            });
        }
    }, {
        key: "mouseDrag",
        value: function mouseDrag() {
            if (this.state.drawing) {
                console.log(this.state.length);
            }
        }
    }, {
        key: "mouseUp",
        value: function mouseUp() {
            this.setState({
                drawing: false
            });
            this.props.addNote(this.props.time, this.state.length);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: this.props.className, style: this.props.style, onMouseDown: this.mouseDown, onMouseMove: this.mouseDrag, onMouseUp: this.mouseUp });
        }
    }]);

    return Bar;
}(React.Component);

var Note = function (_React$Component5) {
    _inherits(Note, _React$Component5);

    function Note() {
        _classCallCheck(this, Note);

        // this.saw = new Wad({
        //     source : 'sawtooth',
        // });

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(Note).call(this));

        _this5.saw = new Wad({ source: 'square' });
        //this.saw = new Wad({source : 'samples/piano.wav'});
        _this5.state = {
            playing: false
        };
        _this5.checkForPlay = _this5.checkForPlay.bind(_this5);
        _this5.handleClick = _this5.handleClick.bind(_this5);
        _this5.listener = setInterval(_this5.checkForPlay, 10);
        _this5.ready = true;
        return _this5;
    }

    _createClass(Note, [{
        key: "checkForPlay",
        value: function checkForPlay() {
            if (this.ready) {
                if (this.props.elapsed - this.props.time < 5 && this.props.elapsed - this.props.time > 0 && this.props.playing && !this.state.playing) {
                    this.play();
                    this.setState({ playing: true });
                }
                if (!this.props.playing) {
                    this.stop();
                    this.setState({ playing: false });
                }
                if (this.saw.gain.length < 1) {
                    this.setState({ playing: false });
                }
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.play();
            this.setState({ playing: true });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            console.log("ay");
            clearInterval(this.listener);
            this.ready = false;
        }
    }, {
        key: "handleClick",
        value: function handleClick() {
            clearInterval(this.listener);
            this.props.removeNote(this.props.time);
        }
    }, {
        key: "play",
        value: function play() {
            this.saw.play({
                volume: .8,
                wait: 0, // Time in seconds between calling play() and actually triggering the note.
                loop: false, // This overrides the value for loop on the constructor, if it was set.
                pitch: this.props.pitch,
                label: 'A', // A label that identifies this note.
                panning: [1, -1, 10],
                env: {
                    attack: .05,
                    decay: .1,
                    sustain: .2,
                    hold: this.props.duration / 10,
                    release: .3
                },
                filter: {
                    type: 'lowpass',
                    frequency: 1200,
                    q: 8.5,
                    env: {
                        attack: .2,
                        frequency: 600
                    }
                }
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            if (this.saw.gain.length > 0) {
                this.saw.stop();
            }
        }
    }, {
        key: "render",
        value: function render() {
            $(this.refs.self).css("left", this.props.left);
            $(this.refs.self).width(this.props.width);
            return React.createElement("div", { ref: "self", style: this.props.style, className: "note", onDoubleClick: this.handleClick });
        }
    }]);

    return Note;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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LENBQVMsSUFBVCxDQUFjLE1BQWQsR0FBdUIsQ0FBMUIsRUFBNEI7QUFDeEIscUJBQUssR0FBTCxDQUFTLElBQVQ7QUFDSDtBQUNGOzs7aUNBQ1E7QUFDUCxjQUFFLEtBQUssSUFBTCxDQUFVLElBQVosRUFBa0IsR0FBbEIsQ0FBc0IsTUFBdEIsRUFBOEIsS0FBSyxLQUFMLENBQVcsSUFBekM7QUFDQSxjQUFFLEtBQUssSUFBTCxDQUFVLElBQVosRUFBa0IsS0FBbEIsQ0FBd0IsS0FBSyxLQUFMLENBQVcsS0FBbkM7QUFDRSxtQkFDSSw2QkFBSyxLQUFJLE1BQVQsRUFBZ0IsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFsQyxFQUF5QyxXQUFVLE1BQW5ELEVBQTBELGVBQWUsS0FBSyxXQUE5RSxHQURKO0FBR0g7Ozs7RUFqRmMsTUFBTSxTIiwiZmlsZSI6InNlcXVlbmNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNlcXVlbmNlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0IDogMCxcclxuICAgICAgICAgICAgZW5kOiA1MDAsXHJcbiAgICAgICAgICAgIHNjcnViYmluZzogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RhcnREcmFnID0gdGhpcy5zdGFydERyYWcuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnN0b3BEcmFnID0gdGhpcy5zdG9wRHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZHJhZyA9IHRoaXMuZHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgc3RhcnREcmFnKGUpe1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtzY3J1YmJpbmc6IHRydWV9KTtcclxuICAgIH1cclxuICAgIHN0b3BEcmFnKGUpe1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtzY3J1YmJpbmc6IGZhbHNlfSk7XHJcbiAgICB9XHJcbiAgICBkcmFnKGUpe1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnNjcnViYmluZyl7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhlLmNsaWVudFgpO1xyXG4gICAgICAgIHZhciBwYWQgPSAkKHRoaXMucmVmcy5zY3J1YmJlclBhZCkud2lkdGgoKTtcclxuICAgICAgICBpZihlLmNsaWVudFggPiBwYWQpe1xyXG4gICAgICAgICAgdmFyIHAgPSB0aGlzLnJldmVyc2VUaW1lU2NhbGUoZS5jbGllbnRYIC0gcGFkKTtcclxuICAgICAgICAgIHRoaXMucHJvcHMuc2NydWIocCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICB0aGlzLnByb3BzLnNjcnViKDApO1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB0aGlzLnRpbWVTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpLmRvbWFpbihbMCwgdGhpcy5zdGF0ZS5lbmRdKS5yYW5nZShbMCwgdGhpcy5wcm9wcy53XSk7XHJcbiAgICAgICAgdGhpcy5yZXZlcnNlVGltZVNjYWxlID0gZDMuc2NhbGUubGluZWFyKCkuZG9tYWluKFswLCB0aGlzLnByb3BzLnddKS5yYW5nZShbMCwgdGhpcy5zdGF0ZS5lbmRdKTtcclxuXHJcbiAgICAgICAgJCh0aGlzLnJlZnMucGxheWhlYWQpLmNzcyhcImxlZnRcIiwgdGhpcy50aW1lU2NhbGUodGhpcy5wcm9wcy5lbGFwc2VkKSk7XHJcblxyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZUNvbnRhaW5lclwiIG9uTW91c2VVcD17dGhpcy5zdG9wRHJhZ30gb25Nb3VzZU1vdmU9e3RoaXMuZHJhZ30gb25Nb3VzZUxlYXZlPXt0aGlzLnN0b3BEcmFnfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9vbHNDb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvb2xzUGFkXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvb2xzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGl2aWRlclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmEgZmEtcGVuY2lsXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYSBmYS1lcmFzZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZhIGZhLW1vdXNlLXBvaW50ZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYWN0aW9uXCI+IDEvMSA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFjdGlvblwiPiAxLzIgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJhY3Rpb25cIj4gMS80IDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyYWN0aW9uXCI+IDEvOCA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmFjdGlvblwiPiAxLzE2IDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9XCJzY3J1YmJlclBhZFwiIGNsYXNzTmFtZT1cInNjcnViYmVyUGFkXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjcnViYmVyXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXloZWFkV3JhcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9XCJwbGF5aGVhZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwbGF5aGVhZCBmYSBmYS1jYXJldC1kb3duXCIgb25Nb3VzZURvd249e3RoaXMuc3RhcnREcmFnfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj1cInBsYXloZWFkSGFuZGxlXCIgY2xhc3NOYW1lPVwicGxheWhlYWRIYW5kbGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8VHJhY2sgbmFtZT17XCJ0cmFja18xXCJ9IHc9e3RoaXMucHJvcHMud30gcGxheWluZz17dGhpcy5wcm9wcy5wbGF5aW5nfSBlbGFwc2VkPXt0aGlzLnByb3BzLmVsYXBzZWR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVHJhY2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgIH1cclxuICAgIHZhciBmdW5kYW1lbnRhbCA9IDY1LjQwNioyO1xyXG4gICAgdGhpcy5maXhlZFNjYWxlID0gW1xyXG4gICAgICAgIDEvMSxcclxuICAgICAgICAzMy8zMixcclxuICAgICAgICA5LzgsXHJcbiAgICAgICAgNy82LFxyXG4gICAgICAgIDUvNCxcclxuICAgICAgICAyMS8xNixcclxuICAgICAgICAxMS84LFxyXG4gICAgICAgIDMvMixcclxuICAgICAgICA5OS82NCxcclxuICAgICAgICAyNy8xNixcclxuICAgICAgICA3LzQsXHJcbiAgICAgICAgMTUvOCxcclxuICAgICAgICAyLzEsXHJcbiAgICBdXHJcbiAgICB0aGlzLnNjYWxlID0gW107XHJcblxyXG4gICAgLy8gZm9yKHZhciBpPTA7IGk8dGhpcy5maXhlZFNjYWxlLmxlbmd0aDsgaSsrKXtcclxuICAgIC8vICAgICB0aGlzLnNjYWxlLnB1c2goZnVuZGFtZW50YWwgKiB0aGlzLmZpeGVkU2NhbGVbaV0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGZvcih2YXIgaT0wOyBpPDEyOyBpKyspe1xyXG4gICAgICAgIHRoaXMuc2NhbGUucHVzaChmdW5kYW1lbnRhbCk7XHJcbiAgICAgICAgZnVuZGFtZW50YWwgPSBmdW5kYW1lbnRhbCAqIE1hdGgucG93KDIsIDEvMTIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zY2FsZS5yZXZlcnNlKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFja1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb0JveFwiPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLm5hbWV9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYW5lV3JhcFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhbmVzXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zY2FsZS5tYXAoZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxOb3RlbGFuZSBwaXRjaD17cmVzdWx0fSB3PXtzZWxmLnByb3BzLnd9IHBsYXlpbmc9e3NlbGYucHJvcHMucGxheWluZ30gZWxhcHNlZD17c2VsZi5wcm9wcy5lbGFwc2VkfS8+O1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBOb3RlbGFuZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc3RhcnQgOiAwLFxyXG4gICAgICAgICAgICBlbmQ6IDUwMCxcclxuICAgICAgICAgICAgbm90ZXMgOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hZGROb3RlID0gdGhpcy5hZGROb3RlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVOb3RlID0gdGhpcy5yZW1vdmVOb3RlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy50aW1lU2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKS5kb21haW4oWzAsIHRoaXMuc3RhdGUuZW5kXSkucmFuZ2UoWzAsIHByb3BzLnddKTtcclxuXHJcbiAgICAgICAgdmFyIHN1YnMgPSA0O1xyXG4gICAgICAgIHZhciBicG0gPSAxMjA7XHJcbiAgICAgICAgdmFyIG1ldGVyID0ge3RvcDogNCwgYm90dG9tOiA0fTtcclxuICAgICAgICB2YXIgbWVhc3VyZUxlbmd0aCA9IChtZXRlci50b3AgLyAoYnBtIC8gNjApKSoxMDtcclxuICAgICAgICB0aGlzLmJhckxlbmd0aCA9IChtZXRlci50b3AgLyAoYnBtIC8gNjApKSoxMCAvIHN1YnM7XHJcbiAgICAgICAgdGhpcy50aWNrcyA9IFtdO1xyXG4gICAgICAgIHZhciBiYXJCdWlsZGVyID0gMDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpPCB0aGlzLnN0YXRlLmVuZDsgaSs9IHRoaXMuYmFyTGVuZ3RoKXtcclxuICAgICAgICAgICAgdmFyIGNOYW1lO1xyXG4gICAgICAgICAgICBpZihNYXRoLmZsb29yKGkgJSAobWVhc3VyZUxlbmd0aCptZXRlci5ib3R0b20pKSA9PSAgMCl7XHJcbiAgICAgICAgICAgICAgY05hbWUgPSBcImJpZ1RpY2tcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKE1hdGguZmxvb3IoaSAlIChtZWFzdXJlTGVuZ3RoKSkgPT0gIDApe1xyXG4gICAgICAgICAgICAgIGNOYW1lID0gXCJ0aWNrXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICBjTmFtZSA9IFwic3ViVGlja1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdGljayA9IHtcclxuICAgICAgICAgICAgICBzdHlsZSA6IHtcclxuICAgICAgICAgICAgICAgIGxlZnQgOiB0aGlzLnRpbWVTY2FsZShpKStcInB4XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy50aW1lU2NhbGUodGhpcy5iYXJMZW5ndGgpK1wicHhcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgd2lkdGggOiB0aGlzLmJhckxlbmd0aCxcclxuICAgICAgICAgICAgICBjTmFtZSA6IGNOYW1lLFxyXG4gICAgICAgICAgICAgIHRpbWUgOiBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50aWNrcy5wdXNoKHRpY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFkZE5vdGUodGltZSwgZHVyYXRpb24pe1xyXG4gICAgICB2YXIgbm90ZXMgPSB0aGlzLnN0YXRlLm5vdGVzO1xyXG4gICAgICAgIG5vdGVzLnB1c2goe1xyXG4gICAgICAgIHN0eWxlIDoge1xyXG4gICAgICAgICAgd2lkdGg6IHRoaXMudGltZVNjYWxlKGR1cmF0aW9uKSxcclxuICAgICAgICAgIGxlZnQ6IHRoaXMudGltZVNjYWxlKHRpbWUpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lIDogdGltZSxcclxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgIG5vdGVzIDogbm90ZXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbW92ZU5vdGUodGltZSl7XHJcbiAgICAgIHZhciBub3RlcyA9IHRoaXMuc3RhdGUubm90ZXM7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIG5vdGVzID0gXy5yZWplY3Qobm90ZXMsIGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBsaXN0KXtcclxuICAgICAgICByZXR1cm4gaXRlbS50aW1lID09IHRpbWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBub3RlcyA6IG5vdGVzXHJcbiAgICAgIH0pO1xyXG4gICAgICAvL3RoaXMuZm9yY2VVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgJCh0aGlzLnJlZnMucGxheWhlYWQpLmNzcyhcImxlZnRcIiwgdGhpcy50aW1lU2NhbGUodGhpcy5wcm9wcy5lbGFwc2VkKSk7XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2IHJlZj1cInRpbWVsaW5lXCIgY2xhc3NOYW1lPVwidGltZXNjYWxlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXloZWFkXCIgcmVmPVwicGxheWhlYWRcIiAvPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubm90ZXMubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gc2VsZi50aW1lU2NhbGUocmVzdWx0LnRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHNlbGYudGltZVNjYWxlKHJlc3VsdC5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxOb3RlIHJlbW92ZU5vdGU9e3NlbGYucmVtb3ZlTm90ZX0gcGl0Y2g9e3NlbGYucHJvcHMucGl0Y2h9IHBsYXlpbmc9e3NlbGYucHJvcHMucGxheWluZ30gZHVyYXRpb249e3Jlc3VsdC5kdXJhdGlvbn0gdGltZT17cmVzdWx0LnRpbWV9IGVsYXBzZWQ9e3NlbGYucHJvcHMuZWxhcHNlZH0gbGVmdD17bGVmdH0gd2lkdGg9e3dpZHRofSBzdHlsZT17cmVzdWx0LnN0eWxlfSAvPjtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAge3RoaXMudGlja3MubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8QmFyIGNsYXNzTmFtZT17cmVzdWx0LmNOYW1lfSB0aW1lPXtyZXN1bHQudGltZX0gYWRkTm90ZT17c2VsZi5hZGROb3RlfSB3aWR0aD17cmVzdWx0LndpZHRofSBkdXJhdGlvbj17c2VsZi50aW1lU2NhbGUoc2VsZi5iYXJMZW5ndGgpfSBzdHlsZT17cmVzdWx0LnN0eWxlfSAvPjtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICBkcmF3aW5nIDogZmFsc2UsXHJcbiAgICAgICAgbGVuZ3RoIDogcHJvcHMud2lkdGhcclxuICAgIH1cclxuICAgIHRoaXMubW91c2VVcCA9IHRoaXMubW91c2VVcC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5tb3VzZURyYWcgPSB0aGlzLm1vdXNlRHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSB0aGlzLm1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuICBtb3VzZURvd24oKXtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBkcmF3aW5nIDogdHJ1ZVxyXG4gICAgICB9KTtcclxuICB9XHJcbiAgbW91c2VEcmFnKCl7XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUuZHJhd2luZyl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICB9XHJcbiAgbW91c2VVcCgpe1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgIGRyYXdpbmcgOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgIHRoaXMucHJvcHMuYWRkTm90ZSh0aGlzLnByb3BzLnRpbWUsIHRoaXMuc3RhdGUubGVuZ3RoKTtcclxuICB9XHJcbiAgcmVuZGVyKCl7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSBvbk1vdXNlRG93bj17dGhpcy5tb3VzZURvd259IG9uTW91c2VNb3ZlPXt0aGlzLm1vdXNlRHJhZ30gb25Nb3VzZVVwPXt0aGlzLm1vdXNlVXB9IC8+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgTm90ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vIHRoaXMuc2F3ID0gbmV3IFdhZCh7XHJcbiAgICAgICAgLy8gICAgIHNvdXJjZSA6ICdzYXd0b290aCcsXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgdGhpcy5zYXcgPSBuZXcgV2FkKHtzb3VyY2UgOiAnc3F1YXJlJ30pO1xyXG4gICAgICAgIC8vdGhpcy5zYXcgPSBuZXcgV2FkKHtzb3VyY2UgOiAnc2FtcGxlcy9waWFuby53YXYnfSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcGxheWluZzogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2hlY2tGb3JQbGF5ID0gdGhpcy5jaGVja0ZvclBsYXkuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrRm9yUGxheSwgMTApO1xyXG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgY2hlY2tGb3JQbGF5KCl7XHJcbiAgICAgIGlmKHRoaXMucmVhZHkpe1xyXG4gICAgICAgIGlmKCh0aGlzLnByb3BzLmVsYXBzZWQgLSB0aGlzLnByb3BzLnRpbWUgPCA1ICYmIHRoaXMucHJvcHMuZWxhcHNlZCAtIHRoaXMucHJvcHMudGltZSA+IDApICYmIHRoaXMucHJvcHMucGxheWluZyAmJiAhdGhpcy5zdGF0ZS5wbGF5aW5nKXtcclxuICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGxheWluZyA6IHRydWV9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMucHJvcHMucGxheWluZyl7XHJcbiAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3BsYXlpbmcgOiBmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNhdy5nYWluLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwbGF5aW5nIDogZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtwbGF5aW5nIDogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYXlcIik7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5saXN0ZW5lcik7XHJcbiAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGhhbmRsZUNsaWNrKCl7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5saXN0ZW5lcik7XHJcbiAgICAgIHRoaXMucHJvcHMucmVtb3ZlTm90ZSh0aGlzLnByb3BzLnRpbWUpO1xyXG4gICAgfVxyXG4gICAgcGxheSgpe1xyXG4gICAgICB0aGlzLnNhdy5wbGF5KHtcclxuICAgICAgICAgIHZvbHVtZSAgOiAuOCxcclxuICAgICAgICAgIHdhaXQgICAgOiAwLCAgICAgLy8gVGltZSBpbiBzZWNvbmRzIGJldHdlZW4gY2FsbGluZyBwbGF5KCkgYW5kIGFjdHVhbGx5IHRyaWdnZXJpbmcgdGhlIG5vdGUuXHJcbiAgICAgICAgICBsb29wICAgIDogZmFsc2UsIC8vIFRoaXMgb3ZlcnJpZGVzIHRoZSB2YWx1ZSBmb3IgbG9vcCBvbiB0aGUgY29uc3RydWN0b3IsIGlmIGl0IHdhcyBzZXQuXHJcbiAgICAgICAgICBwaXRjaCAgIDogdGhpcy5wcm9wcy5waXRjaCxcclxuICAgICAgICAgIGxhYmVsICAgOiAnQScsICAgLy8gQSBsYWJlbCB0aGF0IGlkZW50aWZpZXMgdGhpcyBub3RlLlxyXG4gICAgICAgICAgcGFubmluZyA6IFsxLCAtMSwgMTBdLFxyXG4gICAgICAgICAgZW52IDoge1xyXG4gICAgICAgICAgICAgIGF0dGFjayA6IC4wNSxcclxuICAgICAgICAgICAgICBkZWNheSA6IC4xLFxyXG4gICAgICAgICAgICAgIHN1c3RhaW4gOiAuMixcclxuICAgICAgICAgICAgICBob2xkIDogdGhpcy5wcm9wcy5kdXJhdGlvbi8xMCxcclxuICAgICAgICAgICAgICByZWxlYXNlIDogLjNcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmaWx0ZXIgOiB7XHJcbiAgICAgICAgICAgICAgdHlwZSA6ICdsb3dwYXNzJyxcclxuICAgICAgICAgICAgICBmcmVxdWVuY3kgOiAxMjAwLFxyXG4gICAgICAgICAgICAgIHEgOiA4LjUsXHJcbiAgICAgICAgICAgICAgZW52IDoge1xyXG4gICAgICAgICAgICAgICAgICBhdHRhY2sgOiAuMixcclxuICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5IDogNjAwXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0b3AoKXtcclxuICAgICAgaWYodGhpcy5zYXcuZ2Fpbi5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIHRoaXMuc2F3LnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAkKHRoaXMucmVmcy5zZWxmKS5jc3MoXCJsZWZ0XCIsIHRoaXMucHJvcHMubGVmdCk7XHJcbiAgICAgICQodGhpcy5yZWZzLnNlbGYpLndpZHRoKHRoaXMucHJvcHMud2lkdGgpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgcmVmPVwic2VsZlwiIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSBjbGFzc05hbWU9XCJub3RlXCIgb25Eb3VibGVDbGljaz17dGhpcy5oYW5kbGVDbGlja30+PC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
