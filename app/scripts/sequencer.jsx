class Sequencer extends React.Component {
    constructor() {
        super();
        this.state = {
            start : 0,
            end: 300,
            scrubbing: false
        };
        this.startDrag = this.startDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
        this.drag = this.drag.bind(this);
    }
    startDrag(e){
      this.setState({scrubbing: true});
    }
    stopDrag(e){
      this.setState({scrubbing: false});
    }
    drag(e){
      if(this.state.scrubbing){
        //console.log(e.clientX);
        var pad = $(this.refs.scrubberPad).width();
        if(e.clientX > pad){
          var p = this.reverseTimeScale(e.clientX - pad);
          this.props.scrub(p);
        }
        else{
          this.props.scrub(0);
          e.stopPropagation();
        }
      }
    }
    render() {
        this.timeScale = d3.scale.linear().domain([0, this.state.end]).range([0, this.props.w]);
        this.reverseTimeScale = d3.scale.linear().domain([0, this.props.w]).range([0, this.state.end]);

        $(this.refs.playhead).css("left", this.timeScale(this.props.elapsed));

        return(
            <div className="timelineContainer" onMouseUp={this.stopDrag} onMouseMove={this.drag} onMouseLeave={this.stopDrag}>
                <div className="toolsContainer">
                    <div className="toolsPad" />
                    <div className="tools">
                        <div className="divider" />
                        <div className="fa fa-pencil" />
                        <div className="fa fa-eraser" />
                        <div className="fa fa-mouse-pointer" />
                        <div className="divider" />
                        <div className="fraction"> 1/1 </div>
                        <div className="fraction"> 1/2 </div>
                        <div className="fraction"> 1/4 </div>
                        <div className="fraction"> 1/8 </div>
                        <div className="fraction"> 1/16 </div>
                    </div>
                </div>
                <div className="timeline">
                    <div ref="scrubberPad" className="scrubberPad" />
                    <div className="scrubber" >
                        <div className="playheadWrap">
                            <div ref="playhead"
                                  className="playhead fa fa-caret-down" onMouseDown={this.startDrag}>
                                <div ref="playheadHandle" className="playheadHandle">
                                </div>
                            </div>
                        </div>
                    </div>
                    <Track name={"track_1"} w={this.props.w} playing={this.props.playing} elapsed={this.props.elapsed} />
                </div>
            </div>
        );
    }
}

class Track extends React.Component {
  constructor(props) {
    super();
    this.state = {
    }
    var fundamental = 261.626;
    this.fixedScale = [
        1/1,
        33/32,
        9/8,
        7/6,
        5/4,
        21/16,
        11/8,
        3/2,
        99/64,
        27/16,
        7/4,
        15/8,
        2/1,
    ]
    this.scale = [];

    // for(var i=0; i<this.fixedScale.length; i++){
    //     this.scale.push(fundamental * this.fixedScale[i]);
    // }

    for(var i=0; i<24; i++){
        this.scale.push(fundamental);
        fundamental = fundamental * Math.pow(2, 1/23);
    }
    this.scale.reverse();
  }

  render(){
    var self = this;
    return (
        <div className="track">
        <div className="infoBox">
        {this.props.name}
        </div>
        <div className="lanes">
            {this.scale.map(function(result) {
                return <Notelane pitch={result} w={self.props.w} playing={self.props.playing} elapsed={self.props.elapsed}/>;
            })}
        </div>
        </div>
    );
  }
}


