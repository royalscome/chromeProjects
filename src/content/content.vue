
<script>
export default {
  mounted() {
    var div = document.createElement("div");
    let temp = null;
    chrome.storage.sync.get(["bilibiliUrl"], (item) => {
      temp = item.bilibiliUrl;
      if (temp) {
        div.style.cssText =
          "width:300px;height:150px;position:fixed;bottom:20px;right:20px;z-index:99999;";
        div.innerHTML = `<iframe src=${temp} scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='false' danmuku='0' style='width:100%;height:100%'> </iframe>`;
      } else {
        div.innerHTML =
          "<img src='https://p9-bcy.byteimg.com/img/banciyuan/user/2634784/item/web/179yr/b6f332401f1011e9a6e6af251d2dad0e.gif~tplv-banciyuan-logo-v3:wqlhTmnlsI_lpYjkvJrplb8K5Y2K5qyh5YWDIC0gQUNH54ix5aW96ICF56S-5Yy6.image?sig=9ZM4Y4JJvikm_9Gk5lc4AYkJeOk%3D' style='position:fixed;bottom:80px;right:20px;z-index:99999;width:80px'/>";
      }
    });
    chrome.storage.sync.get({"showBilibili":"1"}, (item) => {
      if (item.showBilibili === "1") {
        setTimeout(() => {
          document.body.appendChild(div);
        }, 300);
      }
    });
    // div.style.cssText = "width:300px;height:150px;position:fixed;bottom:20px;right:20px;z-index:99999;"
    // div.innerHTML = "<img src='https://p9-bcy.byteimg.com/img/banciyuan/user/2634784/item/web/179yr/b6f332401f1011e9a6e6af251d2dad0e.gif~tplv-banciyuan-logo-v3:wqlhTmnlsI_lpYjkvJrplb8K5Y2K5qyh5YWDIC0gQUNH54ix5aW96ICF56S-5Yy6.image?sig=9ZM4Y4JJvikm_9Gk5lc4AYkJeOk%3D' style='position:fixed;bottom:80px;right:20px;z-index:99999;width:80px'/>"
    // div.innerHTML = "<iframe src='//player.bilibili.com/player.html?aid=886607584&bvid=BV1sK4y1n71A&cid=294478771&page=2' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='false' danmuku='0' style='width:100%;height:100%'> </iframe>"
  },
};
</script>
