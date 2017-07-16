/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.
var weak = 45;
var moderate = 30;
var high = 20;
var risk = 15;
var norisk = 120;
var TempPhoto1=[1,weak,weak,moderate,moderate,high,high,risk,risk,risk,risk];
var TempPhoto2=[2,weak,weak,moderate,moderate,high,high,risk,risk,risk,risk];
var TempPhoto3=[3,weak,weak,weak,weak,moderate,moderate,high,high,high,high];
var TempPhoto4=[4,weak,weak,weak,weak,moderate,moderate,high,high,high,high];
var TempPhoto5=[5,weak,weak,weak,weak,weak,weak,moderate,moderate,moderate,high];
var TempPhoto6=[6,weak,weak,weak,weak,weak,weak,moderate,moderate,moderate,moderate];


function myEventHandler() {
    "use strict" ;

    var ua = navigator.userAgent ;
    var str ;

    if( window.Cordova && dev.isDeviceReady.c_cordova_ready__ ) {
            str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!" ;
    }
    else if( window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______ ) {
            str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!" ;
    }
    else {
        str = "Bad device ready, or none available because we're running in a browser." ;
    }

    alert(str) ;
}
document.addEventListener("deviceready", onDeviceReady, false);
//document.addEventListener("deviceready", onAppReady, false);
////////////////////////////////////////////
// CALL LoadAds & Use Connected ON RESUME //
////////////////////////////////////////////
document.addEventListener("resume", TakeBack, false);
function TakeBack() {
    var LastAddress = localStorage.getItem('Address');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    GetAdress(localStorage.getItem('lat'),localStorage.getItem('lng'));
    var ActualAddress = localStorage.getItem('Address');
    if (LastAddress!=ActualAddress){
        navigator.notification.alert(
            'Vous avez changé d\'adresse, je vais récupérer l\'indice UV de votre nouvelle position.',  // message
            OpenWeatherMap(localStorage.getItem('lat'),localStorage.getItem('lng')),                               // callback
            'Nouvelle position',                                                                        // title
            'Ok'                                                                                        // buttonName);    
            );
        SetTimer();
        }
}
// RECUPERE LES INDICES UV EN FONCTION DE NOTRE POSITION
//        OpenWeatherMap(lat,lng);

