<script setup lang="ts">

</script>

<template>
<div class="hero">
    <div class="container">
        <h1>
            i believe in learning & getting better with every passing project
        </h1>
        <div class="bottom-tile">
            <span>
                <p>sumit kumar singh<br />communication design student</p>
            </span>

            <span>
                <p>and i love listening<br />to good music</p>
            </span>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.hero {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 80vh;

    .container {
        width: 50%;
        h1 {
            font-size: 80px;
            font-weight: 800;
        }
    }

    .bottom-tile {
        display: flex;
        margin-top: 120px;
        font-size: 15px;

        span:nth-child(1) {
            margin-right: 60px; 
        }
    }
}
</style>
