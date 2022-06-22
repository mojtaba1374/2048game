// you can change number of Rows in R constant variable
const R = 4;
const C = R;

let score = 0;

const scoreElm = document.getElementById('score-box');
const replayBox = document.querySelector('.retry-game');

const replayGame = () => {
    location.reload();
}

replayBox.addEventListener('click', replayGame);

const updateScore = (score) => {
    scoreElm.innerHTML = score;
};

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

// this function should have render after initialize element

const setGridTemplateValue = (R) => {
    let gridTempVal = '';
    for(let i = 0; i < R; i++) {
        gridTempVal += ' auto ';
    }
    return gridTempVal;
}
const createGameGrid = () => {
    const gameBoard = document.getElementById('gameBoard');
    let gridTemplateValue;
    const elmWidth = 60;
    const gapBetweenElms = 5;
    let gameBoardWidth = (R * elmWidth + (R - 1) * gapBetweenElms) + 'px';

    gridTemplateValue = setGridTemplateValue(R);

    gameBoard.style['width'] = gameBoardWidth;
    gameBoard.style['gridTemplateColumns'] = gridTemplateValue;

    for(let i = 0; i < R; i++) {
        for(let j = 0; j < C; j++) {
            let box = document.createElement('div');
            box.id = `box-${i}-${j}`;
            gameBoard.append(box);
        }
    }

    initFillArr();
    
};

const insertionElmToUi = (i, j, val) => {
    const box = document.getElementById(`box-${i}-${j}`);
    const fillerBox = document.createElement('div');

    fillerBox.innerText = val;
    fillerBox.classList.add('filler-box', 'insertion-animate');
    fillerBox.style['background-color'] = pickColor(val);
    box.append(fillerBox);
};

// const updateBoxValueInUi = (i, j, val) => {
//     const box = document.getElementById(`box-${i}-${j}`);
//     const fillerBox = document.createElement('div');

//     fillerBox.innerHTML = val;
//     fillerBox.classList.add('filler-box');
//     box.append(fillerBox);
// };

let existLocation = [];

for(let i = 0; i < gameStateArray.length; i++) {
    for(let j = 0; j < gameStateArray.length; j++) {
        existLocation.push([i, j]);
    }
}

const randomIndexUpToNumber = (num) => {
    return Math.floor(Math.random() * num);
};

const insertionNewElement = () => {
    if(existLocation.length === 0) {
        return;
    }
    let rndIndex = randomIndexUpToNumber(existLocation.length - 1);
    let rowLocation = existLocation[rndIndex][0];
    let colLocation = existLocation[rndIndex][1];
    existLocation.splice(rndIndex, 1);
    gameStateArray[rowLocation][colLocation] = 2;
    insertionElmToUi(rowLocation, colLocation, 2);
    console.log(existLocation);
    // console.log(logger(gameStateArray));
};

