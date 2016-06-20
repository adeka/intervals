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
        var m = Math.floor(this.props.elapsed / 10 /60);
        if(m < 10){
            m = "0" + m;
        }
        return(
            <div className="time">
                 {m + " : " + s + " : " + ms}
            </div>
        );
    }
}

class Timeline extends React.Component {
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
               <div className="timeline">

               </div>
           </div>
      );
    }
}

class SoundApp extends React.Component {
    constructor() {
        super();
        // this.state = {
        // };

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
            <Timeline />
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
