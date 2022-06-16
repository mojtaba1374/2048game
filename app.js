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
    for(let i = 0; i < 2; i++) {
        let rndIndex = randomIndexUpToNumber(existLocation.length - 1);
        let rowGameArray = existLocation[rndIndex][0];
        let colGameArray = existLocation[rndIndex][1];
        existLocation.splice(rndIndex, 1);
        gameStateArray[rowGameArray][colGameArray] = 2;
    }
    console.log(existLocation);
};


const insertionNewElement = () => {
    let rndIndex = randomIndexUpToNumber(existLocation.length - 1);
    let rowGameArray = existLocation[rndIndex][0];
    let colGameArray = existLocation[rndIndex][1];
    existLocation.splice(rndIndex, 1);
    gameStateArray[rowGameArray][colGameArray] = 2;
    // console.log(existLocation);
    // console.log(logger(gameStateArray));
};

// console.log(existLocation);

const collectNumber = () => {
    
    for(let i = 0; i < gameStateArray.length; i++) {
        for (let j = 0; j < gameStateArray.length; j++) {
            if(gameStateArray[i][j] === gameStateArray[i][j+1] && gameStateArray[i][j+1] !== false) {
                gameStateArray[i][j] += gameStateArray[i][j+1];
                gameStateArray[i].splice(j+1, 1);
                gameStateArray[i].push(false);
                // update existLocation
                existLocation.push([i, gameStateArray.length - 1]);
            }
        }
    }
};

const leftKeyHandler = () => {

    for(let i = 0; i < gameStateArray.length; i++) {
        let fFIdx = null;  //first false Index
        for(let j = 0; j < gameStateArray.length; j++) {

            if(gameStateArray[i][j] === false) {
                if(fFIdx !== null) continue;
                fFIdx = j;
            }
    
            if(gameStateArray[i][j] !== false && fFIdx !== null) {
                gameStateArray[i][fFIdx] = gameStateArray[i][j];
                gameStateArray[i][j] = false;
                // update existLocation
                let changedExistLocation = existLocation.map(elm => {
                    if(elm[0] === i && elm[1] === fFIdx) {
                        return [i, j];
                    } else {
                        return elm;
                    }
                });
                existLocation = changedExistLocation;
                fFIdx += 1;
            }

        }
    }
    collectNumber();
    insertionNewElement();
    console.log(existLocation);
    console.log(logger(gameStateArray));
};

const topKeyHandler = () => {

};

const rightCollectNumber = () => {
    for(let i = 0; i < gameStateArray.length; i++) {
        for (let j = gameStateArray.length - 1; j >= 0; j--) {
            if(gameStateArray[i][j] === gameStateArray[i][j-1] && gameStateArray[i][j-1] !== false) {
                gameStateArray[i][j] += gameStateArray[i][j-1];
                gameStateArray[i].splice(j-1, 1);
                gameStateArray[i].unshift(false);
                // update existLocation
                existLocation.push([i, 0]);
            }
        }
    }
};

const rightKeyHandler = () => {
    for(let i = 0; i < gameStateArray.length; i++) {
        let fFIdx = null;  //first false Index
        for(let j = gameStateArray.length - 1; j >= 0 ; j--) {

            if(gameStateArray[i][j] === false) {
                if(fFIdx !== null) continue;
                fFIdx = j;
            }
            
            if(gameStateArray[i][j] !== false && fFIdx !== null) {
                gameStateArray[i][fFIdx] = gameStateArray[i][j];
                gameStateArray[i][j] = false;
                // update existLocation
                let changedExistLocation = existLocation.map(elm => {
                    if(elm[0] === i && elm[1] === fFIdx) {
                        return [i, j];
                    } else {
                        return elm;
                    }
                });
                existLocation = changedExistLocation;
                fFIdx -= 1;
            }

        }
    }
    // collect number ra baraye right benvisam
    rightCollectNumber();
    insertionNewElement();

    console.log(logger(gameStateArray));
    console.log(existLocation);
};

const bottomKeyHandler = () => {

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

// const testArr = [2, 2, false, false, 2, 2, 2, 2, false, 2, false];

// const shiftArr = (array) => {
//     let arr = array;
//     let fFIdx = null;
//     for(let i = 0; i < arr.length; i++) {

//         if(arr[i] === false) {
//             if(fFIdx !== null) continue;
//             fFIdx = i;
//         }

//         if(arr[i] !== false && fFIdx !== null) {
//             arr[fFIdx] = arr[i];
//             arr[i] =false;
//             fFIdx += 1;
//             // console.log(fFIdx);
//         }
//     }
    
//     console.log(arr);
// };

// shiftArr(testArr);

// const collectNumber = (arr) => {
    
//     for(let i = 0; i < arr.length; i++) {
//         if(arr[i] === arr[i+1] && arr[i] !== false) {
//             arr[i] += arr[i+1];
//             arr.splice(i+1, 1);
//             arr.push(false);
//         }
//     }
    
//     console.log(testArr);
// };

// collectNumber(testArr)