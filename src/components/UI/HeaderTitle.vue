<template>
    <div class="header__title-box">        
        <div class="header-title__line-bottom"></div>
        <p>{{ title }}</p>        
    </div>
</template>

<script>

export default {
    props: {
        title: String
    }
}
</script>

<style lang="stylus">
.header__title-box{
    position: relative;
    width: 300px;
    p{
        color: #FF8A00;
        font-family: Montserrat;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 0px;
        position: relative;
        z-index: 1;
    }
    .header-title__line-bottom{
        background: #EEE;
        width: 300px;
        height: 8px;
        position: absolute;
        bottom: 5px;
        left: 0;
    }
}

@media only screen and (max-width: 1100px) {
    .header__title-box{        
        width: 250px;
        p{
            
            font-size: 30px;
        }
        .header-title__line-bottom{            
            width: 250px;
            
        }
    }
}
@media only screen and (max-width: 767px) {
    .header__title-box{        
        width: 175px;
        p{
            
            font-size: 26px;
        }
        .header-title__line-bottom{            
            width: 175px;
            
        }
    }
}
</style>