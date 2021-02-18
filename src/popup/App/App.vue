<template>
  <div class="container" v-loading="loading" :style="{backgroundImage: 'url(' + (imgUrl? imgUrl : '') + ')'}">
    <div class="title">{{ skyCon }}</div>
    <div class="weather">
      <div class="temperature">{{ temperature }}°</div>
      <div class="line"></div>
      <div class="apparent">
        <span class="text">当前体感温度：</span>{{ apparent }}°
      </div>
    </div>
    <div class="poetry">
      <div class="header">{{ header }}</div>
      <div class="author">{{ author }} ({{ dynasty }})</div>
      <div class="content">{{ content }}</div>
    </div>
    <div class="sentence">
      <img :src="picture" alt="" srcset="" />
      <div class="line"></div>
      <div>每日一句：</div>
      <div class="line"></div>
      <div class="sentenceE">{{ sentenceE }}</div>
      <div class="line"></div>
      <div class="sentenceC">{{ sentenceC }}</div>
    </div>
    <div class="area">
      <i class="el-icon-location-outline"> {{area}}</i>
    </div>
    <i
      :class="[refresh ? 'el-icon-loading size' : 'el-icon-refresh size']"
      @click="handleRefresh()"
    ></i>
    <!-- <el-rate v-model="value2" :colors="colors"> </el-rate> -->
  </div>
</template>