class Notelane extends React.Component {
    constructor(props) {
        super();
        this.state = {
            start : 0,
            end: 300,
            notes : []
        };
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.timeScale = d3.scale.linear().domain([0, this.state.end]).range([0, props.w]);

        var subs = 4;
        var bpm = 120;
        var meter = {top: 4, bottom: 4};
        var measureLength = (meter.top / (bpm / 60))*10;
        this.barLength = (meter.top / (bpm / 60))*10 / subs;
        this.ticks = [];
        var barBuilder = 0;
        for(var i = 0; i< this.state.end; i+= this.barLength){
            var cName;
            if(Math.floor(i % (measureLength*meter.bottom)) ==  0){
              cName = "bigTick";
            }
            else if(Math.floor(i % (measureLength)) ==  0){
              cName = "tick";
            }
            else{
              cName = "subTick";
            }

            var tick = {
              style : {
                left : this.timeScale(i)+"px",
                width: this.timeScale(this.barLength)+"px"
              },
              width : this.barLength,
              cName : cName,
              time : i
            }
            this.ticks.push(tick);
        }
    }
    addNote(time, duration){
      var notes = this.state.notes;
        notes.push({
        style : {
          width: this.timeScale(duration),
          left: this.timeScale(time)
        },
        time : time,
        duration: duration
        });
        this.setState({
          notes : notes
        });
    }
    removeNote(time){
      var notes = this.state.notes;
      var self = this;

      notes = _.reject(notes, function(item, index, list){
        return item.time == time;
      });
      this.setState({
        notes : notes
      });
      //this.forceUpdate();
    }
    render() {
        var self = this;
        $(this.refs.playhead).css("left", this.timeScale(this.props.elapsed));
        return(
            <div ref="timeline" className="timescale">
                <div className="playhead" ref="playhead" />
                {this.state.notes.map(function(result) {
                    var left = self.timeScale(result.time);
                    var width = self.timeScale(result.duration);
                    return <Note removeNote={self.removeNote} pitch={self.props.pitch} playing={self.props.playing} duration={result.duration} time={result.time} elapsed={self.props.elapsed} left={left} width={width} style={result.style} />;
                })}
                {this.ticks.map(function(result) {
                    return <Bar className={result.cName} time={result.time} addNote={self.addNote} width={result.width} duration={self.timeScale(self.barLength)} style={result.style} />;
                })}
            </div>
        );
    }
}

class Bar extends React.Component {
  constructor(props) {
    super();
    this.state = {
        drawing : false,
        length : props.width
    }
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDrag = this.mouseDrag.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
  }
  mouseDown(){
      this.setState({
          drawing : true
      });
  }
  mouseDrag(){
      if(this.state.drawing){
          console.log(this.state.length);
      }
  }
  mouseUp(){
      this.setState({
          drawing : false
      });
    this.props.addNote(this.props.time, this.state.length);
  }
  render(){
    return (
      <div className={this.props.className} style={this.props.style} onMouseDown={this.mouseDown} onMouseMove={this.mouseDrag} onMouseUp={this.mouseUp} />
    );
  }
}

class Note extends React.Component {
    constructor() {
        super();
        // this.saw = new Wad({
        //     source : 'sawtooth',
        // });
        this.saw = new Wad({source : 'square'});
        //this.saw = new Wad({source : 'samples/piano.wav'});
        this.state = {
            playing: false
        };
        this.checkForPlay = this.checkForPlay.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.listener = setInterval(this.checkForPlay, 10);
        this.ready = true;
    }
    checkForPlay(){
      if(this.ready){
        if((this.props.elapsed - this.props.time < 5 && this.props.elapsed - this.props.time > 0) && this.props.playing && !this.state.playing){
          this.play();
          this.setState({playing : true});
        }
        if(!this.props.playing){
          this.stop();
          this.setState({playing : false});
        }
        if(this.saw.gain.length < 1){
            this.setState({playing : false});
        }
      }
    }
    componentDidMount(){
      this.play();
      this.setState({playing : true});
    }
    componentWillUnmount() {
      console.log("ay");
      clearInterval(this.listener);
      this.ready = false;
    }
    handleClick(){
      clearInterval(this.listener);
      this.props.removeNote(this.props.time);
    }
    play(){
      this.saw.play({
          volume  : .8,
          wait    : 0,     // Time in seconds between calling play() and actually triggering the note.
          loop    : false, // This overrides the value for loop on the constructor, if it was set.
          pitch   : this.props.pitch,
          label   : 'A',   // A label that identifies this note.
          panning : [1, -1, 10],
          env : {
              attack : .05,
              decay : .1,
              sustain : .2,
              hold : this.props.duration/10,
              release : .3
          },
          filter : {
              type : 'lowpass',
              frequency : 1200,
              q : 8.5,
              env : {
                  attack : .2,
                  frequency : 600
              }
          }
      });
    }
    stop(){
      if(this.saw.gain.length > 0){
          this.saw.stop();
      }
    }
    render() {
      $(this.refs.self).css("left", this.props.left);
      $(this.refs.self).width(this.props.width);
        return (
            <div ref="self" style={this.props.style} className="note" onDoubleClick={this.handleClick}></div>
        );
    }
}
