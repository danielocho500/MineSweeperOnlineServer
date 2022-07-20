const createEmptyMatch = (width, height, x, y) => {
    
    const initial = []
    for(let i = 0; i<height; i++){
        let row = []
        for(let j=0; j<width; j++){
            row.push({
                isActive: false,
                value: false,
                isFlag: false
            })
        }
        initial.push(row)
    }

    initial[y][x] = {
        isActive: true,
        value: 0,
        isFlag: false
    };

    return initial
}

module.exports = {
    createEmptyMatch
}