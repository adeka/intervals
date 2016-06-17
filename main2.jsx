class PitchShifter extends React.Component {
    constructor() {
        super();
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.changePitch = this.changePitch.bind(this);
        this.mouseClick = this.changePitch.bind(this);

    }
    mouseDown(e) {
        this.interval = setInterval(this.changePitch, 100);
    }
    changePitch(){
        this.props.changePitch(this.props.pitch + this.props.pitchShift);
    }
    mouseUp(e) {
        clearInterval(this.interval);
    }
    render(){
        var icon = this.props.pitchShift < 0 ? "fa fa-minus" : "fa fa-plus";
        return (
        <div ref="minus" className={icon} onClick={this.mouseClick} onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseLeave={this.mouseUp}></div>
        );
    }
}
{/* <PitchShifter pitchShift = {-1} pitch={this.state.pitch} changePitch={this.changePitch.bind(this)}/> */}
