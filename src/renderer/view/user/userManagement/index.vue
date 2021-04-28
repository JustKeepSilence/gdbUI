<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :size="size"
      max-height="400"
    >
      <el-table-column prop="id" label="序号" width="80" align="center">
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
      title="添加用户"
      :visible.sync="addUsersDialog"
      width="800px"
      :showClose="false"
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
        <el-form-item label="输入密码" prop="passWord">
          <el-input
            type="password"
            v-model="userForm.passWord"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择用户角色">
          <el-select v-model="userForm.role">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddUser">确定</el-button>
        <el-button @click="addUsersDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑用户"
      :visible.sync="editUsersDialog"
      width="800px"
      :showClose="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="editUserForm" :model="userForm" label-width="100px">
        <el-form-item label="输入用户名" prop="userName">
          <el-input v-model="editUserForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="选择用户角色">
          <el-select v-model="editUserForm.role">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEditUser">确定</el-button>
        <el-button @click="editUsersDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { post, passWordValidator } from '@/api'
export default {
  name: 'UserManagement',
  data() {
    return {
      tableData: [],
      size: 'mini',
      userRole: [],
      loginName: '',
      disabled: true,
      editUsersDialog: false,
      userForm: {
        userName: '',
        passWord: '',
        role: 'common_user'
      },
      editUserForm: {
        userName: '',
        role: 'common_user'
      },
      rules: {
        userName: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ], // 用户名的验证
        passWord: [
          {
            required: true,
            tigger: 'blur',
            min: 6,
            validator: passWordValidator // 自定义验证函数
          }
        ]
      },
      addUsersDialog: false,
      options: [
        { label: '普通用户', value: 'common_user' },
        { label: '游客', value: 'visitor' }
      ],
      userId: '',
      oldUserName: ''
    }
  },
  created() {
    this.loginName = this.$store.getters['user/userName'].name
    this.userRole = this.$store.getters['user/userRole']
  },
  mounted() {
    this.disabled = !(this.userRole.indexOf('super_user') > -1)
    if (!this.disabled) {
      this.options.push({ label: '管理员', value: 'super_user' })
    }
    this.getUsers()
  },
  methods: {
    getUsers() {
      post({}, '/page/getUsers')
        .then(({ data: {userInfos} }) => {
          if (typeof(userInfos) === 'string'){
            // for gRPC
            userInfos = JSON.parse(userInfos)
          }
          this.tableData = userInfos.map((item) => {
            item.role =
              item.role === 'super_user'
                ? '管理员'
                : item.role === 'common_user'
                  ? '普通用户'
                  : '游客'
            return item
          })
        })
        .catch(({ message }) => {
          this.$notify.error({
            title: '获取用户失败',
            message
          })
        })
    },
    addUsers() {
      this.addUsersDialog = true
    },
    handleAddUser() {
      if (this.userForm.userName.trim(' ').length === 0) {
        this.$message.error('用户名不能为空')
      } else {
        post(
          {
            name: this.userForm.userName,
            role: this.userForm.role,
            passWord: this.$md5(this.userForm.passWord + '@seu') // passWord = passWord + @seu
          },
          '/page/addUsers'
        )
          .then(() => {
            this.$message.success('添加用户成功')
            this.addUsersDialog = false
            this.getUsers()
          })
          .catch(({ message }) => {
            this.$notify.error({
              title: '添加用户失败',
              message
            })
          })
      }
    },
    editUser({ id, userName, role }) {
      if (this.disabled) {
        // 非管理员
        if (userName !== this.loginName) {
          this.$message.error('您的权限只能编辑当前用户')
        } else {
          this.oldUserName = userName // 原来的用户名
          this.editUserForm.userName = userName
          this.editUserForm.role = role
          this.userId = id
          this.editUsersDialog = true
        }
      } else {
        // 管理员
        if (userName === 'admin') {
          this.$message.error('无法编辑admin用户')
        } else {
          this.oldUserName = userName // 原来的用户名
          this.editUserForm.userName = userName
          this.editUserForm.role = role
          this.userId = id
          this.editUsersDialog = true
        }
      }
    },
    handleEditUser() {
      if (
        this.editUserForm.userName === this.loginName &&
        this.editUserForm.role === this.userRole[0]
      ) {
        // no changed
        this.editUsersDialog = false
      } else {
        if (this.editUserForm.userName.trim(' ').length === 0) {
          this.$message.error('用户名不能为空')
        } else {
          post(
            {
              id: parseInt(this.userId),
              oldUserName: this.oldUserName,
              newUserName: this.editUserForm.userName,
              role: this.editUserForm.role
            },
            '/page/updateUsers'
          )
            .then(() => {
              if (this.disabled) {
                this.$store
                  .dispatch('user/clearRole')
                  .then(() => {
                    this.$message.success('更新用户信息成功,请重新登录')
                    this.$router.push('/login')
                  })
                  .catch((err) => {
                    this.$notify.error({
                      title: '更新用户信息失败',
                      message: err
                    })
                  })
              } else {
                // 管理员
                this.$message.success('更新用户信息成功')
                this.getUsers()
                this.editUsersDialog = false
              }
            })
            .catch(({ message }) => {
              this.$notify.error({
                title: '更新用户信息失败',
                message
              })
            })
        }
      }
    },
    deleteUser({ userName }) {
      if (userName === 'admin') {
        this.$message.error('不能删除admin用户')
      } else {
        this.$confirm('删除操作不可逆,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const name = userName
            post(
              {
                name
              },
              '/page/deleteUsers'
            )
              .then(() => {
                this.$message.success('删除用户成功')
                this.getUsers()
              })
              .catch(({ message }) => {
                this.$$notify.error({
                  title: '删除用户失败',
                  message
                })
              })
          })
          .catch(() => {
            this.$message.info('操作取消')
          })
      }
    }
  }
}
</script>