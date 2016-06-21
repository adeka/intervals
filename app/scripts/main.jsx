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
class xxx extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
    }
}
