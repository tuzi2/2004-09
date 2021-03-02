<template>
    <div id="app">
        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th><button @click="selectAll">全选</button></th>
                        <th>商品名称</th>
                        <th>商品单价</th>
                        <th>购买数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(vo,index) in list">
                        <tr>
                            <td><input type="checkbox" v-model="selectList" :value="vo"></td>
                            <td>{{vo.name}}</td>
                            <td>{{vo.price}}</td>
                            <td>{{vo.num}}</td>
                            <td><button @click="delGoods(index)">移除</button></td>
                        </tr>
                    </template>
                    
                        <div class="aa" v-if="list==0">没有商品了</div>
                        <div v-else></div>
                </tbody>
            </table>
            <div>
                <span>总价：{{total}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
    data(){
        return {
            selectList:[],
            list:[
                {
                    id:1,
                    name:'iPhone 7',
                    price:6188,
                    num:1,
                },
                {
                    id:2,
                    name:'iPad Pro',
                    price:5888,
                    num:1,
                },
                {
                    id:3,
                    name:'MacBook Pro',
                    price:21488,
                    num:1,
                }
        ]
        }
    },
    watch:{
        num(n,o){
            console.log(thi.num)
            this.count = this.num
        }
    },
    computed:{
        total(){
            var list = this.selectList
            var sum = 0
            for(var i in list){
                sum += list[i].num*list[i].price
            }
            return sum
        }
    },
    methods:{
        toPay(){
            var list = this.selectList
            var arr =list.map(item=>item.id)
        },
        //全选
        selectAll(){
            this.selectList = this.list.slice(0)
        },
        //删除
        delGoods(index){
            this.list.splice(index,1)
        }
    }
}
</script>
<style scoped>
    table{
        width: 700px;
        height: 150px;
    }
    tr td{
        border: 1px solid black;
    }
    tr th{
        background-color: #112233;
        height: 35px;
        color: #b0e0eb;
    }
    span{
        float: left;
    }
</style>