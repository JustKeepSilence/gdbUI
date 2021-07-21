<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :size="size"
      max-height="400"
    >
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="role" label="用户角色" align="center">
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-link
            :underline="false"
            type="success"
            :disabled="disabled"
            @click="addUsers"
            >添加用户</el-link
          >
        </template>
        <template slot-scope="scope">
          <el-button type="text" @click="editUser(scope.row)">编辑</el-button>
          <el-button
            type="text"
            @click="deleteUser(scope.row)"
            :disabled="disabled"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加用户路由"
      :visible.sync="addUserRoutesDialogs"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-transfer
        v-model="selectedRouteValues"
        :data="routeValues"
        :titles="['可选路由', '已选路由']"
        filterable
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmAddUserRoutes">确定</el-button>
        <el-button @click="addUserRoutesDialogs = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑用户路由"
      :visible.sync="editUserRoutesDialog"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-transfer
        v-model="newRouteValues"
        :data="remainedRouteValues"
        :titles="['可选路由', '已选路由']"
        filterable
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEditUser">确定</el-button>
        <el-button @click="editUserRoutesDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加用户"
      :visible.sync="addUsersDialog"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="userForm"
        :model="userForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="输入用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            placeholder="输入用户名"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm">确定</el-button>
        <el-button @click="addUsersDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { post, userValidator } from "@/api";
