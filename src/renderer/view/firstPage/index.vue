<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6" v-for="(item, index) in itemValues" :key="index">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.tip"
          placement="top-start"
        >
          <el-card shadow="hover" style="cursor: pointer; height: 100px">
            <el-row>
              <el-col :span="8" :xs="8" class="hidden-xs-only">
                <svg-icon :icon-class="item.name" />
              </el-col>
              <el-col :span="16" :xs="16">
                <el-row> &nbsp; </el-row>
                <el-row>
                  <div class="card-font"
                    v-if="item.name !== 'currentTimeStamp'">
                  <span
                    
                    >{{ item.content }}</span
                  >
                  </div>
                  <div class="card-font-mobile" v-else>
                  <span >{{
                    item.content
                  }}</span>
                  </div>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-tooltip>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-card shadow="hover" style="height: 500px">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-select v-model="value" placeholder="请选择" @change="getSHistory" :size="size">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              v-model="st"
              :size="size"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              @change="getSHistory"
            >
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <div id="main" class="chart"></div>
        </el-row>
      </el-card>
    </el-row>
    <el-row>
      <el-card shadow="hover" style="height: 520px; margin-top: 20px">
        <div slot="header">
          <el-row>
            <span style="float: left; font-weight: bold"
              ><i class="el-icon-link"></i>本项目基于但不限于以下开源项目</span
            >
          </el-row>
        </div>
        <div>
          <el-row v-for="(item, index) in sources" :key="index">
            <el-link style="float: left; font-size: 1.2em" @click.native="openUrl(item.url)"
              >{{ item.name }}: {{ item.content }}</el-link
            ><el-divider></el-divider>
          </el-row>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import {post} from '@/api'
