<template>
  <div>
    <!-- 头部搜索框区域 -->
    <el-row :gutter="10" style="margin-top: -10px;">
      <el-col :span="3">
        <el-select
          :size="size"
          v-model="selectedGroups"
          placeholder="请选择分组"
          @change="getSelectedGroupInfos"
        >
          <el-option
            v-for="(item, index) in groups"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" >
        <el-button :size="size" type="success" class="hidden-xs-only" icon="el-icon-plus" @click="openGroupDialog"
          >批量加组</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-button type="success" :size="size" icon="el-icon-plus" @click="openItemDialog"
          >单个加点</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-button
          type="success"
          class="hidden-xs-only"
          icon="el-icon-folder-opened"
          :size="size"
          @click="openItemsDialog"
          >批量加点</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          icon="el-icon-download"
          @click="handleItemsDownload"
          :size="size"
          >点表下载</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-button type="primary" :size="size" class="hidden-xs-only" icon="el-icon-edit" @click="handleEditGroup" >编辑此组</el-button>
      </el-col>
      <el-col :span="3" >
        <el-button type="danger" :size="size" class="hidden-xs-only" icon="el-icon-delete" @click="handleGroup" :disabled="handleDeleteGroupButtonState"
          >删除此组</el-button
        >
      </el-col>
      <el-col :span="3" >
        <el-button type="danger" :size="size" class="hidden-xs-only" @click="cleanGroups" icon="el-icon-delete"
          >清空此组</el-button
        >
      </el-col>

      <el-col :span="3" :offset="3" style="margin-top:10px">
        <el-button type="primary" :size="size" @click="importHistory" icon="el-icon-upload">历史导入</el-button>
      </el-col>
      <el-col :span="6" style="margin-top:10px">
        <el-input
          class="hidden-xs-only"
          :size="size"
          prefix-icon="el-icon-search"
          v-model="searchKeyWord"
          placeholder="输入关键字搜索"
        />
      </el-col>
      <el-col :span="3" style="margin-top:10px">
        <el-button type="primary" :size="size" class="hidden-xs-only" @click="handleSearch" icon="el-icon-search"
          >表格搜索</el-button
        >
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- table区域 -->
    <el-table
      :data="itemData"
      :size="size"
      :max-height="maxHeight"
      border
       @selection-change="handleSelection"
      style="width: 100%; margin-top: -15px"
      v-loading="tableLoading"
      element-loading-background="transparent"
      :element-loading-text="tableLoadingText"
      row-key="index"
    >
      <el-table-column
        v-for="(item, index) in tableColumns"
        v-if="index === 0"
        :key="Math.random()"
        :prop="item.prop"
        :width="indexWidth"
        :reserve-selection="true"
        type="selection"
        fixed="left"
      ></el-table-column>
      <el-table-column
        v-else-if="index === tableColumns.length - 1"
        fixed="right"
        align="center"
        label="操作"
        :key="Math.random()"
        :width="opWidth"
      >
        <template slot-scope="scope">
          <el-button @click="handleHisroty(scope.row)" type="text"
            >查看</el-button
          >
          <el-button type="text" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        show-overflow-tooltip
        :prop="item.prop"
        align="center"
        :key="Math.random()"
        :label="item.label"
        :min-width="item.width"
      >
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-row style="margin-top: 10px">
      <el-pagination
       v-if='!small'
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="itemCount"
        :current-page.sync="currentItemPage"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :page-sizes="[10, 15, 20]"
        :page-size="rowCount"
      ></el-pagination>
      <el-pagination v-else :total="itemCount"
        small
        layout="prev, pager, next"
        :current-page.sync="currentItemPage"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :page-size="rowCount"
        >  
      </el-pagination>
    </el-row>
    <!-- 加组弹窗 -->
    <el-dialog
      :title="groupDialogName"
      :visible.sync="groupDialog"
      width="800px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="groupForm" :model="groupForm" label-width="100px">
        <el-form-item label="GroupName">
          <el-input
            v-model="groupForm.groupName"
            placeholder="组名请以英文逗号,分隔"
          ></el-input>
        </el-form-item>
        <el-form-item label="ColumnName">
          <el-input
            v-model="groupForm.columnName"
            placeholder="列名请以英文逗号,分隔,组之间请以|分割"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddGroups">确定</el-button>
        <el-button @click="groupDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 单个加点的弹窗 -->
    <el-dialog
      :title="itemDialogName"
      :visible.sync="itemDialog"
      :width="width"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="100px">
        <el-form-item
          v-for="(item, index) in groupColumns"
          :label="item.label"
          :key="index"
        >
          <el-input v-model="item.model" ref="itemForm" :size="size"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddItem">确定</el-button>
        <el-button @click="itemDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 批量加点弹窗 -->
    <el-dialog
      :title="itemDialogNames"
      :visible.sync="itemsDialog"
      v-loading="addItemLoading"
      element-loading-background="transparent"
      element-loading-text="拼命加点中..."
      width="600px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-upload
        style="margin-left:100px"
        accept=".xlsx"
        drag
        :action="actionUrl"
        multiple
        :headers="uploadHeaders"
        :http-request="uploadFile"
        :before-upload="beforeUpload"
        :limit="limit"
        :file-list="fileList"
        :on-exceed="showExceed"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">可以上传xlsx文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddItems">确定</el-button>
        <el-button @click="itemsDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 历史曲线 -->
    <el-dialog
      :title="historyDialogName"
      :visible="historyDialog"
      :width="widthChart"
      v-loading="chartLoading"
      element-loading-background="transparent"
      element-loading-text="数据下载中..."
      :showClose="false"
      :body="showChartBody"
      @opened="handleOpen"
    >
      <div class="block">
        <el-row>
          <el-col :span="14">
            <span style="margin-left: 20px"
              >请选择时间</span
            >
            <el-date-picker
              :size="size"
              v-model="st"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              @change="showHistory"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="8">
            <el-form ref="form" label-width="80px" style="margin-top: -5px">
              <el-form-item label="取数间隔" >
                <el-select v-model="interval" placeholder="请选择" @change="showHistory" :size="size">
                  <el-option
                    v-for="(item, index) in intervals"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div id="main" :width="chartContainerWidth" style="height: 400px"></div>
      <div slot="footer" class="dialog-footer">
        <el-button　@click="handleDownloadData">数据下载</el-button>
        <el-button @click="historyDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 编辑此组的弹窗 -->
    <el-dialog
      :title="editGroupDialogNames"
      :visible.sync="editGroupDialog"
      width="550px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
    :data="groupTableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      prop="columnName"
      align="center"
      label="columnName"
      width="320">
    </el-table-column>
    <el-table-column
      align="center"
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click="editColumns(scope.row)"
          type="text"
          size="small">
          编辑
        </el-button>
        <el-button
          @click="deleteColumns(scope.row)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addColumns">增加列</el-button>
        <el-button @click="editGroupDialogCloseHandler">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 编辑列名弹窗 -->
    <el-dialog
      :title="editColumnDialogNames"
      :visible.sync="editColumnDialog"
      width="550px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-input v-model="editedColumnName"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editColumnHandler">确定</el-button>
        <el-button @click="editColumnDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 增加列的弹窗 -->
    <el-dialog
      :title="addColumnDialogNames"
      :visible.sync="addColumnDialog"
      width="550px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
    <el-form label-width="100px">
        <el-form-item label="列名">
          <el-input
            v-model="addedColumnName"
            placeholder="不同的列名之间请以英文逗号隔开"
          ></el-input>
        </el-form-item>
        <el-form-item label="默认值">
          <el-input
            v-model="columnDefaultValues"
            placeholder="不同列之间的默认值以英文逗号隔开"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addColumnHandler">确定</el-button>
        <el-button @click="addColumnDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 编辑item的弹窗 -->
    <el-dialog
      :title="editItemDialogName"
      :visible.sync="editItemDialog"
      :width="width"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="100px">
        <el-form-item
          v-for="(item, index) in editItems"
          :label="item.label"
          :key="index"
        >
          <el-input v-model="item.value" :size="size"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editItemsHandler">确定</el-button>
        <el-button @click="editItemDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 历史导入的弹窗 -->
    <el-dialog
      :title="importHistoryDialogName"
      :visible.sync="importHistoryDialog"
      :width="width"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="160px">
        <el-form-item label="要导入历史的itemName">
          <el-input
            v-model="historyItemNames"
            placeholder="不同的itemName之间请以英文逗号隔开"
          ></el-input>
        </el-form-item>
        <el-form-item label="历史数据excel的表名">
          <el-input
            v-model="sheetNames"
            placeholder="不同表名之间以英文逗号隔开"
          ></el-input>
        </el-form-item>
      </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmimportHistory">确定</el-button>
        <el-button @click="importHistoryDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 上传历史excel数据的弹窗 -->
    <el-dialog
      :title="itemDialogNames"
      :visible.sync="itemsDialog"
      v-loading="addItemLoading"
      element-loading-background="transparent"
      element-loading-text="导入历史中..."
      width="600px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-upload
        style="margin-left:100px"
        accept=".xlsx"
        drag
        :action="actionUrl"
        multiple
        :headers="uploadHeaders"
        :http-request="uploadFile"
        :before-upload="beforeUpload"
        :limit="limit"
        :file-list="fileList"
        :on-exceed="showExceed"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">可以上传xlsx文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="importHistoryConfirm">确定</el-button>
        <el-button @click="itemsDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {post, uploadFile} from '@/api'
