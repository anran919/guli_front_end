<template>
  <div class="app-container">
    <el-form size="small" inline>
      <el-form-item label="name">
        <el-input v-model="searchForm.name" placeholder="name"/>
      </el-form-item>
      <el-form-item label="level">
        <el-input v-model="searchForm.level" placeholder="level"/>
      </el-form-item>
      <el-form-item label="gmtCreate">
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="reset">重置</el-button>
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
        <template slot-scope="scope">
          {{ scope.row[v.props] }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="display: flex;justify-content: end;margin-top: 10px;"
      :current-page="pageNo"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next, jumper"
    />
  </div>
</template>

<script>
import { getPageList } from '@/api/teacher'

export default {
  name: 'List',
  data() {
    const columns = [
      { label: 'name', props: 'name' },
      { label: 'level', props: 'level', tooltip: false },
      { label: 'intro', props: 'intro', minWidth: '200', tooltip: true },
      { label: 'career', props: 'career', minWidth: '120' },
      { label: 'gmtCreate', props: 'gmtCreate' },
      { label: 'gmtModified', props: 'gmtModified' },
      { label: 'isDeleted', props: 'isDeleted' }
    ]
    return {
      columns,
      searchForm: {},
      list: null,
      pageSize: 15,
      pageNo: 0,
      total: 0,
      loading: true
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
      this.search()
    },
    fetchTeacherList() {
      this.loading = true
      const data = {
        pageNo: 0,
        pageSize: 15,
        ...this.searchForm
      }
      getPageList(data).then(res => {
        const { items, total, pageNo, pageSize } = res.data
        this.list = items
        this.pageSize = pageSize
        this.total = total
        this.pageNo = pageNo
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
