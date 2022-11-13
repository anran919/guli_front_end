<template>
  <div class="app-container">
    <el-form size="small" inline :model="searchForm">
      <el-form-item label="title">
        <el-input v-model="searchForm.title" placeholder="title" />
      </el-form-item>
      <el-form-item label="status">
        <el-select v-model="searchForm.status" placeholder="status">
          <el-option :value="0" label="未发布" />
          <el-option :value="1" label="已发布" />
        </el-select>
      </el-form-item>
      <el-form-item label="create time">
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
            <el-button icon="el-icon-edit" type="success" size="mini" @click="handleUpdate(row)">编辑</el-button>
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
  </div>
</template>

<script>
import { getCoursePageList, deleteCourseById } from '@/api/course'

export default {
  name: 'CourseList',
  data() {
    const columns = [
      { label: 'title', props: 'title', minWidth: 200, tooltip: true },
      { label: 'price', props: 'price' },
      { label: 'lessonNum', props: 'intlessonNumro' },
      { label: 'cover', props: 'cover', tooltip: true, minWidth: 150 },
      { label: 'buyCount', props: 'buyCount' },
      { label: 'gmtCreate', props: 'gmtCreate', minWidth: 120 },
      { label: 'gmtModified', props: 'gmtModified', minWidth: 120 },
      { label: 'hanlder', props: 'hanlder', minWidth: 150 }
    ]
    return {
      columns,
      searchForm: {},
      list: [],
      page: {
        pageNo: 1,
        pageSize: 15
      },
      total: 0,
      loading: false
    }
  },
  created() {
    this.fetchCourseList()
  },
  methods: {
    search() {
      this.fetchCourseList()
    },
    reset() {
      this.searchForm = {}
      this.page.pageNo = 1
      this.search()
    },
    handleUpdate(row) {
      this.$router.push({ path: '/teacher/edit/' + row.id })
    },
    handleDelete(row) {
      const id = row.id
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteCourseById(id)
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
      this.fetchCourseList()
    },
    onPaginSizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.fetchCourseList()
    },
    fetchCourseList() {
      this.loading = true
      const data = {
        ...this.page,
        ...this.searchForm
      }
      data.gmtCreateBegin = data.createDateRange && data.createDateRange[0]
      data.gmtCreateEnd = data.createDateRange && data.createDateRange[1]
      delete data.createDateRange
      getCoursePageList(data).then(res => {
        const { data, total } = res.data
        this.list = data
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
