class Pitch extends React.Component {
    constructor() {
        super();
        this.saw = new Wad({
            source : 'sawtooth',
        });
        // this.state = {
        // };
        this.handleClick = this.handleClick.bind(this);
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
    handleClick(e) {

    }
    render() {
        return (
            <div></div>
        );
    }
}

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

class Timeline extends React.Component {
    constructor() {
        super();
        this.state = {
            start : 0,
            end: 300
        };
    }
    render() {
        var w = $(this.refs.timeline).width();
        var bpm = 120;
        var meter = {top: 4, bottom: 4};
        var measureLength = (meter.top / (bpm / 60))*10;
        var timeScale = d3.scale.linear().domain([0, this.state.end]).range([0, w]);
        // var tickScale = d3.scale.linear().domain([0, tickCount]).range([0, w]);
        $(this.refs.playhead).css("left", timeScale(this.props.elapsed));

        var ticks = [];
        var barBuilder = 0;
        for(var i = 0; i< this.state.end; i+= measureLength){
            var h = 20;
            //
            // if(i % 4 == 0){
            //     h = 20;
            // }
            // else{
            //     h = 10;
            // }
            var tick = {
                left : timeScale(barBuilder)+"px",
                height: h,
                width: timeScale(measureLength)+"px"
            }
            ticks.push(tick);
            barBuilder += measureLength;
        }
        return(
            <div ref="timeline" className="timeline">
                <div className="scrubber">
                    <div ref="playhead" className="playhead fa fa-caret-down" />
                </div>
                <div className="timescale">
                {ticks.map(function(result) {
                  //var left = result["left"];
                    return <Bar subs={4} duration={timeScale(measureLength)} style={result} key={(result.left+'').hashCode()}/>;

                  //return <Pitch ratio={ratio} details={details} key={ratio.hashCode()}/>;
                })}
                </div>
            </div>
        );
    }
}

class Bar extends React.Component {
  constructor() {
    super();
  }
  render(){
    //this is fucking retarded haha
    var subs = [];
    for(var i = 0; i < this.props.subs; i++){
      subs.push({
        left : ((this.props.duration / this.props.subs) * i )+"px"
      });
    }
    //this is some fuckin php shit
    return (
      <div className="tick" style={this.props.style}>
      {subs.map(function(result) {
        return <div className="subTick" style={result}/>;
      })}
      </div>
    );
  }
}

class Toolbar extends React.Component {
    constructor() {
        super();
        this.state = {
            elapsed : 0,
            stopped : true
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
        }
        else{
            clearInterval(this.interval);
            this.setState({elapsed: 0});
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
      return (
           <div className="topToolbar">
               <div className="info">
                   <TimeDisplay elapsed={this.state.elapsed}/>
                   <div className="controls">
                        <PlayButton playTimeline={this.playTimeline} />
                   </div>
                </div>
               <Timeline elapsed={this.state.elapsed}/>
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
