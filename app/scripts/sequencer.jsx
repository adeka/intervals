class Sequencer extends React.Component {
    constructor() {
        super();
        this.state = {
            start : 0,
            end: 300
        };
    }
    render() {
        this.timeScale = d3.scale.linear().domain([0, this.state.end]).range([0, this.props.w]);
        $(this.refs.playhead).css("left", this.timeScale(this.props.elapsed));

        return(
            <div className="timelineContainer">
                <div className="timeline">
                    <div className="scrubberPad" />
                    <div className="scrubber">
                        <div ref="playhead" className="playhead fa fa-caret-down" />
                    </div>
                    <Track w={this.props.w} playing={this.props.playing} elapsed={this.props.elapsed} />
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
    this.scale = [];
    for(var i=0; i<25; i++){
        this.scale.push(fundamental);
        fundamental = fundamental * Math.pow(2, 1/23);
    }
    this.scale.reverse();
  }

  render(){
    var self = this;
    return (
        <div className="track">
        <div className="info" />
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
            end: 300
        };
        this.notes = [];
        this.addNote = this.addNote.bind(this);
        this.timeScale = d3.scale.linear().domain([0, this.state.end]).range([0, props.w]);

        var subs = 2;
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
      this.notes.push({
        style : {
          width: this.timeScale(duration),
          left: this.timeScale(time)
        },
        time : time,
        duration: duration
        });
        this.forceUpdate();
    }
    render() {
        var self = this;
        $(this.refs.playhead).css("left", this.timeScale(this.props.elapsed));
        return(
            <div ref="timeline" className="timescale">
                <div className="playhead" ref="playhead" />
                {this.notes.map(function(result) {
                    var left = self.timeScale(result.time);
                    var width = self.timeScale(result.duration);
                    return <Note pitch={self.props.pitch} playing={self.props.playing} duration={result.duration} time={result.time} elapsed={self.props.elapsed} left={left} width={width} style={result.style} />;
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
        this.saw = new Wad({
            source : 'sawtooth',
        });
        this.state = {
            playing: false
        };
        this.checkForPlay = this.checkForPlay.bind(this);
        setInterval(this.checkForPlay, 10);
    }
    checkForPlay(){
        if(this.props.elapsed >= this.props.time && this.props.playing && !this.state.playing){
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
    play(){
      this.saw.play({
          volume  : .7,
          wait    : 0,     // Time in seconds between calling play() and actually triggering the note.
          loop    : false, // This overrides the value for loop on the constructor, if it was set.
          pitch   : this.props.pitch,
          label   : 'A',   // A label that identifies this note.
          env     : {      // This is the ADSR envelope.
              attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
              decay   : 0.0,  // Time in seconds from peak volume to sustain volume.
              sustain : 1.0,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
              hold    : this.props.duration / 10, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
              release : .1     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
          },
          panning : [1, -1, 10]
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
            <div ref="self" style={this.props.style} className="note"></div>
        );
    }
}