//////////////////
// DEVICE READY //
//////////////////
function onDeviceReady() {
//    console.log("navigator.geolocation works well");
//    var IdPage = $('[data-role="page"]').attr('id');
//    if (IdPage="Home-Page"){$('#navigator').hide();};  
    $('#navigator').hide();
//     console.log($('[data-role="page"]').attr('id'));

    // GET LAT,LNG
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    OpenWeatherMap(localStorage.getItem('lat'),localStorage.getItem('lng'));
//    var appid='06a9cd67dfdec073dd66f1d534ced352';
//    var UV_Url='http://api.openweathermap.org/data/2.5/uvi?appid={'+appid+'}&lat={'+localStorage.getItem('lat');+'}&lon={'+localStorage.getItem('lng')+'}';
    
//////////
// INIT //
//////////
    $("#Quit").click(function () {
        $('#navigator').hide();
        $('input[name="skin"]').prop('checked', false);
        $('input[name="hair"]').prop('checked', false);
        $('input[name="eyes"]').prop('checked', false);
        $('input[name="redness"]').prop('checked', false);
        $('input[name="sun"]').prop('checked', false);
        $('input[name="exposure"]').prop('checked', false);
        $('a[href="Tuto_01"]').addClass("disabled");
        $('a[href="Tuto_02"]').addClass("disabled");
        $('a[href="Tuto_03"]').addClass("disabled");
        $('a[href="Tuto_04"]').addClass("disabled");
        $('a[href="Tuto_05"]').addClass("disabled");
        $('a[href="Tuto_06"]').addClass("disabled");
//        $('#DayInfo').text('');
//        $('#UVIndex').text('');
        localStorage.setItem('Phototype','');
//        localStorage.clear();
         if ($(this).hasClass( "pause" )){
            $("#StartStop").removeClass("pause");
            $("#StartStop").addClass("play");
            $("#StartStop").text("COMMENCER À BRONZER");
         }    
//        $("#StartStop").attr("class", "play");
//        $("#StartStop").text("COMMENCER À BRONZER");
        $("#CountDownTimer").countdown('destroy')
        $("#CountDownTimer").countdown('pause');
//        $("#CountDownTimer").countdown('pause');
        $.mobile.changePage('#Home-Page',{ transition: "fade"});
    });
    $("#Restart").click(function () {
//        $('#CountDownTimer').countdown('getTimes')
        $("#StartStop").removeClass("pause");
        $("#StartStop").addClass("play");
        $("#StartStop").text("COMMENCER À BRONZER");
//        navigator.geolocation.getCurrentPosition(onSuccess, onError);
//        $('#DayInfo').text('');
//        $('#UVIndex').text('');
        $("#CountDownTimer").countdown('destroy')
        $('a[href="Tuto_01"]').addClass("disabled");
        $('a[href="Tuto_02"]').addClass("disabled");
        $('a[href="Tuto_03"]').addClass("disabled");
        $('a[href="Tuto_04"]').addClass("disabled");
        $('a[href="Tuto_05"]').addClass("disabled");
        $('a[href="Tuto_06"]').addClass("disabled");
        var UpToday = new Date();
        var UpTime = localStorage.getItem('TanTime');
        $('#CountDownTimer').countdown({until: UpTime,format: 'HMS', compact: true, onTick: watchCountdown, onExpiry: liftOff });
        $("#CountDownTimer").countdown('pause');
        if ($("#CountDownDisplay").hasClass( "pause" )){
            $("#CountDownDisplay").removeClass("blink_me")      
        }
    });
    $("#BackHome").click(function () {
        $('#navigator').hide();
        $('label[name="skin"]').prop('checked', false);
        $('input[name="hair"]').prop('checked', false);
        $('input[name="eyes"]').prop('checked', false);
        $('input[name="redness"]').prop('checked', false);
        $('input[name="sun"]').prop('checked', false);
        $('input[name="exposure"]').prop('checked', false);
        if ($("#CountDownDisplay").hasClass( "pause" )){
            $("#CountDownDisplay").removeClass("blink_me")      
        }
        $.mobile.changePage('#Home-Page',{ transition: "slide", reverse: 'true'});
    });
    $('#PhototypeIndex').click(function (event) {
        $.mobile.changePage('#IndiceProtect',{ transition: "slide", reverse: 'true'});
    });
    $("#SPF").change(function () {
        var SPF=$( "select option:selected" ).val();
        localStorage.setItem('SPF', SPF);
//        $("#StartStop").attr("class", "play"); 
        if ($("#StartStop").attr("class") == "pause"){
            $("#StartStop").removeClass("pause");
            $("#StartStop").addClass("play");
        }
        $("#StartStop").text("COMMENCER À BRONZER");
        $("#CountDownTimer").countdown('destroy')
        SetTimer();
    });
    
    $.ajax({
        type: "GET",
        url: "Phototype.xml",
        dataType: "xml",
        success: function(data){
            $(data).find('type').each(function(key,item){
                DescText= ((item.textContent).replace(/"/g, "")).replace(/#b/g, "<conseil>").replace(/#eb/g, "</conseil>");
                localStorage.setItem('Description'+(key+1), DescText);
            });
        }
     });

    $('#StartStop').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        if ($(this).hasClass( "play" )){
//              $(this).attr("class", "pause");
                $("#StartStop").removeClass("play");
                $("#StartStop").addClass("pause");
                $(this).text("PAUSE");
                $("#CountDownTimer").countdown('resume');
          }
          else{
//             $(this).attr("class", "play");
                $("#StartStop").removeClass("pause");
                $("#StartStop").addClass("play");
                $(this).text("COMMENCER À BRONZER");
                $("#CountDownTimer").countdown('pause');
          }
});
    
    
////////////////////////
// INDICATEUR DE PAGE //
////////////////////////
    $('[data-role="page"]').on("pageshow",function(event){
        var $id = this.id;
//        console.log($id);
    if ($id=="Home-Page"||$id=="Present"||$id=="IndiceProtect"||$id=="TanTime"){
            $('#navigator').hide();    
    }else{
            $('#navigator').show();            
    }
    $("#navigator").find("a").removeClass('activeSlide');
    $("#navigator").find("[id='#"+$id+"']").addClass('activeSlide');
    });
/////////////////////////////////////////
// TEST SI BESOIN DE DEFINIR PHOTOTYPE //
/////////////////////////////////////////
    $("#Home-Page").click(function (event) {
        var ExitPhtototype = localStorage.getItem('Phototype');
//        alert(ExitPhtototype);
        event.preventDefault();
        event.stopPropagation();
        if (ExitPhtototype==null || ExitPhtototype=='') {
            localStorage.setItem('SPF',1)
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            OpenWeatherMap(localStorage.getItem('lat'),localStorage.getItem('lng'));
            $.mobile.changePage('#Present',{ transition: "slide"});
//            $.mobile.changePage('#Tuto_01',{ transition: "slide"});
        }else{
            SetTimer();
            $.mobile.changePage('#TanTime',{ transition: "slide"});
        }
    });
    
//////////////////////
// PHOTOTYPE CALCUL //
//////////////////////
    $("#CalcPhototype").click(function () {CalculPhototype();$.mobile.changePage('#IndiceProtect',{ transition: "slide"}); });
    $("#ReCalcPhototype").click(function () {localStorage.getItem('Phototype');$('#navigator').hide();SetTimer();$.mobile.changePage('#TanTime',{ transition: "slide"}); });
    
}; 
function CalculPhototype(){
                    var achoose=0;
                    var bchoose=0;
                    var cchoose=0;
                    var dchoose=0;
                    var echoose=0;
                    var fchoose=0;

                    var a=/a/gi;
                    var b=/b/gi;
                    var c=/c/gi;
                    var d=/d/gi;
                    var e=/e/gi;
                    var f=/f/gi;

                    var arr = [ "skin", "hair", "eyes", "redness", "sun", "exposure" ];
                    var i = 0;
                    $.each(arr, function() {
                        var radio = $("input[name='"+this+"']:checked").val();
                        if(radio) {
                            i++;
                            if(radio.match(a)) achoose++;
                            if(radio.match(b)) bchoose++;
                            if(radio.match(c)) cchoose++;
                            if(radio.match(d)) dchoose++;
                            if(radio.match(e)) echoose++;
                            if(radio.match(f)) fchoose++;
                        }
                    });
                    if(i < 4) {
                        alert("Veuillez répondre à au moins 4 questions, pour pouvoir valider le test.");
                        return false;
                    }
                    var arr = [ achoose, bchoose, cchoose, dchoose, echoose, fchoose ];
                    var max = 0;
                            var pos = 0;
                    $.each(arr, function(index, value) {
                        if(value >= max) {pos = index; max = value;}
                    });
                    pos++;

            //		$j('html,body').animate({scrollTop: 1000}, 1000);
            //		$j("[id^=phototype]").hide();
            //		$j("#phototype"+ pos).slideToggle("slow");
        
                    // STORE LE PHOTOTYPE
                    localStorage.setItem('Phototype',pos);
                    $('#navigator').hide();
                    SetTimer();
//                    $('#Description').text((localStorage.getItem('Description')).getElementsByTagName("type")[0]);
//                    var textDesc = (localStorage.getItem('Description'+pos)).replace(/\n/g, '<br />');
//                    $.mobile.changePage('#IndiceProtect',{ transition: "slide"});
//                    $.mobile.changePage('#TanTime',{ transition: "slide"});
    };

