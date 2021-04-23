<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div>
      <el-card
        class="container"
        shadow="never"
        v-loading="loading"
        element-loading-text="读取用户信息中"
      >
        <div slot="header" class="title">
          <span>GDB实时数据库</span>
        </div>
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            id="loginForm"
          >
            <el-form-item prop="ip">
              <el-input
                v-model="ruleForm.ip"
                autocomplete="off"
                prefix-icon="el-icon-position"
                placeholder="请输入远端服务器地址"
              ></el-input>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input
                v-model="ruleForm.userName"
                autocomplete="off"
                prefix-icon="el-icon-user-solid"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input
                type="password"
                v-model="ruleForm.passWord"
                autocomplete="off"
                prefix-icon="el-icon-key"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" style="width: 100%"
                >登录</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-radio-group v-model="ruleForm.mode">
                <el-radio label="http">http模式</el-radio>
                <el-radio label="https">https模式</el-radio>
                <el-radio label="gRPC">gRPC模式</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { post, passWordValidator } from "@/api";
import { setCookie, getCookie } from "@/utils/cookie";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      ruleForm: {
        userName: "", // 用户名
        passWord: "", // 密码
        ip: "",
        mode: "http",
      },

      rules: {
        userName: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ], // 用户名的验证
        passWord: [
          {
            required: true,
            tigger: "blur",
            min: 6,
            validator: passWordValidator, // 自定义验证函数
          },
        ],
      },
      userName: "",
      imgSrc: require("@/images/bg-1.jpg"),
    };
  },
  mounted() {
    // 获取用户名和密码等信息
    this.loading = true;
    getCookie("userName")
      .then(async (userName) => {
        this.ruleForm.userName = userName;
        this.ruleForm.ip = await getCookie("ip");
        this.ruleForm.passWord = await getCookie("passWord");
        this.loading = false;
      })
      .catch(() => {
        this.$message.warning("登陆信息已过期,请重新登陆!");
        this.loading = false;
      });
  },
  methods: {
    async submitForm() {
      this.userName = this.ruleForm.userName;
      await setCookie({ key: "ip", value: this.ruleForm.ip });
      await setCookie({ key: "mode", value: this.ruleForm.mode });
      await setCookie({ key: "passWord", value: this.ruleForm.passWord });
      post(
        JSON.stringify({
          userName: this.ruleForm.userName,
          passWord: this.$md5(this.ruleForm.passWord + "@seu"),
        }),
        "/page/userLogin"
      )
        .then(({ data: { token } }) => {
          const userName = this.ruleForm.userName;
          this.$store
            .dispatch("user/setToken", { userName, token })
            .then(() => {
              this.$router.push("/index");
            });
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
  },
};
</script>
<style scoped>
.background {
  margin-left: -1%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
  margin-top: -10px;
  overflow: hidden;
}
.container {
  z-index: 1;
  position: absolute;
  margin-top: 12%;
  margin-left: 35%;
  background-color: rgba(200, 200, 200, 0);
  border: none;
}
.title {
  text-align: center;
  font-size: 24px;
  color: rgba(50, 50, 50, 0.8);
}
</style>
