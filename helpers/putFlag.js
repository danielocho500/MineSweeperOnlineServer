const putFlag = (completeMatch, actualMatch, squareX, squareY, height, width, flags = []) => {


    if(actualMatch[squareY][squareX] == 'B')

    if(actualMatch[squareY][squareX] !== 'x')
        return;

    flags.push({
        squareX,
        squareY
    })

    console.log(flags)

    return flags;
}

module.exports = {
    putFlag
}