///////////////
// SET TIMER //
///////////////
function SetTimer(){        
        var PhotoVal = localStorage.getItem('Phototype');
        var $TanTime=0;         
        var UVIndex = localStorage.getItem('UV');
        var UVInt = parseInt(UVIndex);
//console.log(UVInt);
// var UVInt=0; // test
// var PhotoVal=6; // test

switch (parseInt(PhotoVal)) {
         case 0:
                var TempPhoto=TempPhoto1;;
                break;
         case 1:
                var TempPhoto=TempPhoto1;
                break;
         case 2:
                var TempPhoto=TempPhoto2;
                break;
         case 3:
                var TempPhoto=TempPhoto3;
                break;
         case 4:
                var TempPhoto=TempPhoto4;;
                break;
         case 5:
                var TempPhoto=TempPhoto5;
                break;
         case 6:
                var TempPhoto=TempPhoto6;
                break;
        }
//$TanTime = TempPhoto[UVInt];
//    console.log(PhotoVal+'-'+TempPhoto);
    localStorage.setItem('TimeExpo',TempPhoto[UVInt]);
//    console.log(TempPhoto);
//    console.log('UV'+UVInt+'-'+localStorage.getItem('TimeExpo'));

//    console.log($TanTime);
            var SPF=$( "select option:selected" ).val();
            localStorage.setItem('SPF', SPF);
            var TimeSPF = ((localStorage.getItem('TimeExpo')*60)*(1+(localStorage.getItem('SPF')/100)));
//            console.log(SPF+'-'+TimeSPF);
//            var TimeSecond = parseInt((((localStorage.getItem('TimeExpo'))*60)/UVIndex)*TimeSPF);
            var TimeSecond = parseInt(TimeSPF);
            localStorage.setItem('TanTime',TimeSecond);
            localStorage.setItem('HalfTime', parseInt(TimeSecond/2));
//            if (PhotoVal){
//            var Today = new Date();
//            Today.setSeconds(TimeSecond);
//           austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
                $('#CountDownTimer').countdown({until: TimeSecond,format: 'HMS', compact: true, onTick: watchCountdown, onExpiry: liftOff });
                $('#CountDownTimer').countdown($.countdown.regionalOptions['fr']);
//                $('#year').text(Today.getFullYear());
                $("#CountDownTimer").countdown('pause');
            $("#PhototypeIndex").html('<br/><div id="BackConseil">Phototype '+ PhotoVal +' - IP : '+$( "select option:selected" ).text())+'</div>';
            SetDescription();
//            $.mobile.changePage('#TanTime',{ transition: "slide"});
//            }  
}

