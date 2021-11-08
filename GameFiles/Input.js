
class Input {

    static keyup=[false];
    static keydown=[false];
    static keypressed=[false];

    static setKeyUp(event) {
        var key=event.keyCode;
        Input.keyup[key]=true;
        Input.keydown[key]=false;
        Input.keypressed[key]=false;
    }

    static setKeyDown(event) {
        var key=event.keyCode;
        if (Input.keydown[key]==false) {
            Input.keypressed[key]=true;
        }
        else {
            Input.keypressed[key]=false;
        }
        Input.keydown[key]=true;
        Input.keyup[key]=false;
    }

    static getKeyDown(char) {
        if (char.length <= 1)
        {
            var key = char.charCodeAt(0);
        }
        else
        {
            key = Number(char);
        }
        return Input.keydown[key];
    }

    static getKeyPressed(char) {
        if (char.length <= 1)
        {
            var key = char.charCodeAt(0);
        }
        else
        {
            key = Number(char);
        }
        return Input.keypressed[key];
    }

    static getKeyReleased(char) {
        if (char.length <= 1)
        {
            var key = char.charCodeAt(0);
        }
        else
        {
            key = char*1;
        }
        return Input.keyUp[key];
    }

    static resetKeys() {

        for(var i=0;i<256;i+=1) {
            Input.keyup[i]=false;
            Input.keypressed[i]=false;
        }
    }

    static init() {
        document.addEventListener("keyup",Input.setKeyUp);
        document.addEventListener("keydown",Input.setKeyDown);
        this.resetKeys();
    }
}