// conan_kinhmat
var iVersion = "3.003";
var iIgnoreTime = parseInt( localStorage.getItem("ignore-time"), 10 );

var bAuto2 = false;
var bCheckRoom = true;
var bSampleData = false;
var bSampleDataHasCoin = "";
var roomToFind = "";
var hostToFind = "";
var idToFind = 2338832;

bSampleData = false;
idToFind = "2434565"; // session id
if( undefined === iIgnoreV ){
    var iIgnoreV = "N/A";
}

var iCheckRoomTimer = 3500;
var iWaitBeforeJump = 10000;
//var aIgnorePermanent = [ "ledat010220022", "honghanguyen263", "keptocmot", "trannguyen398", "tranhnguyen694", "sgmqqfjg20", "toananh770", "sow2z2a16q", "tranbichngoc24", "tranbichngocsu", "ktranhoangson", "bkanhnam90317", "hai_thik_dat_don_cho_host207", "nammom204", "viipoi9x", "qv6snmy2kh", "nganvan041", "m9xn8winc5", "chuyennguyen777", "rowrrsp_xo", "omg_2004.0"];
var aIgnore100 = [ "shopeevn", "vnshopeelive" ]; // ignore when coin = 100
var bIgnoreShopeeLive = false;

var bShortTitleOnly = false;
var bCoin200Only = false;
var bManualContinue = false;


roomToFind = roomToFind.toLowerCase();
hostToFind = hostToFind.toLowerCase();


// step 1
if( window.location.href.indexOf('lptab') !== -1 ){
    step_1();
}else{
    // step 2
    step_2();
}

