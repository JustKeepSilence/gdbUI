<template>
  <div>
    <el-row> </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%" border :size="size">
        <el-table-column type="index" label="index" width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          label="description"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="expression"
          label="expression"
          show-overflow-tooltip
          align="center"
          width="800"
        >
        </el-table-column>
        <el-table-column
          prop="duration"
          label="duration"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="status"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="errorMessage"
          label="errorMessage"
          align="center"
          show-overflow-tooltip=""
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="createTime"
          sortable
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="updatedTime"
          label="updatedTime"
          align="center"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column :width="owdith" fixed="right" align="center">
          <template slot="header" slot-scope="scope">
            <el-row>
              <el-col :span="10">
                <el-button
                  type="text"
                  @click="handleCalcOpen"
                  :size="size"
                  class="hidden-xs-only"
                  v-if="showButton === true"
                  >新增计算项</el-button
                >
              </el-col>
              <el-col :span="14">
                <el-input
                  class="hidden-xs-only"
                  placeholder="根据description进行搜索"
                  v-model="condition"
                  :size="size"
                  @input="searchHandler"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-col>
            </el-row>
          </template>
          <template slot-scope="scope">
            <el-button
              type="text"
              :size="size"
              @click="edit(scope.row)"
              :disabled='disabled'
              class="hidden-xs-only"
              >编辑</el-button
            >
            <el-button
              type="text"
              :size="size"
              v-if="scope.row.status === 'false'"
              :disabled='disabled'
              @click="startCalc(scope.row)"
              >启动</el-button
            >
            <el-button
              type="text"
              v-else
              :size="size"
              :disabled='disabled'
              @click="stopCalc(scope.row)"
              >停止</el-button
            >
            <el-button type="text" :size="size" @click="deleteCalc(scope.row)" :disabled='disabled'
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 新增计算项 -->
    <el-dialog
      :title="calcDialogName"
      :visible.sync="calcDialog"
      width="800px"
      :showClose="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @opened="handleCalcOpened"
      destroy-on-close
    >
      <el-row>
        <div
          id="jsCode"
          name="code"
          style="width: 750px"
        ></div>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="calcHandler">确定</el-button>
        <el-button @click="uploadJS">代码上传</el-button>
      </div>
    </el-dialog>
    <!-- 编辑计算项 -->
    <el-dialog
      :title="editDialogName"
      :visible.sync="editDialog"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @opened="handleCalcOpened1"
      destroy-on-close
    >
      <el-row>
        <div
          id="jsCodeEdit"
          style="width: 750px"
        ></div>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCalcItem">确定</el-button>
        <el-button @click="editCalcItem">编辑计算项</el-button>
      </div>
    </el-dialog>
    <!-- 代码上传 -->
    <el-dialog
      :title="codeUploadDialogNames"
      :visible.sync="codeUploadDialog"
      width="600px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-upload
        style="margin-left: 100px"
        accept=".js"
        drag
        :action="actionUrl"
        multiple
        :headers="uploadHeaders"
        :http-request="uploadCodeFile"
        :before-upload="beforeCodeUpload"
        :limit="limit"
        :file-list="codeFileList"
        :on-exceed="showExceed"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">可以上传js文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showJsCode">确定</el-button>
        <el-button @click="codeUploadDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 计算项描述 -->
    <el-dialog
      :title="descriprionDialogNames"
      :visible.sync="descriprionDialog"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-input v-model="description" placeholder="请输入计算项描述"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="descriptionHandler">确定</el-button>
        <el-button @click="checkJsCode">检查代码</el-button>
      </div>
    </el-dialog>
    <!-- 编辑时间 -->
    <el-dialog
      :title="timeDurationDialogNames"
      :visible.sync="timeDurationDialog"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="100px">
        <el-form-item
          v-for="(item, index) in editItems"
          :label="item.label"
          :key="index"
        >
          <el-input v-model="item.value"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="timeHandler">确定</el-button>
        <el-button @click="checkJsCodeEdit">代码检查</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCookie } from "@/utils/cookie";
import "element-ui/lib/theme-chalk/display.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/lib/codemirror.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/mode/javascript/javascript.js";

import CodeMirror from "codemirror/lib/codemirror.js";

