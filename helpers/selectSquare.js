

const selectSquare = (completeMatch, actualMatch, squareX, squareY, height, width) => {
    if(actualMatch[squareY][squareX].value !== false && actualMatch[squareY][squareX].value !== 0)
        return {
            actualMatch,
            win: false,
            lose: false,
        } 
    
    try{
        if(completeMatch[squareY][squareX].value == 'b')
            return{
                win:false,
                lose: true,
                completeMatch 
            }

        if(completeMatch[squareY][squareX].value != 0){
            actualMatch[squareY][squareX] = completeMatch[squareY][squareX]

            if(isWin(actualMatch, completeMatch, height, width)){
                return{
                    actualMatch,
                    win: true,
                    lose: false
                }
            }

            return{
                actualMatch,
                win: false,
                lose: false
            }
        }

        actualMatch = squareRecur(completeMatch, actualMatch, squareY, squareX, height - 1, width - 1);

        for (const y in actualMatch){
            for( const x in actualMatch[y]){
                if(actualMatch[y][x].hasOwnProperty('checked'))
                    delete actualMatch[y][x].checked
            }
        }

        return{
            actualMatch,
            win: false,
            lose: false
        }
    }
    catch(error){
        console.log(error)
        return {
            win: false,
            lose: true,
            error: "the square doesen't exist",
            completeMatch
        }

        
    }
}

const squareRecur = (completeMatch, actualMatch, y, x, height, width) => {
    actualMatch[y][x] = {
        ...completeMatch[y][x],
        checked: true
    }

    //left
    if(x>0){
        if(completeMatch[y][x-1].value == 0 && actualMatch[y][x-1].value == false && !actualMatch[y][x-1].hasOwnProperty('checked'))
            actualMatch = squareRecur(completeMatch, actualMatch, y, x-1, height, width)
        else
            actualMatch[y][x-1] ={ 
                ...completeMatch[y][x-1],
                checked: true
            }
    }

    //right
    if(x<width){
        if(completeMatch[y][x+1].value == 0 && actualMatch[y][x+1].value == false && !actualMatch[y][x+1].hasOwnProperty('checked') )
            actualMatch = squareRecur(completeMatch, actualMatch, y, x+1, height, width)
        else
            actualMatch[y][x+1] = {
                ...completeMatch[y][x+1],
                checked: true
            }
    }

    //top
    if(y>0){
        //left
        if(x>0){
            if(completeMatch[y-1][x-1].value == 0 && actualMatch[y-1][x-1].value == false && !actualMatch[y-1][x-1].hasOwnProperty('checked')){
                actualMatch = squareRecur(completeMatch, actualMatch, y-1, x-1, height, width)
            }
            else
                actualMatch[y-1][x-1] ={ 
                    ...completeMatch[y-1][x-1],
                    checked: true
                }
        }
        //center
        if(completeMatch[y-1][x].value == 0 && actualMatch[y-1][x].value == false && !actualMatch[y-1][x].hasOwnProperty('checked')){
            actualMatch = squareRecur(completeMatch, actualMatch, y-1, x, height, width)
        }
        else
            actualMatch[y-1][x] = {
                ...completeMatch[y-1][x],
                checked: true
            }
        

        //right
        if(x<width){
            if(completeMatch[y-1][x+1].value == 0 && actualMatch[y-1][x+1].value == false && !actualMatch[y-1][x+1].hasOwnProperty('checked')){
                actualMatch = squareRecur(completeMatch, actualMatch, y-1, x+1, height, width)
            }
            else
                actualMatch[y-1][x+1] = {
                    ...completeMatch[y-1][x+1],
                    checked: true
                }
        }
    }

    if(y<height){
        if(completeMatch[y+1][x].value == 0 && actualMatch[y+1][x].value == false && !actualMatch[y+1][x].hasOwnProperty('checked')){
            actualMatch = squareRecur(completeMatch, actualMatch, y+1, x, height, width)
        }
        else
            actualMatch[y+1][x] = {
                ...completeMatch[y+1][x],
                checked: true
            }

        if(x>0){
            if(completeMatch[y+1][x-1].value == 0 && actualMatch[y+1][x-1].value == false && !actualMatch[y+1][x-1].hasOwnProperty('checked'))
                actualMatch = squareRecur(completeMatch, actualMatch, y+1, x-1, height, width)
            else
                actualMatch[y+1][x-1] = {
                    ...completeMatch[y+1][x-1],
                    checked: true
                }
        }

        if(x<width){
            if(completeMatch[y+1][x+1].value == 0 && actualMatch[y+1][x+1].value == false && !actualMatch[y+1][x+1].hasOwnProperty('checked'))
                actualMatch = squareRecur(completeMatch, actualMatch, y+1, x+1, height, width)
            else
                actualMatch[y+1][x+1] = {
                    ...completeMatch[y+1][x+1],
                    checked: true
                }
        }
    }

    return actualMatch
}

const isWin = (actualMatch, completeMatch, height, width) => {
    for (let y = 0; y < height; y++) {
        for(let x = 0 ; x < width; x++){
            const actualSquare = actualMatch[y][x]
            const completeSquare = completeMatch[y][x]
            
            if(completeSquare.value == 'b'){
                if(actualSquare.isActive == true)
                    return false
            }
            else{
                if(actualSquare.isActive == false)
                    return false
            }
        }
    }

    return true
}

module.exports = {
    selectSquare
}