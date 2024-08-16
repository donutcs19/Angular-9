console.log("Use var")
var z = 67;
console.log(z);
var z=22; //เปลี่ยนค่าได้ไม่ error
console.log(z);

console.log("Use let")
let x = 22;
console.log(x);
x=67; //เปลี่ยนค่าได้ไม่ error
console.log(x);

console.log("Use const")
const y = 67;
console.log(x);
y=22; //เปลี่ยนค่าไม่ได้เกิด error ทันที
console.log(x);