function step_1(){

    if( !jQuery("title").length ){
        jQuery("head").append('<title>Auto version 2</title>')
    }
    var iCheckroomTimer1 = 0;
    var iCheckroomTimer2 = 0;

    var iIntervalTickTimer1, iIntervalTickTimer2, iRoomInvalidInterval;
    var bForceValid = false, bForceInvalid = false;

    var bClickedRoom = false;
    var bGraceFace = false;
    var aPriorityUS = ["gracefacevietnam", "caogungchinhhang", 'ctythiennhienviet', "nam__official", "hogotoshop", "kimochiishop" ];
    var aPriorityUS_removed = ["matkinhsihieu"];
    var sQueryURL;
    var iMaxCoinAllow = 50000;

    //sGraceFaceNICKNAME = "BẾP CỦA MẸ ONICI"
    if( undefined === localStorage.getItem('graceface') || localStorage.getItem('graceface') == ""|| localStorage.getItem('graceface') == "false" ){
        bGraceFace = false
    }else{
        bGraceFace = true
    }

    // ignore sp live
    if( undefined == localStorage.getItem('ignoresplive') || localStorage.getItem('ignoresplive') == ""|| localStorage.getItem('ignoresplive') == "false" ){
        bIgnoreShopeeLive = false
    }else{
        bIgnoreShopeeLive = true
    }
    
    // short title
    if( undefined == localStorage.getItem('short_title') || localStorage.getItem('short_title') == ""|| localStorage.getItem('short_title') == "false" ){
        bShortTitleOnly = false
    }else{
        bShortTitleOnly = true
    }
    
    // Coin 200 only
    if( undefined == localStorage.getItem('coin_200_only') || localStorage.getItem('coin_200_only') == ""|| localStorage.getItem('coin_200_only') == "false" ){
        bCoin200Only = false;
    }else{
        bCoin200Only = true;
    }
    
    // Auto continue or Manual Continue
    if( undefined === localStorage.getItem('manual_continue') || localStorage.getItem('manual_continue') === ""|| localStorage.getItem('manual_continue') === "false" ){
        bManualContinue = false;
    }else{
        bManualContinue = true;
    }
    
    
    if( screen.width > 1500 ){
        bGraceFace = false;
    }



    var bDebug = false;
    // bDebug = true
    var bPause = true
    var iDelay = 100
    var iCoinToEnter = -1
    var iIgnoreRoom = localStorage.getItem("ignore-room")
    
    if( undefined == localStorage.getItem('delay') || localStorage.getItem('delay') == "" ){
        iIgnoreRoom = -1
    }else{
        iIgnoreRoom = parseInt( iIgnoreRoom, 10 )
    }

    if( isNaN(iIgnoreRoom) ){
        iIgnoreRoom = -1
    }

    var sBaseURL = 'https://live.shopee.vn/api/v1/lptab/item?tab_id=592041455214080&tab_type=2&offset=0&limit=50'
    var sBaseURL2 = 'https://live.shopee.vn/api/v1/lptab/item?tab_id=592041455214080&tab_type=2&offset=50&limit=50'
    var iCTX_ID = getRandomInt( 1, 100 )
    // var sQueryURL = sBaseURL + '&ctx_id='+ (iCTX_ID+1)
    
    var bOpened = false

    var sPrefix = 'f9c82eb2-d83d-4b00-bd90-dbf13a8bd968-1642979281833-'
    sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)
    var $iResCount = 0

    format_html()
    auto2()
    if( !bPause )
        get_channel( sQueryURL )


    function format_html(){
        jQuery("body").html('\
    <div class="wrapper">\
        <div class="timer-wrapper">\
            <div class="col-6 timer-countdown1-wrapper">\
                <a href="javascript:;" class="t1-minus"></a>\
                <span class="timer-countdown1">00:00</span>\
                <a href="javascript:;" class="t1-plus"></a>\
            </div>\
            <div class="col-6 timer-countdown2-wrapper">\
                <a href="javascript:;" class="t2-minus"></a>\
                <span class="timer-countdown2">00:00</span>\
                <a href="javascript:;" class="t2-plus"></a>\
            </div>\
        </div>\
        <div class="main-menu">\
            <div class="play">\
                <div class="button-group">\
                    <span class="minus">-</span>\
                    <span class="text-play start-pause">Play</span>\
                    <span class="plus">+</span>\
                </div>\
                <div class="channel-count">0/<span>1</span></div>\
            </div>\
            <div class="view-mode view-only">View Mode</div>\
            <div class="refresh">refresh</div>\
            <div class="auto-coin-wrapper"><select class="auto-coin"><option value="-1">Select</option></select></div>\
            <div class="graceface-wrapper"><input type="checkbox" class="graceface"/></div>\
        </div>\
        <div class="auto2-wrapper">\
            <div class="start-pause2">Start Auto 2</div><button class="valid-btn">Valid</button><button class="invalid-btn">Invalid <span class="invalid-time">-</span></button>\
        </div>\
        <div class="row">\
            <div class="col yellow">2+</div>\
            <div class="col"></div>\
            <div class="col"></div>\
            <div class="col"></div>\
        </div>\
        <div class="row">\
            <div class="col yellow">2</div>\
            <div class="col"></div>\
            <div class="col"></div>\
            <div class="col"></div>\
        </div>\
        <div class="row">\
            <div class="col yellow">1</div>\
            <div class="col"></div>\
            <div class="col"></div>\
            <div class="col"></div>\
        </div>\
        \
        <div class="err-msg"></div>\
        <a href="javascript:;" class="test" style="display:none">Start test</a>\
        <br/><div>\
        \
        <div class="pretty p-switch p-fill cbx1">\
            <input type="checkbox" class="skip-shopee-live" />\
            <div class="state">\
                    <label>Skip shopee live</label>\
            </div>\
	</div><br/>\
        \
        <div class="pretty p-switch p-fill cbx1">\
            <input type="checkbox" class="short-title-cbx" />\
            <div class="state">\
                    <label>Short Title</label>\
            </div>\
	</div><br/>\
        \
        <div class="pretty p-switch p-fill cbx1">\
            <input type="checkbox" class="coin-200-only-cbx" />\
            <div class="state">\
                    <label>200 Coin</label>\
            </div>\
	</div><br/>\
        \
        <div class="pretty p-switch p-fill cbx1">\
            <input type="checkbox" class="manual-continue-cbx" />\
            <div class="state">\
                    <label>Manual Continue</label>\
            </div>\
	</div><br/>\
        \
                <label class="hide">Skip shopee live<input type="checkbox" class="skip-shopee-live" style="width:25px;height:25px;vertical-align:bottom" /></label>\
                <br/><label class="hide">Open Short title<input type="checkbox" class="short-title-cbx" style="width:25px;height:25px;vertical-align:bottom" /></label>\
                <br/><label class="hide">200 Only<input type="checkbox" class="coin-200-only-cbx" style="width:25px;height:25px;vertical-align:bottom" /></label>\
                <br/><label class="hide">Manual Continue<input type="checkbox" class="manual-continue-cbx" style="width:25px;height:25px;vertical-align:bottom" /></label>\
            </div>\
        <div class="title-section">\
            <div class="rtitle" relid=""></div>\
            <div class="rtitle" relid=""></div>\
            <div class="rtitle" relid=""></div>\
            <div class="rtitle" relid=""></div>\
            <div class="rtitle" relid=""></div>\
            <div class="rtitle" relid=""></div>\
            <div class="rtitle" relid=""></div>\
            <div class="rtitle" relid=""></div>\
            <div class="rtitle" relid=""></div>\
        </div>\
        <textarea class="delaytime" >abc</textarea>\
        <span class="version">Version: '+iVersion + "."+iIgnoreV+'</span>\
        <div class="challenge-section">\
            <textarea id="shop-url"></textarea>\
            <button class="create-iframe">Follow</button>\
            <button class="create-iframe-unfollow">Unfollow</button>\
        </div>\
    </div>\
    \
    ');
        //jQuery('body').prepend('')
        jQuery('head').append('<style>\
    a,a:visited{text-decoration:none;color:#FFF;}\
    .test.active{background:green;color:yellow}\
    .graceface{width:30px;height:30px;}\
    .warning{color:red}\
    .click-to-copy{padding:10px;vertical-align: bottom;}\
    body{margin: 0;background:#000;color:#c3c3c3}\
    .new-channel{font-size:12px;vertical-align: bottom; display:inline-block;width:190px;max-width:200px;overflow-x:hidden; max-width: 80%;box-sizing: border-box;position:relative}\
    .setting{position:fixed;right:0;top:0;width:95px;}\
    .setting >*{width:100%;margin-bottom:10px;boz-sizing:border-box;padding:10px 0}\
    .view-only{top:150px; background:gray;color:#ad9f9f;margin-bottom:0}\
    .view-only.active{background:#309f2c;color:yellow}\
    .wrapper{font-family: sans-serif; font-size: 14px; color: #ffffff;}\
    .wrapper > .row, .main-menu{min-height: 38px;background: #222222;display: flex;flex-flow: row wrap;border-bottom: 1px solid #484848;}\
    .main-menu{/*position: fixed;*/top: 0;left: 0;right: 0;}\
    .wrapper > .row > div, .main-menu > div{text-align:center;border-left: 1px solid #484848;border-right: 1px solid #000000;flex: 1;display: flex;flex-flow: column wrap;justify-content: center;align-items: center;}\
    .wrapper .row *, .play, .view-mode, .refresh{user-select:none}\
    .main-menu{cursor:pointer}\
    .main-menu > div.play{flex-direction: row;justify-content: center;flex-basis: 15%;position:relative;}\
    .channel-count{position:absolute;right:0;}\
    .main-menu > .play > .button-group{width: 100%;height:100%;display: flex;flex-flow: row wrap;text-align: center;}\
    .button-group > span {flex: 1;display: inline-block;border-radius: 2px;background: #303030;margin: 1px;padding: 0;}\
    .button-group > span.text-play {flex-basis: 40%;justify-content: center;display: flex;flex-flow: column wrap;}\
    .text-play, .channel-count{font-size: 12px;}\
    .wrapper > .row{height:48px; border-top: 1px solid #000000;}\
    .wrapper > .row > div:nth-child(0)\
    .wrapper > .row > .col > div{padding: 3px 0;color: #b0d7e9;}\
    .wrapper > .row .col.yellow{max-width: 20px;color: yellow;font-weight:bold;}\
    .yellow{color: yellow;}\
    p.room-title, p.room-host{margin:0;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 100%;}\
    .wrapper > .row:not(:first-child) .coin{display:nonee;position:absolute;left:0;bottom:0}\
    .views{margin-bottom:5px;}\
    .main-menu > div.refresh{display:nonee}\
    .auto-coin-wrapper{max-width:70px;}\
    .graceface-wrapper{max-width:50px}\
    .button-group > span.minus, .button-group > span.plus{display:none}\
    .ignore{position:relative}\
    .ignore>*:not(.ignore-time){opacity:0.5}\
    .ignore-time{position:absolute;right:0;top:0;}\
    .version{margin-top:5px;display:block}\
    .delaytime{ width: 50px; height: 20px;display: block;cursor:pointer;resize:none;}\
    .start-pause2{display:inline-block;width:85px;vertical-align:bottom;background:gray;height:35px;line-height:40px;text-align:center;cursor:pointer;user-select:none;margin-right:15px;}\
    .start-pause2.active{background:green;color:yellow;}\
    .valid-btn,.invalid-btn{width:calc((100% - 100px)/2 - 7.5px);;height:35px;cursor:pointer;background:black;color:#FFF;}\
    .valid-btn{margin-right:15px;}\
    .valid-btn.active{color:#000;font-weight:bold;font-size:18px;background:#dbdb38;}\
    .invalid-btn.active{color:#06f5d4;font-weight:bold;font-size:18px;background:#fb5159}\
    .invalid-btn{float:right}\
    .err-msg{color:red}\
    .col-6{width:50%;box-sizing:border-box}\
    .timer-wrapper:after{content:"";display:table;clear:both;}\
    .timer-wrapper>.col-6{display:flex;float: left;background: #3d4639;border-right: 1px solid #000000;border-left: 1px solid #838383;}\
        .timer-wrapper>.col-6>*{flex:1 1 auto;}\
        .timer-wrapper>.col-6>.timer-countdown1,.timer-wrapper>.col-6>.timer-countdown2{font-size:16px;flex: 0 0 auto}\
        .timer-wrapper > .col-6 > *{padding: 4px 0;}\
    \
    \
    \
    .title-section{width:287px; font-size:18px;font-weight: 500;font-family: -apple-system, Helvetica, PingFangSC-Regular, sans-serif;}\
    .title-section .rtitle[line="2"]{background:red}\
    /*\
    .timer-wrapper {font-size:0; margin-bottom:5px;}\
    .timer-wrapper>*{background: #3d4639;}\
    .timer-wrapper .col-6:first-child{border-right:1px solid black}\
    .timer-wrapper .col-6{height:28px;font-size:12px;display:inline-block;text-align:center;}\
    .col-6.timer-countdown1-wrapper, .col-6.timer-countdown2-wrapper{font-size:0;}\
    .timer-wrapper .col-6>*{height:100%;line-height:28px;box-sizing: border-box;font-size: 12px;display:inline-block;vertical-align:bottom;}\
    .t1-minus,.t1-plus,.timer-countdown1, .t2-minus,.timer-countdown2 {border-right:1px solid #FFF}\
    .t1-minus{vertical-align:bottom;padding:0;}\
    */\
    \
    \
    '+ pretty_checkbox()+'\
    .cbx1{width: 100%; margin-bottom:15px;line-height: 22px;background: #282727;}\
    .pretty.p-switch .state label{text-indent:10px;color:gray;transition: all .5s ease;}\
    .pretty.p-switch.p-fill .state{padding:5px 0;transition: all .5s ease; opacity:0.7;}\
    .pretty.p-switch .state:before{top:6px; right:12px;}\
    .pretty.p-switch .state label:after{left:auto;right:26px;top:7px;}\
    .pretty.p-switch.p-fill input:checked~.state label{color:#FFF}\
    .pretty.p-switch.p-fill input:checked~.state label:after{right:calc( 26px - 1em );left:auto}\
    .pretty.p-switch.p-fill input:checked~.state {background-color: #464444; opacity:1;}\
    .pretty.p-switch.p-fill input:checked~.state:before{border-color: #b6fff9;}\
    .hide{display:none;}\
    \
    \
    \
    #shop-url{width;200px;height:150px;vertical-align:top;}\
    .create-iframe,.create-iframe-unfollow{padding:10px;cursor:pointer;}\
    .shopname-section{margin:10px;}\
    </style>');
        
        
        // challenge
        jQuery("body").on("focus", "#shop-url", function(){
            jQuery(this).select();
        });
        jQuery("body").on("click", ".create-iframe", function(){
            let oShop = jQuery("#shop-url").val();
            oShop = JSON.parse( oShop );
            console.log( oShop );
            jQuery.each( oShop, function(i,v){
                jQuery(".challenge-section").append( '<div class="shopname-section" relurl="'+v.url+'"><span class="shopname">' + (i+1) + '/ ' +v.name+'</span>'+'<iframe src="'+v.url+'/?cm=fl"></iframe>'+'</div><hr/>' );
            });
        });
        jQuery("body").on("click", ".create-iframe-unfollow", function(){
            jQuery("iframe").each(function(){
                jQuery(this).attr('src', jQuery(this).parent().attr('relurl') + '/?cm=ufl' );
            });
        });
        
        jQuery("body").on("click", ".shopname", function(){
            if( jQuery(this).parent().find('iframe').length === 0 ){
                jQuery(this).parent().append( '<iframe src="'+jQuery(this).parent().attr('relurl')+'/?cm=fl"></iframe>' );
            }
        });

        // skip shopee live
        jQuery("body").on("click", ".skip-shopee-live", function(){
            bIgnoreShopeeLive = jQuery(this).prop("checked")
            localStorage.setItem( "ignoresplive", bIgnoreShopeeLive )
        })
        jQuery(".skip-shopee-live").prop("checked", bIgnoreShopeeLive)
        
        // get short title
        jQuery("body").on("click", ".short-title-cbx", function(){
            bShortTitleOnly = jQuery(this).prop("checked");
            localStorage.setItem( "short_title", bShortTitleOnly );
        });
        jQuery(".short-title-cbx").prop("checked", bShortTitleOnly);
        
        
        // Coin 200 only
        jQuery("body").on("click", ".coin-200-only-cbx", function(){
            bCoin200Only = jQuery(this).prop("checked");
            localStorage.setItem( "coin_200_only", bCoin200Only );
        });
        jQuery(".coin-200-only-cbx").prop("checked", bCoin200Only)
        
        
        // Manual Continue
        jQuery("body").on("click", ".manual-continue-cbx", function(){
            bManualContinue = jQuery(this).prop("checked");
            localStorage.setItem( "manual_continue", bManualContinue );
        });
        jQuery(".manual-continue-cbx").prop("checked", bManualContinue)
        
        
        

        jQuery("body").on("click", ".start-pause2", function(){
            jQuery(this).toggleClass('active')
        });
        
        

       
        
        
        
        
        // test
        if( undefined == localStorage.getItem('checkRoom') || localStorage.getItem('checkRoom') == "" || localStorage.getItem('checkRoom') == "false" ){
            bCheckRoom = false
        }
        if( bCheckRoom ){
            jQuery('.test').text('Stop test').addClass('active')
        }else{
            jQuery('.test').text('Start test')
        }
        jQuery("body").on("click", ".test", function(){
            jQuery(this).toggleClass("active")
            if( jQuery('.test').hasClass('active') ){
                bCheckRoom = true
                jQuery('.test').text('Stop test')
                localStorage.setItem('checkRoom', true)
            }else{
                bCheckRoom = false
                jQuery('.test').text('Start test')
                localStorage.setItem('checkRoom', false)
            }
            auto2()
        })

        jQuery("head").append('<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,shrink-to-fit=no,viewport-fit=cover">')
        // Pause
        if( undefined == localStorage.getItem('pause-auto') || localStorage.getItem('pause-auto') == "" || localStorage.getItem('pause-auto') == "false" ){
            bPause = false
        }
        if( bPause ){
            jQuery('.start-pause').text('Start')
        }else{
            jQuery('.start-pause').text('Pause')
        }
        jQuery("body").on("click", ".version", function(){
            check_new_version()
        })

        jQuery("body").on("click", ".channel-count,.start-pause", function(){
            bPause = !bPause
            localStorage.setItem('pause-auto', bPause)

            if( bPause ){
                jQuery('.start-pause').text('Start')
            }else{
                jQuery('.start-pause').text('Pause')
                get_channel( sQueryURL )
            }
        })


        // valid invalid
        jQuery("body").on("click", ".valid-btn,.invalid-btn", function(){

            if( jQuery(this).hasClass('active') ) return false

            jQuery(".valid-btn,.invalid-btn").removeClass("active")
            jQuery(this).addClass('active')

            if( jQuery(this).hasClass("valid-btn") ){
                jQuery("body").append('<br/>Force Valid.')

                bForceValid = true
                bForceInvalid = false

                // clearInterval invalid room
                clearInterval( iRoomInvalidInterval )
                jQuery(".invalid-time").text("-")

                // stop check room
                bCheckRoom = false
                jQuery('.test').text('Start test').removeClass('active')
                localStorage.setItem('checkRoom', false)

                let iCoinToCheck = localStorage.getItem('iCoinToCheck')
                if( iCoinToCheck == 'N/A' ){
                    iCoinToCheck = 200000
                }else{
                    iCoinToCheck = parseInt( iCoinToCheck, 10 )
                }

                jQuery(".valid-btn").text( iCoinToCheck )
                if( iCoinToCheck < 200 ){
                    /*
                    *   room 100, valid
                    *   => 1. search room 200 in 3 min
                    *   => 2. after 5 min + extra time: search room 100
                    *
                    */

                    if( bPause == true ){
                        // => 1. search room 200 in 3 min
                        set_auto(200)
                        // set auto to find 100 after 5 min
                        // wait current room finish coin, search another coin
                        jQuery("body").append("<br/>Search 100 coin after 5mins + 6 seconds")
                        // stop auto after 3 mins to prevent lose 100
                        iCheckroomTimer1 = 3*60*1000 + iWaitBeforeJump
                        tick_stop_new_room1( iCheckroomTimer1 )
                        setTimeout(function(){
                            // pause auto
                            bPause = true
                            localStorage.setItem('pause-auto', bPause)
                            jQuery(".start-pause").text('Start')
                        },3*60*1000)
                        get_channel( sQueryURL )

                        iCheckroomTimer2 = 5*60*1000 + iWaitBeforeJump
                        tick_get_new_room2( iCheckroomTimer2 )
                    }
                }else{

                    if( bPause ){
                        set_auto(100)
                        bPause = true
                        localStorage.setItem('pause-auto', bPause)
                        jQuery(".start-pause").text('Start')

                        jQuery("body").append("<br/>Find another room after  5min and " + (iWaitBeforeJump/1000) + "s")
                        
                        iCheckroomTimer2 = 5*60*1000 + iWaitBeforeJump
                        tick_get_new_room2( iCheckroomTimer2 )
                    }
                }


            }else{
                bForceValid = false
                bForceInvalid = true

                let iCoinToCheck = localStorage.getItem('iCoinToCheck')
                if( iCoinToCheck != 'N/A' ){
                    iCoinToCheck = parseInt( iCoinToCheck, 10 )
                }

                jQuery(".invalid-btn").html( iCoinToCheck + '<br/><span class="invalid-time">00:00</span>')

                /*
                *       Find another 100 coin room
                */
                bCheckRoom = false
                jQuery('.test').text('Start test').removeClass('active')
                localStorage.setItem('checkRoom', false)

                // disable view mode
                bDebug = false
                localStorage.setItem('debug', bDebug )
                jQuery(".view-mode").removeClass('active')
                
                // set auto to find 100
                if( bPause == true ){
                    set_auto(100)
                    // find another 100
                    get_channel( sQueryURL )
                }

            }
        })

        // increase, decrease valid time
        jQuery("body").on("click", ".t2-minus,.t2-plus", function(){
            
            if( jQuery(this).hasClass("t2-minus" ) ){
                iCheckroomTimer2 = iCheckroomTimer2 - 5000
            }else{
                iCheckroomTimer2 = iCheckroomTimer2 + 5000
            }
        })

        // press increase time
        var timerIncreaseInterval
        jQuery("body").on("mousedown", ".t2-plus", function(){
            timerIncreaseInterval = window.setInterval(function(){
                iCheckroomTimer2 = iCheckroomTimer2 + 10000
            },500)

        })
        jQuery("body").on("mouseup", ".t2-plus", function(){
            clearInterval( timerIncreaseInterval )
        })
        // press descrease time
        var timerDescreaseInterval
        jQuery("body").on("mousedown", ".t2-minus", function(){
            timerDescreaseInterval = window.setInterval(function(){
                iCheckroomTimer2 = iCheckroomTimer2 - 10000
            },500)

        })
        jQuery("body").on("mouseup", ".t2-minus", function(){
            clearInterval( timerDescreaseInterval )
        })


        jQuery("body").on("click", ".t1-minus,.t1-plus", function(){
            console.log( jQuery(this) )
            if( jQuery(this).hasClass("t1-minus" ) ){
                iCheckroomTimer1 = iCheckroomTimer1 - 2000
            }else{
                iCheckroomTimer1 = iCheckroomTimer1 + 2000
            }
        });

        // Grace face
        jQuery("body").on("click", ".graceface-wrapper", function(e){
            if( e.target == this )
                jQuery(".graceface").click()
        });
        jQuery("body").on("change", ".graceface", function(){

            // console.log( "bgraceface before: " + bGraceFace )
            bGraceFace = jQuery(".graceface").prop("checked")
            // console.log( "bgraceface now: " + bGraceFace )
            localStorage.setItem('graceface', bGraceFace)
        })
        jQuery(".graceface").prop("checked", bGraceFace )

        // Delay
        // Create delay option
        for( let i = 1; i<=5; ++i)
            jQuery("select.delay").append('<option value="'+i+'00">'+i+'00ms</option>')
        jQuery(".delay").val( iDelay )
        if( undefined != localStorage.getItem('delay') && localStorage.getItem('delay') != "" ){
            iDelay = parseInt( localStorage.getItem('delay'), 10 )
            jQuery(".delay").val( iDelay )
        }
        jQuery("body").on("change", ".delay", function(){
            iDelay= jQuery(".delay").val()
            iDelay = parseInt( iDelay, 10 )
            if( isNaN(iDelay) || typeof iDelay !== 'number' || iDelay <=0 ) iDelay = 100
            jQuery(".delay").val( iDelay )
            localStorage.setItem( "delay", iDelay)
        })

        // extra setting
        if( iDelay ){
            jQuery('.delaytime').text( iDelay )
        }
        jQuery("body").on("focus", ".delaytime", function(){
            jQuery(this).select()
        })
        jQuery("body").on("change", ".delaytime", function(){
            let iDelayTimer = jQuery(".delaytime").val().trim()
            if( iDelayTimer.length > 1 && iDelayTimer >= 0 ){
                localStorage.setItem('delay', iDelayTimer)
            }
        })
        jQuery("body").on("keyup", ".delaytime", function(e){
            if( e.which == 13 ){
                jQuery(".delaytime").val( jQuery(".delaytime").val().trim() )
            }
        })



        // Debug - View mode
        bDebug = (localStorage.getItem('debug') == 'true') ? true : false
        if( bDebug ){
            jQuery(".view-only").addClass('active')
        }else{
            jQuery(".view-only").removeClass('active')
        }
        jQuery("body").on("click", ".view-only", function(){
            bDebug = !bDebug
            localStorage.setItem('debug', bDebug )
            if( bDebug ){
                jQuery(".view-only").addClass('active')
            }else{
                jQuery(".view-only").removeClass('active')
            }
        })
        // Create Auto Coin option
        for( let i = 1; i<=6; ++i)
            jQuery("select.auto-coin").append('<option value="'+i+'00">'+i+'00 Xu</option>')
        
        if( undefined != localStorage.getItem('iCoinToEnter') && localStorage.getItem('iCoinToEnter') != "" ){
            iCoinToEnter = parseInt( localStorage.getItem('iCoinToEnter'), 10 )
            jQuery(".auto-coin").val( iCoinToEnter )
        }
        jQuery(".auto-coin").val( iCoinToEnter )
        
        jQuery("body").on("change", ".auto-coin", function(){
            iCoinToEnter= jQuery(".auto-coin").val()
            iCoinToEnter = parseInt( iCoinToEnter, 10 )
            if( isNaN(iCoinToEnter) || typeof iCoinToEnter !== 'number' || iCoinToEnter <=0 ) iCoinToEnter = -1
            jQuery(".auto-coin").val( iCoinToEnter )
            localStorage.setItem( "iCoinToEnter", iCoinToEnter)
        })

        // refresh
        jQuery("body").on("click", ".refresh", function(){
            window.location.href = ""
        })
    }




    var iCheckRoomGetChannelTurn = 1
    function auto2(){

        jQuery("body").append( '<br>Need to checkroom: ' + bCheckRoom.toString() + ". Coin: " + localStorage.getItem('iCoinToCheck') )

        // if prev room is finish
        // get new room
        if( bCheckRoom === false){
            // bPause = false
            // localStorage.setItem('pause-auto', bPause)
            // jQuery(".start-pause").text('Stop')
        }else{
            // need to check prev room is ok or not
            // 1. pause search room
            // 2. check prev room status
            bPause = true;
            localStorage.setItem('pause-auto', bPause);
            jQuery(".start-pause").text('Start');

            // disable check link
            localStorage.setItem('checkRoom', true)

            // jQuery("body").append("<br/>Check link after: "+(iCheckRoomTimer/1000)+" seconds")

            jQuery("body").append("<br><div class='aj-inf'></div><br/>Check link after: ")
            var countdownInt = window.setInterval(function(){
                jQuery("body").append( (iCheckRoomTimer/1000)+"s, ")
                iCheckRoomTimer = iCheckRoomTimer - 1000
            }, 1000)
            // get prev link
            setTimeout( function(){
                clearInterval( countdownInt )

                var sPrefix = 'f9c82eb2-d83d-4b00-bd90-dbf13a8bd968-1642979281833-'
                sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)
                iCheckRoomGetChannelTurn = 1
                checkroom_get_channel( sQueryURL )
            }, iCheckRoomTimer + 1000)
            
        }
    }

    function checkroom_get_channel( sURL ){

        // if( bCheckRoom ) return true

        // console.dir( "\n\n    url: " + sURL )

        jQuery.ajax({
            type: "GET",
            url: sURL,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function(){
                // let stt = jQuery(".channel-count .status")
                // stt.text() != " đang tìm" ? stt.text(' đang tìm') : ""
                jQuery(".aj-inf").text("dang tim;")
            },
            success: function (response) {
                // $iResCount++
                checkroom_analyze_response( response )
            },
            failure: function (msg) {
            }
        });

    }
    
    function checkroom_analyze_response( response ){
        let idToCheck = localStorage.getItem('idToCheck')

        if( response.err_code !== 0 ){
            jQuery(".err-msg").append( "<br/>error: " + response.err_msg );
            return false;
        }

        if( response.data.list.length ){

            bRoomExits = false;
            jQuery.each( response.data.list, function( i,v ){
                if(v.item.session_id == idToCheck){
                    jQuery("body").append("<br/>ID FOUND")
                    // jQuery("body").append("<br/>bSampleDataHasCoin: " + bSampleDataHasCoin.toString() )
                    jQuery("body").append("<br/>Coin undefined: " + (undefined == v.item.coins_per_claim).toString() )

                    if( undefined != v.item.coins_per_claim ){
                        localStorage.setItem('roomValid', 1)
                        jQuery("body").append("<br/>Room found: " + v.item.origin_title + " / " + v.item.nick_name + " / " + v.item.coins_per_claim)
                    }
                    bRoomExits = true
                    return false
                }
                // if( v.item.session_id == idToCheck && (undefined != v.item.coins_per_claim || bSampleDataHasCoin != "" )  ){
                //     // room valid
                //     localStorage.setItem('roomValid', 1)
                //     jQuery("body").append("<br/>Room found: " + v.item.origin_title + " / " + v.item.nick_name + " / " + v.item.coins_per_claim)
                //     bRoomExits = true
                //     return false
                // }
            })

            if( bRoomExits == false ){
                sQueryURL = increase_offset(sQueryURL)
                checkroom_get_channel( sQueryURL )
                //get_channel( sQueryURL )
                
//                var sPrefix = 'f9c82eb2-d83d-4b00-bd90-dbf13a8bd968-1642979281833-'
//                sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)
//                checkroom_get_channel( sQueryURL )
                
            }else{
                finish_check_room()
            }

            // Has more channel, load page 2,3...
            // if( response.data.has_more == false ){
            //     finish_check_room()
            //     return false
            // }else{
            // }

        }else{
            if( iCheckRoomGetChannelTurn === 1 ){
                let sPrefix = 'f9c82eb2-d83d-4b00-bd90-dbf13a8bd968-1642979281833-'
                sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)
                console.log( 'Channel count = 0;' )
                jQuery(".err-msg").append( "<br/>Channel count = 0" )

                iCheckRoomGetChannelTurn++;
                checkroom_get_channel( sQueryURL )
            }else{
                finish_check_room()
            }
        }
    }

    function finish_check_room(){
        //var bRoomValid = false
        if( bForceValid == true ){
            localStorage.setItem('roomValid', 1) 
            return false
        }
        if( localStorage.getItem('roomValid' ) == "0" ){

            jQuery(".invalid-btn").addClass("active")
            jQuery(".valid-btn").removeClass("active")

            // check one more times
            if( localStorage.getItem('iRoomChecked') == 0 ){
                localStorage.setItem('iRoomChecked', 1)

                var sPrefix = 'f9c82eb2-d83d-4b00-bd90-dbf13a8bd968-1642979281833-'
                sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)
                checkroom_get_channel( sQueryURL )
            }else{
                // room invalid
                // find another room 100 coin
                jQuery("body").append('<br/>Room <span style="color:red">invalid</span>, find another 100')

                let iCoinToCheck = localStorage.getItem('iCoinToCheck')
                if( iCoinToCheck == 'N/A' ){
                    iCoinToCheck = 200000
                }else{
                    iCoinToCheck = parseInt( iCoinToCheck, 10 )
                }

                jQuery(".invalid-btn").html( iCoinToCheck + '<br/><span class="invalid-time">00:00</span>')

                // stop check room
                var iRoomInvalidIntervalTimer = 5000
                iRoomInvalidInterval = window.setInterval(function(){

                    jQuery(".invalid-time").text( convert_to_time(iRoomInvalidIntervalTimer) )

                    if( iRoomInvalidIntervalTimer < 0 ){
                        clearInterval( iRoomInvalidInterval )

                        bCheckRoom = false
                        jQuery('.test').text('Start test').removeClass('active')
                        localStorage.setItem('checkRoom', false)

                        // if haven't click start button yet
                        if( bPause ){

                            // set auto to find 100
                            
                            if( bCoin200Only ){
                                set_auto(200)
                            }else{
                                set_auto(100)
                            }

                            // find another 100
                            get_channel( sQueryURL )
                        }

                    }else{
                        iRoomInvalidIntervalTimer = iRoomInvalidIntervalTimer - 1000
                    }

                },1000)
                
            }
        }else{
            jQuery(".valid-btn").addClass("active")
            jQuery(".invalid-btn").removeClass("active")
            //bRoomValid = true
            // find room has coin 200+
            jQuery("body").append('<br/>Room <span style="color:yellow">valid</span>')

            // stop check room
            bCheckRoom = false
            jQuery('.test').text('Start test').removeClass('active')
            localStorage.setItem('checkRoom', false)


            // set auto to find 200+
            let iCoinToCheck = localStorage.getItem('iCoinToCheck')
            if( iCoinToCheck == 'N/A' ){
                iCoinToCheck = 200000
            }else{
                iCoinToCheck = parseInt( iCoinToCheck, 10 )
            }

            jQuery(".valid-btn").text( iCoinToCheck )

            if( iCoinToCheck < 200 ){
                /*
                *   room 100, valid
                *   => 1. search room 200 in 3 min
                *   => 2. after 5 min + extra time: search room 100
                *
                */
                jQuery("body").append('<br/>Find 200 within 3mins.')
                if( bPause ){
                    // => 1. search room 200 in 3 min
                    set_auto(200)
                    // set auto to find 100 after 5 min
                    // wait current room finish coin, search another coin
                    jQuery("body").append("<br/>Search 100 coin after 5mins + 6 seconds")
                    // stop auto after 3 mins to prevent lose 100
                    iCheckroomTimer1 = 3*60*1000 + iWaitBeforeJump
                    tick_stop_new_room1( iCheckroomTimer1 )
                    setTimeout(function(){
                        
                        // stop search 200 coin
                        // pause auto
//                        bPause = true;
//                        localStorage.setItem('pause-auto', bPause);
//                        jQuery(".start-pause").text('Start');
                        
                        // begin search 500 coin
                        set_auto(500);
                    },3*60*1000);
                    get_channel( sQueryURL );

                    // => 2. after 5 min + extra time: search room 100
                    iCheckroomTimer2 = 5*60*1000 + iWaitBeforeJump
                    tick_get_new_room2( iCheckroomTimer2 )
                    // setTimeout(function(){
                    //     set_auto(100)

                    //     // pause auto
                    //     bPause = false
                    //     localStorage.setItem('pause-auto', bPause)
                    //     jQuery(".start-pause").text('Pause')
                    //     get_channel( sQueryURL )
                    // },5*60*1000 + iWaitBeforeJump)

                }


            }else{
                // current room coin is: 200+
                // room valid status = valid
                // search another room has 200+
                if( bCoin200Only ){
                    set_auto(200)
                }else{
                    set_auto(100)
                }
                bPause = true
                localStorage.setItem('pause-auto', bPause)
                jQuery(".start-pause").text('Start')

                jQuery("body").append("<br/>Find another room after  5min and " + (iWaitBeforeJump/1000) + "s")
                
                iCheckroomTimer2 = 5*60*1000 + iWaitBeforeJump
                tick_get_new_room2( iCheckroomTimer2 )
                // setTimeout(function(){
                //     bPause = false
                //     localStorage.setItem('pause-auto', bPause)
                //     jQuery(".start-pause").text('Pause')
                //     get_channel( sQueryURL )
                // },5*60*1000 + iWaitBeforeJump)
                
            }
            
            
        }
        
    }


    // Display time countdown before find another room 100 coin
    function tick_stop_new_room1(){

        clearInterval( iIntervalTickTimer1 )
        iIntervalTickTimer1 = window.setInterval(function(){
            if( iCheckroomTimer1 < 0 ) clearInterval( iIntervalTickTimer1 )
            else{
                jQuery('.timer-countdown1').text( convert_to_time( iCheckroomTimer1 ) )
                iCheckroomTimer1 = iCheckroomTimer1 - 1000
            }

        }, 1000)
        
    }

    // Display time countdown before find another room 100 coin
    function tick_get_new_room2(){

        clearInterval( iIntervalTickTimer2 )
        iIntervalTickTimer2 = window.setInterval(function(){
            if( iCheckroomTimer2 === 0 ){
                clearInterval( iIntervalTickTimer2 );

                /*
                *    get new room
                */
                
                /*
                 * Manual continue:
                 * 1. Stop auto
                 *  1.1 Enable bPause
                 *  1.2 Change text of Start button to Start
                 *  1.3 Change localStorage of pause auto to true
                 * 2. Change View Mode setting
                 *  2.1 200Coin enable => enable View Mode
                 *  2.2 200Coin disable => disable View Mode
                 */
                
                if( bManualContinue ){
                    // 1.1 Enable bPause
                    bPause = true;
                    jQuery(".start-pause").text('Start');
                    localStorage.setItem('pause-auto', bPause);
                    
                    // 2. Change View Mode setting
                    if( bCoin200Only ){
                        jQuery(".auto-coin").val( 200 ).trigger("change");
                    }else{
                        jQuery(".auto-coin").val( 100 ).trigger("change");
                    }
                    bDebug = true;
                    jQuery(".view-mode").addClass('active');
                    localStorage.setItem('debug', bDebug );
                    
                }else{
                
                    if( bPause || ( !bPause && jQuery(".auto-coin").val() === "500" ) ){
                        if( bCoin200Only )
                            set_auto( 200 );
                        else
                            set_auto(100);
                        // pause auto
                        bPause = false;
                        localStorage.setItem('pause-auto', bPause);
                        jQuery(".start-pause").text('Pause');
                        get_channel( sQueryURL );
                    }
                }

            }else{
                jQuery('.timer-countdown2').text( convert_to_time( iCheckroomTimer2 ) )
                iCheckroomTimer2 = iCheckroomTimer2 - 1000
            }
        }, 1000)
        
    }

    // input (ms)
    function convert_to_time( input ){
        let inputTemp = input
        input = parseInt( input / 1000, 10 )
        
        let minute = parseInt( input / 60 )
        let second = parseInt( input % 60 )

        minute = ( "00" + minute ).slice(-2)
        second = ( "00" + second ).slice(-2)

        let output = minute + ":" + second

        return output
    }

    function set_auto( coin ){
        // if( coin == 100 ){
        //     jQuery(".auto-coin").val(100).trigger('change')
        //     bDebug = false
        //     localStorage.setItem('debug', bDebug )
        //     jQuery(".view-mode").removeClass('active')

        // }else if( coin == 200 ){
        //     jQuery(".auto-coin").val(200).trigger('change')
        //     bDebug = true
        //     localStorage.setItem('debug', bDebug )
        //     jQuery(".view-mode").addClass('active')
        // }

//        if( coin === 200 ){
//            jQuery(".auto-coin").val(200).trigger('change');
//            bDebug = true;
//            localStorage.setItem('debug', bDebug );
//            jQuery(".view-mode").addClass('active');
//        }else{
//
//            jQuery(".auto-coin").val(100).trigger('change')
//            bDebug = false;
//            localStorage.setItem('debug', bDebug )
//            jQuery(".view-mode").removeClass('active')
//        }

        jQuery(".auto-coin").val(coin).trigger('change');
        if( coin === 100 ){
            bDebug = false;
            jQuery(".view-mode").removeClass('active');
        }else{
            bDebug = true;
            jQuery(".view-mode").addClass('active');
        }
        
        localStorage.setItem('debug', bDebug );

        bPause = false;
        localStorage.setItem('pause-auto', bPause)
        jQuery(".start-pause").text('Pause')
    }

    function get_channel( sURL ){
        bForceValid = false, bForceInvalid = false

        if( bPause ) return true

        jQuery.ajax({
            type: "GET",
            url: sURL,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function(){
                jQuery(".channel-count span").text( '_' )
            },
            success: function (response) {
                $iResCount++
                let offset = sURL.split('offset=')[1].split('&')[0]
                offset = parseInt( offset, 10 )
                jQuery(".channel-count span").text( offset + response.data.list.length )
                analyze_response( response )
            },
            failure: function (msg) {
            }
        });

    }

    function analyze_response( response ){

        let bIgnore = false
        let millis = Date.now() - iIgnoreTime
        if( millis/1000 < 300 ) bIgnore = true

        if( response.data.list.length == 0 ){
            setTimeout( function(){
                // length 0 <=> no room, need new CTX ID to load new room
                // sQueryURL = sBaseURL + '&ctx_id='+ getRandomInt( 1, 100 )

                var sPrefix = 'f9c82eb2-d83d-4b00-bd90-dbf13a8bd968-1642979281833-'
                sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)

                get_channel( sQueryURL )
            },iDelay )
        }else{

            var bHasCoin = false
            let iCoinMax = 0
            bOpened = false

            jQuery.each( response.data.list, function( i,v ){

                if( aIgnorePermanent.indexOf( v.item.real_username ) != -1 ){
                    // in ignore list
                    return false
                }

                if( bIgnoreShopeeLive == true ){
                    if( jQuery.trim( v.item.nick_name ).toLowerCase().indexOf( "shopee" ) != -1 ){
                        if( v.item.coins_per_claim < 500 ){
                            append_ignore_channel(v, 'ignore100' )
                            return false
                        }
                    }
                }

                if( aIgnore100.indexOf( v.item.real_username ) != -1 ){

                    if( undefined != v.item.coins_per_claim ){
                        if( v.item.coins_per_claim < 200 ){
                            append_ignore_channel(v, 'ignore100' )
                            return false
                        }
                    }
                }
                
                if( bSampleData && v.item.session_id == idToFind ){
                //if( bSampleData && i < 10 ){
                    if( undefined == v.item.coins_per_claim ){
                        v.item.coins_per_claim = "100"
                    }
                    //console.log( v )
                    //append_new_channel(v)
                    //open_universal_link( v.item.session_id )
                    //return false
                }

                if( roomToFind != "" && jQuery.trim( v.item.origin_title ).toLowerCase().indexOf( roomToFind ) != -1 ){
                    if( undefined == v.item.coins_per_claim ){
                        v.item.coins_per_claim = "N/A"
                    }
                    append_new_channel(v)
                }else if( aPriorityUS.indexOf( v.item.real_username ) != -1 ){

                    // console.dir(v)

                    if( undefined == v.item.coins_per_claim ){
                        v.item.coins_per_claim = "N/A"
                    }
                    append_new_channel(v)
                    if( bGraceFace == true ){
                        // console.log( 'opened grace face')
                        open_universal_link( v.item.session_id )
                    }else{
                        // console.log("I am not open graceface, bGraceFace false ")
                    }

                   // return // continue each
                }



                if( undefined != v.item.coins_per_claim  && "N/A" != v.item.coins_per_claim ){
                    if( v.item.coins_per_claim <= iMaxCoinAllow ){
                        bHasCoin = true
                        if( v.item.coins_per_claim > iCoinMax ) 
                            iCoinMax = v.item.coins_per_claim
                    }
                    
                }
            })

            jQuery.each( response.data.list, function( i,v ){

                if( aIgnorePermanent.indexOf( v.item.real_username ) != -1 ){
                    // in ignore list
                    return false
                }
                     
                // If room has coin, room's coin is biggest
                if( undefined != v.item.coins_per_claim && v.item.coins_per_claim == iCoinMax ){
                    // ignore room
                    if( bIgnore && iIgnoreRoom == v.item.session_id ){
                        append_ignore_channel(v, 'prepend' )
                        return // continue loop
                    }

                    // normal room
                    
                    append_new_channel(v)
                    if( !bDebug ){
                        if( title_good( v ) ){
                            console.log( "before open universal link1" )
                            console.dir( v )
                            bOpened = true
                            open_universal_link( v.item.session_id )
                            return false;
                        }else{
                            console.log( "title not good 1")
                            //return true;
                        }
                    }else{
                        // view mode on;
                        if( iCoinToEnter != -1 && v.item.coins_per_claim >= iCoinToEnter ){
                            if( title_good( v ) ){
                                //alert("title is good")
                                //console.log( "before open universal link" )
                                console.log( "before open universal link2" )
                                console.dir( v )
                                bOpened = true
                                open_universal_link( v.item.session_id )
                                return false;
                            }else{
                                console.log( "title not good 2")
                                return true;
                            }
                        }
                        //console.log( v )
                    }

                }else{
                    // if( bDebug ){
                    //     append_new_channel(v)
                    // }

                }
            })

            if( !bHasCoin || ( bDebug && bHasCoin ) ){
                // !has_more => create new ctx and load data again
                if( response.data.has_more == false ){
                    // console.log( 'has_more false1' )
                    setTimeout( function(){
                        // length 0 <=> no room, need new CTX ID to load new room
                        // sQueryURL = sBaseURL + '&ctx_id='+ getRandomInt( 1, 100 )

                        var sPrefix = 'f9c82eb2-d83d-4b00-bd90-dbf13a8bd968-1642979281833-'
                        sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)

                        get_channel( sQueryURL )
                    },iDelay )
                }else{
                    // has_more => load more data
                    // load page 2
                    setTimeout( function(){

                        /*
                        // loaded page 1, now load page 2
                        if( sQueryURL.indexOf(sBaseURL) != -1 ){
                            
                            sQueryURL = sQueryURL.substring( sBaseURL.length )
                            sQueryURL = sBaseURL2 + sQueryURL
                        }else{
                            // loaded page 2, now load page 1 with different param
                            sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)
                        }
                        get_channel( sQueryURL )
                        /**/
                        
                        
                        // console.log( 'has_more1' )
                        sQueryURL = increase_offset( sQueryURL )
                        get_channel( sQueryURL )
                    },iDelay )
                }
            }else{
                
                // >2 room has coin, has ignore room, ignore room coin is highest coin
                // => code not click any room. need to click another room
                if( !bOpened ){
                    
                    jQuery.each( response.data.list, function( i,v ){

                        if( aIgnorePermanent.indexOf( v.item.real_username ) != -1 ){
                            // in ignore list
                            return false
                        }

                        // ignore room
                        if( bIgnore && iIgnoreRoom == v.item.session_id ){
                            append_ignore_channel(v, 'prepend' )
                            return // continue loop
                        }
                        // normal room
                        if( undefined != v.item.coins_per_claim ){
                            // normal room
                            //bOpened = true
                            append_new_channel(v)
                            if( !bDebug ){
                                if( title_good( v ) ){
                                    //alert("title is good")
                                    //console.log( "before open universal link" )
                                    console.log( "before open universal link3" )
                                    console.dir( v )
                                    bOpened = true
                                    open_universal_link( v.item.session_id )
                                    return false;
                                }else{
                                    console.log( "title not good 3")
                                    return true;
                                }
                                
                                // window.location.href = 'https://live.shopee.vn/universal-link/middle-page?type=live&id='+v.item.session_id+'&deep_and_deferred=1#share'
                                return false
                            }else{
                                // view mode on;
                                if( iCoinToEnter != -1 && v.item.coins_per_claim >= iCoinToEnter ){
                                    if( title_good( v ) ){
                                        //alert("title is good")
                                        //console.log( "before open universal link" )
                                        console.log( "before open universal link4" )
                                        console.dir( v )
                                        bOpened = true
                                        open_universal_link( v.item.session_id )
                                        return false;
                                    }else{
                                        console.log( "title not good 4")
                                        return true;
                                    }
                                    //open_universal_link( v.item.session_id )
                                    // window.location.href = 'https://live.shopee.vn/universal-link/middle-page?type=live&id='+v.item.session_id+'&deep_and_deferred=1#share'
                                    return false;
                                }
                                //console.log( v )
                            }
                        }

                    })

                    if( !bOpened ){

                        
                        if( response.data.has_more == false ){
                            // console.log( 'has more false 2')
                            setTimeout( function(){
                                // TODO: change sQueryURL to new url
                                var sPrefix = 'f9c82eb2-d83d-4b00-bd90-dbf13a8bd968-1642979281833-'
                                sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)

                                get_channel( sQueryURL )
                            },iDelay )
                        }else{
                            // has_more => load more data
                            // load page 2
                            setTimeout( function(){
                                /*
                                // loaded page 1, now load page 2
                                if( sQueryURL.indexOf(sBaseURL) != -1 ){
                                    
                                    sQueryURL = sQueryURL.substring( sBaseURL.length )
                                    sQueryURL = sBaseURL2 + sQueryURL
                                }else{
                                    // loaded page 2, now load page 1 with different param
                                    sQueryURL = sBaseURL + '&ctx_id=' + sPrefix + Date.now() + '-' + getRandomInt( 300000, 700000)
                                }
                                
                                get_channel( sQueryURL )
                                /**/

                                // console.log( 'has_more2')
                                sQueryURL = increase_offset( sQueryURL )
                                get_channel( sQueryURL )
                            },iDelay )

                        }

                    }
                }
            }
        }
    }
    
    // no title => return false
    // title 2 row => return false
    // title 1 row => return true
    function title_good( v ){
        if( bShortTitleOnly === true ){
        
            if( !jQuery(".title-section .rtitle[relid='"+v.item.session_id+"']").length ){
                return false;
            }

            let height = jQuery("div[relid='"+v.item.session_id+"']").height();
            if( height < 15 || 30 < height ) return false;
            return true;
        }
        
        return true;
    }


    jQuery("body").on("click", ".new-channel", function(){
        if( bClickedRoom == true ) return

        var iChannelID = jQuery(this).attr('id')
        open_universal_link( iChannelID )

    })

    function open_universal_link( $iChannelID ){

        // 'https://live.shopee.vn/universal-link/middle-page?type=live&id='+v.item.session_id+'&deep_and_deferred=1#share'
        // 'https://live.shopee.vn/universal-link/middle-page?type=live&id='+iChannelID+'&deep_and_deferred=1#share'

        let aRoomInfo = jQuery("#"+$iChannelID).text().split(" ")
        let sRoomTitle = remove_sp_char( jQuery("#"+$iChannelID + " .room-title").text() )
        sRoomTitle  = b64EncodeUnicode( sRoomTitle )
        let sRoomHost = b64EncodeUnicode( remove_sp_char( jQuery("#"+$iChannelID + " .room-host").text() ) )
        let sRoomCoin = jQuery("#"+$iChannelID + " .coin").text()
        let sRoomViews = jQuery("#"+$iChannelID + " .views").text()
        let accu = jQuery("#"+$iChannelID + " .appear").text()
        if( sRoomCoin.indexOf(' Xu') != -1 ) sRoomCoin = sRoomCoin.split(" Xu")[0]
        if( sRoomViews.indexOf(' views') != -1 ) sRoomViews = sRoomViews.split(" views")[0]
        
        // console.log('id: ' + $iChannelID )
        // console.dir( 'https://live.shopee.vn/universal-link/middle-page?type=live&id='+$iChannelID+'&deep_and_deferred=1&room_title='+sRoomTitle+'&room_host='+sRoomHost+'&room_coin='+sRoomCoin+'&room_view='+sRoomViews+'&acu='+accu+'#share' )
        

        if( sRoomCoin != "N/A" ){
            localStorage.setItem('pause-auto', true)
            localStorage.setItem('checkRoom', true)
            localStorage.setItem('idToCheck', $iChannelID)
            localStorage.setItem('iCoinToCheck', sRoomCoin)
            localStorage.setItem('roomValid', 0)
            localStorage.setItem('iRoomChecked', 0)
           
            setTimeout(function(){
                window.location.href = window.location.href
            },3000)
        }

        window.location.href = 'https://live.shopee.vn/universal-link/middle-page?type=live&id='+$iChannelID+'&deep_and_deferred=1&room_title='+sRoomTitle+'&room_host='+sRoomHost+'&room_coin='+sRoomCoin+'&room_view='+sRoomViews+'&acu='+accu+'#share'

    }
}


