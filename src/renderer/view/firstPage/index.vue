<template>
  <div>
    <el-divider content-position="left">系统运行信息</el-divider>
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统信息" name="systemInfo">
        <el-row :gutter="10">
          <el-col
            :span="6"
            v-for="(item, index) in systemInfos"
            :key="index"
            style="margin-top: 10px; margin-bottom: 10px"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.tip"
              placement="top-start"
            >
              <el-card shadow="hover" style="cursor: pointer; height: 100px" @click.native="showFileInfo(item)">
                <el-row>
                  <el-col :span="8" :xs="8" class="hidden-xs-only">
                    <svg-icon :icon-class="item.name" />
                  </el-col>
                  <el-col :span="16" :xs="16">
                    <el-row> &nbsp; </el-row>
                    <el-row>
                      <div
                        class="card-font"
                        v-if="item.name !== 'currentTimeStamp'"
                      >
                        <span>{{ item.content }}</span>
                      </div>
                      <div class="card-font-mobile" v-else>
                        <span>{{ item.content }}</span>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="float类型数据信息" name="floatInfo">
        <el-row :gutter="10">
          <el-col
            :span="6"
            v-for="(item, index) in floatInfos"
            :key="index"
            style="margin-top: 10px; margin-bottom: 10px"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.tip"
              placement="top-start"
            >
              <el-card shadow="hover" style="cursor: pointer; height: 100px">
                <el-row>
                  <el-col :span="8" :xs="8" class="hidden-xs-only">
                    <svg-icon :icon-class="item.name.replace('float', '')" />
                  </el-col>
                  <el-col :span="16" :xs="16">
                    <el-row> &nbsp; </el-row>
                    <el-row>
                      <div
                        class="card-font"
                        v-if="item.name !== 'syncTime'"
                      >
                        <span>{{ item.content }}</span>
                      </div>
                      <div class="card-font-mobile" v-else>
                        <span>{{ item.content }}</span>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="int类型数据信息" name="intInfo">
        <el-row :gutter="10">
          <el-col
            :span="6"
            v-for="(item, index) in intInfos"
            :key="index"
            style="margin-top: 10px; margin-bottom: 10px"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.tip"
              placement="top-start"
            >
              <el-card shadow="hover" style="cursor: pointer; height: 100px">
                <el-row>
                  <el-col :span="8" :xs="8" class="hidden-xs-only">
                    <svg-icon :icon-class="item.name.replace('int', '')" />
                  </el-col>
                  <el-col :span="16" :xs="16">
                    <el-row> &nbsp; </el-row>
                    <el-row>
                      <div
                        class="card-font"
                        v-if="item.name !== 'syncTime'"
                      >
                        <span>{{ item.content }}</span>
                      </div>
                      <div class="card-font-mobile" v-else>
                        <span>{{ item.content }}</span>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="string类型数据信息" name="stringInfo">
        <el-row :gutter="10">
          <el-col
            :span="6"
            v-for="(item, index) in stringInfos"
            :key="index"
            style="margin-top: 10px; margin-bottom: 10px"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.tip"
              placement="top-start"
            >
              <el-card shadow="hover" style="cursor: pointer; height: 100px">
                <el-row>
                  <el-col :span="8" :xs="8" class="hidden-xs-only">
                    <svg-icon :icon-class="item.name.replace('string', '')" />
                  </el-col>
                  <el-col :span="16" :xs="16">
                    <el-row> &nbsp; </el-row>
                    <el-row>
                      <div
                        class="card-font"
                        v-if="item.name !== 'syncTime'"
                      >
                        <span>{{ item.content }}</span>
                      </div>
                      <div class="card-font-mobile" v-else>
                        <span>{{ item.content }}</span>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="bool类型数据信息" name="boolInfo">
        <el-row :gutter="10">
          <el-col
            :span="6"
            v-for="(item, index) in boolInfos"
            :key="index"
            style="margin-top: 10px; margin-bottom: 10px"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.tip"
              placement="top-start"
            >
              <el-card shadow="hover" style="cursor: pointer; height: 100px">
                <el-row>
                  <el-col :span="8" :xs="8" class="hidden-xs-only">
                    <svg-icon :icon-class="item.name.replace('bool', '')" />
                  </el-col>
                  <el-col :span="16" :xs="16">
                    <el-row> &nbsp; </el-row>
                    <el-row>
                      <div
                        class="card-font"
                        v-if="item.name !== 'syncTime'"
                      >
                        <span>{{ item.content }}</span>
                      </div>
                      <div class="card-font-mobile" v-else>
                        <span>{{ item.content }}</span>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <br />
    <el-divider content-position="left">系统运行历史</el-divider>
    <el-row>
      <el-card shadow="hover" style="height: 500px; margin-top: 10px">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-select v-model="infoValue" placeholder="请选择" :size="size" @change="optionChange">
                <el-option v-for="item in infoOptions" :key="item.value" :label="item.label" :value="item.value"> 
                </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="value"
              placeholder="请选择"
              @change="getSHistory"
              :size="size"
            >
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
    <el-dialog
      title="详细信息"
      :visible.sync="fileInfoDialog"
      width="800px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
    <el-table
    :data='infoData'
    border
    show-summary=""
    >
    <el-table-column prop="groupName" label="组名" align="center"></el-table-column>
    <el-table-column prop="float32" label="float类型" align="center"></el-table-column>
    <el-table-column prop="int32" label="int类型" align="center"></el-table-column>
    <el-table-column prop="string" label="string类型" align="center"></el-table-column>
    <el-table-column prop="bool" label="bool类型" align="center"></el-table-column>
    <el-table-column prop="total" label="合计" align="center"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
        <el-button @click="fileInfoDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { post } from "@/api";
