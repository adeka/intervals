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
        var ms = (Math.floor(this.props.elapsed) % 10 + "0").substring(0,2);
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

class Toolbar extends React.Component {
    constructor() {
        super();
        this.state = {
            elapsed : 0,
            oldElapsed : 0,
            stopped : true,
            playing : false
        };
        this.tick = this.tick.bind(this);
        this.scrub = this.scrub.bind(this);
        this.playTimeline = this.playTimeline.bind(this);
        this.w = $(this.refs.panel).width();

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
            this.setState({oldElapsed : this.state.elapsed});
            //this.setState({elapsed: 0});
            this.setState({playing : false});
        }
    }
    tick() {
      var time = new Date().getTime() - this.start;
      if(this.state.stopped){
        var elapsed = Math.floor(time / 100) ;
      }
      else{
        var elapsed = this.state.oldElapsed + Math.floor(time / 100) ;
      }
      this.setState({elapsed: elapsed});
    }
    scrub(p){
      this.setState({elapsed: p});
      this.setState({oldElapsed: p});
    }
    render() {
      return (
           <div className="topToolbar">
               <div ref="panel" className="info">
                   <TimeDisplay elapsed={this.state.elapsed}/>
                   <div className="controls">
                        <PlayButton playTimeline={this.playTimeline} />
                   </div>
                </div>
                <Sequencer scrub={this.scrub} w={2000} playing={this.state.playing} elapsed={this.state.elapsed}/>
           </div>
      );
    }
}
