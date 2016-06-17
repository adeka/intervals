class Pitch extends React.Component {
    constructor() {
        super();
        this.saw = new Wad({
            source : 'sawtooth',
        //     tuna   : {
        //        Overdrive : {
        //            outputGain: 0.5,         //0 to 1+
        //            drive: 0.7,              //0 to 1
        //            curveAmount: 1,          //0 to 1
        //            algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
        //            bypass: 0
        //        },
        //        Chorus : {
        //            intensity: 0.3,  //0 to 1
        //            rate: 4,         //0.001 to 8
        //            stereoPhase: 0,  //0 to 180
        //            bypass: 0
        //        }
        //    }
        });
        this.state = {
            active: false,
            playing: false,
            pitch: 440
        };
        this.handleClick = this.handleClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    componentDidMount() {
       $(document.body).on('keypress', this.onKeyDown);
       $(document.body).on('keyup', this.onKeyUp);
       //var ratio = this.props.ratio.split("/");
       //var logsum = Math.log(ratio[0] + ratio[1]);
       var f1 = 440;
       var f2 = this.state.pitch * eval(this.props.ratio);
       var a1 = 1;
       var a2 = 1;
       var fmin = Math.min(f1,f2);
       var fmax = Math.max(f1,f2);
       var amin = Math.min(a1,a2);
       var amax = Math.max(a1,a2);

       var x = amin * amax;
       var y = (2*amin) / (amin + amax);

       var b1 = 3.5;
       var b2 = 5.75;

       var s1 = 0.0207;
       var s2 = 18.96;

       var s = 0.24 / ((s1*fmin) + s2);
       var z = Math.pow(Math.E, -1 * b1 * s * (fmax - fmin)) - Math.pow(Math.E, -1 * b2 * s * (fmax - fmin));

       var r = Math.pow(x, 0.1) * 0.5 * Math.pow(y, 3.11) * z;
      // console.log(r);

       var domain = chroma.scale(['#FF9500', '008ae5']).domain([0,.09]);
       $(this.refs.self).css("background", domain(r));
    }
    componentWillUnmount() {
    }
    changePitch(value) {
         this.setState({
             pitch: value
         });
    }
    onKeyUp(e){
        this.setState({
            playing: false
        });
        if(this.saw.gain.length > 0){
            this.saw.stop();
        }
    }
    onKeyDown(e){
        if(this.state.active && !this.state.playing){
            this.setState({
                playing: true
            });

            this.saw.play({
                volume  : 1,
                wait    : 0,     // Time in seconds between calling play() and actually triggering the note.
                loop    : false, // This overrides the value for loop on the constructor, if it was set.
                pitch   : this.state.pitch * eval(this.props.ratio),  // A4 is 440 hertz.
                label   : 'A',   // A label that identifies this note.
                env     : {      // This is the ADSR envelope.
                    attack  : 0.2,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
                    decay   : 0.0,  // Time in seconds from peak volume to sustain volume.
                    sustain : 1.0,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
                    hold    : 9001.0, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
                    release : 0.3     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
                },
                panning : [1, -1, 10]
            });
        }
    }
    handleClick(e) {
        if(this.state.active){
            $(this.refs.self).css("border" , "6px solid rgba(0,0,0,0)");

            this.setState({active: false});
            if(this.saw.gain.length > 0){
                this.saw.stop();
            }
        } else {
            $(this.refs.self).css("border" , "6px solid rgba(255,255,255,.8)");

            this.setState({active: true});
        }
        console.log(this.props.ratio.length);
    }
    render() {
        return (
            <div ref="self" className="tone" onClick={this.handleClick} data-toggle="tooltip" data-placement="bottom" title={this.props.details}>
                <div ref="pitch" className="inner">{this.props.ratio}</div>
            </div>
        );
    }
}

var SoundApp = React.createClass({
    render: function() {
        var intervals = this.props.intervals;
        return (
            <div>
            {intervals.map(function(result) {
              var ratio = result["frequency ratio"];
              var details = result["some common names"];
              return <Pitch ratio={ratio} details={details} key={ratio.hashCode()}/>;
            })}
            </div>
        );
    }
});

setInterval(function() {
    ReactDOM.render(
        <SoundApp intervals={intervals}/>,
        document.getElementById('example')
    );
}, 500);

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
