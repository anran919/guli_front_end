<template>
  <div class="app-container">
    <el-card>
      <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
      <el-tree
        ref="tree"
        :data="treeList"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
      />
    </el-card>
  </div>
</template>

<script>
import { getTreeList } from '@/api/subject'
export default {
  name: 'SubjectList',
  data() {
    return {
      filterText: '',
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.fetchTreeList()
  },
  methods: {
    fetchTreeList() {
      getTreeList().then(res => {
        this.treeList = res.data.list
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    }
  }
}
</script>

