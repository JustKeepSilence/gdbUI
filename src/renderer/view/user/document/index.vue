<template>
  <div style="height: 100%">
    <el-row :gutter="10">
      <el-col :span="6" v-for="(item, index) in itemValues" :key="index">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.tip"
          placement="top-start"
        >
          <el-card
            shadow="hover"
            v-if="index <= 3"
            style="cursor: pointer; height: 100px"
            @click.native="download(item)"
          >
            <el-row>
              <el-col :span="8">
                <svg-icon :icon-class="item.name" />
              </el-col>
              <el-col :span="16" :xs="16">
                <div style="text-align:center;line-height:50px;font-size:0.9em">
                  <span>{{ item.content }}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <el-card
            shadow="hover"
            v-else
            style="cursor: pointer; height: 100px; margin-top: 15px"
            @click.native="download(item)"
          >
            <el-row>
              <el-col :span="8">
                <svg-icon :icon-class="item.name" />
              </el-col>
              <el-col :span="16" :xs="16">
                <div style="text-align:center;line-height:50px;font-size:0.9em">
                  <span>{{ item.content }}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row>
      <div class="footer">
      <span>
        {{footContents}}
        
      </span>
      </div>
    </el-row>
    <el-dialog
      title="联系作者"
      :visible.sync="contactDialog"
      width="550px"
    >
    <el-image
      style="width: 100%; height: 100%"
      :src="url"
      :fit="fit"></el-image>
     
    </el-dialog>
  </div>
</template>
<script>
import { post } from '@/api'
import { saveAs } from 'file-saver'
import chat from '@/images/wechat.jpg'
import qq from '@/images/qq.jpg'
const { shell } = require('electron')
export default {
  name: 'Document',
  data() {
    return {
      itemValues: [
        {
          name: 'excel',
          content: '历史模板下载',
          tip: '导入历史模板下载',
          fileName: 'historyTemplate.xlsx'
        },
        {
          name: 'excel',
          content: '点表模板下载',
          tip: '导入点表模板下载',
          fileName: 'itemTemplate.xlsx'
        },
        {
          name: 'pdf',
          content: '系统文档下载',
          tip: '系统文档下载',
          fileName: 'document.pdf'
        },
        {
          name: 'api',
          content: '接口文档下载',
          fileName: 'api.pdf',
          tip: '接口文档下载'
        },
        {
          name: 'zip',
          content: '系统源码下载',
          fileName: 'source.7z',
          tip: '系统源码下载',
          url: 'https://github.com/JustKeepSilence/gdb.git'
        },
        {
          name: 'go',
          content: 'Go环境下载',
          fileName: 'go.7z',
          tip: 'Go环境下载',
          url: 'https://golang.org/dl/'
        },
        {
          name: 'vscode',
          content: 'vscode下载',
          fileName: 'vscode.exe',
          tip: 'vscode下载',
          url: 'https://code.visualstudio.com/'
        },
        {
          name: 'nodejs',
          content: 'nodeJs下载',
          fileName: 'nodeJs.exe',
          tip: 'nodeJs下载',
          url: 'https://nodejs.org/en/'
        },
        {
          name: 'go',
          content: 'Go标准库',
          fileName: 'go.document',
          tip: 'Go标准库',
          url: 'https://golang.org/pkg/'
        },
        {
          name: 'js',
          content: 'ES6参考',
          fileName: 'es6.document',
          tip: 'ES6参考',
          url: 'https://www.w3schools.com/js/js_es6.asp'
        },
        {
          name: 'vue',
          content: 'Vue官方文档',
          fileName: 'vue.document',
          tip: 'Vue官方文档',
          url: 'https://cn.vuejs.org/'
        },
        {
          name: 'electron',
          content: 'Electron文档',
          fileName: 'electron.document',
          tip: 'Electron文档',
          url: 'https://www.electronjs.org/'
        },
        {
          name: 'wechat',
          content: '微信联系作者',
          fileName: 'wechat',
          tip: '微信联系作者',
          url: ''
        },
        {
          name: 'qq',
          content: 'QQ联系作者',
          fileName: 'qq',
          tip: 'QQ联系我们',
          url: ''
        },
        {
          name: 'github',
          content: 'ForkMeOnGithub',
          fileName: 'github',
          tip: 'ForkMeOnGithub',
          url: 'https://github.com/JustKeepSilence/gdb'
        },
        {
          name: 'csdn',
          content: '关注作者CSDN',
          fileName: 'csdn',
          tip: '关注作者CSDN',
          url:
            'https://blog.csdn.net/qq_39778055/category_10757622.html?spm=1001.2014.3001.5482'
        }
      ],
      wechat: chat,
      qq: qq,
      url: '',
      fit: 'fill',
      contactDialog: false,
      footContents: `Copyright © ${(new Date()).getFullYear()} All Rights Reserved | JustKeepSilence`
    }
  },
  methods: {
    download(item) {
      if (item.url === undefined) {
        const fileName = item.fileName
        post({fileName}, '/page/downloadFile')
          .then(({ data:{contents} }) => {
            let c = new Uint8Array(contents.length)
            for (let i = 0; i < contents.length; i++) {
              c[i] = contents[i]
            }
            saveAs(new Blob([c]), fileName)
            this.$message.success(`文件${fileName}下载成功,请保存!`)
          })
          .catch(({ message }) => {
            this.$notify.error({
              title: '下载失败',
              message
            })
          })
      } else {
        if (item.url.length === 0) {
          if (item.name === 'wechat') {
            this.url = this.wechat
            this.contactDialog = true
          } else {
            this.url = this.qq
            this.contactDialog = true
          }
          this.showBig = true
        } else {
          shell.openExternal(item.url)
        }
      }
    }
  }
}
</script>
<style scoped>
  .footer {
    width: 100%;
    text-align: center;
    position: absolute;
    margin-top: 20px;
}
</style>