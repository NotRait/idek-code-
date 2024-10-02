const someList = [1,2,3,4,5,"rati", 'b']

const inverse = (list) => {
    let newList = []; 
    for (let i = list.length - 1; i >= 0; i--) {
        newList.push(list[i]); 
    }
    return newList; 
};;

console.log(inverse(someList))