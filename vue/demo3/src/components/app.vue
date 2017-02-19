<template>
    <div>
        <h1>姓名：{{name}}</h1>
        <h2>{{age}}</h2>
    </div>
</template>
<script>
    export default{
        el:'#app',
        data(){
            return {
                name: 'Jary',
                age: '22'
            }
        }
    }
</script>