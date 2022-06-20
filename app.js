const R = 4;
const C = 4;

const logger = arr => {
    let arrStr = '';
    for(const row of arr) {
        arrStr += '|    ';
        for(let col of row) {
            if(col === false) col = ' ';
            arrStr += col + '   |   ';
        }
        arrStr += '\n' ;
    }
    return arrStr;
};

const createGameStateArray = () => {
	let gameStateArray = new Array(R);
	for(let i = 0; i < R; i++) {
		gameStateArray[i] = new Array(C);
	}
	
	for (let i = 0; i < gameStateArray.length; i++) {
		for(let j = 0; j < gameStateArray[0].length; j++) {
			gameStateArray[i][j] = false;
		}
	}
	return gameStateArray;
};

const gameStateArray = createGameStateArray();


let existLocation = [];

for(let i = 0; i < gameStateArray.length; i++) {
    for(let j = 0; j < gameStateArray.length; j++) {
        existLocation.push([i, j]);
    }
}

const randomIndexUpToNumber = (num) => {
    return Math.floor(Math.random() * num);
};

// in tabe ra bad az inke gridbandi html css kardi toye js akharesh run kon
const initFillArr = () => {
    for(let i = 0; i < 7; i++) {
        let rndIndex = randomIndexUpToNumber(existLocation.length - 1);
        let rowGameArray = existLocation[rndIndex][0];
        let colGameArray = existLocation[rndIndex][1];
        existLocation.splice(rndIndex, 1);
        gameStateArray[rowGameArray][colGameArray] = 2;
    }
    console.log('initial existLocation', existLocation);
};


const insertionNewElement = () => {
    let rndIndex = randomIndexUpToNumber(existLocation.length - 1);
    let rowLocation = existLocation[rndIndex][0];
    let colLocation = existLocation[rndIndex][1];
    existLocation.splice(rndIndex, 1);
    gameStateArray[rowLocation][colLocation] = 2;
    console.log(existLocation);
    // console.log(logger(gameStateArray));
};

const updateRowKeyExistLoc = (rowIdx, colIdx, fFIdx) => {
    let changedExistLocation = existLocation.map(elm => {
        if(elm[0] === rowIdx && elm[1] === fFIdx) {
            return [rowIdx, colIdx];
        } else {
            return elm;
        }
    });
    existLocation = changedExistLocation;
};

const updateColKeyExistLoc = (i, j, fFIdx) => {
    let changedExistLocation = existLocation.map(elm => {
        if(elm[0] === fFIdx && elm[1] === j) {
            return [i, j];
        } else {
            return elm;
        }
    });
    existLocation = changedExistLocation;
};


const collectNumberLeftDir = () => {

    for(let i = 0; i < gameStateArray.length; i++) {
        for (let j = 0; j < gameStateArray.length; j++) {

            if(gameStateArray[i][j] === false) {
                const existIdx = existLocation.findIndex(elm => elm[0] === i && elm[1] === j);
                if (existIdx === -1) {
                    existLocation.push([i, j]);
                }
            }
            
            if(gameStateArray[i][j] === gameStateArray[i][j+1] && gameStateArray[i][j] !== false) {
                gameStateArray[i][j] += gameStateArray[i][j+1];
                gameStateArray[i].splice(j+1, 1);
                gameStateArray[i].push(false);
            }

        }
    }
    // console.log(existLocation);
};

const leftKeyHandler = () => {

    for(let i = 0; i < gameStateArray.length; i++) {
        let fFIdx;
        for(let j = 0; j < gameStateArray.length; j++) {
            if(gameStateArray[i][j] === false) {
                fFIdx = j;
                break;
            }
        }

        for(let j = fFIdx; j < gameStateArray.length; j++) {

            if(gameStateArray[i][j] !== false) {
                gameStateArray[i][fFIdx] = gameStateArray[i][j];
                gameStateArray[i][j] = false;
                // update existLocation
                updateRowKeyExistLoc(i, j, fFIdx);
                fFIdx += 1;
            }
        }
    }

    collectNumberLeftDir();
    insertionNewElement();

    // console.log(existLocation);
    console.log(logger(gameStateArray));
};

const collectNumberRightDir = () => {
    for(let i = 0; i < gameStateArray.length; i++) {
        for (let j = gameStateArray.length - 1; j >= 0; j--) {
            if(gameStateArray[i][j] === false) {
                const existIdx = existLocation.findIndex(elm => elm[0] === i && elm[1] === j);
                if (existIdx === -1) {
                    existLocation.push([i, j]);
                }
            }
            
            if(gameStateArray[i][j] === gameStateArray[i][j-1] && gameStateArray[i][j] !== false) {
                gameStateArray[i][j] += gameStateArray[i][j-1];
                gameStateArray[i].splice(j-1, 1);
                gameStateArray[i].unshift(false);
            }
        }
    }
    // console.log(existLocation);
};

const rightKeyHandler = () => {

    for(let i = 0; i < gameStateArray.length; i++) {

        let fFIdx;
        for(let j = gameStateArray.length - 1; j >= 0; j--) {
            if(gameStateArray[i][j] === false) {
                fFIdx = j;
                break;
            }
        }
        for(let j = fFIdx; j >= 0 ; j--) {
            
            if(gameStateArray[i][j] !== false) {
                gameStateArray[i][fFIdx] = gameStateArray[i][j];
                gameStateArray[i][j] = false;
                // update existLocation
                updateRowKeyExistLoc(i, j, fFIdx);
                fFIdx -= 1;
            }
        }
    }

    collectNumberRightDir();
    insertionNewElement();

    // console.log(existLocation);
    console.log(logger(gameStateArray));
};