function remove_sp_char( x ){
    //str = '  ❌❌❌ Xã hàng thanh lý 10-20-30k❌❌❌';
    specialChars = /[^a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ ]/;
    return x.split(specialChars).join("?");
}


function increase_offset( sQueryURL ){

    let sNewQueryURL = sQueryURL.split("&offset=")
    let iNewOffset = sNewQueryURL[1].split('&limit=50')[0]
    iNewOffset = parseInt( iNewOffset, 10 ) + 50
    sNewQueryURL[0] += '&offset='
    sNewQueryURL[1] = '&limit=50' + sNewQueryURL[1].split('&limit=50')[1]

    // console.dir( iNewOffset )
    // console.dir( "(increase_offset)----- New url: " + sNewQueryURL[0] + iNewOffset + sNewQueryURL[1] )

    return sNewQueryURL[0] + iNewOffset + sNewQueryURL[1]

}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}


//https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function append_new_channel(v){
    if( !jQuery("#"+v.item.session_id).length ){
        v.item.origin_title = jQuery.trim(v.item.origin_title)
        v.item.nick_name = jQuery.trim(v.item.nick_name)

        let point = 0
        let iEQ = 2
        let iMaxlength = 12 
        let sRoomTitle = v.item.origin_title.slice(0,iMaxlength)
        if( v.item.origin_title.length > iMaxlength )
            sRoomTitle = sRoomTitle.slice(0, iMaxlength-3) + "..."

        let sRoomHost = v.item.nick_name.slice(0,iMaxlength)
        if( v.item.origin_title.length > iMaxlength )
            sRoomHost = sRoomHost.slice(0, iMaxlength-3) + "..."

        let iCoin = v.item.coins_per_claim
        if( iCoin != "N/A" ) iCoin += " Xu"

        if( undefined === v.item.coins_per_claim ) v.item.coins_per_claim = 0
        if( "N/A" === v.item.coins_per_claim ) point = 500
        else point = v.item.coins_per_claim

        if( point > 200 ){
            iEQ = 0
        }else if( point == 200 ){
            iEQ = 1
        }
        

        jQuery(".wrapper >.row:eq("+iEQ+") >.col:eq(0)").after('<div id="'+v.item.session_id+'" class="new-channel">' +
            '<p class="room-title">' +sRoomTitle + '</p>'+
            '<p class="room-host">' + sRoomHost + '</p>\
            <span class="coin" style="color:yellow">'+v.item.coins_per_claim+'</span>\
            <div><span class="views">'+v.item.ccu+' </span>/ \
            <span class="appear">0</span></div></div>')
        jQuery(".wrapper >.row:eq("+iEQ+") >*:last-child").remove()
        
        // if( screen.width > 1500 )
        //     jQuery("#"+v.item.session_id ).next().click()
    }else{
        let iChannelAppear = parseInt( jQuery("#"+v.item.session_id + ' .appear').text(), 10 )
        if( "N/A" != v.item.coins_per_claim ){
            // jQuery("#"+v.item.session_id + ' .coin').html( v.item.coins_per_claim + " Xu" )
            jQuery("#"+v.item.session_id + ' .coin').html( v.item.coins_per_claim )
        }
        else{
            jQuery("#"+v.item.session_id + ' .coin').html( v.item.coins_per_claim )
        }
        jQuery("#"+v.item.session_id + ' .views').text( v.item.ccu + " ")
        jQuery("#"+v.item.session_id + ' .appear').text( (iChannelAppear+1) )
        jQuery("#"+v.item.session_id + ' .ignore').remove()
    }

    append_new_title( v )
    jQuery("#"+v.item.session_id ).removeClass('ignore')
}

