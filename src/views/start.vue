<template>
  <div class="start">
    <div class="section" id="section1">
        <div class="fp-tablecell">
            <div class="page1">
                <div class="nav wow zoomIn" data-wow-duration="2s">
                    <h1>BookFish</h1>
                    <p>桃李不言，下自成蹊</p>
                    <router-link class="layui-btn layui-btn-normal" style="margin-top: 20px" :to="{name: 'index'}">Enter Blog</router-link>
                </div>
                <a class="next wow fadeInUp" data-wow-duration="2s" id="next"></a>
            </div>
        </div>
    </div>
    <div class="section" id="section2">
        <div class="fp-tablecell">
            <div class="page2">
                <div class="warp-box">
                    <div class="new-article">
                        <div class="inner wow fadeInDown" data-wow-delay=".2s">
                            <h1>热门文章</h1>
                            <p>
                                你住的城市下雨了，很想问你有没有带伞。<br>可是我忍住了，因为我怕你说没带，而我又无能为力。
                            </p>
                        </div>
                    </div>
                    <div class="layui-row">
                        <div class="layui-col-xs12 layui-col-sm4 layui-col-md4  wow fadeInUp" style="padding: 0 10px">
                            <div class="single-news">
                                <div class="news-head">
                                    <img src="../../static/image/1.jpg">
                                    <a href="#" class="link"><i class="fa fa-link"></i></a>
                                </div>
                                <div class="news-content">
                                    <h4>
                                        <a href="#">
                                            标题
                                        </a>
                                    </h4>
                                    <div class="date">
                                        2019年2月16日
                                    </div>
                                    <p>
                                        很想给你写封信,告诉你这里的天气. 昨夜的那场电影,还有我的心情.
                                    </p>
                                    <a href="#" class="btn">
                                        阅读更多 
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="layui-col-xs12 layui-col-sm4 layui-col-md4  wow fadeInUp" data-wow-delay=".2s" style="padding: 0 10px">
                            <div class="single-news">
                                <div class="news-head">
                                    <img src="../../static/image/1.jpg">
                                    <a href="#" class="link"><i class="fa fa-link"></i></a>
                                </div>
                                <div class="news-content">
                                    <h4>
                                        <a href="#">
                                            标题
                                        </a>
                                    </h4>
                                    <div class="date">
                                        2019年2月16日
                                    </div>
                                    <p>
                                        很想给你写封信,告诉你这里的天气. 昨夜的那场电影,还有我的心情.
                                    </p>
                                    <a href="#" class="btn">
                                        阅读更多 
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="layui-col-xs12 layui-col-sm4 layui-col-md4  wow fadeInUp" data-wow-delay=".4s" style="padding: 0 10px">
                            <div class="single-news">
                                <div class="news-head">
                                    <img src="../../static/image/1.jpg">
                                    <a href="#" class="link"><i class="fa fa-link"></i></a>
                                </div>
                                <div class="news-content">
                                    <h4>
                                        <a href="#">
                                            标题
                                        </a>
                                    </h4>
                                    <div class="date">
                                        2019年2月16日
                                    </div>
                                    <p>
                                        很想给你写封信,告诉你这里的天气. 昨夜的那场电影,还有我的心情.
                                    </p>
                                    <a href="#" class="btn">
                                        阅读更多 
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="section" id="section3">
        <div class="fp-tablecell">
            <div class="page3">
                <div class="warp-box">
                    <div class="warp">
                        <div class="inner">
                            <div class="links">
                                <ul>
                                    <li class="wow fadeInLeft"><a href="#">关于</a></li>
                                    <li class="wow fadeInRight"><a href="#">+友情链接</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer wow fadeInUp" id="contact">
        <div class="footer-top">
            <div class="container">
                <div class="layui-row">
                    <div class="layui-col-xs12 layui-col-sm6 layui-col-md4">
                        <div class="single-widget about">
                            <div class="footer-logo">
                                <h2>慎独</h2>
                            </div>
                            <p>桃李不言，下自成蹊</p>
                            <div class="button">
                                <a href="#" class="btn layui-btn layui-btn-normal">About Me</a>
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-xs12 layui-col-sm6 layui-col-md4">
                        <div class="single-widget">
                            <h2>相关链接</h2>
                            <ul class="social-icon">
                                <li class="active"><a href="#"><i class="fa fa-book"></i>博文</a></li>
                                <li class="active"><a href="#"><i class="fa fa-comments"></i>留言</a></li>
                                <li class="active"><a href="#"><i class="fa fa-share"></i>资源</a></li>
                                <li class="active"><a href="#"><i class="fa fa-snowflake-o"></i>日记</a></li>
                                <li class="active"><a href="#"><i class="fa fa-files-o"></i>归档</a></li>
                            </ul>                   
                        </div>
                    </div>
                    <div class="layui-col-xs12 layui-col-sm12 layui-col-md4">
                        <div class="single-widget contact">
                            <h2>联系我</h2>
                            <ul class="list">
                                <li><i class="fa fa-map"></i>地址: 铜锣湾陈浩南</li>
                                <li><i class="fa fa-qq"></i>QQ: 1370027889 </li>
                                <li><i class="fa fa-envelope"></i>邮箱: 1370027889@qq.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div class="container">
                <div class="layui-row">
                    <div class="layui-col-xs12 layui-col-sm12 layui-col-md12 text-center">
                        <p>Copyright &copy; 2019-2020 慎独 All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>  
    </footer>
  </div>
</template>

<script>
import '../../static/css/index_style.css'

export default {
  name: 'start',
}
</script>