const collectNumberToptDir = () => {
    for(let j = 0; j < gameStateArray.length; j++) {
        for(let i = 0; i < gameStateArray.length; i++) {
            
            if(gameStateArray[i][j] === false) {
                const existIdx = existLocation.findIndex(elm => elm[0] === i && elm[1] === j);
                if (existIdx === -1) {
                    existLocation.push([i, j]);
                }
                continue;
            }

            if(gameStateArray[i][j] !== false && i + 1 < gameStateArray.length && gameStateArray[i][j] === gameStateArray[i+1][j]) {
                gameStateArray[i][j] += gameStateArray[i+1][j];
                let count = i + 1;
                while(count < gameStateArray.length - 1) {
                    gameStateArray[count][j] = gameStateArray[count + 1][j];
                    count++;
                }
                gameStateArray[count][j] = false;
            }
    
        }
    }

    // console.log(existLocation);
};

const topKeyHandler = () => {
    for(let j = 0; j < gameStateArray.length; j++) {

        let fFIdx = null;
        for(let i = 0; i < gameStateArray.length ; i++) {

            if(gameStateArray[i][j] === false) {
                if(fFIdx !== null) continue;
                fFIdx = i;
            }

            if(gameStateArray[i][j] !== false && fFIdx !== null) {
                gameStateArray[fFIdx][j] = gameStateArray[i][j];
                gameStateArray[i][j] = false;
                // update existLocation
                updateColKeyExistLoc(i, j, fFIdx);
                fFIdx += 1;
            }
        }

        // let fFIdx;
        // for(let i = 0; i < gameStateArray.length; i++) {
        //     if(gameStateArray[i][j] === false) {
        //         fFIdx = i;
        //     }
        //     break;
        // }

        // if(!!fFIdx) {
        //     for(let i = fFIdx; i < gameStateArray.length ; i++) {
        //         if(gameStateArray[i][j] !== false) {
        //             gameStateArray[fFIdx][j] = gameStateArray[i][j];
        //             gameStateArray[i][j] = false;
        //             // update existLocation
        //             updateColKeyExistLoc(i, j, fFIdx);
        //             fFIdx += 1;
        //         }
        //     }
        // }
    }

    collectNumberToptDir();
    insertionNewElement();

    // console.log(existLocation);
    console.log(logger(gameStateArray));

};

const collectNumberbottomDir = () => {

    for(let j = 0; j < gameStateArray.length; j++) {
        for(let i = gameStateArray.length - 1; i >= 0; i--) {

            if(gameStateArray[i][j] === false) {
                const existIdx = existLocation.findIndex(elm => elm[0] === i && elm[1] === j);
                if (existIdx === -1) {
                    existLocation.push([i, j]);
                }
            }

            if(gameStateArray[i][j] !== false && i - 1 > 0 && gameStateArray[i][j] === gameStateArray[i-1][j]) {
                gameStateArray[i][j] += gameStateArray[i-1][j];
                let count = i - 1;
                while(count > 0) {
                    gameStateArray[count][j] = gameStateArray[count - 1][j];
                    count--;
                }
                gameStateArray[count][j] = false;
            }

        }
    }
    
    // console.log(existLocation);
};

const bottomKeyHandler = () => {

    for(let j = 0; j < gameStateArray.length; j++) {

        let fFIdx = null;
        for(let i = gameStateArray.length - 1; i >= 0 ; i--) {
            if(gameStateArray[i][j] === false) {
                if(fFIdx !== null) continue;
                fFIdx = i;
            }
                
            if(gameStateArray[i][j] !== false && fFIdx !== null) {
                gameStateArray[fFIdx][j] = gameStateArray[i][j];
                gameStateArray[i][j] = false;
                // update existLocation
                updateColKeyExistLoc(i, j, fFIdx);
                fFIdx -= 1;
            }
        }


        // let fFIdx;
        // for (let i = gameStateArray.length - 1; i >= 0 ; i--) {
        //     if(gameStateArray[i][j] === false) {
        //         fFIdx = i;
        //         break;
        //     }
        // }

        // if(!!fFIdx) {
        //     for(let i = fFIdx; i >= 0 ; i--) {
                
        //         if(gameStateArray[i][j] !== false) {
        //             gameStateArray[fFIdx][j] = gameStateArray[i][j];
        //             gameStateArray[i][j] = false;
        //             // update existLocation
        //             updateColKeyExistLoc(i, j, fFIdx);
        //             fFIdx -= 1;
        //         }
        //     }
        // }
    }

    collectNumberbottomDir();
    insertionNewElement();

    console.log(logger(gameStateArray));
    // console.log(existLocation);

};

const checkKey = event => {
    switch (event.keyCode) {
        case 37:
            leftKeyHandler();
            break;
        case 38:
            topKeyHandler();
            break;
        case 39:
            rightKeyHandler();
            break;
        case 40:
            bottomKeyHandler();
            break;
        default:
            break;
    }
    console.log(event.keyCode);
}

document.addEventListener('keydown', checkKey);

initFillArr();

console.log(logger(gameStateArray));
