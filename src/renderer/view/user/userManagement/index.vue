<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" :size="size">
      <el-table-column type="index" label="Index" width="80"> </el-table-column>
      <el-table-column prop="userName" label="userName" width="180"> </el-table-column>
      <el-table-column prop="role" label="Role"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "UserManagement",
  data(){
      return {
          tableData: [],
          size: 'mini'
      }
  }
};
</script>