function SetDescription(){
    var textDesc = (localStorage.getItem('Description'+localStorage.getItem('Phototype'))).replace(/\n/g, '<br />');
    var textPhototype ='<h1 class="Title">Votre Phototype : '+localStorage.getItem('Phototype')+'</h1>';
    $('#Description').html(textPhototype+'<p class="Content Info">'+textDesc+'</p>');
}
function liftOff() {
    $('#StartStop').text('ARRETEZ DE BRONZER !');
//    alert('ATTENTION !!!\nArretez de bronzer, ou vous risquez de graves coups de soleil !'); 
    navigator.vibrate(5000);
}   
function watchCountdown(periods) { 
    $('.Secs').text(periods[6]);
//    var warning=""
    var sec=("0" + $('.Secs').text()).slice(-2);
    var InterTime = $('#CountDownTimer').text();
    var HoursLeft = periods[4];
    var MinuteLeft = periods[5];
    var SecondLeft = periods[6];
    if (HoursLeft==0&&MinuteLeft==0&&SecondLeft<59){
        $("#CountDownDisplay").addClass("blink_me");
    }else{
        $("#CountDownDisplay").removeClass("blink_me")      
    }
    var TimeDisplay = InterTime.slice(0,-3)+'<br/><span class="second">'+sec+' sec.</span>';
    $('#CountDownDisplay').html(TimeDisplay);
    
    // Half Time ?
    var ActualTime=$('#CountDownTimer').countdown('getTimes');
    var TotalTime = (ActualTime[4]*120)+(ActualTime[5]*60)+ActualTime[6]
//    var ActualTime=$('#CountDownTimer').periodsToSeconds(periods);
//    console.log(TotalTime);
    var Turn = parseInt(localStorage.getItem('HalfTime'));
    if (TotalTime==Turn){
//        $("#popupSwitch").popup("open");
        $('#StartStop').text('CHANGEZ DE CÔTÉ !');
        navigator.vibrate(3000);
    }
}
// onSuccess Callback 
    // This method accepts a Position object, which contains the 
    // current GPS coordinates 
    // 
//    var onSuccess = function(position) {
//        alert('Latitude: '          + position.coords.latitude          + '\n' +
//              'Longitude: '         + position.coords.longitude         + '\n' +
//              'Altitude: '          + position.coords.altitude          + '\n' +
//              'Accuracy: '          + position.coords.accuracy          + '\n' +
//              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//              'Heading: '           + position.coords.heading           + '\n' +
//              'Speed: '             + position.coords.speed             + '\n' +
//              'Timestamp: '         + position.timestamp                + '\n');
//    };
     
