// Sound bar JS Code - https://codepen.io/libneko/pen/NWGbEqE - modified a bit to replace icons depending on volume.
document.addEventListener("DOMContentLoaded", () => {
  const range = document.querySelector(".volume .volume-range");

  const barHoverBox = document.querySelector(".volume .bar-hoverbox");
  const fill = document.querySelector(".volume .bar .bar-fill");
  
  range.addEventListener("change", (e) => {
    console.log("value", e.target.value);
  });
  
  const setValue = (value) => {
    fill.style.width = value + "%";
    range.setAttribute("value", value)
    range.dispatchEvent(new Event("change"))
  }
  
  setValue(range.value);
  
  const calculateFill = (e) => {
    let offsetX = e.offsetX
    
    if (e.type === "touchmove") {
      offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
    }
    
    const width = e.target.offsetWidth - 30;

    setValue(
      Math.max(
        Math.min(
          (offsetX - 15) / width * 100.0,
          100.0
        ),
        0
      )
    );
  }
  
  let barStillDown = false;

  barHoverBox.addEventListener("touchstart", (e) => {
    barStillDown = true;

    calculateFill(e);
  }, true);
  
  barHoverBox.addEventListener("touchmove", (e) => {
    if (barStillDown) {
      calculateFill(e);
    }
  }, true);
  
  barHoverBox.addEventListener("mousedown", (e) => {
    barStillDown = true;
    
    calculateFill(e);
  }, true);
  
  barHoverBox.addEventListener("mousemove", (e) => {
    if (barStillDown) {
      calculateFill(e);
    }
  });
  
  barHoverBox.addEventListener("wheel", (e) => {
    const newValue = +range.value + e.deltaY * 0.5;
    
    setValue(Math.max(
      Math.min(
        newValue,
        100.0
      ),
      0
    ))
  });
  
  document.addEventListener("mouseup", (e) => {
    barStillDown = false;
  }, true);
  
  document.addEventListener("touchend", (e) => {
    barStillDown = false;
  }, true);
})