//Dummy JSON responses
const data = [

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [2, 5, 2, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 5, 5, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [0, 3, 1, 4]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [5, 4, 1, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 2,
                "symbolIDs": [1, 1, 5, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [2, 2, 2, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [5, 5, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 3,
                "symbolIDs": [2, 2, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [4, 5, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 5, 5, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 9,
                "symbolIDs": [3, 3, 3, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [4, 4, 4, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 1,
                "symbolIDs": [0, 0, 3, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [1, 1, 1, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [2, 5, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [2, 2, 2, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [4, 3, 0, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [3, 3, 3, 0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [2, 2, 2, 2]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": [0, 1, 5, 4]
            }
        }
    },

]

// simple application configuration
let config  = {width: 1920, height: 1080}

function getRandomInt(a) {
    return Math.floor(Math.random() * a)
}

// wait for DOM before creating application
window.addEventListener('load', function() {
    //Create a Pixi Application
    var balance = 10000;
    var stake = 100;

    const app = new PIXI.Application(config);
    document.body.appendChild(app.view);
    console.log("hi!");
    // create a new Sprite from an image pat

    const sprite = PIXI.Sprite.from('symbol_00.png');
    
    // center the sprite's anchor point
    sprite.anchor.set(0.5);
    
    // move the sprite to the center of the screen
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;
    
    //app.stage.addChild(sprite);

    const balText = new PIXI.Text('Balance: '+balance, {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010,
        align: 'left',
    });

    const stakeText =  new PIXI.Text('Stake: '+stake, {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010,
        align: 'left',
    });

    const winText =  new PIXI.Text('', {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010,
        align: 'center',
    });
    winText.anchor.set(0.5);

    balText.x = app.screen.width / 10;
    balText.y = app.screen.height / 10 * 8;

    stakeText.x = app.screen.width / 10;
    stakeText.y = app.screen.height / 10 * 8 - 20;

    winText.x = app.screen.width / 2;
    winText.y = app.screen.height / 2 + 100;

    app.stage.addChild(balText);
    app.stage.addChild(stakeText);
    app.stage.addChild(winText);

    const stageHeight = app.screen.height;
    const stageWidth = app.screen.width;

    // Make sure stage covers the whole scene
    app.stage.hitArea = app.screen;

    // Make the slider
    const sliderWidth = 200;
    const slider = new PIXI.Graphics()
        .beginFill(0x272d37)
        .drawRect(0, 0, sliderWidth, 4);

    slider.x = (app.screen.width - sliderWidth) / 10;
    slider.y = app.screen.height * 0.75 + 100;

    // Draw the handle
    const handle = new PIXI.Graphics()
        .beginFill(0xffffff)
        .drawCircle(0, 0, 8);
    handle.y = slider.height / 2;
    handle.x = sliderWidth / 2;
    handle.interactive = true;
    handle.cursor = 'pointer';

    handle
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd);

    function onDragStart() {
        app.stage.interactive = true;
        app.stage.addEventListener('pointermove', onDrag);
    }

    function onDragEnd(e) {
        app.stage.interactive = false;
        app.stage.removeEventListener('pointermove', onDrag);        
    }
    
    function onDrag(e) {
        const halfHandleWidth = handle.width / 2;
        handle.x = Math.max(halfHandleWidth, Math.min(
            slider.toLocal(e.global).x,
            sliderWidth - halfHandleWidth,
        ));
        const t = 2 * ((handle.x / sliderWidth) -0.5);
        stake += Math.round(t);
        stakeText.text = 'Stake: '+stake;
    }

    app.stage.addChild(slider);
    slider.addChild(handle);

    const button = PIXI.Sprite.from('assets/button.png');
    button.anchor.set(0.5);
    button.x = app.screen.width / 2;
    button.y = app.screen.height / 2 + 50;
    button.interactive = true;
    button.buttonMode = true;

    button.on('pointerdown', (event) => { 
        console.log("button pressed!");
        balance = balance - stake;
        console.log(balance);
        balText.text = balance;
        
        let resultIndex = getRandomInt(20);
        let resultSymbols = data[resultIndex].response.results.symbolIDs;
        let resultWin = data[resultIndex].response.results.win; 
        
        balance = balance + resultWin;
        balText.text = 'Balance: '+balance;
        winText.text = resultWin;

        console.log(resultWin);
        console.log(resultSymbols);  
    });
    app.stage.addChild(button);
})