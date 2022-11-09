<template>
  <div class="app-container">
    <el-form size="small" inline :model="searchForm">
      <el-form-item label="name">
        <el-input v-model="searchForm.name" placeholder="name" />
      </el-form-item>
      <el-form-item label="level">
        <el-select v-model="searchForm.level" placeholder="level">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="gmtCreate">
        <el-date-picker
          v-model="searchForm.createDateRange"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      size="small"
      highlight-current-row
    >
      <el-table-column align="center" label="id" min-width="30">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column v-for="v in columns" :key="v.props" :label="v.label" :min-width="v.minWidth" :show-overflow-tooltip="v.tooltip">
        <template slot-scope="{row}">
          <template v-if="v.props=='hanlder'">
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="handleUpdate(row,0)">弹窗编辑</el-button>
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="handleUpdate(row,1)">跳转编辑</el-button>
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
          </template>
          <span v-else-if="v.props=='level'">
            {{ ["高级讲师","首席讲师"][row[v.props]-1] }}
          </span>
          <span v-else>
            {{ row[v.props] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="display: flex;justify-content: end;margin-top: 10px;"
      :current-page="page.pageNo"
      :page-size="page.pageSize"
      :total="total"
      layout="sizes,total, prev, pager, next, jumper"
      :page-sizes="[10,15,20,30]"
      @size-change="onPaginSizeChange"
      @current-change="onPaginCurrentChange"
    />
    <el-dialog title="修改" :visible="visible">
      <el-form size="small" :model="updateForm" label-width="120px">
        <el-form-item label="name">
          <el-input v-model="updateForm.name" clearable placeholder="name" />
        </el-form-item>
        <el-form-item label="sort">
          <el-input-number v-model="updateForm.sort" placeholder="sort" :min="0" />
        </el-form-item>
        <el-form-item label="level">
          <el-select v-model="updateForm.level" clearable placeholder="level">
            <el-option :value="1" label="高级讲师" />
            <el-option :value="2" label="首席讲师" />
          </el-select>
        </el-form-item>
        <el-form-item label="career">
          <el-input v-model="updateForm.career" placeholder="career" />
        </el-form-item>
        <el-form-item label="intro">
          <el-input v-model="updateForm.intro" type="textarea" :rows="3" placeholder="intro" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button size="small" :loading="confirmLoading" type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPageList, deleteTeacherById, updateTeacher } from '@/api/teacher'

export default {
  name: 'List',
  data() {
    const columns = [
      { label: 'name', props: 'name' },
      { label: 'level', props: 'level', tooltip: false },
      { label: 'intro', props: 'intro', minWidth: '200', tooltip: true },
      { label: 'career', props: 'career', minWidth: 100, tooltip: true },
      { label: 'gmtCreate', props: 'gmtCreate', minWidth: 100 },
      { label: 'gmtModified', props: 'gmtModified', minWidth: 100 },
      // { label: 'isDeleted', props: 'isDeleted' },
      { label: 'hanlder', props: 'hanlder', minWidth: 200 }
    ]
    return {
      columns,
      searchForm: {},
      updateForm: {},
      visible: false,
      list: [],
      page: {
        pageNo: 1,
        pageSize: 15
      },
      total: 0,
      loading: false,
      confirmLoading: false
    }
  },
  created() {
    this.fetchTeacherList()
  },
  methods: {
    search() {
      this.fetchTeacherList()
    },
    reset() {
      this.searchForm = {}
      this.page.pageNo = 1
      this.search()
    },
    handleAdd() {
      this.$router.push({ path: '/teacher/add' })
    },
    confirm() {
      const data = Object.assign({}, this.updateForm)
      this.confirmLoading = true
      updateTeacher(data.id, data).then(res => {
        this.visible = false
        return this.$message.success('更新成功!')
      }).then(_ => {
        this.search()
      }).catch(_ => {
        this.$message.error('更新失败!')
      }).finally(_ => {
        this.confirmLoading = false
      })
    },
    handleUpdate(row, type) {
      if (type) {
        this.$router.push({ path: '/teacher/edit/' + row.id })
      } else {
        this.updateForm = row
        this.visible = true
      }
    },
    handleDelete(row) {
      const id = row.id
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteTeacherById(id)
      }).then(_ => {
        this.search()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },
    onPaginCurrentChange(pageNo) {
      this.page.pageNo = pageNo
      this.fetchTeacherList()
    },
    onPaginSizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.fetchTeacherList()
    },
    fetchTeacherList() {
      this.loading = true
      const data = {
        ...this.page,
        ...this.searchForm
      }
      data.gmtCreateBegin = data.createDateRange && data.createDateRange[0]
      data.gmtCreateEnd = data.createDateRange && data.createDateRange[1]
      delete data.createDateRange
      getPageList(data).then(res => {
        const { items, total } = res.data
        this.list = items
        this.total = total
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
