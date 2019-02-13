<template>
  <svg ref="svg" viewBox="0 0 400 400" width="400" height="400" xml:space="preserve">
    <!--cx,cy定义圆的中心点，以svg宽高的一半为中心-->
    <!--圆周长=2*3.14圆周率*r=628  78.5的值计算628/8  将圆分为8块-->
    <!-- <circle r="100" cx="200" cy="200" fill="none" stroke="gray" stroke-width="200" stroke-dasharray="78.5 628"/>
    <circle r="100" cx="200" cy="200" fill="none" stroke="red" stroke-width="200" stroke-dasharray="157 628" stroke-dashoffset="-78.5"/>
    <circle r="100" cx="200" cy="200" fill="none" stroke="gray" stroke-width="200" stroke-dasharray="235.5 628" stroke-dashoffset="-157"/>
    <circle r="100" cx="200" cy="200" fill="none" stroke="blue" stroke-width="200" stroke-dasharray="314 628" stroke-dashoffset="-235.5"/>
    <circle r="100" cx="200" cy="200" fill="none" stroke="gray" stroke-width="200" stroke-dasharray="392.5 628" stroke-dashoffset="-314"/>
    <circle r="100" cx="200" cy="200" fill="none" stroke="green" stroke-width="200" stroke-dasharray="471 628" stroke-dashoffset="-392.5"/>
    <circle r="100" cx="200" cy="200" fill="none" stroke="red" stroke-width="200" stroke-dasharray="549.5 628" stroke-dashoffset="-471"/>
    <circle r="100" cx="200" cy="200" fill="none" stroke="#fff" stroke-width="200" stroke-dasharray="628 628" stroke-dashoffset="-549.5" /> -->
  </svg>
</template>

<script>
import $ from 'jquery'

export default {
  mounted() {
    this.$nextTick(() => {
      this.pie();
    })
  },
  methods: {
    pie() {
      const svg = this.$refs.svg;
      //获取svg宽或高   svg宽高必须一致
      const sW = $(svg).attr('width'); 
      //计算圆的中心点、半径、圆周长  len为将圆分为多少块
      const cR = sW / 4;
      const dia = sW / 2;
      const cir = 2*3.14*cR;
      const len = 8;
      const pieW = cir / len;

      let circle;

      for(let i=0; i < len; i++) {
        if(i == 0) {
          circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
          circle.setAttribute('r', cR);
          circle.setAttribute('cx', dia);
          circle.setAttribute('cy', dia);
          circle.setAttribute('fill', 'none');
          circle.setAttribute('stroke', 'blue');
          circle.setAttribute('stroke-width', dia);
          circle.setAttribute('stroke-dasharray',pieW + ' ' + cir);
        } else {
          circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
          circle.setAttribute('r', cR);
          circle.setAttribute('cx', dia);
          circle.setAttribute('cy', dia);
          circle.setAttribute('fill', 'none');
          circle.setAttribute('stroke', 'gray');
          circle.setAttribute('stroke-width', dia);
          circle.setAttribute('stroke-dasharray', pieW*(i+1) + ' ' + cir);
          circle.setAttribute('stroke-dashoffset', '-' + pieW*i);
        }
        $(svg).append(circle);
      }
    }
  }
}
</script>




