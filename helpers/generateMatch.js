const generateMatch = (sizeX,sizeY,initialX,initialY,bombs) => {
    let match = emptyMatch(sizeY,sizeX)
    //first click
    match[initialY][initialX] = {
        isActive: true,
        value: 0,
        isFlag: false
    }
    
    //put the squares next of the initial squares in a secure value
    match = roundInitial(match,sizeX,sizeY,initialX,initialY) 
    match = putBombs(match,sizeX,sizeY,bombs)
    match = putNumbers(match,sizeX,sizeY)

    return match
}

const emptyMatch = (sizeX,sizeY) => {
    const initial = []
    for(let i = 0; i<=sizeX; i++){
        let row = []
        for(let j=0; j<=sizeY; j++){
            row.push("N")
        }
        initial.push(row)
    }
    return initial
}

const roundInitial = (match,sizeX,sizeY,initialX,initialY) => {
    //above
    if(initialY>0){
        match[initialY-1][initialX] = "S"
        if(initialX>0)
            match[initialY-1][initialX-1] ="S"
        if(initialX<sizeX)
            match[initialY-1][initialX+1] = "S"
    }
    //down
    if(initialY<sizeY){
        match[initialY+1][initialX] = "S"
        if(initialX>0)
            match[initialY+1][initialX-1] = "S"
        if(initialX<sizeX)
            match[initialY+1][initialX+1] = "S"
    }
    //left
    if(initialX>0)
        match[initialY][initialX-1] = "S"
    
    //right
    if(initialX<sizeX)
        match[initialY][initialX + 1] = "S"

    return match
}

const putBombs = (match,sizeX,sizeY,bombs) => {
    for(let i = 0;i<bombs;i++){
        let b = true
        while(b){
            const x = randomIntFromInterval(0,sizeX)
            const y = randomIntFromInterval(0,sizeY)

            if(match[y][x] == "N"){
                match[y][x] = {
                    value: 'b'
                }
                b = false
            }
        } 
    }
    return match
}

const putNumbers = (match,sizeX,sizeY) => {
    for(let i=0;i<=sizeY;i++){
        for(let j=0;j<=sizeX;j++){
            if(match[i][j] == "N" || match[i][j] =="S"){
                let number = 0
                //above
                if(i){
                    if(match[i-1][j].value == "b")
                        number++
                    if(j>0)
                        if(match[i-1][j-1].value =="b")
                            number++
                    if(j<sizeX)
                        if(match[i-1][j+1].value == "b")
                            number++
                }
                //down
                if(i<sizeY){
                    if(match[i+1][j].value == "b")
                        number++
                    if(j>0)
                        if(match[i+1][j-1].value == "b")
                            number++
                    if(j<sizeX)
                        if (match[i+1][j+1].value == "b")
                            number++
                }
                //left
                if(j>0)
                    if (match[i][j-1].value == "b")
                        number++
                
                //right
                if(j<sizeX)
                    if (match[i][j + 1].value == "b")
                        number++
                
                match[i][j] = {
                    isActive: true,
                    value: number,
                    isFlag: false
                }
            }
        }
    }
    return match
}

const print = (match) => {
    let toPrint = ""
    match.forEach(row => {
        row.forEach(element => {
            toPrint += element + " "
        })
        toPrint += "\n"
    });
    console.log(toPrint)
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

module.exports = {
    generateMatch,
    print
}