function onSuccess(position) {
//        var element = document.getElementById('geolocation');
        var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
        var latRnd = (Math.round(lat * 100) / 100).toFixed(2)
        var lngRnd = (Math.round(lng * 100) / 100).toFixed(2)
        var Timestamp= position.timestamp ;
        var TodayDate = new Date();
        var IsoDate = TodayDate.toISOString();
        localStorage.setItem('lat',lat);
        localStorage.setItem('lng',lng);
        localStorage.setItem('IsoDate',IsoDate);
        localStorage.setItem('Timestamp',Timestamp);
        
        // RECUPERE LES INDICES UV EN FONCTION DE NOTRE POSITION
//        OpenWeatherMap(lat,lng);
//        alert(latRnd+ '\n' +lngRnd+ '\n' +Timestamp+ '\n' +TodayDate+ '\n' +IsoDate);
}

    // onError Callback receives a PositionError object 
    // 
function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
}

function OpenWeatherMap(lat,lon){
// WEATHER
//        var appid='06a9cd67dfdec073dd66f1d534ced352';
//        var $WeatherInfo='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+appid;

//        var $WeatherInfo='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+appid+'&cnt=14&mode=json&units=metric&lang=fr'; // OPENWEATHER
//        var $WeatherInfo='http://api.openweathermap.org/data/2.5/daily?lat='+lat+'&lon='+lon+'&cnt=14&mode=json&units=metric&lang=fr';
    
        var $WeatherInfo='http://www.prevision-meteo.ch/services/json/lat='+lat+'lng='+lon; // PREVISION METEO

//        var $WeatherInfo='http://www.infoclimat.fr/public-api/gfs/json?_ll='+lat+','+lon+'&_auth=BhxQRwN9V3VSf1BnBXNWfwJqBjNdK1RzUS1QM1o%2FB3oGbQBhVTVVMwdpVShQfwcxV3pUNw80BDRQOwJ6AHIFZAZsUDwDaFcwUj1QNQUqVn0CLAZnXX1Uc1EzUDBaMQd6BmQAYFUyVSkHblUwUH4HO1djVCsPLwQ9UDcCbABkBW8GY1A0A2hXNVI4UC0FKlZnAjgGYF1lVGVRN1BiWjIHYAY0AGxVY1UxB2xVKVBpBzJXZVQ0DzAEO1A0AmYAcgV5BhxQRwN9V3VSf1BnBXNWfwJkBjhdNg%3D%3D&_c=eea70d2cf190af611a652321f6355db2'; // INFOCLIMAT.fr
        $.ajax({
        url: $WeatherInfo,
        type:'get',
        datatype:'json',
        data: {latitude:lat,longitude:lon},
        beforeSend: function() {
        },
        success:function(data){
//        var Weather = JSON.parse(data);
        var Weather = JSON.stringify(data);
//             console.log(data);
//            console.log(data.current_condition.tmp);
            var TempF=data.current_condition.tmp;
            var Condition=data.current_condition.condition;
//            var TempF=data.main.temp;
//            var Temperature = convertKToC(TempF);
//            localStoragesetItem('Temperature',Temperature);
            $('#TempC').html((TempF+'°C '+Condition));
//            console.log(TempF+"-"+Temperature);
        }
        });
// UVINDEX THEMIS
        var $UVinfo='http://www.temis.nl/uvradiation/nrt/uvindex.php?lon='+lon+'&lat='+lat;
        $.ajax({
        url: $UVinfo,
        type:'get',
        datatype:'json',
        data: {latitude:lat,longitude:lon},
        beforeSend: function() {
        },
        success:function(data){
//            console.log(data);
//        var Weather = JSON.parse(data);
        var Weather = JSON.stringify(data);
        $('#Result').html(Weather);
        $("#Result").hide();
        var $detail = [];
        $("dd").find('table tr').each(function (i) {
        var $tds = $(this).find('td');            
                var obj = {
                            date : $tds.eq(0).text(),
                            UV : $tds.eq(1).text(),
                            Ozone : $tds.eq(2).text()
                        };
        $detail.push(obj);
        });
// STORE L'INDICE UV PAR JOUR
        var Day1 = $detail[1].date;
            Day1 = CurrentDate();
        var Today= new Date();
        var UVDay1 = ($detail[1].UV).replace(/ /g,'');
        var OzoneDay1 = ($detail[1].Ozone).replace(/ /g,'');   
        var TimeExpo1 = (3*60*60)*(20*60); // 3h20
        localStorage.setItem('Day',Day1);
        localStorage.setItem('UV',UVDay1);
        $('#DayInfo').text(dateFr(Day1));
        $('#UVIndex').html('Indice UV '+UVDay1+'<br/>Risque : '  +localStorage.getItem('Risque'));
        $('#InfoUV').text('qui est de '+UVDay1);
// DEFINITION DU TEMPS D'EXPOSITION STANDARD
        var UVIndex = parseFloat(UVDay1);
            //
//        console.log(UVIndex);
        if (UVIndex<=1) { 
            TimeExpo1 = (3*60*60)*(20*60); // 3h20
            localStorage.setItem('Risque','Faible');
        }
        if (UVIndex<1 && UVIndex<=2) { 
            TimeExpo1 = (1*60*60)*(40*60); // 1h40
            localStorage.setItem('Risque','Faible');
        }
        if (UVIndex<2 && UVIndex<=3) { 
            TimeExpo1 = (1*60*60)*(7*60); // 1h07
            localStorage.setItem('Risque','Moderé');
        }
        if (UVIndex<3 && UVIndex<=4) { 
            TimeExpo1 = (50*60); // 50
            localStorage.setItem('Risque','Moderé');
        }
        if (UVIndex<4 && UVIndex<=5) { 
            TimeExpo1 =(40*60); // 40
            localStorage.setItem('Risque','Elevé');
        }
        if (UVIndex<5 && UVIndex<=6) { 
            TimeExpo1 = (33*60); // 33
            localStorage.setItem('Risque','Elevé');
        }
        if (UVIndex<6 && UVIndex<=7) { 
            TimeExpo1 =(29*60); // 29
            localStorage.setItem('Risque','Très Elevé');
        }
        if (UVIndex<7 && UVIndex<=8) { 
            TimeExpo1 = (25*60); // 25
            localStorage.setItem('Risque','Très Elevé');
        }
        if (UVIndex<8 && UVIndex<=9) { 
            TimeExpo1 =(22*60); // 22
            localStorage.setItem('Risque','Extrême');
        }
        if (UVIndex<9 && UVIndex<=10) { 
            TimeExpo1 =(20*60); // 20
            localStorage.setItem('Risque','Extrême');
        }
        if (UVIndex<10 && UVIndex<=11) { 
            TimeExpo1 =(18*60); // 18
            localStorage.setItem('Risque','Extrême');
        }
//        console.log(localStorage.getItem('TimeExpo'));

        GetAdress(lat, lon);
//        $.mobile.changePage( "#Home-Page", { transition: "slideup", changeHash: false });
        }
        });
} 