function append_new_title( v ){
    
    if( bShortTitleOnly === false ){
        return false;
    }
    //title not exists, prepend fisrt, remove last
    if( !jQuery(".title-section .rtitle[relid='"+v.item.session_id+"']").length ){
        jQuery(".title-section").prepend( '<div class="rtitle" relid="'+v.item.session_id+'">'+v.item.origin_title+'</div>' )
        jQuery(".rtitle:last-child").remove()
        
        if( jQuery(".title-section .rtitle[relid='"+v.item.session_id+"']").height() >= 30 ){
            jQuery(".title-section .rtitle[relid='"+v.item.session_id+"']").attr("line",2);
        }else{
            jQuery(".title-section .rtitle[relid='"+v.item.session_id+"']").attr("line",1);
        }
    }else{
        // title exists, update title
        //jQuery(".title-section .rtitle[relid='"+v.item.session_id+"']").text( v.item.origin_title )
    }
}

function append_ignore_channel(v, mode){
    let millis = Date.now() - iIgnoreTime
    millis = Math.floor(300 - millis/1000)


    v.item.origin_title = jQuery.trim(v.item.origin_title)
    v.item.nick_name = jQuery.trim(v.item.nick_name)
    let point = 0
    let iEQ = 2
    let iMaxlength = 12 
    let sRoomTitle = v.item.origin_title.slice(0,iMaxlength)
    if( v.item.origin_title.length > iMaxlength )
        sRoomTitle = sRoomTitle.slice(0, iMaxlength-3) + "..."

    let sRoomHost = v.item.nick_name.slice(0,iMaxlength)
    if( v.item.origin_title.length > iMaxlength )
        sRoomHost = sRoomHost.slice(0, iMaxlength-3) + "..."

    let iCoin = v.item.coins_per_claim
    if( iCoin != "N/A" ) iCoin += " X.u"

    if( undefined === v.item.coins_per_claim ) v.item.coins_per_claim = 0
    if( "N/A" === v.item.coins_per_claim ) point = 500
    else point = v.item.coins_per_claim

    if( point > 200 ){
        iEQ = 0
    }else if( point == 200 ){
        iEQ = 1
    }

    if( !jQuery("#"+v.item.session_id).length ){
        if( jQuery(".wrapper >.row").length ){
            jQuery(".wrapper >.row:eq("+iEQ+") >.col:eq(0)").after('<div id="'+v.item.session_id+'" class="new-channel ignore">' +
                    '<p class="room-title">' +sRoomTitle + '</p>'+
                    '<p class="room-host">' + sRoomHost + '</p>\
                    <span class="coin" style="color:yellow">'+v.item.coins_per_claim+'</span>\
                    <div><span class="views">'+v.item.ccu+' views</span> / \
                    <span class="appear">0</span></div></div>')
        }else{
            jQuery("body").prepend('<div id="'+v.item.session_id+'" class="new-channel ignore">' +
                    '<p class="room-title">' +sRoomTitle + '</p>'+
                    '<p class="room-host">' + sRoomHost + '</p>\
                    <span class="coin" style="color:yellow">'+v.item.coins_per_claim+'</span>\
                    <div><span class="views">'+v.item.ccu+' views</span> / \
                    <span class="appear">0</span></div></div>')
        }
        if( millis > 0 || mode == "ignore100" ){
            if( localStorage.getItem("ignore-room") == v.item.session_id )
                jQuery("#"+v.item.session_id).append('<div class="ignore-time">'+millis+'s</div>')
        }
        if( jQuery(".wrapper >.row:eq("+iEQ+") >*").length > 1 )
            jQuery(".wrapper >.row:eq("+iEQ+") >*:last-child").remove()
    }else{
        let iChannelAppear = parseInt( jQuery("#"+v.item.session_id + ' .appear').text(), 10 )
        if( "N/A" != v.item.coins_per_claim ){
            // jQuery("#"+v.item.session_id + ' .coin').html( v.item.coins_per_claim + " Xu" )
            jQuery("#"+v.item.session_id + ' .coin').html( v.item.coins_per_claim )
        }
        else{
            jQuery("#"+v.item.session_id + ' .coin').html( v.item.coins_per_claim )
        }
        jQuery("#"+v.item.session_id + ' .views').text( v.item.ccu + " views")
        jQuery("#"+v.item.session_id + ' .appear').text( (iChannelAppear+1) )
        jQuery("#"+v.item.session_id + ' .ignore-time').text( millis + 's' )
    }


    // if( !jQuery("#"+v.item.session_id).length ){
    //     if( mode == 'prepend' ){
    //         jQuery("body").prepend('<div id="'+v.item.session_id+'" class="new-channel">\
    //             &ensp;&ensp;' + v.item.origin_title + '<br/>\
    //             &ensp;&ensp;<span class="host">' + v.item.nick_name + '</span><br/>\
    //             <span class="coin" style="color:yellow">&ensp;&ensp;'+v.item.coins_per_claim+' </span>Xu<br/>\
    //             &ensp;&ensp;<span class="views">'+v.item.ccu+'</span> views<br/>\
    //             &ensp;&ensp;<span class="appear">0a</span></div><button class="click-to-copy" rel="'+v.item.session_id+'>Copy</button>')
    //         if( screen.width > 1500 )
    //             jQuery("#"+v.item.session_id).next().click()
    //     }else{
    //         jQuery("body").append('<div id="'+v.item.session_id+'" class="new-channel">\
    //             &ensp;&ensp;' + v.item.origin_title + '<br/>\
    //             &ensp;&ensp;<span class="host">' + v.item.nick_name + '</span><br/>\
    //             <span style="color:yellow">&ensp;&ensp;'+v.item.coins_per_claim+' </span>Xu<br/>\
    //             &ensp;&ensp;<span class="views">'+v.item.ccu+'</span> views<br/>\
    //             &ensp;&ensp;<span class="appear">0</span></div><button class="click-to-copy" rel="'+v.item.session_id+'">Copy</button>')
    //         if( screen.width > 1500 )
    //             jQuery("#"+v.item.session_id).next().click()
    //     }

    //     if( millis > 0 ){
    //         if( localStorage.getItem("ignore-room") == v.item.session_id )
    //             jQuery("#"+v.item.session_id).append('<div class="ignore">&ensp;&ensp;Bo qua trong: '+millis+'s</div>')
    //     }

    //     if( undefined !== v.item.acu ){
    //         jQuery("#"+v.item.session_id + ' .appear').text( v.item.acu )
    //     }
    // }else{
    //     let iChannelAppear = parseInt( jQuery("#"+v.item.session_id + ' .appear').text(), 10 )
    //     jQuery("#"+v.item.session_id + ' .views').text( v.item.ccu )
    //     jQuery("#"+v.item.session_id + ' .appear').text( (iChannelAppear+1) )
    //     jQuery("#"+v.item.session_id + ' .ignore').text( 'Bo qua trong: '+millis + 's' )
    // }
}

