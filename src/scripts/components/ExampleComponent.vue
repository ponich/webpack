<template>
    <a class="btn btn-yellow" href="#">
        <i class="fa fa-meetup" aria-hidden="true">Vue component button</i>
    </a>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style lang="scss">
    .btn {

        &.btn-yellow {
            background: #f39c12;
            color: #ecf0f1;
        }
    }
</style>