const { shell } = require('electron');
import "element-ui/lib/theme-chalk/display.css";
import Highcharts from "highcharts/highstock";
export default {
  name: "FirstPage",
  data: () => {
    return {
      itemValues: [
        { name: "ram", content: "", tip: "内存使用信息" },
        { name: "writtenItems", content: "", tip: "写入Item个数" },
        { name: "currentTimeStamp", content: "", tip: "最后一次更新时间" },
        { name: "speed", content: "", tip: "当前写入速率" },
      ],
      chartData: [],
      now: +new Date(1997, 9, 3),
      oneDay: 24 * 3600 * 1000,
      value: Math.random() * 1000,
      myChart: null,
      currentTime: new Date(),
      xData: [],
      rtSpeed: "",
      fontSize: "40px",
      small: false,
      size: 'mini',
      sources: [
        {
          name: "Go",
          url: "https://github.com/golang/go",
          content: "Google开源的支持并发的静态语言",
        },
        {
          name: "leveldb",
          url: "https://github.com/google/leveldb",
          content: "Google开源的基于C++的k-v数据库",
        },
        {
          name: "goleveldb",
          url: "https://github.com/syndtr/goleveldb",
          content: "level的go语言版本,需要cgo",
        },
        {
          name: "gin",
          url: "https://github.com/gin-gonic/gin",
          content: "基于go语言的并发网络框架",
        },
        {
          name: "gRPC",
          url: "https://grpc.io/docs/languages/go/quickstart/",
          content: "RPC的go语言实现",
        },
        {
          name: "go-sqlite3",
          url: "https://github.com/mattn/go-sqlite3",
          content: "sqlite的go语言接口实现",
        },
        {
          name: "json-iterator",
          url: "https://github.com/json-iterator/go",
          content: "代替内置json的高性能json解析器",
        },
        {
          name: "goja",
          url: "https://github.com/dop251/goja",
          content: "基于go的js容器",
        },
        {
          name: "cmap",
          url: "https://github.com/orcaman/concurrent-map",
          content: "并发的map",
        },
        {
          name: "electron",
          url: "https://www.electronjs.org/",
          content: "使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序",
        },
        {
          name: "vue",
          url: "https://github.com/vuejs/vue",
          content: "渐进式的js框架",
        },
        {
          name: "element-ui",
          url: "https://github.com/ElemeFE/element",
          content: "饿了么开源的基于vue的组件库",
        },
        {
          name: "element-admin",
          url: "https://github.com/PanJiaChen/vue-element-admin",
          content: "基于vue-element-ui的后端开源框架",
        },
      ],
      options: [{
          value: 'speed',
          label: '写入耗时'
        },{
          value: 'ram',
          label: '内存使用'
        }],
        value: 'speed',
        label: {'speed': '写入耗时ms', 'ram': '内存使用M'},
        st: [
        new Date(new Date().setTime(new Date() - 10 * 60 * 1000)),
        new Date(),
      ], // 时间选择器的时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    if (document.body.clientWidth < 768) {
      this.fontSize = "10px";
      this.small = true;
    }
    document.querySelector(".el-main").style.backgroundColor = " #f0f2f5";
    this.render();
    this.getSHistory();
    const _this = this;
    // 更新info
    setInterval(function () {
      if (_this.$route.path === "/index") {
        post('', '/data/getDbInfo').then(({ data: { info } }) => {
          for (let i = 0; i < _this.itemValues.length; i++) {
            const item = _this.itemValues[i];
            switch (item.name) {
              case "ram":
                if (info.ram === null) {
                  _this.itemValues[i].content = "0MB";
                } else {
                  _this.itemValues[i].content = info.ram + "MB";
                }
                break;
              case "speed":
                _this.itemValues[i].content = info.speed;
                try {
                  _this.rtSpeed = parseInt(
                    info.speed.split("/")[0].replace("ms", "")
                  );
                } catch (e) {
                  _this.rtSpeed = 0;
                }
                break;
              case "currentTimeStamp":
                try {
                  _this.itemValues[i].content = _this.parseTime(
                    new Date(
                      (parseInt(info.currentTimeStamp) - 8 * 3600) * 1000
                    )
                  );
                } catch (e) {}
                break;
              default:
                _this.itemValues[i].content = info.writtenItems;
                break;
            }
          }
        });
      }
    }, 1000);
    // 更新历史曲线
  },
  methods: {
    parseTime(t) {
      return `${t.getFullYear()}-${
        t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1
      }-${t.getDate() < 10 ? "0" + t.getDate() : t.getDate()} ${
        t.getHours() < 10 ? "0" + t.getHours() : t.getHours()
      }:${t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()}:${
        t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()
      }`;
    },
    getSHistory() {
        post(
          JSON.stringify({
            itemName: this.value,
            startTimes: [
              parseInt(this.st[0].getTime() / 1000 - 10 * 60 + 8 * 3600),
            ], // 10 min ago
            endTimes: [parseInt(this.st[1].getTime() / 1000 + 8 * 3600)],
            interval: 1,
          }), '/data/getDbInfoHistory'
        ).then(({ data }) => {
          this.xData = []
          if (data[this.value][0] !== null) {
            for (let i = 0; i < data[this.value][0].length; i++) {
              
              this.xData.push([
                parseInt(data[this.value][0][i] * 1000),
                parseFloat(data[this.value][1][i].replace("ms", "")),
              ]);
              
            }
          }
          Highcharts.stockChart("main", {
            chart: {},
            credits: {
              enabled: false,
            },
            scrollbar: {
              enabled: true,
            },
            navigator: {
              enabled: true,
            },
            rangeSelector: false,
            title: {
              text: "",
            },
            tooltip: {
              split: false,
              xDateFormat: "%Y-%m-%d %H:%M:%S",
            },
            exporting: {
              enabled: false,
            },
            series: [
              {
                name: this.label[this.value],
                data: this.xData,
              },
            ],
          });
          
        }).catch(({message})=>{
          this.$notify.error({
            title: '获取历史失败',
            message
          })
        });
     
    },
    randomData() {
      this.now = new Date(+this.now + this.oneDay);
      this.value = this.value + Math.random() * 21 - 10;
      return {
        name: this.now.toString(),
        value: [
          [
            this.now.getFullYear(),
            this.now.getMonth() + 1,
            this.now.getDate(),
          ].join("-"),
          Math.round(this.value),
        ],
      };
    },
    render() {
      post('', '/data/getDbInfo').then(({ data: { info } }) => {
        for (let item of this.itemValues) {
          if (item.name === "ram") {
            if (info[item.name] === null) {
              item.content = "0MB";
            } else {
              item.content = info[item.name] + "MB";
            }
          } else {
            item.content = info[item.name];
          }
        }
      });
    },
    parseTime(t) {
      return `${t.getFullYear()}-${
        t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1
      }-${t.getDate() < 10 ? "0" + t.getDate() : t.getDate()} ${
        t.getHours() < 10 ? "0" + t.getHours() : t.getHours()
      }:${t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()}:${
        t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()
      }`;
    },
    openUrl(url){
      shell.openExternal(url);
    }
  },
};
</script>
<style scoped>
.el-icon-s-chartData {
  font-size: 60px;
}
.card-font {
  font-size: 1.2em;
  text-align: center;
}
.card-font-mobile {
  font-size: 0.9em;
  text-align: center;
}
.chart {
  width: 100%;
  height: 400px;
}
.chart_mobile {
  width: 300px;
  height: 400px;
}
</style>