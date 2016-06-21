

class xxx extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {

    }
}

class PlayButton extends React.Component {
    constructor() {
        super();
        this.state = {
            playing : false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({playing : !this.state.playing});
        this.props.playTimeline(this.state.playing);
    }

    render() {
        var icon = this.state.playing ? "fa fa-pause" : "fa fa-play";
        return(
            <div className={"playButton " + icon} onClick={this.handleClick} />
        );
    }
}

class TimeDisplay extends React.Component {
    constructor() {
        super();
    }
    render() {
        var ms = this.props.elapsed % 10 + "0";
        var s = Math.floor(this.props.elapsed / 10) % 60;
        if(s < 10){
            s = "0" + s;
        }
        var m = Math.floor(this.props.elapsed / 10 / 60);
        if(m < 10){
            m = "0" + m;
        }
        return(
            <div className="time">
                 {m + " : " + s + " : " + ms}
                 <div className="tinyTime">
                    {this.props.elapsed}
                 </div>
            </div>
        );
    }
}

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
        this.scale = [
          261.63,
          293.66,
          329.63,
          349.23,
          392,
          440,
          493.88
        ]
        var self = this;
        return(
            <div className="timelineContainer">
                <div className="timeline">
                    <div className="scrubber">
                        <div ref="playhead" className="playhead fa fa-caret-down" />
                    </div>
                    {this.scale.map(function(result) {
                        return <Notelane pitch={result} w={self.props.w} playing={self.props.playing} elapsed={self.props.elapsed}/>;
                    })}

                </div>
            </div>
        );
    }
}

class Notelane extends React.Component {
    constructor() {
        super();
        this.state = {
            start : 0,
            end: 300
        };
        this.notes = [];
        this.addNote = this.addNote.bind(this);

    }
    addNote(time, duration){
      this.notes.push({
        style : {
          width: this.timeScale(duration),
          left: this.timeScale(time)
        },
        time : time,
        duration: duration
      })
    }
    render() {

        this.timeScale = d3.scale.linear().domain([0, this.state.end]).range([0, this.props.w]);

        var subs = 4;
        var bpm = 120;
        var meter = {top: 4, bottom: 4};
        var measureLength = (meter.top / (bpm / 60))*10;
        var barLength = (meter.top / (bpm / 60))*10 / subs;
        var ticks = [];
        var barBuilder = 0;
        for(var i = 0; i< this.state.end; i+= barLength){
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
                width: this.timeScale(barLength)+"px"
              },
              width : barLength,
              cName : cName,
              time : i
            }
            ticks.push(tick);
        }
        var self = this;
        return(
            <div ref="timeline" className="timescale">
                {this.notes.map(function(result) {
                    var left = self.timeScale(result.time);
                    var width = self.timeScale(result.duration);
                    return <Note pitch={self.props.pitch} playing={self.props.playing} duration={result.duration} time={result.time} elapsed={self.props.elapsed} left={left} width={width} style={result.style} />;
                })}
                {ticks.map(function(result) {
                    return <Bar className={result.cName} time={result.time} addNote={self.addNote} width={result.width} duration={self.timeScale(barLength)} style={result.style} key={(result.style.left+'').hashCode()}/>;
                })}
            </div>
        );
    }
}

class Note extends React.Component {
    constructor() {
        super();
        this.saw = new Wad({
            source : 'sawtooth',
        });
        // this.state = {
        // };
    }
    play(){
      this.saw.play({
          volume  : .8,
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
      if(this.props.elapsed == this.props.time && this.props.playing){
        this.play();
      }
      if(!this.props.playing){
        this.stop();
      }
    //  console.log(elapsed + " " + this.prop.);
      $(this.refs.self).css("left", this.props.left);
      $(this.refs.self).width(this.props.width);
        return (
            <div ref="self" style={this.props.style} className="note"></div>
        );
    }
}

class Bar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.addNote(this.props.time, this.props.width);
  }
  render(){
    return (
      <div className={this.props.className} style={this.props.style} onClick={this.handleClick} />
    );
  }
}

class Toolbar extends React.Component {
    constructor() {
        super();
        this.state = {
            elapsed : 0,
            stopped : true,
            playing : false
        };
        this.tick = this.tick.bind(this);
        this.playTimeline = this.playTimeline.bind(this);
    }
    componentDidMount() {
    }
    playTimeline(playing) {
        //console.log("playing: " + playing);
        if(!playing){
                this.start = new Date().getTime();
                this.interval = setInterval(this.tick, 100);
                this.setState({stopped : false});
                this.setState({playing : true});
        }
        else{
            clearInterval(this.interval);
            this.setState({elapsed: 0});
            this.setState({playing : false});

        }
    }
    componentWillUnmount() {
    }
    tick() {
      var time = new Date().getTime() - this.start;
      var elapsed = Math.floor(time / 100) ;
      this.setState({elapsed: elapsed});
    }
    render() {
      var w = $(this.refs.panel).width();
      return (
           <div className="topToolbar">
               <div ref="panel" className="info">
                   <TimeDisplay elapsed={this.state.elapsed}/>
                   <div className="controls">
                        <PlayButton playTimeline={this.playTimeline} />
                   </div>
                </div>
                <Sequencer w={w} playing={this.state.playing} elapsed={this.state.elapsed}/>
           </div>
      );
    }
}

class SoundApp extends React.Component {
    constructor() {
        super();
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    componentDidMount() {
       $(document.body).on('keypress', this.onKeyDown);
       $(document.body).on('keyup', this.onKeyUp);
    }
    componentWillUnmount() {
    }

    onKeyUp(e){

    }
    onKeyDown(e){

    }

    render() {
      return (
          <div>
            <Toolbar />
          </div>
      );
    }
}
setInterval(function() {
    ReactDOM.render(
        <SoundApp />,
        document.getElementById('example')
    );
}, 500);
