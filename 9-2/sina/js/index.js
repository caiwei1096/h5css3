//获取元素
var $oul=$('.ulBox');
var $listBox=$('.listBox');

/*
实现轮播图
 */
function bannerFn() {
    var mySwiper=new Swiper('.bannerBox',
        {autoplay://用户操作后仍然自动播放
                {disableOnInteraction:true,
                    //一张图当前窗口的停留时间
                    delay:1000,

                },
            //是否无缝滚动
            loop:true,
            //分液器
            pagination: {
                el: '.pageBox',//元素 分页其的盒子
                // type: 'bullets',
                type: 'fraction',//分页  分页器的类型
                //type : 'progressbar',
                //type : 'custom',
                currentClass:'currrentPage',//变动数字 盒子的类名
                totalClass:'totalPage'//总共数组 盒子的类名
            },
        })
}

//获取数据
/*$.ajax({
    type: 'get',
    url:'sina/data/banner.json',
    data:{
        t:123,q:234
    },
    success:function (data) {
       giveHtml(data)
    },
    error:function () {

    }
})*/
function giveHtml(data) {
    data=data||[];
    var str=``;
    data.forEach(({img,title},index)=>{
        str+=`<li class="swiper-slide">
                    <a href="##"><img src="${img}" alt="">
                        <div>${title}</div></a>
                </li>`
    })
    $oul.html(str);
   // bannerFn()
}
//先请求数据 在把数据放到页面上 在执行轮播图函数

//promise写法
var p=new Promise(function (resolve,reject) {
    $.ajax({
        type:'get',
        url:'sina/data/banner.json',
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }

    })
})
/*p.then(function (data) {
  //  console.log(data);
    giveHtml(data)
    return data
    //第一个参数是promise执行的成功的函数
},function () {
   //第二个参数是promise执行的失败函数
}).then(function (data) {
    //console.log(data);
    bannerFn();
},function () {

})*/
//方法二
p.then(function (data) {
    //  console.log(data);
    giveHtml(data)
    return data
    //第一个参数是promise执行的成功的函数
}).then(function (data) {
    //console.log(data);
    bannerFn();
}).catch(function (res) {
    console.log(res);
})
//新闻列表部分
var listPro=new Promise(function (resolve,reject) {
    $.ajax({
        type:'post',
        url: 'sina/data/list.json',
        data:{w:1},
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }

    })
})/*.then(function (data) {
    giveHtml1(data)
}).catch(function (res) {

})*/
//把数据放到列表中
function giveHtml1(data) {
    data=data||[];
    var str=``;
    data.forEach(({img,title,type,num},index)=>{
        switch (type) {
            case 0:
                str+=`<a href="##">
            <div class="text_box">
                <p>${title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
                break;
            case 1:
                str+=` <a href="">
            <div class="img_box">
                <img src="${img}" alt="">
            </div>
            <p>${title}</p>
            <div class="comment_box">
                <em class="">
                    <span class="">${num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>
            `;
                break;
            case 3:
                str+=` <a href="" class="three_box">
            <p>${title}</p>
            <div class="three_pic">
                <div><img src="${img[0]}" alt=""></div>
                <div><img src="${img[1]}" alt=""></div>
                <div> <img src="${img[2]}" alt=""></div>

           </div>
             <div class="comment_box">
                <em class="">
                    <span class="">${num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`
        }

    })
    $listBox.html(str);


}
listPro.then(function (data) {
    giveHtml1(data)
})