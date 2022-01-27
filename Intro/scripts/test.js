
function dog(name,age,color){
    this.name=name;
    this.age=age;
    this.color=color;

}

function test1(){
    // ways to create object on JS
    // 1- object literal
    let lola={
        name:"Lola",
        age:2,

    };

    console.log(lola)
    
    // 2 - object constructor
    let fido=new dog("Hulk",2,"black");
    let another=new dog("Star",2,"white")
    console.log(fido)

    // 3 - class

}





// exc the function
test1();