function step_2(){
    var sAll = 'https://live.shopee.vn/api/v1/lptab/item?tab_id=592041455214080&tab_type=2&offset=0&limit=50'
    // var sSanXu = 'https://live.shopee.vn/api/v1/lptab/item?tab_id=1462481064005120&tab_type=2&offset=0&limit=50';
    /*jshint multistr: true */
    jQuery('head').append('<style>\
    .click-to-copy{padding:10px;vertical-align: bottom;}\
    .new-channel {\
        max-width: 38%;\
        box-sizing: border-box;\
        vertical-align: bottom;\
        font-size:12px;\
        margin-bottom:10px;\
        border: 1px solid gray;\
        display: inline-block;\
        padding: 5px 10px 5px 0;\
        float:left;\
    }\
    .host{\
        color: #ff00d4;\
        padding: 5px 0;\
        display: inline-block;\
    }\
    .continue{margin-top:2px}\
    .continue, button.ignore {\
        width: 200px;\
        max-width:60%;\
        color: white;\
        padding: 11px 0;\
        text-decoration: none;\
        text-align:center;\
        box-sizing:border-box;\
        display: block;\
        text-transform: uppercase;\
        font-family: Arial;\
        font-size: 20px;\
        font-weight: 600;\
        letter-spacing: 1px;\
        border-radius: 25px;\
        background-image: linear-gradient(to right top, #bb0444, #c3126a, #c12e91, #b24ab8, #9564db, #727ff0, #4796fb, #00a9ff, #00c0ff, #00d6ff, #00e9fb, #5ffbf1);\
        float:right;\
    }\
    body{background:#000;color:#FFF}\
    /*.view-only{position:fixed; right:0;top:5px;padding:10px 15px; cursor:pointer;}\
    .view-only{background:gray;color:#ad9f9f;width: 20%;height: 100px;font-size: 30px;}\
    .view-only.active{background:#309f2c;color:yellow;}*/\
    \
    \
    \
    .graceface{width:30px;height:30px;}\
    .wrapper{font-family: sans-serif; font-size: 14px; color: #ffffff; padding-top: 60px;}\
    .view-only{top:150px; background:gray;color:#ad9f9f;margin-bottom:0}\
    .view-only.active{background:#309f2c;color:yellow}\
    .wrapper > .row, .main-menu{min-height: 60px;background: #222222;display: flex;flex-flow: row wrap;border-bottom: 1px solid #484848;}\
    .main-menu{position: fixed;top: 0;left: 0;right: 0;}\
    .wrapper > .row > div, .main-menu > div{text-align:center;border-left: 1px solid #484848;border-right: 1px solid #000000;flex: 1;display: flex;flex-flow: column wrap;justify-content: center;align-items: center;}\
    .wrapper .row *, .play, .view-mode, .refresh{user-select:none}\
    .main-menu{cursor:pointer}\
    .main-menu > div.play{flex-direction: row;justify-content: center;flex-basis: 15%;}\
    .main-menu > .play > .button-group{width: 100%;display: flex;flex-flow: row wrap;text-align: left;}\
    .button-group > span {flex: 1;display: inline-block;border-radius: 2px;background: #303030;margin: 1px;padding: 15px 0;}\
    .button-group > span.text-play {flex-basis: 40%;}\
    .text-play, .channel-count{font-size: 12px;}\
    .main-menu > div.refresh{display:none}\
    .auto-coin-wrapper{max-width:70px;}\
    .graceface-wrapper{max-width:50px}\
    .button-group > span.minus, .button-group > span.plus{display:none}\
    body{padding-top:55px}\
    </style>')

    var bDebug = false

    jQuery( "body" ).append('<a class="continue" href="'+sAll+'">Tìm Tiếp</a>')
    jQuery( "body" ).append('<button style="margin-top:2px;" class="ignore">Ignore</button>')
    // jQuery( "body" ).append('<button style="margin-top:10px;" class="ignore">Ignore</button><button class="view-only">View Mode</button>')
    jQuery("body").on("click", ".ignore", function(){
        localStorage.setItem( "ignore-room", getUrlParameter('id') )
        let ignoreTime = Date.now()
        localStorage.setItem( "ignore-time", ignoreTime )
        jQuery('body').append('<br/>ignored {'+getUrlParameter('id')+','+ignoreTime+'}')
    })

    jQuery("head").append('<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,shrink-to-fit=no,viewport-fit=cover">')

    jQuery("body").append('<div class="wrapper">\
        <div class="main-menu">\
            <div class="play">\
                <div class="button-group">\
                    <span class="minus">-</span>\
                    <span class="text-play start-pause">Play</span>\
                    <span class="plus">+</span>\
                </div>\
                <div class="channel-count">0/<span>1</span></div>\
            </div>\
            <div class="view-mode view-only">View Mode</div>\
            <div class="refresh">refresh</div>\
            <div class="auto-coin-wrapper"><select class="auto-coin"><option value="-1">Select</option></select></div>\
            <div class="graceface-wrapper"><input type="checkbox" class="graceface"/></div>\
        </div>\
    </div>')


    // Play
    jQuery("body").on("click", ".channel-count,.start-pause", function(){
        window.location.href = jQuery(".continue").attr("href")
    })

    // Debug
    bDebug = (localStorage.getItem('debug') == 'true') ? true : false
    if( bDebug ){
        jQuery(".view-only").addClass('active')
    }else{
        jQuery(".view-only").removeClass('active')
    }
    jQuery("body").on("click", ".view-only", function(){
        bDebug = !bDebug
        localStorage.setItem('debug', bDebug )
        if( bDebug ){
            jQuery(".view-only").addClass('active')
        }else{
            jQuery(".view-only").removeClass('active')
        }
    })

    // auto coin
    var iCoinToEnter = -1
    for( let i = 1; i<=6; ++i)
        jQuery("select.auto-coin").append('<option value="'+i+'00">'+i+'00 Xu</option>')
    if( undefined != localStorage.getItem('iCoinToEnter') && localStorage.getItem('iCoinToEnter') != "" ){
        iCoinToEnter = parseInt( localStorage.getItem('iCoinToEnter'), 10 )
        jQuery(".auto-coin").val( iCoinToEnter )
    }
    jQuery(".auto-coin").val( iCoinToEnter )

    jQuery("body").on("change", ".auto-coin", function(){
        iCoinToEnter= jQuery(".auto-coin").val()
        iCoinToEnter = parseInt( iCoinToEnter, 10 )
        if( isNaN(iCoinToEnter) || typeof iCoinToEnter !== 'number' || iCoinToEnter <=0 ) iCoinToEnter = -1
        jQuery(".auto-coin").val( iCoinToEnter )
        localStorage.setItem( "iCoinToEnter", iCoinToEnter)
    })


    // Grace face
    var bGraceFace = false
    //sGraceFaceNICKNAME = "BẾP CỦA MẸ ONICI"
    if( undefined == localStorage.getItem('graceface') || localStorage.getItem('graceface') == ""|| localStorage.getItem('graceface') == "false" ){
        bGraceFace = false
    }else{
        bGraceFace = true
    }
    jQuery("body").on("click", ".graceface-wrapper", function(e){
        if( e.target == this )
            jQuery(".graceface").click()
    })
    jQuery("body").on("change", ".graceface", function(){

        // console.log( "bgraceface before: " + bGraceFace )
        bGraceFace = jQuery(".graceface").prop("checked")
        // console.log( "bgraceface now: " + bGraceFace )
        localStorage.setItem('graceface', bGraceFace)
    })
    jQuery(".graceface").prop("checked", bGraceFace )

    if( getUrlParameter('room_title') ){
        var oRoom = {}
        oRoom.item = {}
        oRoom.item.session_id = getUrlParameter('id')
        oRoom.item.origin_title = b64DecodeUnicode(getUrlParameter('room_title'))
        oRoom.item.nick_name = b64DecodeUnicode(getUrlParameter('room_host'))
        oRoom.item.coins_per_claim = getUrlParameter('room_coin')
        oRoom.item.ccu = getUrlParameter('room_view')
        oRoom.item.acu = getUrlParameter('acu')

        append_ignore_channel( oRoom, 'prepend')
    }

    jQuery(document).ready(function(){

        let iCoin = getUrlParameter('room_coin')
        if( iCoin != "N/A" ){

            setTimeout(function(){
                localStorage.setItem('pause-auto', true)
                localStorage.setItem('checkRoom', true)
                localStorage.setItem('idToCheck', getUrlParameter('id'))
                localStorage.setItem('iCoinToCheck', getUrlParameter('room_coin'))
                localStorage.setItem('roomValid', 0)
                localStorage.setItem('iRoomChecked', 0)
                window.location.href = jQuery(".continue").attr("href")
            },2000)


            // if( parseInt( iCoin ) < 200 ){
            //     setTimeout(function(){
            //         localStorage.setItem('pause-auto', true)
            //         localStorage.setItem('checkRoom', true)
            //         localStorage.setItem('idToCheck', getUrlParameter('id'))
            //         localStorage.setItem('roomValid', 0)
            //         localStorage.setItem('iRoomChecked', 0)
            //         window.location.href = jQuery(".continue").attr("href")
            //     },1000)
            // }else{
            //     setTimeout(function(){
            //         window.location.href = jQuery(".continue").attr("href")
            //     }, 5*60*1000+6000)
            // }
        }
    })

}