// in tabe ra bad az inke gridbandi html css kardi toye js akharesh run kon
const initFillArr = () => {
    for(let i = 0; i < 2; i++) {
        let rndIndex = randomIndexUpToNumber(existLocation.length - 1);
        let rowGameArray = existLocation[rndIndex][0];
        let colGameArray = existLocation[rndIndex][1];
        existLocation.splice(rndIndex, 1);
        gameStateArray[rowGameArray][colGameArray] = 2;
        insertionElmToUi(rowGameArray, colGameArray, 2);
    }
    console.log('initial existLocation', existLocation);
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

// const animateForCollect = (fIdx, sIdx, side) => {
//     const firstBox = document.getElementById(`box-${fIdx[0]}-${fIdx[1]}`);

//     const secondBox = document.getElementById(`box-${sIdx[0]}-${sIdx[1]}`);
//     const fillerDiv = secondBox.querySelector('div');

//     fillerDiv.classList.remove('insertion-animate');
//     fillerDiv.innerText = gameStateArray[fIdx[0]][fIdx[1]];
    
//     firstBox.innerHTML = '';
//     firstBox.append(fillerDiv);

//     secondBox.innerHTML = '';
// };

// const animateForMove = (fIdx, sIdx, side) => {

//     const firstBox = document.getElementById(`box-${fIdx[0]}-${fIdx[1]}`);

//     const secondBox = document.getElementById(`box-${sIdx[0]}-${sIdx[1]}`);
//     const fillerDiv = secondBox.querySelector('div');

//     // let numberBoxMoved = sIdx[1] - fIdx[1];
//     // console.log('number', numberBoxMoved);

//     fillerDiv.classList.remove('insertion-animate');

//     firstBox.append(fillerDiv);

//     secondBox.innerHTML = '';
// };

const pickColor = (elm) => {
    let color;
    switch (elm) {
        case 2:
            color = '#fbf2f2';
            break;
        case 4:
            color = '#f6e6af';
            break;
        case 8:
            color = '#fac986';
            break;
        case 16:
            color = '#fb974b';
            break;
        case 32:
            color = '#f85d5d';
            break;
        case 64:
            color = '#ff6532';
            break;
        case 128:
            color = '#fbf359';
            break;
        case 256:
            color = '#f3e81d';
            break;
        case 512:
            color = '#036458';
            break;
        case 1024:
            color = '#49A86E';
            break;
        case 2048:
            color = '#5eeb71';
            break;
        case 4096:
            color = '#DAD806';
            break;
        case 8192:
            color = '#1E325B';
            break;
        default:
            color = 'orange';
            break;
    }
    return color;
}

const fillUiGrid = () => {
    let i = 0;
    gameStateArray.forEach(row => {
        let j = 0;
        row.forEach(elm => {
            let box = document.getElementById( `box-${i}-${j}`);
            if(box.innerHTML !== '') {
                box.innerHTML = '';
            }
            if(elm !== false) {
                box.innerHTML = `
                    <div class="filler-box">
                        ${elm}
                    </div>
                `;
                box.querySelector('div').style['background-color'] = pickColor(elm);
            }
            j++;
        })
        i++;
    })
};

const collectNumberLeftDir = (haveInsertedElm) => {

    let shouldInsertNewElm = false;

    for(let i = 0; i < gameStateArray.length; i++) {
        for (let j = 0; j < gameStateArray.length; j++) {

            if(gameStateArray[i][j] === false) {
                const existIdx = existLocation.findIndex(elm => elm[0] === i && elm[1] === j);
                if (existIdx === -1) {
                    existLocation.push([i, j]);
                }
            }
            
            if(gameStateArray[i][j] === gameStateArray[i][j+1] && j + 1 < gameStateArray.length && gameStateArray[i][j] !== false) {
                gameStateArray[i][j] += gameStateArray[i][j+1];
                shouldInsertNewElm = true;
                score += gameStateArray[i][j];
                console.log(score);
                gameStateArray[i].splice(j+1, 1);
                gameStateArray[i].push(false);
            }

        }
    }


    fillUiGrid();
    if(shouldInsertNewElm && !haveInsertedElm) {
        insertionNewElement();
    }
    // shouldInsertNewElm && insertionNewElement();
    updateScore(score);
    // console.log(existLocation);
};

const leftKeyHandler = () => {

    let shouldInsertNewElm = false;

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
                shouldInsertNewElm = true;
                gameStateArray[i][fFIdx] = gameStateArray[i][j];
                // animateForMove([i,fFIdx], [i, j], 'left');
                gameStateArray[i][j] = false;
                // update existLocation
                updateRowKeyExistLoc(i, j, fFIdx);
                fFIdx += 1;
            }
        }
    }

    collectNumberLeftDir(shouldInsertNewElm);
    shouldInsertNewElm && insertionNewElement();

    // console.log(existLocation);
    console.log(logger(gameStateArray));
};