<script>
import axios from "axios";
import utils from "../../utils";
const jinrishici = require("jinrishici");
export default {
  data() {
    return {
      value2: null,
      header: null,
      author: null,
      dynasty: null,
      content: null,
      loading: true,
      sentenceE: null,
      sentenceC: null,
      picture: null,
      refresh: false,
      skyCon: null,
      temperature: null,
      apparent: null,
      area:null,
      imgUrl:"",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      token: null,
      weatherCode: {
        CLEAR_DAY: {
          title: "晴（白天）",
          icon: "CLEAR_DAY",
        },
        CLEAR_NIGHT: {
          title: "晴（夜间）",
          icon: "CLEAR_NIGHT",
        },
        PARTLY_CLOUDY_DAY: {
          title: "多云（白天）",
          icon: "PARTLY_CLOUDY_DAY",
        },
        PARTLY_CLOUDY_NIGHT: {
          title: "多云（夜间）",
          icon: "PARTLY_CLOUDY_DAY",
        },
        CLOUDY: {
          title: "阴",
          icon: "CLOUDY",
        },
        LIGHT_HAZE: {
          title: "轻度雾霾",
          icon: "LIGHT_HAZE",
        },
        MODERATE_HAZE: {
          title: "中度雾霾",
          icon: "MODERATE_HAZE",
        },
        HEAVY_HAZE: {
          title: "重度雾霾",
          icon: "HEAVY_HAZE",
        },
        LIGHT_RAIN: {
          title: "小雨",
          icon: "LIGHT_RAIN",
        },
        MODERATE_RAIN: {
          title: "中雨",
          icon: "MODERATE_RAIN",
        },
        HEAVY_RAIN: {
          title: "大雨",
          icon: "HEAVY_RAIN",
        },
        STORM_RAIN: {
          title: "暴雨",
          icon: "STORM_RAIN",
        },
        FOG: {
          title: "雾",
          icon: "FOG",
        },
        LIGHT_SNOW: {
          title: "小雪",
          icon: "LIGHT_SNOW",
        },
        MODERATE_SNOW: {
          title: "中雪",
          icon: "MODERATE_SNOW",
        },
        HEAVY_SNOW: {
          title: "大雪",
          icon: "HEAVY_SNOW",
        },
        STORM_SNOW: {
          title: "暴雪",
          icon: "STORM_SNOW",
        },
        DUST: {
          title: "浮尘",
          icon: "DUST",
        },
        SAND: {
          title: "沙尘",
          icon: "SAND",
        },
        WIND: {
          title: "大风",
          icon: "WIND",
        },
      },
    };
  },
  mounted() {
    this.init();
    // this.getEnglishSentence()
    if (window.navigator.onLine == true) {
      // 　　　　alert("首次 -- 已连接");
    } else {
      this.$message("网络未连接");
    }
    const self = this;
    window.addEventListener("online", online, false);
    window.addEventListener("offline", offline, false);
    function online() {
      self.$message("网络已连接");
    }
    function offline() {
      self.$message("网络未连接");
    }
  },
  methods: {
    async init() {
      this.loading = true;
      const { content } = await this.getAddress();
      const { x, y } = content.point;
      const result = await this.getWeather(x, y);
      const { address } = content;
      console.log(address);
      this.area = address
      await this.getPoetry();
      await this.getEnglishSentence();
      this.loading = false;
      this.refresh = false;
    },
    handleRefresh() {
      this.refresh = true;
      this.init();
    },
    getIp() {
      return new Promise((resolve) => {
        axios.get("http://myip.ipip.net/").then((res) => {
          console.log(res);
          resolve(res.data);
        });
      });
    },
    getAddress() {
      return new Promise((resolve) => {
        axios
          .get(
            "https://api.map.baidu.com/location/ip?ak=cbo5OWlKsVA00SYNfGOdDShfhV5D9e8g&coor=bd09ll"
          )
          .then((res) => {
            resolve(res.data);
          });
      });
    },
    getEnglishSentence() {
      const date = utils.DateFormat.format(new Date(), "yyyy-MM-dd");
      return new Promise((resolve) => {
        axios
          .get(
            `http://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=${date}`
          )
          .then((res) => {
            this.sentenceE = res.data.content;
            this.sentenceC = res.data.note;
            this.picture = res.data.picture3;
            resolve(res);
          });
      });
    },
    getWeather(x, y) {
      return new Promise((resolve) => {
        axios
          .get(
            `https://api.caiyunapp.com/v2.5/qC1ZApuItRgDWrYp/${x},${y}/realtime.json`
          )
          .then((res) => {
            const { result } = res.data;
            const {
              skycon,
              temperature,
              apparent_temperature,
            } = result.realtime;
            console.log(result);
            this.skyCon = this.weatherCode[skycon].title;
            this.imgUrl = `./assets/img/${this.weatherCode[skycon].icon}.jpg`
            console.log(skycon);
            this.temperature = temperature;
            this.apparent = apparent_temperature;
            resolve(res.data);
          });
      });
    },
    getToken() {
      return new Promise((reslove) => {
        axios.get("https://v2.jinrishici.com/token").then((res) => {
          reslove(res.data);
          console.log("toekn", res.data);
        });
      });
    },
    async getPoetry() {
      // const token = (await(this.getToken())).data
      // axios.defaults.headers["X-User-Token"] = token
      return new Promise((resolve) => {
        axios.get("https://qqlykm.cn/api/yan/gc.php").then((res) => {
          let string = res.data.split('"data":')[1].split(',"timestamp"')[0];
          const data = JSON.parse(string);
          this.header = data.subject;
          this.author = data.author;
          this.dynasty = data.dynasty;
          this.content = data.content;
          resolve("success");
        });
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 375px;
  height: 667px;
  position: relative;
  overflow: scroll;
}
.container .area{
  position: absolute;
  z-index: 99;
  bottom: 75px;
  left: 8px;
  font-size: 18px;
}
.container .weather {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container .title {
  position: absolute;
  z-index: 99;
  top: 8px;
  left: 8px;
}
.container .header {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: auto;
  text-align: center;
}
.container .author {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: auto;
  text-align: center;
}
.container .content {
  width: 80%;
  margin: auto;
  text-align: center;
}
.container .sentence {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container .line {
  width: 100%;
  height: 16px;
}
.container .size {
  font-size: 24px;
  position: absolute;
  z-index: 99;
  bottom: 75px;
  right: 8px;
}
.poetry {
  padding-top: 20px;
}
</style>