function check_new_version(){
    jQuery.get('https://raw.githubusercontent.com/doiboroi/test/main/version.dat?ver='+getRandomInt(1,100), function(v){
        if( iVersion != jQuery.trim(v) ){
            jQuery(".version").html( 'Version: '+iVersion+'<br/><span class="warning">Lastest:&nbsp; ' + v + '</span>')
        }else{
            jQuery(".version").html( 'Version: '+iVersion+'<br/>Lastest:&nbsp; ' + v)
        }
    })
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
    document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
    }
};

jQuery("body").on("click", ".click-to-copy", function(){

    jQuery(this).addClass('clicked')
    window.setTimeout( (e)=>{e.removeClass('clicked'); },2000, $(this) )
    let aRoomInfo = jQuery("#"+jQuery(this).attr('rel') ).text().split("      ")
    let sRoomTitle = fixedEncodeURIComponent( aRoomInfo[1] )
    let sRoomHost = fixedEncodeURIComponent( aRoomInfo[2] )
    let sRoomCoin = fixedEncodeURIComponent( aRoomInfo[3].split(" Xu")[0] )
    let sRoomViews = fixedEncodeURIComponent( aRoomInfo[4].split(" views")[0] )
    let accu = fixedEncodeURIComponent( aRoomInfo[5] )

    copyToClipboard( aRoomInfo[1] + '\n' + aRoomInfo[2] + '\n' + 'https://live.shopee.vn/middle-page?type=live&id='+jQuery(this).attr('rel')+'&deep_and_deferred=1#share' )
    if( jQuery(".start-pause").text() !== "Start" ) {
        jQuery(".start-pause").click();
    }

    action_after_click()
})



