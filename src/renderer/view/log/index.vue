<template>
  <div>
    <el-row>
      <el-form label-width="80px" :inline="true">
        <el-form-item label="日志筛选">
          <el-select
            v-model="selecteType"
            placeholder="请选择"
            @change="getLogs"
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
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="st"
            :size="size"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="getLogs"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :size="size" @click="deleteLogs"
            >删除日志</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 表格区域 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'insertTime' }"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="请求URL:">
              <span>{{ props.row.requestUrl }}</span>
            </el-form-item>
            <el-form-item label="请求方法:">
              <span>{{ props.row.requestMethod }}</span>
            </el-form-item>
            <el-form-item label="userAgent:">
              <span>{{ props.row.userAgent }}</span>
            </el-form-item>
            <el-form-item label="远程服务器IP:">
              <span>{{ props.row.remoteAddress }}</span>
            </el-form-item>
            <el-form-item label="错误信息:">
              <span>{{ props.row.message }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column label="请求URL" prop="requestUrl" align="center">
      </el-table-column>
      <el-table-column
        label="请求Body"
        prop="requestBody"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="写入时间"
        prop="insertTime"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-link
            @click="deleteColumns(scope.row)"
            :underline="false"
            type="danger"
            :size="size"
          >
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-row style="margin-top: 10px">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="itemCount"
        :current-page.sync="currentItemPage"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :page-sizes="[10, 15, 20]"
        :page-size="rowCount"
      ></el-pagination>
    </el-row>
    <!-- 删除日志弹窗 -->
    <el-dialog
      title="删除日志"
      :visible.sync="logDialog"
      width="600px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="120px">
        <el-form-item label="删除的时间段">
          <el-date-picker
            v-model="logSt"
            :size="size"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="删除日志选项">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="0">非授权日志</el-checkbox>
            <el-checkbox
              label="1"
              v-if="showLabel"
            >其他所有用户日志</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm">确定</el-button>
        <el-button @click="logDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { post } from "@/api";
export default {
  name: "Log",
  data() {
    return {
      options: [
        { label: "All", value: "all" },
        { label: "Info", value: "Info" },
        { label: "Error", value: "Error" },
      ],
      selecteType: "all",
      rev: 1,
      size: "mini",
      st: [
        new Date(new Date().setTime(new Date() - 24 * 60 * 60 * 1000)),
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
      tableData: [], // 表格中的数据
      itemCount: 0, // 总日志条数
      startRow: 0, // 开始的row
      rowCount: 10, // 每页的数据
      currentItemPage: 1, // 当前的页码
      userName: "",
      logSt: [
        new Date(new Date().setTime(new Date() - 24 * 60 * 60 * 1000)),
        new Date(),
      ], // 时间选择器的时间
      logDialog: false,
      showLabel: false,
      checkList: [],
    };
  },
  mounted() {
    document.querySelector(".el-main").style.backgroundColor = " #ffffff";
  },
  created() {
    this.userName = this.$store.getters["user/userName"];
    this.showLabel =
      this.$store.getters["user/userRole"].indexOf("super_user") > -1;
    this.getLogs();
  },
  methods: {
    getLogs() {
      post(
        {
          level: this.selecteType,
          startTime: this.parseTime(this.st[0]),
          endTime: this.parseTime(this.st[1]),
          startRow: this.startRow,
          rowCount: this.rowCount,
          name: this.userName,
        },
        "/page/getLogs"
      )
        .then(({ data }) => {
          console.log(data);
          if (typeof data.infos === "string") {
            data.infos = JSON.parse(data.infos);
          }
          this.itemCount = data.count;
          this.tableData =
            data.infos === null
              ? []
              : data.infos.map((item) => {
                  console.log(item.logMessage)
                  let t = JSON.parse(item.logMessage);
                  console.log(t)
                  t["id"] = item["id"];
                  t["insertTime"] = item["insertTime"];
                  return t;
                });
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "查询日志失败",
            message,
          });
        });
    },
    deleteColumns({ id }) {
      this.$confirm("删除操作不可逆,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post(
            {
              id,
            },
            "/page/deleteLogs"
          )
            .then(() => {
              this.$message.success("日志删除成功");
              this.getLogs();
            })
            .catch(({ message }) => {
              this.$notify.error({
                title: "日志删除失败",
                message,
              });
            });
        })
        .catch(() => {
          this.$message.info("操作取消");
        });
    },
    // 每页显示的数目变化
    handleSizeChange(c) {
      this.rowCount = c;
      this.startRow = (this.currentItemPage - 1) * this.rowCount; // start index
      this.getLogs();
    },
    // 页码变化
    handlePageChange() {
      this.startRow = (this.currentItemPage - 1) * this.rowCount;
      this.getLogs();
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
    deleteLogs() {
      this.logDialog = true;
    },
    confirm() {
      let condition = ''
      if(this.showLabel){
        // super user
          if(this.checkList.length ===0){
            // delete current users
            condition = `requestUser='${this.userName}'`
          }else if (this.checkList.includes("0") && this.checkList.includes("1")){
            // delete all users
            condition = "1=1"
          }else if (this.checkList.includes("0") && !this.checkList.includes("1")){
            // 删除当前用户和没有授权的日志
            condition = `requestUser='${this.userName}' or requestUser=''`
          }else{
            // 删除日志，不包括没有授权的日志
            condition = `requestUser != ''`
          }
      }else{
        // common user
        if(this.checkList.length === 0){
          condition = `requestUser='${this.userName}'`
        }else{
          condition = `requestUser='${this.userName}' or requestUser=''`
        }
      }
      post({
        startTime: this.parseTime(this.logSt[0]),
        endTime: this.parseTime(this.logSt[1]),
        userNameCondition: condition
      }, '/page/deleteLogs').then(({data:{effectedRows}})=>{
        this.$message.success(`成功删除日志${effectedRows}条`)
        this.logDialog = false
        this.getLogs()
      }).catch(({message})=>{
        this.$notify.error({
          title: '删除日志失败',
          message
        })
      })
    },
  },
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
</style>