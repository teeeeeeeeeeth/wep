var timeData = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24format=JSON";
var time = $.getJSON(timeData);
var times = [], nth = [];
var num = 0;
var countDown = 20;
for(var i = 0; i < 20; i++){
    if(countDown > 0){
        nth.push(num);
        num = num + countDown; 
        countDown--;
    }
}
time.done(function(result){
    $.each(result, function(i, index){
        if (i == 0){
            $.each(nth,function(j, nth){
                times[j] = index.TravelTimes[nth].RunTime;
            });
        }
    });
});

var priceData = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24format=JSON";
var price = $.getJSON(priceData);

var prices = [];
var x = 0;
price.done(function(result){
    $.each(result, function(i, index){
        if (i % 21 == 0){     
            prices[x] = index.Fares[0].Price;
            x++;
        }
    });
});

var stationData = "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TYMC?%24top=30&%24format=JSON";
var station = $.getJSON(stationData);
station.done(function(result){
    $.each(result, function(i, index){
        if (i == 20){
            $("#station").append("A" + (i+1) + index.StationName.Zh_tw + "<br/>");
            return false;
        }
        else
            $("#station").append("A" + (i+1) + index.StationName.Zh_tw + "<br/><br/>$" 
                + prices[i] + "&emsp;⇣&emsp;"
                +"約"
                + times[i] / 60 + "分"
                + times[i] % 60 + "秒<br/><br/>");
    });
});