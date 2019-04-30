<!--  -->
<template>
  <footer class="grid-footer">
        <div class="footer-fixed">
            <div class="copyright">
                <div class="info">
                    <div class="contact">
                        <a href="javascript:void(0)" class="github" target="_blank"><i class="fa fa-github"></i></a>
                        <a href="javascript:void(0)" class="qq" target="_blank" title=""><i class="fa fa-qq"></i></a>
                        <a href="javascript:void(0)" class="email" target="_blank" title=""><i class="fa fa-envelope"></i></a>
                        <a href="javascript:void(0)" class="weixin"><i class="fa fa-weixin"></i></a>
                    </div>
                    <p class="mt05">
                        Copyright &copy; 2019-2020 BOOKFISH All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style scoped>
.footer-fixed{width:1280px;margin-left:auto;margin-right:auto;position:relative}
.grid-footer{background-color:#212220;color:#919290;font-size:14px;padding:20px 0 0 0;position:relative;zoom:1;clear:both;line-height:20px;margin-top:40px;overflow:hidden}
.copyright{padding:10px 0 10px 0}
.copyright .info{position:relative;text-align:center}
.copyright p{color:#565755;font-size:13px}
.copyright .contact a{display:inline-block;width:30px;height:30px;background-color:rgba(255,255,255,.2);text-align:center;line-height:30px;text-shadow:1px 1px 1px rgba(0,0,0,.5);font-size:14px;margin-left:15px;margin-right:0;border-radius:100%;text-decoration:none;color:rgba(255,255,255,.5);-webkit-transition:all .3s;transition:all .3s}
.copyright .contact a:hover{color:#fff}
.copyright .contact .github:hover{background-color:#b952c5}
.copyright .contact .qq:hover{background-color:#d25744}
.copyright .contact .email:hover{background-color:#668f20}
.copyright .contact .weixin:hover{background-color:#06a2c9}
@media screen and (max-width:1366px){.footer-fixed{width:90%}
}
@media screen and (max-width:1024px){
.footer-fixed{width:90%}
}
</style>