import axios from "axios";
import XLSX from "xlsx"; // 导入exceljs
import { saveAs } from "file-saver";
import { getCookie } from "@/utils/cookie";
import "element-ui/lib/theme-chalk/display.css";
const _ = require("lodash");
import Base64 from "js-base64";
import Highcharts from "highcharts/highstock";

export default {
  name: "Group",
  data: () => {
    return {
      selectedGroups: "", // 被选中的分组
      groups: [], // gdb中已经存在组
      groupDialog: false, // 加组弹窗
      groupDialogName: "批量加组",
      groupForm: {
        groupName: "",
        columnName: "",
      },
      groupColumns: [], // 选中组的列名
      itemDialog: false, // 单个加点的弹窗
      itemDialogName: "单个加点",
      itemData: [], // 表中的数据
      tableColumns: [], // 表头
      indexWidth: "60", // Index的宽度
      opWidth: "200", // 操作列的宽度
      searchKeyWord: "", // 表格搜索关键字
      itemDialogNames: "文件上传", // title
      itemsDialog: false,
      actionUrl: "", // 上传文件的url
      uploadHeaders: { "Content-Type": "multipart/form-data" }, // 上传的头部
      fileList: [], // 上传的文件列表
      fileContent: null,
      limit: 1, // 文件限制
      startRow: 0, // 开始的row
      rowCount: 10, // 每页的数据
      currentItemPage: 1, // 当前的页码
      itemCount: 0, // 总条数
      addItemLoading: false, // 加点loading
      searchCondition: "itemName like '%%'", // 根据searchKeyWord组成的搜索条件
      tableLoading: false, // 加载table
      tableLoadingText: "表格数据加载中...",
      historyDialogName: "历史曲线查看",
      historyDialog: false,
      myChart: null,
      st: [
        new Date(new Date().setTime(new Date() - 3600 * 1000 * 24)),
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
      intervals: [
        { label: "1s", value: "1" },
        { label: "10s", value: "10" },
        { label: "30s", value: "30" },
        { label: "60s", value: "60" },
        { label: "120s", value: "120" },
        { label: "360s", value: "360" },
      ], // 取数间隔选择
      interval: "60", // 取数间隔
      selectedItem: "", // 选择的item
      chartItemValues: null, // chart中的数据
      chartLoading: false,
      showChartBody: document.getElementById("main"),
      handleDeleteGroupButtonState: null, // 编辑按钮的状态
      editGroupDialogNames: "编辑此组",
      editGroupDialog: false,
      groupTableData: [],
      editColumnDialogNames: "编辑列名",
      editColumnDialog: false,
      editedColumnName: "", // 要被编辑的列名
      oldColumnName: "", // 原来的列名
      addColumnDialogNames: "增加列",
      addColumnDialog: false,
      addedColumnName: "", // 增加的列名
      columnDefaultValues: "", // 各个列的默认值
      editItemDialogName: "编辑Item",
      editItemDialog: false,
      editItems: [], // 编辑框的Item
      rowId: 0, // 编辑行在数据库中id
      size: "mini", // 尺寸
      width: "800px",
      chartContainerWidth: "900px",
      widthChart: "1000px",
      maxHeight: 1000,
      small: false,
      transferValue: [],
      transferData: [],
      titles: ["已有Item", "已选Item"],
      loadingTransfer: false,
      selectedRows: [], // 选中的行
      deletedRows: [], // 要被删除历史的items
      dst: [
        new Date(new Date().setTime(new Date() - 3600 * 1000 * 24)),
        new Date(),
      ], // 时间选择器的时间
      infoConfirmnDialog: false,
      itemInfos: [],
      timeStamp: "",
      importHistoryDialogName: "历史导入",
      importHistoryDialog: false,
      historyItemNames: "",
      sheetNames: "",
    };
  },
  mounted() {
    document.querySelector(".el-main").style.backgroundColor = " #ffffff";
  },
  created() {
    // 页面实例挂载完之后执行
    if (document.body.clientWidth < 768) {
      this.size = "mini";
      this.width = document.body.clientWidth + "px";
      this.chartContainerWidth = this.width;
      this.widthChart = document.body.clientWidth + "px";
      this.small = true;
      this.maxHeight = 600;
      this.rowCount = 9;
    }
    this.initial(true);
    getCookie("ip").then((ip) => {
      this.actionUrl = "http://" + ip + "/page/uploadFile";
    });
  },
  methods: {
    initial(flag = false) {
      post('', '/group/getGroups').then(({ data }) => {
        this.groups = data.groupNames;
        if (flag) {
          this.selectedGroups = this.groups[0];
        }
        this.handleDeleteGroupButtonState =
          this.selectedGroups === "calc" ? true : false;
        this.render();
      });
    },
    // 点击加组按钮
    openGroupDialog() {
      this.groupForm.groupName = "";
      this.groupForm.columnName = "";
      this.groupDialog = true;
    },
    // 加组
    handleAddGroups() {
      if (this.groupForm.groupName.length != 0) {
        const g = this.groupForm.groupName.split(","); // 获取所有的组名
        const c = this.groupForm.columnName.split("|"); // 对应的列名
        if (g.length != c.length) {
          this.$message.error("列名个数和组名个数必须一致");
        } else {
          const d = [];
          for (let i = 0; i < g.length; i++) {
            if (c[i].length == 0) {
              d.push({ groupName: g[i] });
            } else {
              d.push({ groupName: g[i], columnNames: c[i].split(",") });
            }
          }
          post(JSON.stringify({ groupInfos: d }), '/group/addGroups')
            .then((r) => {
              this.$message.success("添加成功!");
              this.groupDialog = false;
              post('', '/group/getGroups').then(({ data }) => {
                this.groups = data.groupNames;
                this.selectedGroups = this.groups[0];
              });
            })
            .catch(({ message }) => {
              this.$notify.error({
                title: "加组失败",
                message,
              });
            });
        }
      } else {
        this.$message.warning("请输入有效的组名");
      }
    },
    // 组切换回调函数
    getSelectedGroupInfos() {
      this.render(); // 重新渲染
      this.handleDeleteGroupButtonState =
        this.selectedGroups === "calc" ? true : false;
    },
    // 加单个点的弹窗
    openItemDialog() {
      this.itemDialog = true;
    },
    // 加单个点
    handleAddItem() {
      let values = [];
      let d = {};
      const f = this.$refs.itemForm;
      for (let i = 0; i < this.groupColumns.length; i++) {
        d[this.groupColumns[i]["label"]] = f[i].value;
      }
      values.push(d);
      post(
        JSON.stringify({
          groupName: this.selectedGroups,
          gdbItems: { itemValues: values },
        }), '/item/addItems'
      )
        .then(() => {
          this.itemDialog = false;
          this.$message.success("添加成功!");
          this.render();
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "添加失败",
            message,
          });
        });
    },
    // 删除组
    handleGroup() {
      this.$confirm("删除操作不可逆,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post(
            JSON.stringify({
              groupNames: [this.selectedGroups],
            }), '/group/deleteGroups'
          ).then(() => {
            post('', '/group/getGroups')
              .then(({ data }) => {
                this.groups = data.groupNames;
                this.selectedGroups = this.groups[0];
                this.render();
                this.$message.success("删除成功!");
              })
              .catch(({ message }) => {
                this.$notify.error({
                  title: "删除失败",
                  message,
                });
              });
          });
        })
        .catch(() => {});
    },
    // 显示对应组的item数据
    showItems(groupName) {
      this.tableLoading = true;
      post(
        JSON.stringify({
          groupName: this.selectedGroups,
          columnNames: "*",
          condition: this.searchCondition,
          startRow: this.startRow,
          rowCount: this.rowCount,
        }), '/item/getItemsWithCount'
      )
        .then(({ data: { itemCount, itemValues } }) => {
          this.itemCount = itemCount;
          this.itemData = [];
          let itemNames = [];
          if (itemValues !== null) {
            for (let i = 0; i < itemValues.length; i++) {
              itemNames.push(itemValues[i].itemName);
            }
          }
          post(
            JSON.stringify({
              groupName,
              itemNames,
            }), '/data/getRealTimeData'
          )
            .then(({ data: { realTimeData } }) => {
              const timeData = realTimeData;
              if (itemNames.length !== 0) {
                for (let i = 0; i < itemNames.length; i++) {
                  itemValues[i]["realTimeData"] =
                    timeData[itemNames[i]] === null
                      ? ""
                      : timeData[itemNames[i]];
                  itemValues[i]["index"] = (this.startRow + i).toString();
                }
              }
              this.itemData = itemValues === null ? [] : itemValues;
              this.tableLoading = false;
            })
            .catch(({ message }) => {
              this.tableLoading = false;
              this.$notify.error({
                title: "获取实时值失败",
                message,
              });
            });
        })
        .catch(({ message }) => {
          this.tableLoading = false;
          this.$notify.error({
            title: "获取Item失败",
            message,
          });
        });
    },
    // 渲染表头和加点弹窗
    render() {
      // 根据组去获取对应的列名的信息
      post(
        JSON.stringify({
          groupName: this.selectedGroups,
          condition: "1=1",
        }), '/group/getGroupProperty'
      )
        .then(({ data }) => {
          this.showItems(this.selectedGroups);
          this.rowKey = "rowKey";
          const columns = data.itemColumnNames;
          let c = [];
          let c1 = [{ prop: "index", label: "index" }]; // index列
          this.tableColumns = [];
          const width =
            (1600 - parseInt(this.opWidth) - parseInt(this.indexWidth)) /
            (columns.length + 1);
          for (let i = 0; i < columns.length; i++) {
            c.push({ index: i + 1, label: columns[i], model: "" });
            c1.push({ prop: columns[i], label: columns[i], width: width });
          }
          c1.push({
            prop: "realTimeData",
            label: "realTimeData",
            width: width,
          }); // 实时值
          c1.push({ prop: "op", label: "op" }); // 操作列
          this.groupColumns = c; // 更新groupColumn弹窗中form
          this.tableColumns = c1; // 更新表头
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 批量加点按钮
    openItemsDialog() {
      this.itemsDialog = true;
      this.fileList = [];
    },
    // 上传之前
    beforeUpload(file) {
      this.fileContent = file; // 获取文件
      if (this.isExcel(this.fileContent.name)) {
        return true;
      } else {
        this.$message.error("非法的文件类型或者文件列表已满!");
        return false; // 返回false取消上传
      }
    },
    // 上传
    async uploadFile() {
      const data = new FormData();
      const fileUps = this.fileContent;
      data.append("file", fileUps);
      const userToken = await getCookie("token");
      const userName = await getCookie("userName");
      const token = "Basic " + Base64.encode(`${userName}:${userToken}`);
      uploadFile(fileUps).then(()=>{
        this.$message.success("上传成功");
      }).catch(({message})=>{
         this.$notify.error({
           title: '上传失败',
           message
         })
      })
    },
    // 检查是否是excel
    isExcel(name) {
      return /\.(xlsx|xls|csv)$/.test(name);
    },
    // 点击确定开始加点
    handleAddItems() {
      this.addItemLoading = true;
      post(
        JSON.stringify({
          fileName: this.fileContent.name,
          groupName: this.selectedGroups,
        }), '/page/addItemsByExcel'
      )
        .then(() => {
          this.addItemLoading = false;
          this.itemsDialog = false;
          this.render();
          this.$message.success("加点成功");
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "加点失败",
            message,
          });
          this.addItemLoading = false;
        });
    },
    // 页码数变化
    handleSizeChange(c) {
      this.rowCount = c;
      this.startRow = (this.currentItemPage - 1) * this.rowCount; // start index
      this.showItems(this.selectedGroups);
    },
    // 页码变化
    handlePageChange() {
      this.startRow = (this.currentItemPage - 1) * this.rowCount;
      this.showItems(this.selectedGroups);
    },
    // 表格搜索
    handleSearch() {
      this.searchCondition = `itemName like '%${this.searchKeyWord}%'`;
      this.showItems(this.selectedGroups);
    },
    s2ab(s) {
      var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf); //create uint8array as viewer
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
      return buf;
    },
    // 点表下载
    handleItemsDownload() {
      this.$confirm(`下载当前${this.itemCount}条数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableLoadingText = "正在下载中...";
          this.tableLoading = true;
          post(
            JSON.stringify({
              groupName: this.selectedGroups,
              condition: "1=1",
            }), '/group/getGroupProperty'
          ).then(({ data }) => {
            const headers = data.itemColumnNames;
            post(
              JSON.stringify({
                groupName: this.selectedGroups,
                columnNames: "*",
                condition: this.searchCondition,
                startRow: -1,
              }), '/item/getItemsWithCount'
            )
              .then(({ data: { itemValues } }) => {
                const wb = XLSX.utils.book_new(); // 创建工作簿
                wb.SheetNames.push("Sheet1");
                let wd = [headers];
                if (itemValues != null) {
                  itemValues.forEach((item) => {
                    let row = [];
                    headers.forEach((key) => {
                      row.push(item[key]);
                    });
                    wd.push(row); // 将数据写入工作表
                  });
                }
                const ws = XLSX.utils.aoa_to_sheet(wd);
                wb.Sheets["Sheet1"] = ws;
                const buf = this.s2ab(
                  XLSX.write(wb, { bookType: "xlsx", type: "binary" })
                );
                saveAs(
                  new Blob([buf]),
                  this.selectedGroups + "_" + new Date().getTime() + ".xlsx"
                ); // 将数据写入excel
                this.$message.success("下载完成");
                this.tableLoadingText = "表格数据加载中...";
                this.tableLoading = false;
              })
              .catch(({ message }) => {
                this.$notify.error({
                  title: "数据下载失败",
                  message,
                });
              });
          });
        })
        .catch(() => {});
    },
    // 查看历史曲线
    handleHisroty({ itemName }) {
      this.historyDialog = true;
      this.selectedItem = itemName;
    },
    // 显示历史曲线
    showHistory() {
      this.chartLoading = true;
      const s =
        new Date(this.parseTime(this.st[0])).getTime() / 1000 + 8 * 3600;
      const e =
        new Date(this.parseTime(this.st[1])).getTime() / 1000 + 8 * 3600;
      post(
        JSON.stringify({
          groupName: this.selectedGroups,
          itemNames: [this.selectedItem],
          startTimes: [s],
          endTimes: [e],
          intervals: [parseInt(this.interval)],
        }), '/data/getHistoricalData'
      )
        .catch(({ message }) => {
          this.$notify.error({
            title: "获取历史值失败",
            message,
          });
        })
        .then(({ data: { historicalData } }) => {
          this.chartItemValues = historicalData[this.selectedItem];
          let tData = [];
          if (historicalData[this.selectedItem][0] === null) {
            tData = [[0, 0]];
          } else {
            for (
              let i = 0;
              i < historicalData[this.selectedItem][0].length;
              i++
            ) {
              tData.push([
                historicalData[this.selectedItem][0][i] * 1000,
                parseFloat(historicalData[this.selectedItem][1][i]),
              ]);
            }
          }
          Highcharts.stockChart("main", {
            rangeSelector: false,
            title: {
              text: this.selectedItem,
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                name: this.selectedItem,
                data: tData,
                type: "area",
                threshold: null,
                tooltip: {
                  valueDecimals: 2,
                  xDateFormat: "%Y-%m-%d %H:%M:%S",
                },
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                  },
                  stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [
                      1,
                      Highcharts.Color(Highcharts.getOptions().colors[0])
                        .setOpacity(0)
                        .get("rgba"),
                    ],
                  ],
                },
              },
            ],
          });
          this.chartLoading = false;
        });
    },
    handleOpen() {
      this.showHistory();
    },
    // 转换时间
    parseTime(t) {
      return `${t.getFullYear()}-${
        t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1
      }-${t.getDate() < 10 ? "0" + t.getDate() : t.getDate()} ${
        t.getHours() < 10 ? "0" + t.getHours() : t.getHours()
      }:${t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()}:${
        t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds()
      }`;
    },
    // 下载数据
    handleDownloadData() {
      this.chartLoading = true;
      let workBook = XLSX.utils.book_new(); // 创建工作簿
      let wd = [["Time", "Data"]];
      if (this.chartItemValues !== null) {
        for (let i = 0; i < this.chartItemValues[0].length; i++) {
          let row = [];
          row.push(
            this.parseTime(
              new Date(parseInt(this.chartItemValues[0][i]) * 1000)
            )
          );
          row.push(this.chartItemValues[1][i]);
          wd.push(row); // 将数据写入工作表
        }
      }
      const ws = XLSX.utils.aoa_to_sheet(wd);
      XLSX.utils.book_append_sheet(workBook, ws, "Sheet1");
      const buf = this.s2ab(
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
      );
      saveAs(
        new Blob([buf]),
        this.selectedGroups +
          "_" +
          this.selectedItem +
          "_" +
          new Date().getTime() +
          ".xlsx"
      ); // 将数据写入excel
      this.$message.success("下载完成");
      this.chartLoading = false;
    },
    // 编辑此组
    handleEditGroup() {
      this.editGroupDialog = true;
      this.groupTableData = [];
      for (let item of this.groupColumns) {
        this.groupTableData.push({ columnName: item.label });
      }
    },
    // 文件列表已满
    showExceed() {
      this.$message.error("文件列表已满");
    },
    // 编辑column
    editColumns({ columnName }) {
      this.editColumnDialog = true;
      this.oldColumnName = columnName;
      this.editedColumnName = columnName;
    },
    // 确定更新列名
    editColumnHandler() {
      if (this.oldColumnName != this.editedColumnName) {
        this.$confirm("确定更新列名?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            post(
              JSON.stringify({
                groupName: this.selectedGroups,
                oldColumnNames: [this.oldColumnName],
                newColumnNames: [this.editedColumnName],
              }), '/group/updateGroupColumnNames'
            )
              .then(({ data }) => {
                this.groupTableData.map((item) => {
                  item.columnName === this.oldColumnName
                    ? (item.columnName = this.editedColumnName)
                    : "";
                });
                this.$message.success("更新成功!");
                this.editColumnDialog = false;
              })
              .catch(({ message }) => {
                this.$notify.error({
                  title: "更新失败",
                  message,
                });
                this.editColumnDialog = false;
              });
          })
          .catch(() => {});
      } else {
        this.editColumnDialog = false;
      }
    },
    // 点击增加列
    addColumns() {
      this.addedColumnName = "";
      this.columnDefaultValues = "";
      this.addColumnDialog = true;
    },
    // 删除列
    deleteColumns({ columnName }) {
      this.$confirm("删除操作不可逆,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post(
            JSON.stringify({
              groupName: this.selectedGroups,
              columnNames: [columnName],
            }), '/group/deleteGroupColumns'
          )
            .then(({ data }) => {
              this.groupTableData = this.groupTableData.filter((item) => {
                return item.columnName != columnName;
              });
              this.$message.success("删除成功!");
            })
            .catch(({ message }) => {
              this.$notify.error({
                title: "删除列失败",
                message,
              });
            });
        })
        .catch(() => {});
    },
    // 关闭增加此组的弹窗
    editGroupDialogCloseHandler() {
      this.initial();
      this.editGroupDialog = false;
    },
    // 确定增加列
    addColumnHandler() {
      if (this.addedColumnName.length === 0) {
        this.$message.warning("请输入有效的列名");
      } else if (this.columnDefaultValues.length === 0) {
        this.$message.warning("请输入有效的默认值");
      } else {
        if (
          this.addedColumnName.split(",").length !==
          this.columnDefaultValues.split(",").length
        ) {
          this.$$message.warning("列名和默认值不一致");
        } else {
          post(
            JSON.stringify({
              groupName: this.selectedGroups,
              columnNames: this.addedColumnName.split(",").map((item) => {
                return item.trim();
              }),
              defaultValues: this.columnDefaultValues.split(","),
            }), '/group/addGroupColumns'
          )
            .then(() => {
              this.$message.success(`增加列${this.addedColumnName}成功`);
              for (let item of this.addedColumnName.split(",")) {
                this.groupTableData.push({ columnName: item.trim() });
              }
              this.addColumnDialog = false;
            })
            .catch(({ message }) => {
              this.$notify.error({
                title: "增加列失败",
                message,
              });
              this.addColumnDialog = false;
            });
        }
      }
    },
    // 编辑item
    editItem(row) {
      this.rowId = row.id;
      this.editItems = [];
      this.editItemDialog = true;
      for (let k in row) {
        if (
          k != "id" &&
          k != "index" &&
          k != "realTimeData" &&
          k != "itemName"
        ) {
          this.editItems.push({ label: k, value: row[k] });
        }
      }
    },
    // 确定编辑item按钮
    editItemsHandler() {
      let clause = [];
      let condition = "id=" + this.rowId;
      for (let i = 0; i < this.editItems.length; i++) {
        clause.push(`${this.editItems[i].label}='${this.editItems[i].value}'`);
      }
      post(
        JSON.stringify({
          groupName: this.selectedGroups,
          clause: clause.join(","),
          condition,
        }), '/item/updateItems'
      )
        .then(() => {
          this.$message.success("更新成功!");
          this.render();
          this.editItemDialog = false;
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "更新失败",
            message,
          });
        });
    },
    // 删除item
    deleteItem({ itemName }) {
      this.$confirm("删除操作不可逆,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post(
            JSON.stringify({
              groupName: this.selectedGroups,
              condition: "itemName='" + itemName + "'",
            }), '/item/deleteItems'
          )
            .then(() => {
              this.$message.success("删除成功!");
              this.initial();
            })
            .catch(({ message }) => {
              this.$notify.error({
                title: "删除失败",
                message,
              });
            });
        })
        .catch(() => {});
    },
    // 设置穿梭框的宽度,并且加载穿梭框中的数据
    changeTransferWidth() {
      document.querySelectorAll(".el-transfer-panel").forEach((item) => {
        item.style.width = "350px";
        item.style.textAlign = "left";
      });
      this.transferValue = [];
      this.transferData = [];
      for (let i = 0; i < this.selectedRows.length; i++) {
        this.transferData.push({
          key: i,
          label: this.selectedRows[i]["itemName"],
        });
      }
      this.deletedRows = this.selectedRows;
      this.titles = [
        `${this.selectedGroups}中已选择的Items`,
        `${this.selectedGroups}中已剔除的Items`,
      ];
    },
    // 表格选中的数据
    handleSelection(s) {
      this.selectedRows = s;
    },
    //
    updateDeletedRows(indexes) {
      this.deletedRows = [];
      for (let i = 0; i < this.selectedRows.length; i++) {
        if (indexes.indexOf(i) === -1) {
          this.deletedRows.push({ itemName: this.selectedRows[i]["itemName"] }); // update deleted rows
        }
      }
    },
    loadItems() {
      const t = _.difference(this.deletedRows, this.itemInfos, "itemName");
      if (t.length <= 2) {
        this.itemInfos = this.itemInfos.concat(t);
      } else {
        for (let i = 0; i < 2; i++) {
          this.itemInfos.push(t[i]);
        }
      }
    },
    // 清空表中的数据
    cleanGroups() {
      this.$confirm(`确定清空表${this.selectedGroups}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post(
            JSON.stringify({
              groupNames: [this.selectedGroups],
            }), '/group/cleanGroupItems'
          )
            .then(() => {
              this.$message.success(`清空表${this.selectedGroups}成功`);
              this.showItems(this.selectedGroups);
            })
            .catch((err) => {
              this.$message.error(err.message);
            });
        })
        .catch(() => {
          this.$message.warning("操作取消");
        });
    },
    // 导入历史数据
    importHistory() {
      this.importHistoryDialog = true;
    },
    // 确定导入历史
    confirmimportHistory() {
      if (this.historyItemNames.length == 0 || this.sheetNames.length == 0) {
        this.$message.warning("请输入正确的itemName或者sheetName");
      } else if (
        this.historyItemNames.split(",").length !==
        this.sheetNames.split(",").length
      ) {
        this.$message.warning("itemName个sheetName个数不一致");
      } else {
        post(
          JSON.stringify({
            groupName: this.selectedGroups,
            itemNames: this.historyItemNames.split(","),
          }), '/item/checkItems'
        )
          .then(() => {
            // 所有点都存在
            this.fileList = [];
            this.itemsDialog = true;
          })
          .catch(({ message }) => {
            this.$notify.error({
              title: "检查itemName",
              message,
            });
          });
      }
    },
    // 从excel中导入历史
    importHistoryConfirm() {
      const fileName = this.fileContent.name; // 文件名
      const sheetNames = this.sheetNames.split(","); // sheetName
      const itemNames = this.historyItemNames.split(",");
      this.addItemLoading = true;
      post(
        JSON.stringify({
          fileName,
          sheetNames,
          itemNames,
        }), '/page/importHistoryByExcel'
      )
        .then(() => {
          this.addItemLoading = false;
          this.itemsDialog = false;
          this.importHistoryDialog = false;
          this.$message.success("历史导入成功");
        })
        .catch(({ message }) => {
          this.addItemLoading = false;
          this.itemsDialog = false;
          this.importHistoryDialog = false;
          this.$notify.error({
            title: "历史导入失败",
            message,
          });
        });
    },
  },
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
.el-autocomplete {
  width: 100%;
}
/* 设置分页的样式 */
.el-pagination {
  float: left;
}
.el-upload-dragger {
  margin-left: 100px im !important;
  width: 700px;
}
.el-upload__tip {
  margin-left: 200px im !important;
}
.el-divider--horizontal {
  margin: 10px 0;
  width: 100%;
}
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
}

