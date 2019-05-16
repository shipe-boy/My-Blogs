<!--  -->
<template>
    <div>
        <div class="doc-container" id="doc-container">
            <div class="about-banner" id="container">
                <header class="l-top hasAnim arrow-holder">
                    
                </header>
                <div class="about-title">
                    <h1>友情链接</h1>
                    <p>桃李不言，下自成蹊</p>
                </div>
            </div>
            <div class="container-fixed">
                <div class="container-inner">
                    <article>
                        <section>
                            <h1>链接申请说明</h1>
                            <p>
                                <i class="fa fa-close"></i>经常宕机&nbsp;
                                <i class="fa fa-close"></i>不合法规&nbsp;
                                <i class="fa fa-close"></i>插边球站&nbsp;
                                <i class="fa fa-close"></i>红标报毒&nbsp;
                                <i class="fa fa-check"></i>原创优先&nbsp;
                                <i class="fa fa-check"></i>技术优先
                            </p>
                            <p>
                                交换友链可在留言板留言.请将本站加入友链<br>
                                名称：bookfish<br>
                                网址：https://www.baidu.com<br>
                                图标：https://www.baidu.com<br>
                                描述：桃李不言，下自成蹊。
                            </p>
                            <p>
                                申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)
                            </p>
                        </section>
                    </article>
                    <ul class="link-list">
                        <li>
                            <div class="pd-lr-10">
                                <a href="" target="_blank">
                                    <img src="../assets/link.jpg">
                                    <h3>链接一</h3>
                                    <p>淡泊明志，宁静致远。</p>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="pd-lr-10">
                                <a href="" target="_blank">
                                    <img src="../assets/link.jpg">
                                    <h3>链接二</h3>
                                    <p>北海虽赊，扶摇可接；东隅已逝，桑榆非晚。</p>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="pd-lr-10">
                                <a href="" target="_blank">
                                    <img src="../assets/link.jpg">
                                    <h3>链接三</h3>
                                    <p>虚怀若竹，清气若兰;</p>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="pd-lr-10">
                                <a href="https://www.yanshisan.cn" target="_blank">
                                    <img src="../assets/link.jpg">
                                    <h3>连接四</h3>
                                    <p>他山之石可以攻玉</p>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'linkpage',
    data () {
        return {
        }
    },
    mounted(){
        document.documentElement.scrollTop = 0;
    }
}

</script>
<style scoped>
.doc-container{position:relative;padding-top:60px;-webkit-transition:all .2s;transition:all .2s;min-height:100vh}
.hasAnim {background: url('../assets/bg2.jpg') no-repeat center/cover;position: absolute;width: 100%;height: 260px;overflow: hidden;}
.about-banner{height:260px;background-color:gray;color:#525251}
.about-banner .about-title{position:relative;z-index:9;padding-top:70px;color:#fff;text-align:center}
.about-banner .about-title h1{font-size:2.5rem}
.about-banner .about-title p{font-size:1.5rem}
.container-fixed{width:1280px;margin-left:auto;margin-right:auto;position:relative}
.container-inner article{padding:10px}
.container-inner article section{padding:20px;background:#fff;font-size:1rem}
.container-inner article section code{background:rgba(27,31,35,.05);padding: .2rem .4rem;color:#bd4147;border-radius:4px;font-family: Menlo,Monaco,Consolas,Courier New,monospace;}
.container-inner article section p{margin:1.5rem 0;padding-left:18px;font-family:Raleway,Segoe UI,Lucida Grande,Helvetica,Arial,Microsoft YaHei;line-height:1.75rem}
.container-inner article section ul,.container-inner article section span{padding-left:18px;}
.container-inner article section ul li{line-height:2rem}
.container-inner article section a{color:#0366d6}
.container-inner article section h1{margin-bottom:1rem;padding-left:1rem;border-left:.25rem solid #6bc30d;font-weight:700;font-size:1.5rem;line-height:1.5rem}
.link-list{margin-top:10px}
.link-list li{float:left;width:25%}
.link-list .pd-lr-10{padding:0 10px 20px}
.link-list li a{display:block;padding:20px;background:#fff}
.link-list li img{float:left;width:40px;height:40px;border-radius:100%}
.link-list li h3{overflow:hidden;padding:10px 15px 9px;height:21px}
.link-list li p{clear:both;display:-webkit-box;overflow:hidden;margin-top:1rem;height:60px;text-overflow:ellipsis;font-size:13px;-webkit-box-orient:vertical;-webkit-line-clamp:3}
.blog-list li,.hot-list li a,.icon-search,.lab-list li a,.link-list li a,.muntime-btn a,.nav-list li a,.resource-list li a,.tag a{transition:all .3s ease-in-out}
.blog-list li:hover,.lab-list li a:hover,.link-list li a:hover,.resource-list li a:hover{box-shadow:2px 5px 14px #c5c5c5;-webkit-transform:translate3d(0,-3px,0);transform:translate3d(0,-2px,0)}

@media screen and (max-width:1024px){.link-list li{width:50%}}
@media screen and (max-width:768px){.link-list li{width:100%}}
@media screen and (max-width:1366px){.container-fixed{width:90%}}
@media screen and (max-width:1024px){.container-fixed{width:90%}}
</style>