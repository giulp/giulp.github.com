<template>
  <figure>
    <div class="flip">
      <div class="front">
        <img src="../../assets/giulp_avatar.png" alt="GiulP">
      </div>
      <div class="back">
        <img src="../../assets/G.jpg" alt="Giulio">
      </div>
    </div>
  </figure>
</template>

<style lang="scss">
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
figure {
  margin:auto;
  background-color: transparent;
  width: 300px;
  height: 200px;
  // border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
figure:hover .flip {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.front {
  // background-color: #bbb;
  color: black;
  img {
    border-radius: 0.4em;
    border: 3px solid white;
    margin-top:1em;
    box-shadow: 3px 3px 8px lightgrey !important;
  }
}

/* Style the back side */
.back {
  // background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>