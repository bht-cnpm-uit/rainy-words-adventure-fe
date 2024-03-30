const states = {
    STOP: 0,
    GORIGHT: 1,
    GOLEFT: 2,
}

class state {
    constructor(state) {
        this.state = state;
    }
    handleInput(input) {
        if (input.includes('ArrowLeft')) {
            this.player.setState(states.GOLEFT);
        }
        else if (input.includes('ArrowRight')) {
            this.player.setState(states.GORIGHT);
        }
        else {
            this.player.setState(states.STOP);
        }
    }
}

export class STOP extends state {
    constructor(player) {
        super('STOP');
        this.player = player;
    }
    enter() {
        this.player.frameY = 1;
    }
    handleInput(input) {
        super.handleInput(input);
    }
}

export class GORIGHT extends state {
    constructor(player) {
        super('GORIGHT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
    }
    handleInput(input) {
        super.handleInput(input);
    }
}

export class GOLEFT extends state {
    constructor(player) {
        super('GOLEFT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
    }
    handleInput(input) {
        super.handleInput(input);
    }
}