const _ = require("lodash");
export default {
  name: "UserManagement",
  data() {
    return {
      tableData: [],
      size: "mini",
      userRole: [],
      loginName: "",
      disabled: true,
      editUsersDialog: false,
      userForm: {
        userName: "",
      },
      rules: {
        userName: [
          {
            required: true,
            trigger: "blur",
            message: "用户名不能为空",
            validator: userValidator,
          },
        ], // 用户名的验证
      },
      addUsersDialog: false,
      addUserRoutesDialogs: false,
      selectedRouteValues: [],
      routeValues: [],
      newRouteValues: [],
      remainedRouteValues: [],
      editUserRoutesDialog: false,
      oldRouteValues: [], // 编辑路由时一开始右边选中的路由,
      selectedUserName: "",
      commonUserRoutes: [],
      visitorUserRoutes: [],
    };
  },
  created() {
    this.loginName = this.$store.getters["user/userName"];
    this.userRole = this.$store.getters["user/userRole"];
  },
  mounted() {
    this.disabled = !(this.userRole.indexOf("super_user") > -1);
    this.getRoutes();
    this.getAllRoutes();
  },
  methods: {
    getRoutes() {
      post({}, "/page/getRoutes")
        .then(({ data:{routes} }) => {
          let userInfos = routes;
          if (typeof userInfos === "string") {
            // for gRPC
            userInfos = JSON.parse(routes);
          }
          this.tableData = userInfos.map((item) => {
            switch (item.role) {
              case "super_user":
                item.role = "管理员";
                break;
              case "common_user":
                item.role = "普通用户";
                break;
              case "visitor":
                item.role = "游客";
                break;
              default:
                item.role = "无";
                break;
            }
            return item;
          });
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: "获取用户路由失败",
            message,
          });
        });
    },
    addUsers() {
      this.userForm.userName = "";
      this.addUsersDialog = true;
    },
    confirm() {
      if (this.userForm.userName.trim(" ").length === 0) {
        this.$message.error("用户名不能为空");
      } else {
        this.selectedRouteValues = [];
        this.addUserRoutesDialogs = true;
      }
    },
    editUser({ userName, role, routeRoles }) {
      this.selectedUserName = userName;
      const r = JSON.parse(routeRoles);
      const routes = r.map((item) => {
        return item.split(",")[2].toLowerCase();
      }); // 已经选中的路由
      this.newRouteValues = this.routeValues
        .filter((item) => {
          return routes.indexOf(item.label.toLowerCase()) > -1;
        })
        .map((item) => {
          return item.key;
        });
      this.oldRouteValues = JSON.parse(JSON.stringify(this.newRouteValues));
      const t = JSON.parse(JSON.stringify(this.routeValues));
      if (this.disabled) {
        // 非管理员
        if (userName !== this.loginName && role !== '无') {
          this.$message.error("您的权限只能编辑当前用户或者非登录用户");
        } else {
          // 编辑当前用户
          if (role === "无") {
            // 非登陆用户
            this.remainedRouteValues = t;
          } else {
            // 登陆用户,用户权限只增不减
            if (role === "普通用户") {
              this.remainedRouteValues = t.map((item) => {
                if (
                  routes.indexOf(item.label.toLowerCase()) > -1 &&
                  this.commonUserRoutes.indexOf(item.label) > -1
                ) {
                  item.disabled = true;
                }
                return item;
              });
            } else {
              this.remainedRouteValues = t.map((item) => {
                if (
                  routes.indexOf(item.label.toLowerCase()) > -1 &&
                  this.visitorUserRoutes.indexOf(item.label) > -1
                ) {
                  item.disabled = true;
                }
                return item;
              });
            }
          }
          this.editUserRoutesDialog = true;
        }
      } else {
        // 管理员
        if (userName === "admin") {
          this.$message.error("无法编辑admin用户");
        } else {
          if (role === "无") {
            // 非登陆用户
            this.remainedRouteValues = t;
          } else {
            // 登陆用户,用户权限只增不减
            if (role === "普通用户") {
              this.remainedRouteValues = t.map((item) => {
                if (
                  routes.indexOf(item.label.toLowerCase()) > -1 &&
                  this.commonUserRoutes.indexOf(item.label) > -1
                ) {
                  item.disabled = true;
                }
                return item;
              });
            } else if (role === "游客") {
              this.remainedRouteValues = t.map((item) => {
                if (
                  routes.indexOf(item.label.toLowerCase()) > -1 &&
                  this.visitorUserRoutes.indexOf(item.label) > -1
                ) {
                  item.disabled = true;
                }
                return item;
              });
            } else {
               this.$message.warning('无法编辑管理员路由')
               return 
            }
          }
          this.editUserRoutesDialog = true;
        }
      }
    },
    handleEditUser() {
      const updatedRoutes =
        this.newRouteValues.length > this.oldRouteValues.length
          ? _.difference(this.newRouteValues, this.oldRouteValues)
          : _.difference(this.oldRouteValues, this.newRouteValues); // 发生变化的路由index
      let addedIndex = [];
      let deltedIndex = [];
      if (updatedRoutes.length === 0) {
        this.editUserRoutesDialog = false;
        this.$message.info("用户路由没有更新");
      } else {
        for (let i = 0; i < updatedRoutes.length; i++) {
          const item = updatedRoutes[i];
          if (
            this.oldRouteValues.indexOf(item) > -1 &&
            this.newRouteValues.indexOf(item) === -1
          ) {
            // 在原来的路由中但是却不在新的路由中，说明这个路由是要删除的路由
            deltedIndex.push(item);
          } else {
            // 增加的路由
            addedIndex.push(item);
          }
        }
        const addedRoutes = this.routeValues
          .filter((_, index) => {
            return addedIndex.indexOf(index) > -1;
          })
          .map((item) => {
            return item.label;
          });
        const deletedRoutes = this.routeValues
          .filter((_, index) => {
            return deltedIndex.indexOf(index) > -1;
          })
          .map((item) => {
            return item.label;
          });
        post(
          {
            name: this.selectedUserName,
            routes: addedRoutes,
          },
          "/page/addRoutes"
        )
          .then(() => {
            post(
              {
                name: this.selectedUserName,
                routes: deletedRoutes,
              },
              "/page/deleteRoutes"
            )
              .then(() => {
                this.getRoutes();
                this.$message.success("用户路由更新成功!");
                this.editUserRoutesDialog = false;
              })
              .catch(({ message }) => {
                this.$notify.error({
                  title: "用户路由更新失败",
                  message,
                });
              });
          })
          .catch(({ message }) => {
            this.$notify.error({
              title: "用户路由更新失败",
              message,
            });
          });
      }
    },
    deleteUser({ userName, role }) {
      if (role !== '无') {
        this.$message.error("不能删除登陆用户");
      } else {
        this.$confirm("删除操作不可逆,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const name = userName;
            post(
              {
                name,
              },
              "/page/deleteUserRoutes"
            )
              .then(() => {
                this.$message.success("删除用户成功");
                this.getRoutes();
              })
              .catch(({ message }) => {
                this.$$notify.error({
                  title: "删除用户失败",
                  message,
                });
              });
          })
          .catch(() => {
            this.$message.info("操作取消");
          });
      }
    },
    getAllRoutes() {
      post({}, "/page/getAllRoutes").then(({ data: {routes} }) => {
        let data = []
        if (typeof(routes) === 'string'){
            data = JSON.parse(routes)
        }else{
          data = routes
        }
        for (let i = 0; i < data[0].length; i++) {
          this.routeValues.push({
            key: i,
            label: data[0][i],
          });
        }
        for (let i = 0; i < data[1].length; i++) {
          this.commonUserRoutes.push(data[1][i]);
        }
        for (let i = 0; i < data[2].length; i++) {
          this.visitorUserRoutes.push(data[2][i]);
        }
      });
    },
    confirmAddUserRoutes() {
      if (this.selectedRouteValues.length === 0) {
        this.$message.warning("请选择用户路由权限");
      } else {
        post(
          {
            name: this.userForm.userName,
            routes: this.routeValues
              .filter((_, index) => {
                return this.selectedRouteValues.indexOf(index) > -1;
              })
              .map((item) => {
                return item.label;
              }),
          },
          "/page/addUserRoutes"
        )
          .then(() => {
            this.$message.success("添加用户成功");
            this.getRoutes();
            this.addUserRoutesDialogs = false;
            this.addUsersDialog = false;
          })
          .catch(({ message }) => {
            this.addUserRoutesDialogs = false;
            this.addUsersDialog = false;
            this.$notify.error({
              title: "添加用户失败",
              message,
            });
          });
      }
    },
  },
};
</script>
<style>
.el-transfer-panel {
  width: 285px;
}
</style>