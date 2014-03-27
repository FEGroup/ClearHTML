var reset = reset || {};

reset.Code = function(){
    this.init();
};

reset.Code.prototype = {
    init : function(){
        this._initVals();
        this._setEvents();
    },
    _initVals : function(){
        this.arrId = [];
        this.arrClass = [];
        this.sReplace = '';
        this.nRmAttr = 0;
        this.nRmTag = 0;
        this.welBtnRmAttr = $('.btn_add_attr');
        this.welBtnRmTag = $('.btn_add_tag');
        this.welBtnReset = $('.btn_reset');
    },
    _setCheck : function(){
        this.welHref = $('#reset_href').is(':checked');
        this.welScript = $('#rm_script_tag').is(':checked');
        this.welIframe = $('#rm_iframe').is(':checked');
        this.welTarget = $('#rm_target_blank').is(':checked');
        this.welOnclick = $('#rm_onclick').is(':checked');
        this.welOnerror = $('#rm_onerror').is(':checked');
        this.welOnload = $('#rm_onload').is(':checked');
        this.welNocr = $('#rm_nocr').is(':checked');
        this.welLineBlank = $('#rm_line_blank').is(':checked');
        this.welUnderbar = $('#rm_underbar').is(':checked');
    },
    _setReg : function(){
        //this.rxScript = /<script.*[\r\n].*[\r\n]<\/script>/gi;
        //this.rxTarget = /target=["'][^"']+["']/gi;
        //this.rxOnclick = /onclick=["'].*["']/gi;
        //this.rxOnerror = /onerror=["'].*["']/gi;
        //this.rxOnload = /onload=["'].*["']/gi;
        //this.rxNocr = /nocr=["'].*["']/gi;

        this.rxHtml = /html/gi;
        this.rxHead = /<head>/gi;
        this.rxHeadEnd = /<\/head>/gi;
        this.rxBody = /<body>/gi;
        this.rxBodyEnd = /<\/body>/gi;
        this.rxLink = /link/gi;

        this.rxHtml2 = /htmlS/gi;
        this.rxHead2 = /<headS>/gi;
        this.rxHead2End = /<\/headS>/gi;
        this.rxBody2 = /<bodyS>/gi;
        this.rxBody2End = /<\/bodyS>/gi;
        this.rxLink2 = /LinkS/gi;
        
        this.rxLink3 = /<\/link>/gi;
        this.rxHref = /href=["'][^"']+["']/gi;
        this.rxScript = /<script/gi;
        this.rxScript2 = /<\/script/gi;
        this.rxNoScript = /<noscript/gi;
        this.rxNoScript2 = /<\/noscript/gi;
        this.rxTarget = /target=/gi;
        this.rxOnclick = /onclick=/gi;
        this.rxOnerror = /onerror=/gi;
        this.rxOnload = /onload=/gi;
        this.rxNocr = /nocr=/gi;

        this.rxCdata = /\/\/<\!\[CDATA\[/gi;
        this.rxCdata2 = /\/\/\]\]>>/gi;

        //this.rxUnderbar = /_\w+/gi;
        this.rxUnderbar = /"_\w+/gi;
        this.rxUnderbar2 = /\s_\w+/gi;
        //this.rxUnderbar3 = /_blank/gi;

        // 공백
        this.rxBlank = /\s>/gi;
        this.rxBlank2 = /\s"/gi;
        this.rxBlank3 = /\s'/gi;
        this.rxBlank4 = /<\s/gi;
        this.rxBlank5 = /="\s/gi;
        this.rxBlank6 = /='\s/gi;
        this.rxBlankId = /id=""/gi;
        this.rxBlankClass = /class=""/gi;

        // 공백 라인
        this.rxBlankLine4 = /[^\wㄱ-ㅎ가-힣'"->:;.,=(){}]\s+/gi;  // /\s+</gi;  // /[^\wㄱ-ㅎ가-힣'">:;.,=(){}]\s+/gi  // [^\w'">;,]\s+/gi

        // this.rxLineBlank = /\r\n|\n\n/gi;
    },

    // 속성 추가
    _setEleRmAttr : function(sValue){
        if(sValue !== '' && sValue !== undefined && sValue !== null){
            $('.user_rm_attr').append('<li><input type="checkbox" id="rm_user_attr'+this.nRmAttr+'" checked="checked" disabled="disabled"><label for="rm_user_attr'+this.nRmAttr+'">'+sValue+'</label></li>');
            this.nRmAttr++;
        }
    },

    // 태그 추가
    _setEleRmTag : function(sValue){
        if(sValue !== '' && sValue !== undefined && sValue !== null){
            $('.user_rm_tag').append('<li><input type="checkbox" id="rm_user_tag'+this.nRmTag+'" checked="checked" disabled="disabled"><label for="rm_user_tag'+this.nRmTag+'">'+sValue+'</label></li>');
            this.nRmTag++;
        }
    },

    // 정규식 치환
    _setReplaceReg : function(){
        /* 
            * html, head, body, link, cdata
            * 각 태그에 임시로 S 붙여서 제거되지 않게 방지
        */
        this.sReplace = $('.changing').val().replace(this.rxHtml,'htmlS').replace(this.rxHead,'<headS>').replace(this.rxHeadEnd,'</headS>').replace(this.rxBody,'<bodyS>').replace(this.rxBodyEnd,'</bodyS>').replace(this.rxLink,'linkS').replace(this.rxCdata,'').replace(this.rxCdata2,'');
        $('.changing').val(this.sReplace);

        // script
        this.welScript ? this.sReplace = $('.changing').val().replace(this.rxScript,'<div data-rm="rmself"').replace(this.rxScript2,'</div').replace(this.rxNoScript,'<div data-rm="rmself"').replace(this.rxNoScript2,'</div') : this.sReplace = $('.changing').val();
        $('.changing').val(this.sReplace);
        
        // onclick
        this.welOnclick ? this.sReplace = $('.changing').val().replace(this.rxOnclick,'data-rmself=') : this.sReplace = $('.changing').val();
        $('.changing').val(this.sReplace);

        // onerror
        this.welOnerror ? this.sReplace = $('.changing').val().replace(this.rxOnerror,'data-rmself=') : this.sReplace = $('.changing').val();
        $('.changing').val(this.sReplace);

        // onload
        this.welOnload ? this.sReplace = $('.changing').val().replace(this.rxOnload,'data-rmself=') : this.sReplace = $('.changing').val();
        $('.changing').val(this.sReplace);

        // nocr
        this.welNocr ? this.sReplace = $('.changing').val().replace(this.rxNocr,'data-rmself=') : this.sReplace = $('.changing').val();
        $('.changing').val(this.sReplace);

        // target
        this.welTarget ? this.sReplace = $('.changing').val().replace(this.rxTarget,'data-rmself=') : this.sReplace = $('.changing').val();
        $('.changing').val(this.sReplace);
    },

    // underbar class & id
    _setRmUnderbar : function(){
        this.welUnderbar ? this.sReplace = $('.changing').val().replace(this.rxUnderbar,'"').replace(this.rxUnderbar2,'') : this.sReplace = $('.changing').val();
        $('.changing').val(this.sReplace);
    },

    // 공백 정리
    _setRmBlank : function(){
        this.sReplace = $('.changing').val().replace(this.rxBlank,'>').replace(this.rxBlank2,'"').replace(this.rxBlank3,'\'').replace(this.rxBlank4,'<').replace(this.rxBlank5,'="').replace(this.rxBlank6,'=\'').replace(this.rxBlankId,'').replace(this.rxBlankClass,'');
        $('.changing').val(this.sReplace);
    },

    // 추가된 속성 제거
    _setRmAttr : function(){
        var nAttr = $('.user_rm_attr li').length;
        for(var i = 0; i < nAttr; i++){
            var sRmAttr = $('#rm_user_attr'+i+' + label').text();
            var rxRmAttr = new RegExp(sRmAttr+'=','gi');
            this.sReplace = $('.changing').val().replace(rxRmAttr,'data-rmself=');
            $('.changing').val(this.sReplace);
        }
    },

    // 추가된 태그 제거
    _setRmTag : function(){
        var nTag = $('.user_rm_tag li').length;
        for(var j = 0; j < nTag; j++){
            var sRmTag = $('#rm_user_tag'+j+' + label').text();
            var rxRmTag = new RegExp('<'+sRmTag,'gi');
            this.sReplace = $('.changing').val().replace(rxRmTag,'<'+sRmTag+' data-rm="rmself"');
            $('.changing').val(this.sReplace);
        }
    },

    /* 
        * dom 요소 초기화 및 제거
        * 특정 영역에 삽입
        * a태그 href 초기화
        * iframe 제거
        * 언더바 속성(클래스 및 아이디) 제거
        * data-rm 속성을 가진 태그 전부 제거
        * data-rmself 속성 전부 제거
        * 다시 textarea 에 삽입
    */
    _setRmDom : function(){
        $('.render').html(this.sReplace);
        this.welHref ? this.sReplace = $('.render a').attr('href','#') : '';
        this.welIframe ? this.sReplace = $('iframe').remove() : '';

        /* ing
        if(this.welUnderbar){
            //$('.render *').attr();
            $('.render *').each(function(){
                $(this).attr('class');
            });
        }
        */

        $('[data-rm]').remove();
        $('.render *').removeAttr('data-rmself');
        this.sReplace = $('.render').html();
        $('.changing').val(this.sReplace);
    },

    // 공백 라인 제거
    _setRmBlankLine : function(){
        this.sReplace = $('.changing').val().replace(this.rxBlankLine4,'\r');
        $('.changing').val(this.sReplace);
        var elBlank=$('.changing').val().replace(/(\r\n|\n|\n\n)/gi,'[split]');
        var elBlankResult='';
        elBlank = elBlank.split('[split]');
        $.each(elBlank,function(i){
            if(elBlank[i]==''){
                elBlankResult += '';
            }else{
                elBlankResult += elBlank[i]+'\r\n';
                //elBlankResult += elBlank[i];
            }
        });
        $('.changing').val(elBlankResult);

        //this.sReplace = $('.changing').val();
        //$('.changing').val(this.sReplace);

        /* test
        $str1=$(".changing").val().replace(/(\r\n|\n|\n\n)/gi,'[split]');
        $str1=$str1.replace(/\'/g,"''");
        $str1 = $str1.split("[split]");
        $result="";
        $.each($str1,function(i){
            if($str1[i]=="")
                $result +=" "+"\r\n";
            else
                $result +=$str1[i]+"\r\n";
        });
        $(".changing").val($result);

        this.sReplace = $(".changing").val();
        $(".changing").val(this.sReplace);
        */
    },

    // 변환
    _chainging : function(){
        this._setReplaceReg();
        this._setRmAttr();
        this._setRmTag();
        this._setRmDom();

        /* 
            * html, head, body, link
            * 각 태그 원복
        */
        this.sReplace = $('.changing').val().replace(this.rxHtml2,'html').replace(this.rxHead2,'<head>').replace(this.rxHead2End,'</head>').replace(this.rxBody2,'<body>').replace(this.rxBody2End,'</body>').replace(this.rxLink2,'link').replace(this.rxLink3,'');
        $('.changing').val(this.sReplace);

        this._setRmBlankLine();
        this._setRmUnderbar();
        this._setRmBlank();
    },

    _setEvents : function(){
        var oSelf = this;

        // prompt : 제거하고 싶은 속성 입력
        this.welBtnRmAttr.on('click',function(){
            var sRemove = prompt('제거하고 싶은 속성 입력(data-type, href, src 등) : ','');
            oSelf._setEleRmAttr(sRemove);
        });

        // prompt : 제거하고 싶은 태그 입력
        this.welBtnRmTag.on('click',function(){
            var sRemove = prompt('제거하고 싶은 태그 입력(div, a, span ) : ','');
            oSelf._setEleRmTag(sRemove);
        });

        // 체크 여부 확인 후 코드 수정
        this.welBtnReset.on('click',function(){
            oSelf._setCheck();
            oSelf._setReg();
            oSelf._chainging();
        });
    }
};