if( screen.width > 1500 ){
    computer_process()
}


function computer_process(){
    jQuery('head').append('<style>\
        .clicked{background:cyan}\
    ')

    // jQuery("body").on("mouseover", ".new-channel", function(){
    //     jQuery(this).next().click()
    // })

    action_after_click = function(){
        console.log('clicked')
    }
}

function pretty_checkbox(){
    return ".pretty *{box-sizing:border-box}.pretty input:not([type=checkbox]):not([type=radio]){display:none}.pretty{position:relative;display:inline-block;margin-right:1em;white-space:nowrap;line-height:1}.pretty input{position:absolute;left:0;top:0;min-width:1em;width:100%;height:100%;z-index:2;opacity:0;margin:0;padding:0;cursor:pointer}.pretty .state label{position:initial;display:inline-block;font-weight:400;margin:0;text-indent:1.5em;min-width:calc(1em + 2px)}.pretty .state label:after,.pretty .state label:before{content:'';width:calc(1em + 2px);height:calc(1em + 2px);display:block;box-sizing:border-box;border-radius:0;border:1px solid transparent;z-index:0;position:absolute;left:0;top:calc((0% - (100% - 1em)) - 8%);background-color:transparent}.pretty .state label:before{border-color:#bdc3c7}.pretty .state.p-is-hover,.pretty .state.p-is-indeterminate{display:none}@-webkit-keyframes zoom{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@keyframes zoom{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@-webkit-keyframes tada{0%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0;-webkit-transform:scale(7);transform:scale(7)}38%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;opacity:1;-webkit-transform:scale(1);transform:scale(1)}55%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-transform:scale(1.5);transform:scale(1.5)}72%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;-webkit-transform:scale(1);transform:scale(1)}81%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-transform:scale(1.24);transform:scale(1.24)}89%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;-webkit-transform:scale(1);transform:scale(1)}95%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-transform:scale(1.04);transform:scale(1.04)}100%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;-webkit-transform:scale(1);transform:scale(1)}}@keyframes tada{0%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0;-webkit-transform:scale(7);transform:scale(7)}38%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;opacity:1;-webkit-transform:scale(1);transform:scale(1)}55%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-transform:scale(1.5);transform:scale(1.5)}72%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;-webkit-transform:scale(1);transform:scale(1)}81%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-transform:scale(1.24);transform:scale(1.24)}89%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;-webkit-transform:scale(1);transform:scale(1)}95%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-transform:scale(1.04);transform:scale(1.04)}100%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes jelly{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}30%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}40%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}50%{-webkit-transform:scale3d(.85,1.15,1);transform:scale3d(.85,1.15,1)}65%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}75%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@keyframes jelly{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}30%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}40%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}50%{-webkit-transform:scale3d(.85,1.15,1);transform:scale3d(.85,1.15,1)}65%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}75%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@-webkit-keyframes rotate{0%{opacity:0;-webkit-transform:translateZ(-200px) rotate(-45deg);transform:translateZ(-200px) rotate(-45deg)}100%{opacity:1;-webkit-transform:translateZ(0) rotate(0);transform:translateZ(0) rotate(0)}}@keyframes rotate{0%{opacity:0;-webkit-transform:translateZ(-200px) rotate(-45deg);transform:translateZ(-200px) rotate(-45deg)}100%{opacity:1;-webkit-transform:translateZ(0) rotate(0);transform:translateZ(0) rotate(0)}}@-webkit-keyframes pulse{0%{box-shadow:0 0 0 0 #bdc3c7}100%{box-shadow:0 0 0 1.5em rgba(189,195,199,0)}}@keyframes pulse{0%{box-shadow:0 0 0 0 #bdc3c7}100%{box-shadow:0 0 0 1.5em rgba(189,195,199,0)}}.pretty.p-default.p-fill .state label:after{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.pretty.p-default .state label:after{-webkit-transform:scale(.6);-ms-transform:scale(.6);transform:scale(.6)}.pretty.p-default input:checked~.state label:after{background-color:#bdc3c7!important}.pretty.p-default.p-thick .state label:after,.pretty.p-default.p-thick .state label:before{border-width:calc(1em / 7)}.pretty.p-default.p-thick .state label:after{-webkit-transform:scale(.4)!important;-ms-transform:scale(.4)!important;transform:scale(.4)!important}.pretty.p-icon .state .icon{position:absolute;font-size:1em;width:calc(1em + 2px);height:calc(1em + 2px);left:0;z-index:1;text-align:center;line-height:normal;top:calc((0% - (100% - 1em)) - 8%);border:1px solid transparent;opacity:0}.pretty.p-icon .state .icon:before{margin:0;width:100%;height:100%;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;line-height:1}.pretty.p-icon input:checked~.state .icon{opacity:1}.pretty.p-icon input:checked~.state label:before{border-color:#5a656b}.pretty.p-svg .state .svg{position:absolute;font-size:1em;width:calc(1em + 2px);height:calc(1em + 2px);left:0;z-index:1;text-align:center;line-height:normal;top:calc((0% - (100% - 1em)) - 8%);border:1px solid transparent;opacity:0}.pretty.p-svg .state svg{margin:0;width:100%;height:100%;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;line-height:1}.pretty.p-svg input:checked~.state .svg{opacity:1}.pretty.p-image .state img{opacity:0;position:absolute;width:calc(1em + 2px);height:calc(1em + 2px);top:0;top:calc((0% - (100% - 1em)) - 8%);left:0;z-index:0;text-align:center;line-height:normal;-webkit-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}.pretty.p-image input:checked~.state img{opacity:1}.pretty.p-switch input{min-width:2em}.pretty.p-switch .state{position:relative}.pretty.p-switch .state:before{content:'';border:1px solid #bdc3c7;border-radius:60px;width:2em;box-sizing:unset;height:calc(1em + 2px);position:absolute;top:0;top:calc((0% - (100% - 1em)) - 16%);z-index:0;transition:all .5s ease}.pretty.p-switch .state label{text-indent:2.5em}.pretty.p-switch .state label:after,.pretty.p-switch .state label:before{transition:all .5s ease;border-radius:100%;left:0;border-color:transparent;-webkit-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}.pretty.p-switch .state label:after{background-color:#bdc3c7!important}.pretty.p-switch input:checked~.state:before{border-color:#5a656b}.pretty.p-switch input:checked~.state label:before{opacity:0}.pretty.p-switch input:checked~.state label:after{background-color:#5a656b!important;left:1em}.pretty.p-switch.p-fill input:checked~.state:before{border-color:#5a656b;background-color:#5a656b!important}.pretty.p-switch.p-fill input:checked~.state label:before{opacity:0}.pretty.p-switch.p-fill input:checked~.state label:after{background-color:#fff!important;left:1em}.pretty.p-switch.p-slim .state:before{height:.1em;background:#bdc3c7!important;top:calc(50% - .1em)}.pretty.p-switch.p-slim input:checked~.state:before{border-color:#5a656b;background-color:#5a656b!important}.pretty.p-has-hover input:hover~.state:not(.p-is-hover){display:none}.pretty.p-has-hover input:hover~.state.p-is-hover{display:block}.pretty.p-has-hover input:hover~.state.p-is-hover .icon{display:block}.pretty.p-has-focus input:focus~.state label:before{box-shadow:0 0 3px 0 #bdc3c7}.pretty.p-has-indeterminate input[type=checkbox]:indeterminate~.state:not(.p-is-indeterminate){display:none}.pretty.p-has-indeterminate input[type=checkbox]:indeterminate~.state.p-is-indeterminate{display:block}.pretty.p-has-indeterminate input[type=checkbox]:indeterminate~.state.p-is-indeterminate .icon{display:block;opacity:1}.pretty.p-toggle .state.p-on{opacity:0;display:none}.pretty.p-toggle .state .icon,.pretty.p-toggle .state .svg,.pretty.p-toggle .state img,.pretty.p-toggle .state.p-off{opacity:1;display:inherit}.pretty.p-toggle .state.p-off .icon{color:#bdc3c7}.pretty.p-toggle input:checked~.state.p-on{opacity:1;display:inherit}.pretty.p-toggle input:checked~.state.p-off{opacity:0;display:none}.pretty.p-plain input:checked~.state label:before,.pretty.p-plain.p-toggle .state label:before{content:none}.pretty.p-plain.p-plain .icon{-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1)}.pretty.p-round .state label:after,.pretty.p-round .state label:before{border-radius:100%}.pretty.p-round.p-icon .state .icon{border-radius:100%;overflow:hidden}.pretty.p-round.p-icon .state .icon:before{-webkit-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8)}.pretty.p-curve .state label:after,.pretty.p-curve .state label:before{border-radius:20%}.pretty.p-smooth .icon,.pretty.p-smooth .svg,.pretty.p-smooth label:after,.pretty.p-smooth label:before{transition:all .5s ease}.pretty.p-smooth input:checked+.state label:after{transition:all .3s ease}.pretty.p-smooth input:checked+.state .icon,.pretty.p-smooth input:checked+.state .svg,.pretty.p-smooth input:checked+.state img{-webkit-animation:zoom .2s ease;animation:zoom .2s ease}.pretty.p-smooth.p-default input:checked+.state label:after{-webkit-animation:zoom .2s ease;animation:zoom .2s ease}.pretty.p-smooth.p-plain input:checked+.state label:before{content:'';-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);transition:all .5s ease}.pretty.p-tada:not(.p-default) input:checked+.state .icon,.pretty.p-tada:not(.p-default) input:checked+.state .svg,.pretty.p-tada:not(.p-default) input:checked+.state img,.pretty.p-tada:not(.p-default) input:checked+.state label:after,.pretty.p-tada:not(.p-default) input:checked+.state label:before{-webkit-animation:tada .7s cubic-bezier(.25,.46,.45,.94) 1 alternate;animation:tada .7s cubic-bezier(.25,.46,.45,.94) 1 alternate;opacity:1}.pretty.p-jelly:not(.p-default) input:checked+.state .icon,.pretty.p-jelly:not(.p-default) input:checked+.state .svg,.pretty.p-jelly:not(.p-default) input:checked+.state img,.pretty.p-jelly:not(.p-default) input:checked+.state label:after,.pretty.p-jelly:not(.p-default) input:checked+.state label:before{-webkit-animation:jelly .7s cubic-bezier(.25,.46,.45,.94);animation:jelly .7s cubic-bezier(.25,.46,.45,.94);opacity:1}.pretty.p-jelly:not(.p-default) input:checked+.state label:before{border-color:transparent}.pretty.p-rotate:not(.p-default) input:checked~.state .icon,.pretty.p-rotate:not(.p-default) input:checked~.state .svg,.pretty.p-rotate:not(.p-default) input:checked~.state img,.pretty.p-rotate:not(.p-default) input:checked~.state label:after,.pretty.p-rotate:not(.p-default) input:checked~.state label:before{-webkit-animation:rotate .7s cubic-bezier(.25,.46,.45,.94);animation:rotate .7s cubic-bezier(.25,.46,.45,.94);opacity:1}.pretty.p-rotate:not(.p-default) input:checked~.state label:before{border-color:transparent}.pretty.p-pulse:not(.p-switch) input:checked~.state label:before{-webkit-animation:pulse 1s;animation:pulse 1s}.pretty input[disabled]{cursor:not-allowed;display:none}.pretty input[disabled]~*{opacity:.5}.pretty.p-locked input{display:none;cursor:not-allowed}.pretty input:checked~.state.p-primary label:after,.pretty.p-toggle .state.p-primary label:after{background-color:#428bca!important}.pretty input:checked~.state.p-primary .icon,.pretty input:checked~.state.p-primary .svg,.pretty.p-toggle .state.p-primary .icon,.pretty.p-toggle .state.p-primary .svg{color:#fff;stroke:#fff}.pretty input:checked~.state.p-primary-o label:before,.pretty.p-toggle .state.p-primary-o label:before{border-color:#428bca}.pretty input:checked~.state.p-primary-o label:after,.pretty.p-toggle .state.p-primary-o label:after{background-color:transparent}.pretty input:checked~.state.p-primary-o .icon,.pretty input:checked~.state.p-primary-o .svg,.pretty input:checked~.state.p-primary-o svg,.pretty.p-toggle .state.p-primary-o .icon,.pretty.p-toggle .state.p-primary-o .svg,.pretty.p-toggle .state.p-primary-o svg{color:#428bca;stroke:#428bca}.pretty.p-default:not(.p-fill) input:checked~.state.p-primary-o label:after{background-color:#428bca!important}.pretty.p-switch input:checked~.state.p-primary:before{border-color:#428bca}.pretty.p-switch.p-fill input:checked~.state.p-primary:before{background-color:#428bca!important}.pretty.p-switch.p-slim input:checked~.state.p-primary:before{border-color:#245682;background-color:#245682!important}.pretty input:checked~.state.p-info label:after,.pretty.p-toggle .state.p-info label:after{background-color:#5bc0de!important}.pretty input:checked~.state.p-info .icon,.pretty input:checked~.state.p-info .svg,.pretty.p-toggle .state.p-info .icon,.pretty.p-toggle .state.p-info .svg{color:#fff;stroke:#fff}.pretty input:checked~.state.p-info-o label:before,.pretty.p-toggle .state.p-info-o label:before{border-color:#5bc0de}.pretty input:checked~.state.p-info-o label:after,.pretty.p-toggle .state.p-info-o label:after{background-color:transparent}.pretty input:checked~.state.p-info-o .icon,.pretty input:checked~.state.p-info-o .svg,.pretty input:checked~.state.p-info-o svg,.pretty.p-toggle .state.p-info-o .icon,.pretty.p-toggle .state.p-info-o .svg,.pretty.p-toggle .state.p-info-o svg{color:#5bc0de;stroke:#5bc0de}.pretty.p-default:not(.p-fill) input:checked~.state.p-info-o label:after{background-color:#5bc0de!important}.pretty.p-switch input:checked~.state.p-info:before{border-color:#5bc0de}.pretty.p-switch.p-fill input:checked~.state.p-info:before{background-color:#5bc0de!important}.pretty.p-switch.p-slim input:checked~.state.p-info:before{border-color:#2390b0;background-color:#2390b0!important}.pretty input:checked~.state.p-success label:after,.pretty.p-toggle .state.p-success label:after{background-color:#5cb85c!important}.pretty input:checked~.state.p-success .icon,.pretty input:checked~.state.p-success .svg,.pretty.p-toggle .state.p-success .icon,.pretty.p-toggle .state.p-success .svg{color:#fff;stroke:#fff}.pretty input:checked~.state.p-success-o label:before,.pretty.p-toggle .state.p-success-o label:before{border-color:#5cb85c}.pretty input:checked~.state.p-success-o label:after,.pretty.p-toggle .state.p-success-o label:after{background-color:transparent}.pretty input:checked~.state.p-success-o .icon,.pretty input:checked~.state.p-success-o .svg,.pretty input:checked~.state.p-success-o svg,.pretty.p-toggle .state.p-success-o .icon,.pretty.p-toggle .state.p-success-o .svg,.pretty.p-toggle .state.p-success-o svg{color:#5cb85c;stroke:#5cb85c}.pretty.p-default:not(.p-fill) input:checked~.state.p-success-o label:after{background-color:#5cb85c!important}.pretty.p-switch input:checked~.state.p-success:before{border-color:#5cb85c}.pretty.p-switch.p-fill input:checked~.state.p-success:before{background-color:#5cb85c!important}.pretty.p-switch.p-slim input:checked~.state.p-success:before{border-color:#357935;background-color:#357935!important}.pretty input:checked~.state.p-warning label:after,.pretty.p-toggle .state.p-warning label:after{background-color:#f0ad4e!important}.pretty input:checked~.state.p-warning .icon,.pretty input:checked~.state.p-warning .svg,.pretty.p-toggle .state.p-warning .icon,.pretty.p-toggle .state.p-warning .svg{color:#fff;stroke:#fff}.pretty input:checked~.state.p-warning-o label:before,.pretty.p-toggle .state.p-warning-o label:before{border-color:#f0ad4e}.pretty input:checked~.state.p-warning-o label:after,.pretty.p-toggle .state.p-warning-o label:after{background-color:transparent}.pretty input:checked~.state.p-warning-o .icon,.pretty input:checked~.state.p-warning-o .svg,.pretty input:checked~.state.p-warning-o svg,.pretty.p-toggle .state.p-warning-o .icon,.pretty.p-toggle .state.p-warning-o .svg,.pretty.p-toggle .state.p-warning-o svg{color:#f0ad4e;stroke:#f0ad4e}.pretty.p-default:not(.p-fill) input:checked~.state.p-warning-o label:after{background-color:#f0ad4e!important}.pretty.p-switch input:checked~.state.p-warning:before{border-color:#f0ad4e}.pretty.p-switch.p-fill input:checked~.state.p-warning:before{background-color:#f0ad4e!important}.pretty.p-switch.p-slim input:checked~.state.p-warning:before{border-color:#c77c11;background-color:#c77c11!important}.pretty input:checked~.state.p-danger label:after,.pretty.p-toggle .state.p-danger label:after{background-color:#d9534f!important}.pretty input:checked~.state.p-danger .icon,.pretty input:checked~.state.p-danger .svg,.pretty.p-toggle .state.p-danger .icon,.pretty.p-toggle .state.p-danger .svg{color:#fff;stroke:#fff}.pretty input:checked~.state.p-danger-o label:before,.pretty.p-toggle .state.p-danger-o label:before{border-color:#d9534f}.pretty input:checked~.state.p-danger-o label:after,.pretty.p-toggle .state.p-danger-o label:after{background-color:transparent}.pretty input:checked~.state.p-danger-o .icon,.pretty input:checked~.state.p-danger-o .svg,.pretty input:checked~.state.p-danger-o svg,.pretty.p-toggle .state.p-danger-o .icon,.pretty.p-toggle .state.p-danger-o .svg,.pretty.p-toggle .state.p-danger-o svg{color:#d9534f;stroke:#d9534f}.pretty.p-default:not(.p-fill) input:checked~.state.p-danger-o label:after{background-color:#d9534f!important}.pretty.p-switch input:checked~.state.p-danger:before{border-color:#d9534f}.pretty.p-switch.p-fill input:checked~.state.p-danger:before{background-color:#d9534f!important}.pretty.p-switch.p-slim input:checked~.state.p-danger:before{border-color:#a02622;background-color:#a02622!important}.pretty.p-bigger .icon,.pretty.p-bigger .img,.pretty.p-bigger .svg,.pretty.p-bigger label:after,.pretty.p-bigger label:before{font-size:1.2em!important;top:calc((0% - (100% - 1em)) - 35%)!important}.pretty.p-bigger label{text-indent:1.7em}@media print{.pretty .state .icon,.pretty .state label:after,.pretty .state label:before,.pretty .state:before{color-adjust:exact;-webkit-print-color-adjust:exact;print-color-adjust:exact}}";
}