import { post, uploadFile } from "@/api";
export default {
  name: "Calc",
  data: function () {
    return {
      calcDialogName: "二次计算",
      calcDialog: false,
      calcContent: `//内置函数如下：getRtData(获取实时值)，getHData(获取历史值),getHDataWithTs(获取指定时间的历史值)
//writeRtData(写入实时值),getTimeStamp(获取时间戳),getNowTime(获取当前时间)`, // 二次计算的输入内容
      codeUploadDialogNames: "代码上传",
      codeUploadDialog: false,
      jsCodeContent: "", // jscode file info
      codeFileList: [], // js code file list
      tableData: [],
      actionUrl: "", // 上传文件的url
      uploadHeaders: { "Content-Type": "multipart/form-data" }, // 上传的头部
      limit: 1, // 文件限制
      descriprionDialogNames: "添加描述",
      descriprionDialog: false,
      description: "", // 描述
      condition: "", // 搜索的条件
      editDialogName: "编辑二次计算项",
      editDialog: false,
      editContent: "", // v-model
      timeDurationDialogNames: "编辑计算项时间",
      timeDurationDialog: false,
      timeDuration: "", // 时间input的v-model
      selectedRow: null, // 选中的行
      editItems: [],
      size: "mini",
      owdith: "300",
      role: "", // 用户角色,
      showButton: true,
      disabled : false,
      code: "",
      editor: null,
      editorEdit: null,
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        ode: "text/javascript",
        // more CodeMirror options...
      },
    };
  },
  created() {
    this.role = this.$store.getters["user/userRole"];
    if (document.body.clientWidth < 768) {
      this.size = "mini";
      this.owdith = "150";
    }
    this.actionUrl = "http://" + getCookie("ip") + "/page/uploadFile";
    this.render();
    var orig = CodeMirror.hint.javascript;
    CodeMirror.hint.javascript = function(cm) {
    var inner = orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
    inner.list.push("getRtData");
    inner.list.push("getHData");
    inner.list.push("getHDataWithTs");
    inner.list.push("writeRtData");
    inner.list.push("getTimeStamp");
    inner.list.push("getNowTime");
    inner.list.push('testItemValue')
    inner.list.push('groupName')
    inner.list.push('itemName')
    inner.list.push('value')
    return inner;
};
  },
  mounted() {
    this.showButton = !(this.role.indexOf("visitor") > -1); // visitor
    this.disabled = this.role.indexOf("visitor") > -1
    document.querySelector(".el-main").style.backgroundColor = " #ffffff";
  },
  methods: {
    handleCalcOpen() {
      this.calcDialogName = "新增二次计算项";
      this.calcDialog = true;
    },
    render() {
      post(
        {
          condition: `description like '%${this.condition}%'`,
        },
        "/calculation/getCalcItems"
      ).then(({ data: { infos } }) => {
        if (typeof(infos) == 'string'){
          infos = JSON.parse(infos)
        }
        this.tableData = infos.map((item) => {
          if (item.updatedTime === "null") {
            item.updatedTime = "";
          }
          return item;
        });
      });
    },
    handleCalcOpened() {
      // this.editor = CodeMirror.fromTextArea(document.getElementById("jsCode"), {
      //   lineNumbers: true,
      //   extraKeys: { Ctrl: "autocomplete" },
      // });
      this.editor = CodeMirror(document.getElementById("jsCode"), {
        lineNumbers: true,
      })
      this.editor.setValue(this.calcContent);
      const _this = this;
      this.editor.on("inputRead", () => {
        _this.editor.showHint();
      });
    },
    handleCalcOpened1() {
      this.editorEdit = CodeMirror(
        document.getElementById("jsCodeEdit"),
        {
          lineNumbers: true,
          extraKeys: { Ctrl: "autocomplete" },
        }
      );
      this.editorEdit.setValue(this.editContent);
      const _this = this;
      this.editorEdit.on("inputRead", () => {
        _this.editorEdit.showHint();
      });
    },
    calcHandler() {
      if (this.calcContent.length === 0) {
        this.$message.error("计算代码不能为空");
      } else {
        this.descriprionDialog = true;
        this.description = "";
      }
    },
    // 上传js code
    uploadCodeFile() {
      const data = new FormData();
      const fileUps = this.jsCodeContent;
      data.append("file", fileUps);
      uploadFile(fileUps)
        .then(() => {
          this.$message.success("上传成功");
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "上传失败",
            message,
          });
        });
    },
    beforeCodeUpload(file) {
      this.jsCodeContent = file;
      if (this.isJs(this.jsCodeContent.name)) {
        return true;
      } else {
        this.$message.error("非法的文件类型或者文件列表已满!");
        return false; // 返回false取消上传
      }
    },
    isJs(name) {
      return /\.(js)$/.test(name);
    },
    showExceed() {
      this.$message.error("文件列表已满");
    },
    showJsCode() {
      post(
        {
          fileName: this.jsCodeContent.name,
        },
        "/page/getJsCode"
      )
        .catch(({ message }) => {
          this.$notify.error({
            title: "加载二次计算js代码失败",
            message,
          });
        })
        .then(({ data:{code} }) => {
          this.editor.setValue(code);
          this.codeUploadDialog = false;
        });
    },
    // 添加二次计算代码
    descriptionHandler() {
      if (this.description.trim(' ').length === 0) {
        this.$message.error("计算项的描述不能为空");
      } else {
        const expression = this.editor.getValue();
        post(
          {
            description: this.description,
            expression,
            duration: "1",
            flag: 'true'
          },
          "/calculation/addCalcItem"
        )
          .then(() => {
            this.descriprionDialog = false;
            this.calcDialog = false;
            this.$message.success("添加成功");
            this.render();
          })
          .catch(({ message }) => {
            this.$notify.error({
              title: "添加失败",
              message,
            });
          });
      }
    },
    // 启动计算
    startCalc({ id }) {
      post({ id: [id] }, "/calculation/startCalcItem")
        .then(() => {
          this.$message.success("启动成功!");
          this.render();
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "启动计算项失败",
            message,
          });
        });
    },
    // 终止计算
    stopCalc({ id }) {
      post({ id: [id] }, "/calculation/stopCalcItem")
        .then(() => {
          this.$message.success("成功停止计算项");
          this.render();
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "启动计算项失败",
            message,
          });
        });
    },
    // 删除
    deleteCalc({ id }) {
      this.$confirm(`确定删除当前计算项?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
          post({ id: [id] }, "/calculation/deleteCalcItem")
        .then(() => {
          this.$message.success("删除成功");
          this.render();
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "删除失败",
            message,
          });
        });
      }).catch(()=>{
        this.$message.info('操作取消')
      })
      
    },
    // 搜索
    searchHandler() {
      this.render();
    },
    // 编辑
    edit(row) {
      this.selectedRow = row;
      this.editContent = row.expression;
       this.editItems = [
        { label: "编辑描述", value: this.selectedRow.description },
        { label: "编辑计算时间", value: this.selectedRow.duration },
      ];
      this.editDialog = true;
    },
    editCalcItem() {
      this.timeDurationDialog = true;
    },
    // 编辑时间确定按钮
    timeHandler() {
      const t = parseFloat(this.editItems[1].value);
       if (t < 1) {
        this.$message.error("时间间隔不能小于1s");
      } else {
        this.timeDurationDialog = false;
      }
    },
    // 更新二次计算项
    updateCalcItem() {
      const expression = this.editorEdit.getValue();
      const description = this.editItems[0].value;
      const duration = this.editItems[1].value;
      post(
        {
          id: this.selectedRow.id,
          description,
          duration,
          expression,
        },
        "/calculation/updateCalcItem"
      )
        .then(() => {
          this.editDialog = false;
          this.render();
          this.$message.success("更新成功");
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "更新失败",
            message,
          });
        });
    },
    uploadJS() {
      this.codeFileList = [];
      this.codeUploadDialog = true;
    },
    checkJsCode() {
      const expression = this.editor.getValue();
      post(
        {
          expression,
        },
        "/calculation/testCalcItem"
      ).then(({ data:{result} }) => {
        this.$notify
          .success({
            title: "代码无误",
            message: result,
          })
      }).catch(({ message }) => {
            this.$notify.error({
              title: "代码出错",
              message,
            });
          });;
    },
    checkJsCodeEdit() {
      const expression = this.editorEdit.getValue();
      post(
        {
          expression,
        },
        "/calculation/testCalcItem"
      ).then(({ data:{result} }) => {
        this.$notify
          .success({
            title: "代码无误",
            message: result,
          })
          
      }).catch(({ message }) => {
            this.$notify.error({
              title: "代码出错",
              message,
            });
          });;
    },
  },
};
</script>
<style>
.CodeMirror {
  border: 1px solid #dddddd;
  width: 100%;
}
.CodeMirror-hints, .CodeMirror-hint, .CodeMirror-hint-active .default {
            z-index: 2147483647 !important;
        }
</style>