const collectNumberRightDir = (haveInsertedElm) => {

    let shouldInsertNewElm = false;

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
                shouldInsertNewElm = true;
                score += gameStateArray[i][j];
                console.log(score);
                gameStateArray[i].splice(j-1, 1);
                gameStateArray[i].unshift(false);
            }
        }
    }
    fillUiGrid();
    if(shouldInsertNewElm && !haveInsertedElm) {
        insertionNewElement();
    }
    updateScore(score);
    // console.log(existLocation);
};

const rightKeyHandler = () => {

    let shouldInsertNewElm = false;

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
                shouldInsertNewElm = true;
                gameStateArray[i][fFIdx] = gameStateArray[i][j];
                gameStateArray[i][j] = false;
                // update existLocation
                updateRowKeyExistLoc(i, j, fFIdx);
                fFIdx -= 1;
            }
        }
    }

    collectNumberRightDir(shouldInsertNewElm);
    shouldInsertNewElm && insertionNewElement();

    // console.log(existLocation);
    console.log(logger(gameStateArray));
};

const collectNumberToptDir = (haveInsertedElm) => {

    let shouldInsertNewElm = false;

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
                shouldInsertNewElm = true;
                score += gameStateArray[i][j];
                console.log(score);
                let count = i + 1;
                while(count < gameStateArray.length - 1) {
                    gameStateArray[count][j] = gameStateArray[count + 1][j];
                    count++;
                }
                gameStateArray[count][j] = false;
            }
    
        }
    }
    fillUiGrid();
    if(shouldInsertNewElm && !haveInsertedElm) {
        insertionNewElement();
    }
    updateScore(score);

    // console.log(existLocation);
};

const topKeyHandler = () => {

    let shouldInsertNewElm = false;

    for(let j = 0; j < gameStateArray.length; j++) {


        let fFIdx = null;
        for(let i = 0; i < gameStateArray.length ; i++) {

            if(gameStateArray[i][j] === false) {
                if(fFIdx !== null) continue;
                fFIdx = i;
            }

            if(gameStateArray[i][j] !== false && fFIdx !== null) {
                shouldInsertNewElm = true;
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

    collectNumberToptDir(shouldInsertNewElm);
    shouldInsertNewElm && insertionNewElement();

    // console.log(existLocation);
    console.log(logger(gameStateArray));

};

const collectNumberbottomDir = (haveInsertedElm) => {

    let shouldInsertNewElm = false;

    for(let j = 0; j < gameStateArray.length; j++) {
        for(let i = gameStateArray.length - 1; i >= 0; i--) {

            if(gameStateArray[i][j] === false) {
                const existIdx = existLocation.findIndex(elm => elm[0] === i && elm[1] === j);
                if (existIdx === -1) {
                    existLocation.push([i, j]);
                }
            }

            if(gameStateArray[i][j] !== false && i - 1 >= 0 && gameStateArray[i][j] === gameStateArray[i-1][j]) {
                gameStateArray[i][j] += gameStateArray[i-1][j];
                shouldInsertNewElm = true;
                score += gameStateArray[i][j];
                console.log(score);
                let count = i - 1;
                while(count > 0) {
                    gameStateArray[count][j] = gameStateArray[count - 1][j];
                    count--;
                }
                gameStateArray[count][j] = false;
            }

        }
    }

    fillUiGrid();
    if(shouldInsertNewElm && !haveInsertedElm) {
        insertionNewElement();
    }
    updateScore(score);
    // console.log(existLocation);
};

const bottomKeyHandler = () => {

    let shouldInsertNewElm = false;

    for(let j = 0; j < gameStateArray.length; j++) {

        let fFIdx = null;
        for(let i = gameStateArray.length - 1; i >= 0 ; i--) {
            if(gameStateArray[i][j] === false) {
                if(fFIdx !== null) continue;
                fFIdx = i;
            }
                
            if(gameStateArray[i][j] !== false && fFIdx !== null) {
                shouldInsertNewElm = true;
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

    collectNumberbottomDir(shouldInsertNewElm);
    shouldInsertNewElm && insertionNewElement();

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

createGameGrid();

console.log(logger(gameStateArray));
