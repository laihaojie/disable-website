 
 

function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}


//将图片转换成base64的图片
function image2Base64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

function goCheck(idcard, mobile,name){  
    $("#LoginCertID").val(idcard)
    $("#LoginMobile").val(mobile) 
	$(".logintitle").text(name)
    $.post("https://icode.lingman.tech/api/code/reviewcode1",{ sid : image2Base64(document.getElementById("ImgValidCode")) },function(resp) {
        $("#LoginVerificationCode").val(resp) 
    }) 
}



function getData(){  
 
    setTimeout(()=>{ 
        $.ajax(
            {
                url:'https://chepai.alltobid.com/webapi/api/precheckin/getCurUserInfo',
                type:'post',
                dateType:'json', 
                headers:{'Content-Type':'application/json;charset=utf8','Authorization':'Bearer '+ getCookie("token")}, 
                success:function(data){
                    if(data.code === 0) {
                        processData(localStorage.bidid,data.data) 
                    }else {
                        alert("出错")
                    }
                 

                },
                error:function(data){console.log(data)}
            }
        ); 
    },1500)
} 


// 设置查询模式
function setModel(id) {
   // alert("check")

     

        if(navigator.userAgent.indexOf("LmApp")>=0) {
            window.injectedObject.getBidInfo(id, "", "review")
           }else {
            $.post("https://api-lmapp.lingman.tech/api/app/thpreview/query-bid-id/" + id,function(resp) {
                if (resp.code == 1) { 
                //	localStorage.bidid=id
                  ///  goCheck(resp.data.userIdentity, resp.data.bidMobile, resp.data.userName);
            
                    fillReviewData(JSON.stringify({userIdentity:resp.data.userIdentity, bidMobile:resp.data.bidMobile} ),"")
                }
            })   
           }

   





} 

function fillReviewData(data, code){
    const  {  userIdentity, bidMobile } = JSON.parse(data)
 //alert  alert(data)

    $('.inputbg:eq(0)').val(userIdentity); 
    $('.inputbg:eq(1)').val(bidMobile);
    $('.inputbg:eq(0)').trigger("change");
    $('.inputbg:eq(0)').trigger("blur");
    $('.inputbg:eq(1)').trigger("change");
    $('.inputbg:eq(1)').trigger("blur");
    // $("#LoginCertID").val(userIdentity)
    // $("#LoginMobile").val(bidMobile) 
	// $(".logintitle").text(name)
  //  $("#LoginVerificationCode").val(code) 
}

function fillData(data, code) {
    const  {  userIdentity, bidMobile } = JSON.parse(data)
    $("#CertId")[0].value = userIdentity
    $("#Mobile")[0].value = bidMobile
    $("#CaptchaCode")[0].value = code
}

////////// 开始操作
function processData(model, data) {
  //  console.log(model)
   // console.log(data)
    if ( data.name.length > 0) {
        // 可以保存
   
        var para = {}
		para.Id = model
        para.QueryCanRegDate = data.regDate.replace("T"," ").substring(0, 19)
        para.QueryCanStatus = 2
        para.QueryCanTitle =  data.title
        para.QueryCanTips =  data.tips
        para.QueryCanReturnStatus = data.status
     //   para.QueryCanAvalidDate =  data.expiry
        para.UserIdentity = data.licenseNO
        para.BidMobile = data.mobile
        para.UserName = data.name
		para.QueryCanPayStatus = data.paystatus ?  1 : 2
        $.ajax({
            type: "POST",
            url: "https://api-lmapp.lingman.tech/api/app/thpreview/SaveReviewData",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(para),
            dataType: "json",
            success:function (message) { 
			   alert("保存成功") 
            },
            error:function (message) {
               alert("提交失败"+JSON.stringify(message) + "\n 请联系Jacky");
            }
        });  
    }
   
}

 

function getQuery() {
    let url = window.location.search
    let query = {};
    if (url.indexOf("?") != -1) {
        const str = url.substr(1);
        const pairs = str.split("&");
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split("=");
            query[pair[0]] = pair[1];
        }
    }
    return query; // 返回对象
}



function image2Base64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}


if (window.location.href.toLowerCase().indexOf("https://chepai.alltobid.com/ydj.web/#/query".toLowerCase()) == 0 )
{
  
 
    setModel( localStorage.bidid)
	 
}

if (window.location.href == "https://www.alltobid.com/" ||window.location.href == "https://www.alltobid.com"  )
{
    window.location.href = "https://bidcard.alltobid.com/bidquery/Home/Logout"
}

if (window.location.href.toLowerCase().indexOf("https://chepai.alltobid.com/ydj.web/#/result".toLowerCase()) == 0 )
{
 
    getData()
}

if (window.location.href.toLowerCase().indexOf("https://bidcard.alltobid.com/cnbauth/Account/Logout".toLowerCase()) == 0 )
{
     
    window.location.href = "https://bidcard.alltobid.com/bidquery/home/bidresult"
}
 
if (window.location.href.toLowerCase().indexOf("https://bidcard.alltobid.com/bidquery/home/bidresult".toLowerCase()) == 0 )
{
   

 
    $("html").css("overflow","scroll")

    $("body").css("overflow","scroll")

        let id = localStorage.bidid 
        if (id) {
            console.log(id);
            let [tbh, mima] = $(".Luser")[0].textContent.match(/\d+/g)
            let jieguo = $(".col-md")[0].innerHTML.match(/>(.+)<\/p>/)[1]
            let num = $(".col-md")[1].innerHTML.match(/>(.+)<\/p>/)[1]
            let ri = $(".col-md")[2].innerHTML.match(/>(.+)<\/p>/)[1]
            let qi = $(".col-md")[3].innerHTML.match(/>(.+)<\/p>/)[1]
            console.log(tbh, mima, jieguo, num, ri, qi);
            let data = {}
            data.tbh = tbh
            data.mima = mima
            data.jieguo = jieguo
            data.times = num
            data.validDate = ri
            data.recordDate = qi
            data.id = id
            data.name = $(".wchenjiao b").text().match(/尊敬的 (.+) 先生\/女士 您好：/)[1]
            data.tips = $(".wchenjiao").text().replace(/\s/g,"")
    
    
    
            $.ajax({
                type: "POST",
                url: "https://api-lmapp.lingman.tech/api/app/thpreview/SaveQueryData",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(data),
                dataType: "json", 
                success:function (message) { 
                    alert("保存成功") 
                 },
                 error:function (message) {
                    alert("提交失败"+JSON.stringify(message) + "\n 请联系Jacky");
                 }
            });
        } 
}
 
if (window.location.href.toLowerCase().indexOf("https://bidcard.alltobid.com/cnbauth/Account/Login".toLowerCase()) == 0 )
{ 
        let id = localStorage.bidid
        console.log(id)
        if (id) {
            window.injectedObject.getBidInfo(id , image2Base64($(".captcha-display")[0]),"query") 
        } 
}
 