///////////////////
// Date Actuelle //
///////////////////
function CurrentDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
function dateFr(ddate) {
    var jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    var mois = new Array("Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre");
    // on recupere la date
     if (ddate==null){
         var date = new Date();
     }else{
         var date = new Date(ddate);
     }
    // on construit le message
     var message = jours[date.getDay()] + " ";   // nom du jour
     message += date.getDate() + " ";   // numero du jour
     message += mois[date.getMonth()] + " ";   // mois
     message += date.getFullYear();
    return message;
}
////////////////////////
// Récupère l'adresse //
////////////////////////
function GetAdress(latitude, longitude){
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {
             if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                //formatted address
                var $address =(results[0].formatted_address); 
                var $ville = (results[1].formatted_address);
//                alert(results[2].formatted_address)
                //find country name
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {
                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            var city= results[0].address_components[i];
                            break;
                        }
                    }
                }
//                 $('#AddressInfo').html($address);
                $('#AddressInfo').html($ville);
                localStorage.setItem('Address',$ville);
                 }
            }
            else {
                    $('#AddressInfo').val('');
                    navigator.notification.alert('Nous n&#39;arrivons pas à vous localiser');
                    }
        });
}
function convertKToC(Temperature) {
	if (Temperature < (0)) {
		return "OpenWeather";
	} else {
		return (~~(Temperature-273.15));
	}
}
 function convertToC(Temperature) {
     var fTempVal = parseFloat(Temperature);
     var Temperature = (fTempVal - 32) * (5/9);
     return Temperature;
}

function convertToF(Temperature) {
    var cTempVal = parseFloat(Temperature);
    var Temperature = (cTempVal * (9/5)) + 32;
    return Temperature;
}

////////////////////
// INIT COUNTDOWN //
////////////////////
function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    clock.innerHTML = 'days: ' + t.days + '<br>' +
                      'hours: '+ t.hours + '<br>' +
                      'minutes: ' + t.minutes + '<br>' +
                      'seconds: ' + t.seconds;
    if(t.total<=0){
      clearInterval(timeinterval);
    }
  },1000);
}

// ...additional event handlers here...
