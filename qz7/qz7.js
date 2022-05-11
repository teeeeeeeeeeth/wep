var dataUrl = "https://wic.heo.taipei/OpenData/API/Rain/Get?stationNo=&loginId=open_rain&dataKey=85452C1D";
var dataf = $.getJSON(dataUrl); 
const data = [
{
stationNo: "C0AD1",
stationName: "八里",
recTime: "202204271610",
rain: 0.0
},
{
stationNo: "C0AD0",
stationName: "三芝",
recTime: "202204271610",
rain: 0.0
},
{
stationNo: "C0AD4",
stationName: "土城",
recTime: "202204271610",
rain: 0.0
},
{
stationNo: "318",
stationName: "大安福州山",
recTime: "202204271602",
rain: 0.0
},
{
stationNo: "01A17",
stationName: "坪林",
recTime: '201911130140',
rain: 0.0
}
];
var currentTime=0;
for (let i=0; i<5; i++) {
var year=Math.floor(data[i].recTime/100000000);
var month=Math.floor((data[i].recTime/1000000)%100);
var day=Math.floor((data[i].recTime/10000)%100);
var hour=Math.floor((data[i].recTime/100)%100);
var minute=Math.floor((data[i].recTime)%100);
$("#contain").append('<div><h2>'+data[i].stationName+'('+data[i].stationNo+')'+'</h2></div>')
$("#contain").append('<div><h3>'+year+'年'+month+'月'+day+'號'+hour+'時'+minute+'分'+'</h3></div>')
$("#contain").append('<div><h3>'+'即時雨量'+data[i].rain+'</h3></div>')
}