.demo-block.hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
}

.demo-block code {
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
}

.demo-block .demo-button {
  float: right;
}

.demo-block .source {
  padding: 24px;
}

.demo-block .meta {
  background-color: #fafafa;
  border-top: 1px solid #eaeefb;
  overflow: hidden;
  height: 0;
  transition: height 0.2s;
}

.demo-block .description {
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  word-break: break-word;
  margin: 10px;
  background-color: #fff;
}

.demo-block .description p {
  margin: 0;
  line-height: 26px;
}

.demo-block .description code {
  color: #5e6d82;
  background-color: #e6effb;
  margin: 0 4px;
  display: inline-block;
  padding: 1px 5px;
  font-size: 12px;
  border-radius: 3px;
  height: 18px;
  line-height: 18px;
}

.demo-block .highlight pre {
  margin: 0;
}

.demo-block .highlight code.hljs {
  margin: 0;
  border: none;
  max-height: none;
  border-radius: 0;
}

.demo-block .highlight code.hljs:before {
  content: none;
}

.demo-block .demo-block-control {
  border-top: 1px solid #eaeefb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #d3dce6;
  cursor: pointer;
  position: relative;
}

.demo-block .demo-block-control.is-fixed {
  position: fixed;
  bottom: 0;
  width: 868px;
}

.demo-block .demo-block-control i {
  font-size: 16px;
  line-height: 44px;
  transition: 0.3s;
}

.demo-block .demo-block-control i.hovering {
  transform: translateX(-40px);
}

.demo-block .demo-block-control > span {
  position: absolute;
  transform: translateX(-30px);
  font-size: 14px;
  line-height: 44px;
  transition: 0.3s;
  display: inline-block;
}

.demo-block .demo-block-control:hover {
  color: #409eff;
  background-color: #f9fafc;
}

.demo-block .demo-block-control .text-slide-enter,
.demo-block .demo-block-control .text-slide-leave-active {
  opacity: 0;
  transform: translateX(10px);
}

.demo-block .demo-block-control .control-button {
  line-height: 26px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  padding-left: 5px;
  padding-right: 25px;
}

..infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #e8f3fe;
  margin: 10px;
  color: #7dbcfc;
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}

.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #fff6f6;
  color: #ff8484;
}

.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>