import "element-ui/lib/theme-chalk/display.css";
import Highcharts from "highcharts/highstock";
const { shell } = require("electron");
export default {
  name: "FirstPage",
  data: () => {
    return {
      systemInfos: [
        { name: "ram", content: "", tip: "内存使用信息" },
        { name: "cpu", content: "", tip: "cpu使用信息" },
        { name: "file", content: "", tip: "系统文件大小MB" },
        { name: "currentTimeStamp", content: "", tip: "系统时间" },
      ],
      floatInfos: [
        { name: "speed", content: "", tip: "float类型写入速率" },
        { name: "syncBytes", content: "", tip: "float类型同步字节数" },
        { name: "syncTime", content: "", tip: "float类型同步时间" },
        { name: "syncConsumeTime", content: "", tip: "float类型同步耗时" },
      ],
      intInfos: [
        { name: "speed", content: "", tip: "int类型写入速率" },
        { name: "syncBytes", content: "", tip: "int类型同步字节数" },
        { name: "syncTime", content: "", tip: "int类型同步时间" },
        { name: "syncConsumeTime", content: "", tip: "int类型同步耗时" },
      ],
      stringInfos: [
        { name: "speed", content: "", tip: "string类型写入速率" },
        { name: "syncBytes", content: "", tip: "string类型同步字节数" },
        { name: "syncTime", content: "", tip: "string类型同步时间" },
        { name: "syncConsumeTime", content: "", tip: "string类型同步耗时" },
      ],
      boolInfos: [
         { name: "speed", content: "", tip: "bool类型写入速率" },
        { name: "syncBytes", content: "", tip: "bool类型同步字节数" },
        { name: "syncTime", content: "", tip: "bool类型同步时间" },
        { name: "syncConsumeTime", content: "", tip: "bool类型同步耗时" },
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
      size: "mini",
      role: "",
      showButton: true,
      infoValue:'systemInfo',
      options: [
        {
          value: "ram",
          label: "内存使用",
        },
        {
          value: "cpu",
          label: "cpu使用",
        }
      ],
      infoOptions:[
        {
          value: 'systemInfo',
          label: 'system'
        },
        {
          value: 'floatInfo',
          label: 'float'
        },
        {
          value: 'intInfo',
          label: 'int'
        },
        {
          value: 'stringInfo',
          label: 'string'
        },{
          value: 'boolInfo',
          label: 'bool'
        }
      ],
      value: "ram",
      label: { speed: "写入耗时ms", ram: "内存使用M", cpu: 'cpu使用率%', syncConsumeTime:'同步耗时ms'},
      activeName: "systemInfo",
      st: [
        new Date(new Date().setTime(new Date() - 10 * 60 * 1000)),
        new Date(),
      ], // 时间选择器的时间
      fileInfoDialog:false,
      infoData:[],
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
  created() {
    this.role = this.$store.getters["user/userRole"];
  },
  mounted() {
    this.showButton = !(this.role.indexOf("visitor") > -1); // visitor
    if (document.body.clientWidth < 768) {
      this.fontSize = "10px";
      this.small = true;
    }
    // document.querySelector('.el-main').style.backgroundColor = ' #f0f2f5'
    this.render();
    this.getSHistory();
    const _this = this;
    // 更新info
    setInterval(function () {
      if (_this.$route.path === "/index") {
        _this.render();
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
        {
          infoType: this.infoValue,
          itemName: this.value,
          startTimes: [
            parseInt(this.st[0].getTime() / 1000 - 10 * 60 + 8 * 3600),
          ], // 10 min ago
          endTimes: [parseInt(this.st[1].getTime() / 1000 + 8 * 3600)],
          intervals: [1],
        },
        "/page/getDbInfoHistory"
      )
        .then(({ data }) => {
          this.xData = [];
          let tips = []
          if (typeof data["historicalData"] === "string") {
            // for gRCP mode
            data["historicalData"] = JSON.parse(data["historicalData"]);
          }
          if (data["historicalData"][this.value][0] !== null) {
            for (
              let i = 0;
              i < data["historicalData"][this.value][0].length;
              i++
            ) {
              this.xData.push([
                parseInt(data["historicalData"][this.value][0][i] * 1000),
                parseFloat(
                  data["historicalData"][this.value][1][i].replace("ms", "")
                ),
              ]);
              tips.push(data["historicalData"][this.value][1][i].replace(/.*\//, ""))
            }
          }
          const _this = this
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
              pointFormatter:function(){
                if(_this.infoValue === 'systemInfo'){
                    return `<span style="color:${this.color}">${this.series.name}</span>: <b>${this.series.yData[this.index]}</b><br/>`
                }else{
                    if(_this.value === 'speed'){
                        return `<span style="color:${this.color}">${this.series.name}</span>: <b>${this.series.yData[this.index]}ms(${tips[this.index]}个)</b><br/>`
                    }else{
                        return `<span style="color:${this.color}">${this.series.name}</span>: <b>${this.series.yData[this.index]}ms(${tips[this.index]}字节)</b><br/>`
                    }
                }
              }
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
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "获取历史失败",
            message,
          });
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
      const _this = this;
      post({}, "/page/getDbInfo").then(({ data: { info } }) => {
        if (typeof info === "string") {
          info = JSON.parse(info);
        }
        for (let key in info) {
          let value = info[key];
          switch (key) {
            case "systemInfo":
              _this.systemInfos = [
                { name: "ram", content: value["ram"] + "MB", tip: `内存使用 ${value["ram"]}MB` },
                { name: "cpu", content: value["cpu"]  + "%", tip: `cpu使用 ${value["cpu"]}%` },
                { name: "file", content: value["fileSize"] + "G", tip: `系统文件 ${value["fileSize"]}G` },
                {
                  name: "currentTimeStamp",
                  content: this.parseTime(new Date(
                    (parseInt(value["currentTimeStamp"]) - 8 * 3600) * 1000
                  )),
                  tip: `系统时间 ${this.parseTime(new Date(
                    (parseInt(value["currentTimeStamp"]) - 8 * 3600) * 1000
                  ))}`,
                },
              ];
              break;
            case "floatInfo":
              _this.floatInfos = [
                {
                  name: "speed",
                  content: value["speed"] === ""? "0ms/0":value["speed"],
                  tip: `float类型写入速率 ${value["speed"] === ""? "0ms/0":value["speed"]}`,
                },
                {
                  name: "syncBytes",
                  content: value["syncBytes"] === ""? "0": value["syncBytes"],
                  tip: `float类型同步字节数 ${value["syncBytes"] === ""? "0": value["syncBytes"]}`,
                },
                {
                  name: "syncTime",
                  content: value["syncTime"],
                  tip: `float类型同步时间 ${value["syncTime"]}`,
                },
                {
                  name: "syncConsumeTime",
                  content: value["syncConsumeTime"] + "ms",
                  tip: `float类型同步耗时 ${value["syncConsumeTime"]}ms`,
                },
              ];
              break;
            case "intInfo":
              _this.intInfos = [
                {
                  name: "speed",
                  content: value["speed"] === ""? "0ms/0":value["speed"],
                   tip: `int类型写入速率 ${value["speed"] === ""? "0ms/0":value["speed"]}`,
                },
                {
                  name: "syncBytes",
                  content: value["syncBytes"] === ""? "0": value["syncBytes"],
                  tip: `int类型同步字节数 ${value["syncBytes"] === ""? "0": value["syncBytes"]}`,
                },
                {
                  name: "syncTime",
                  content: value["syncTime"],
                  tip: `int类型同步时间 ${value["syncTime"]}`,
                },
                {
                  name: "syncConsumeTime",
                  content: value["syncConsumeTime"] + "ms",
                  tip: `int类型同步耗时 ${value["syncConsumeTime"]}ms`,
                },
              ];
              break;
            case "stringInfo":
              _this.stringInfos = [
                {
                  name: "speed",
                  content: value["speed"] === ""? "0ms/0":value["speed"],
                   tip: `string类型写入速率 ${value["speed"] === ""? "0ms/0":value["speed"]}`,
                },
                {
                  name: "syncBytes",
                  content: value["syncBytes"] === ""? "0": value["syncBytes"],
                  tip: `string类型同步字节数 ${value["syncBytes"] === ""? "0": value["syncBytes"]}`,
                },
                {
                  name: "syncTime",
                  content: value["syncTime"] ,
                  tip: `string类型同步时间 ${value["syncTime"]}`,
                },
                {
                  name: "syncConsumeTime",
                  content: value["syncConsumeTime"]+ "ms",
                  tip: `string类型同步耗时 ${value["syncConsumeTime"]}ms`,
                },
              ];
            default:
              _this.boolInfos = [
                 {
                  name: "speed",
                  content: value["speed"] === ""? "0ms/0":value["speed"],
                   tip: `bool类型写入速率 ${value["speed"] === ""? "0ms/0":value["speed"]}`,
                },
                {
                  name: "syncBytes",
                  content: value["syncBytes"] === ""? "0": value["syncBytes"],
                  tip: `bool类型同步字节数 ${value["syncBytes"] === ""? "0": value["syncBytes"]}`,
                },
                {
                  name: "syncTime",
                  content: value["syncTime"],
                  tip: `bool类型同步时间 ${value["syncTime"]}`,
                },
                {
                  name: "syncConsumeTime",
                  content: value["syncConsumeTime"] + "ms",
                  tip: `bool类型同步耗时 ${value["syncConsumeTime"]}ms`,
                },
              ];
              break;
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
    openUrl(url) {
      shell.openExternal(url);
    },
    optionChange(){
      if (this.infoValue === 'systemInfo'){
        this.value = 'ram'
        this.options = [
        {
          value: "ram",
          label: "内存使用",
        },
        {
          value: "cpu",
          label: "cpu使用",
        }
      ]
      }else{
        this.value = 'speed'
        this.options = [
        {
          value: "speed",
          label: "写入速率",
        },
        {
          value: "syncConsumeTime",
          label: "同步耗时",
        }
      ]
      }
      this.getSHistory()
    },
    showFileInfo({name}){
       if (name === 'file'){
          post({}, '/page/getDbSize').then(({data: {fileSize}})=>{
            this.infoData = typeof(fileSize) === 'string' ? JSON.parse(fileSize) : fileSize
            this.fileInfoDialog = true
          }).catch(({message})=>{
            this.$notify.error({
              title: '获取数据库信息失败',
              message
            })
          })
       }
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
  font-weight: bold;
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