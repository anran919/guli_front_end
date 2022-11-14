<template>
  <div class="app-container">
    <el-form size="small" inline :model="searchForm">
      <el-form-item label="title">
        <el-input v-model="searchForm.title" placeholder="title" />
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
      <el-table-column v-for="v in columns" :key="v.props" :label="v.label" :min-width="v.minWidth" :show-overflow-tooltip="v.tooltip">
        <template slot-scope="{row}">
          <template v-if="v.props=='hanlder'">
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
          </template>
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
import { getBannerPageList, deleteBannerById } from '@/api/banner'

export default {
  name: 'BannerList',
  data() {
    const columns = [
      { label: 'id', props: 'id' },
      { label: 'title', props: 'title', tooltip: false },
      { label: 'imageUrl', props: 'imageUrl', minWidth: '200', tooltip: true },
      { label: 'linkUrl', props: 'linkUrl', minWidth: 100, tooltip: true },
      { label: 'gmtModified', props: 'gmtModified', minWidth: 100 },
      { label: 'hanlder', props: 'hanlder', minWidth: 100 }
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
    this.fetchBannerList()
  },
  methods: {
    search() {
      this.fetchBannerList()
    },
    reset() {
      this.searchForm = {}
      this.page.pageNo = 1
      this.search()
    },
    handleAdd() {
      this.$router.push({ path: '/banner/add' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/banner/edit/' + row.id })
    },
    handleDelete(row) {
      const id = row.id
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteBannerById(id)
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
      this.fetchBannerList()
    },
    onPaginSizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.fetchBannerList()
    },
    fetchBannerList() {
      this.loading = true
      const data = {
        ...this.page,
        ...this.searchForm
      }
      getBannerPageList(data).then(res => {
        const { records, total } = res.data.data
        this.list = records
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

